import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 48px auto 0;
  background: #fafafa;
  border: 1px solid black;
`;

const DiagramTitle = styled.div`
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #888;
  padding: 10px 14px;
  border-bottom: 1px solid black;
  user-select: none;
`;

const CanvasWrapper = styled.div`
  position: relative;
`;

const CanvasEl = styled.canvas`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 7;
`;

const LabelLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const NodeLabel = styled.div`
  position: absolute;
  transform: ${p => (p.$above ? 'translate(-50%, calc(-100% - 11px))' : 'translate(-50%, 11px)')};
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.3;
`;

const NodeName = styled.div`
  font-size: clamp(8px, 1.05vw, 11px);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #111;
  white-space: nowrap;
`;

const NodeSub = styled.div`
  font-size: clamp(6px, 0.85vw, 9px);
  color: #888;
  margin-top: 1px;
  white-space: nowrap;
  letter-spacing: 0.03em;
`;

const EdgeLabelEl = styled.div`
  position: absolute;
  transform-origin: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: clamp(6px, 0.75vw, 8px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #999;
  white-space: nowrap;
`;

// ─── Constants ────────────────────────────────────────────────────────────────

const NODE_RADIUS    = 6;
const SPIRAL_RADIUS  = 32; // outer coil radius
const SPIRAL_TURNS   = 4;
const PARTICLES_PER_EDGE = 2;
const PARTICLE_RADIUS    = 2;
const PARTICLE_SPEED     = 0.0012;

// PTZ camera FOV sweep
const PTZ_FOV_ANGLE  = 50;   // degrees — width of the field of view cone
const PTZ_FOV_LENGTH = 24;   // pixels from node center to arc tip
const PTZ_RPM        = 3;    // full rotations per minute
const PTZ_ROT_SPEED  = (PTZ_RPM * 2 * Math.PI) / 60; // derived: radians per second

// Camera lens rings (concentric circles suggesting optics, static)
const LENS_RING_1 = NODE_RADIUS * 2.0;  // inner ring radius
const LENS_RING_2 = NODE_RADIUS * 3.2;  // outer ring radius

// AI face-tracking bounding box (corner brackets that drift slightly)
const FACE_BOX_W    = 16;   // detection box width in pixels
const FACE_BOX_H    = 20;   // detection box height in pixels
const FACE_DRIFT_PX = 2;    // max position drift ± pixels
const FACE_DRIFT_SPD = 0.35; // oscillation speed in radians per second
const FACE_CORNER   = 5;    // corner bracket arm length in pixels

// Mirror / screen node (rectangle instead of circle)
const MIRROR_W = 16;  // half-width of the mirror rectangle
const MIRROR_H = 10;  // half-height

// Intercom cluster — 8 intercoms plotted at their real physical positions
// Coordinates sourced from node_table.csv (type === 'Intercom')
const IC_POSITIONS = [
  [1.75,   25.91],  // #1
  [1.89,   54.25],  // #3
  [32.00,   1.75],  // #43
  [32.00,  78.42],  // #44
  [72.54,   1.75],  // #92
  [72.54,  78.42],  // #98
  [102.80, 54.25],  // #124
  [102.80, 25.91],  // #126
];
const IC_CENTROID_X = 52.42;  // mean x of the 8 positions
const IC_CENTROID_Y = 40.08;  // mean y
const IC_SCALE      = 0.30;   // pixels per physical unit
const IC_OFFSET_Y   = -6;     // shift cluster upward to clear the node label

// Network switch — row of port squares above the node
const SW_PORT_COUNT = 8;
const SW_PORT_SIZE  = 3;   // width and height of each port square
const SW_PORT_GAP   = 2;   // gap between squares

// Archive — stacked horizontal lines suggesting stored recordings
const ARCH_LINES = [22, 18, 26, 20];  // widths of each line (top to bottom)
const ARCH_LINE_GAP = 3.5;            // vertical gap between lines

// ─── Math ─────────────────────────────────────────────────────────────────────

function bezierPoint(p0, p1, p2, t) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function bezierTangent(p0, p1, p2, t) {
  return {
    x: 2 * (1 - t) * (p1.x - p0.x) + 2 * t * (p2.x - p1.x),
    y: 2 * (1 - t) * (p1.y - p0.y) + 2 * t * (p2.y - p1.y),
  };
}

function buildEdgePoints(nodes, edges, w, h) {
  const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));
  return edges.map(edge => {
    const from = nodeMap[edge.from];
    const to   = nodeMap[edge.to];
    const p0 = { x: from.nx * w, y: from.ny * h };
    const p2 = { x: to.nx * w,   y: to.ny * h };
    const p1 = {
      x: (p0.x + p2.x) / 2 + (edge.bendX || 0) * w,
      y: (p0.y + p2.y) / 2 + (edge.bendY || 0) * h,
    };
    return { p0, p1, p2, dashed: !!edge.dashed, label: edge.label, toSpecial: !!to.special };
  });
}

// ─── Spiral path ─────────────────────────────────────────────────────────────

// Path sampling resolution
const BEZIER_SAMPLES = 60;   // segments along the entry bezier
const SPIRAL_SAMPLES = 280;  // segments along the Archimedean coil

// Wave animation — all tuneable knobs in one place
const WAVE_PERIOD   = 10;    // wavelength in pixels (smaller = tighter waves)
const WAVE_SPEED_PX = 10;   // travel speed in pixels per second
const WAVE_DARK     = 0;     // darkest colour (0 = black)
const WAVE_BRIGHT   = 255;   // brightest colour (255 = invisible on #fafafa)

const WAVE_FREQ  = (2 * Math.PI) / WAVE_PERIOD;
const WAVE_SPEED = WAVE_FREQ * WAVE_SPEED_PX;

function buildSpiralPath(p0, center) {
  const dx = center.x - p0.x;
  const dy = center.y - p0.y;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;

  const thetaA = Math.atan2(-ux,  uy);
  const thetaB = Math.atan2( ux, -uy);
  const pA = { x: center.x + SPIRAL_RADIUS * Math.cos(thetaA), y: center.y + SPIRAL_RADIUS * Math.sin(thetaA) };
  const pB = { x: center.x + SPIRAL_RADIUS * Math.cos(thetaB), y: center.y + SPIRAL_RADIUS * Math.sin(thetaB) };
  const thetaStart = Math.hypot(pA.x - p0.x, pA.y - p0.y) < Math.hypot(pB.x - p0.x, pB.y - p0.y) ? thetaA : thetaB;
  const pStart = { x: center.x + SPIRAL_RADIUS * Math.cos(thetaStart), y: center.y + SPIRAL_RADIUS * Math.sin(thetaStart) };

  const k  = Math.hypot(pStart.x - p0.x, pStart.y - p0.y) / 2.5;
  const cp = { x: pStart.x - k * ux, y: pStart.y - k * uy };

  const pts = [];
  for (let i = 0; i <= BEZIER_SAMPLES; i++) {
    const t = i / BEZIER_SAMPLES;
    const mt = 1 - t;
    pts.push({
      x: mt * mt * p0.x + 2 * mt * t * cp.x + t * t * pStart.x,
      y: mt * mt * p0.y + 2 * mt * t * cp.y + t * t * pStart.y,
    });
  }

  const totalAngle = SPIRAL_TURNS * 2 * Math.PI;
  for (let i = 1; i <= SPIRAL_SAMPLES; i++) {
    const t  = i / SPIRAL_SAMPLES;
    const th = thetaStart + t * totalAngle;
    const r  = SPIRAL_RADIUS * (1 - t);
    pts.push({ x: center.x + r * Math.cos(th), y: center.y + r * Math.sin(th) });
  }

  const arc = [0];
  for (let i = 1; i < pts.length; i++) {
    const ddx = pts[i].x - pts[i - 1].x;
    const ddy = pts[i].y - pts[i - 1].y;
    arc.push(arc[i - 1] + Math.hypot(ddx, ddy));
  }

  return { pts, arc };
}

function drawSpiralEdge(ctx, p0, center, time) {
  const { pts, arc } = buildSpiralPath(p0, center);

  ctx.save();
  ctx.lineWidth = 1;
  ctx.setLineDash([]);

  // Entry bezier: solid black, drawn as one path
  ctx.beginPath();
  ctx.strokeStyle = '#111';
  ctx.moveTo(pts[0].x, pts[0].y);
  for (let i = 1; i <= BEZIER_SAMPLES; i++) ctx.lineTo(pts[i].x, pts[i].y);
  ctx.stroke();

  // Coil: sine wave colour travels along the arc from the coil entry onward
  for (let i = BEZIER_SAMPLES + 1; i < pts.length; i++) {
    const wave = 0.5 + 0.5 * Math.sin(arc[i] * WAVE_FREQ - time * WAVE_SPEED);
    const b    = Math.round(WAVE_DARK + wave * (WAVE_BRIGHT - WAVE_DARK));
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${b},${b},${b})`;
    ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
    ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }

  ctx.restore();
}

// ─── Main draw ────────────────────────────────────────────────────────────────

function drawDiagram(ctx, w, h, nodes, edgePoints, particles, time) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, w, h);

  // Regular edges
  edgePoints.filter(e => !e.toSpecial).forEach(({ p0, p1, p2, dashed }) => {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.setLineDash(dashed ? [4, 5] : []);
    ctx.moveTo(p0.x, p0.y);
    ctx.quadraticCurveTo(p1.x, p1.y, p2.x, p2.y);
    ctx.stroke();
    ctx.restore();

    const tan = bezierTangent(p0, p1, p2, 1);
    const len = Math.hypot(tan.x, tan.y);
    const ux = tan.x / len;
    const uy = tan.y / len;
    const tipX = p2.x - (NODE_RADIUS + 2) * ux;
    const tipY = p2.y - (NODE_RADIUS + 2) * uy;
    const angle = Math.atan2(uy, ux);
    const hl = 7;
    const sp = Math.PI / 6;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.moveTo(tipX - hl * Math.cos(angle - sp), tipY - hl * Math.sin(angle - sp));
    ctx.lineTo(tipX, tipY);
    ctx.lineTo(tipX - hl * Math.cos(angle + sp), tipY - hl * Math.sin(angle + sp));
    ctx.stroke();
    ctx.restore();
  });

  // Spiral edge: drawn as one continuous path (no arrowhead)
  const spiralNode = nodes.find(n => n.special === 'spiral');
  const spiralEp   = edgePoints.find(e => e.toSpecial);
  if (spiralNode && spiralEp) {
    drawSpiralEdge(ctx, spiralEp.p0, { x: spiralNode.nx * w, y: spiralNode.ny * h }, time);
  }

  // Particles (regular edges only)
  ctx.fillStyle = '#111';
  particles.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, PARTICLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  });

  // — Decorations drawn under all node shapes ——————————————————————————————

  // Intercom cluster — 8 dots at physical cistern positions + faint floor-plan rect
  nodes.filter(n => n.intercomCluster).forEach(({ nx, ny }) => {
    const cx = nx * w, cy = ny * h;
    ctx.save();
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.6;
    ctx.setLineDash([3, 3]);
    ctx.strokeRect(cx - 17, cy + IC_OFFSET_Y - 19, 34, 26);
    ctx.setLineDash([]);
    ctx.fillStyle = '#bbb';
    IC_POSITIONS.forEach(([ix, iy]) => {
      const px = cx + (ix - IC_CENTROID_X) * IC_SCALE;
      const py = cy + IC_OFFSET_Y + (iy - IC_CENTROID_Y) * IC_SCALE;
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  });

  // Network switch — port squares drawn above the node circle
  nodes.filter(n => n.networkSwitch).forEach(({ nx, ny }) => {
    const x = nx * w, y = ny * h;
    const totalW = SW_PORT_COUNT * (SW_PORT_SIZE + SW_PORT_GAP) - SW_PORT_GAP;
    const rowY   = y - NODE_RADIUS - SW_PORT_SIZE - 4;
    ctx.save();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.6;
    ctx.setLineDash([]);
    for (let i = 0; i < SW_PORT_COUNT; i++) {
      ctx.strokeRect(x - totalW / 2 + i * (SW_PORT_SIZE + SW_PORT_GAP), rowY, SW_PORT_SIZE, SW_PORT_SIZE);
    }
    ctx.restore();
  });

  // Archive — stacked lines of varying width suggesting stored recordings
  nodes.filter(n => n.archive).forEach(({ nx, ny }) => {
    const x = nx * w, y = ny * h;
    const totalH = (ARCH_LINES.length - 1) * ARCH_LINE_GAP;
    const startY = y - NODE_RADIUS - 4 - totalH;
    ctx.save();
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([]);
    ARCH_LINES.forEach((lw, i) => {
      const ly = startY + i * ARCH_LINE_GAP;
      ctx.beginPath();
      ctx.moveTo(x - lw / 2, ly);
      ctx.lineTo(x + lw / 2, ly);
      ctx.stroke();
    });
    ctx.restore();
  });

  // PTZ camera FOV sweep
  const fovRad  = (PTZ_FOV_ANGLE * Math.PI) / 180;
  const halfFov = fovRad / 2;
  nodes.filter(n => n.camera).forEach(({ nx, ny }) => {
    const x   = nx * w;
    const y   = ny * h;
    const rot = (time * PTZ_ROT_SPEED) % (2 * Math.PI);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(PTZ_FOV_LENGTH * Math.cos(-halfFov), PTZ_FOV_LENGTH * Math.sin(-halfFov));
    ctx.arc(0, 0, PTZ_FOV_LENGTH, -halfFov, halfFov);
    ctx.lineTo(0, 0);
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([]);
    ctx.stroke();
    ctx.restore();
  });

  // Camera lens: two concentric rings suggesting optics
  nodes.filter(n => n.lens).forEach(({ nx, ny }) => {
    const x = nx * w, y = ny * h;
    ctx.save();
    ctx.setLineDash([]);
    [[LENS_RING_1, '#ccc', 0.8], [LENS_RING_2, '#ddd', 0.6]].forEach(([r, color, lw]) => {
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
    });
    ctx.restore();
  });

  // AI face-tracking box: drifting corner brackets
  nodes.filter(n => n.aiNode).forEach(({ nx, ny }) => {
    const x  = nx * w, y = ny * h;
    const dx = Math.sin(time * FACE_DRIFT_SPD) * FACE_DRIFT_PX;
    const dy = Math.sin(time * FACE_DRIFT_SPD * 0.67 + 1.0) * FACE_DRIFT_PX;
    const bx = x + dx - FACE_BOX_W / 2;
    const by = y + dy - FACE_BOX_H / 2;
    const bw = FACE_BOX_W, bh = FACE_BOX_H, cl = FACE_CORNER;
    ctx.save();
    ctx.strokeStyle = '#bbb';
    ctx.lineWidth = 0.8;
    ctx.setLineDash([]);
    [
      [bx,      by,      1,  1],
      [bx + bw, by,     -1,  1],
      [bx,      by + bh, 1, -1],
      [bx + bw, by + bh,-1, -1],
    ].forEach(([cx, cy, sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(cx + sx * cl, cy);
      ctx.lineTo(cx, cy);
      ctx.lineTo(cx, cy + sy * cl);
      ctx.stroke();
    });
    ctx.restore();
  });

  // — Node shapes ———————————————————————————————————————————————————————————

  // Regular nodes (circles) — excludes spiral and mirror nodes
  nodes.filter(n => !n.special && !n.mirror).forEach(({ nx, ny }) => {
    const x = nx * w;
    const y = ny * h;
    ctx.beginPath();
    ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#fafafa';
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.stroke();
  });

  // Mirror / screen nodes — drawn as rectangles
  nodes.filter(n => n.mirror).forEach(({ nx, ny }) => {
    const x = nx * w, y = ny * h;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x - MIRROR_W, y - MIRROR_H, MIRROR_W * 2, MIRROR_H * 2);
    ctx.fillStyle = '#fafafa';
    ctx.fill();
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    ctx.stroke();
    ctx.restore();
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

const SystemDiagram = ({ nodes, edges, title = 'System Architecture' }) => {
  const canvasRef = useRef(null);
  const [labels, setLabels] = useState({ nodes: [], edges: [], spiral: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio, 2);
    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

    // No particles on the spiral edge
    const particleTs = edges.map((edge, ei) => {
      if (nodeMap[edge.to]?.special === 'spiral') return [];
      return Array.from({ length: PARTICLES_PER_EDGE }, (_, i) => ({
        t: i / PARTICLES_PER_EDGE,
        speed: PARTICLE_SPEED + ei * 0.00008 + Math.random() * 0.0004,
      }));
    });

    let w = 0, h = 0, edgePoints = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.scale(dpr, dpr);
      edgePoints = buildEdgePoints(nodes, edges, w, h);

      const spiralNode = nodes.find(n => n.special === 'spiral');
      setLabels({
        nodes: nodes.filter(n => !n.special).map(n => ({
          id: n.id, name: n.label, sub: n.sublabel,
          x: n.nx * w, y: n.ny * h, above: !!n.labelAbove,
        })),
        edges: edgePoints.filter(e => e.label && !e.toSpecial).map(e => {
          const mid = bezierPoint(e.p0, e.p1, e.p2, 0.5);
          const tan = bezierTangent(e.p0, e.p1, e.p2, 0.5);
          // Angle the label so it runs along the line, kept upright (never upside-down)
          let ang = Math.atan2(tan.y, tan.x);
          if (ang >  Math.PI / 2) ang -= Math.PI;
          if (ang < -Math.PI / 2) ang += Math.PI;
          return { label: e.label, x: mid.x, y: mid.y, angle: (ang * 180) / Math.PI };
        }),
        spiral: spiralNode
          ? { name: spiralNode.label, sub: spiralNode.sublabel,
              x: spiralNode.nx * w, y: spiralNode.ny * h }
          : null,
      });
    };

    let rafId;
    const animate = (time) => {
      rafId = requestAnimationFrame(animate);
      if (!w || !h || !edgePoints.length) return;

      const positions = edgePoints.flatMap((ep, ei) =>
        particleTs[ei].map(p => {
          p.t = (p.t + p.speed) % 1;
          return bezierPoint(ep.p0, ep.p1, ep.p2, p.t);
        })
      );

      drawDiagram(ctx, w, h, nodes, edgePoints, positions, time * 0.001);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    requestAnimationFrame(() => { resize(); rafId = requestAnimationFrame(animate); });

    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, [nodes, edges]);

  const { nodes: nodeLabels, edges: edgeLabels, spiral } = labels;

  return (
    <Wrapper>
      <DiagramTitle>{title}</DiagramTitle>
      <CanvasWrapper>
        <CanvasEl ref={canvasRef} />
        <LabelLayer>
          {nodeLabels.map(n => (
            <NodeLabel key={n.id} $above={n.above} style={{ left: n.x, top: n.y }}>
              <NodeName>{n.name}</NodeName>
              {n.sub && <NodeSub>{n.sub}</NodeSub>}
            </NodeLabel>
          ))}
          {edgeLabels.map((e, i) => (
            <EdgeLabelEl
              key={i}
              style={{
                left: e.x,
                top: e.y,
                transform: `translate(-50%, -50%) rotate(${e.angle}deg) translate(0, -10px)`,
              }}
            >
              {e.label}
            </EdgeLabelEl>
          ))}
          {spiral && (
            <NodeLabel style={{ left: spiral.x, top: spiral.y + SPIRAL_RADIUS }}>
              <NodeName>{spiral.name}</NodeName>
              {spiral.sub && <NodeSub>{spiral.sub}</NodeSub>}
            </NodeLabel>
          )}
        </LabelLayer>
      </CanvasWrapper>
    </Wrapper>
  );
};

export default SystemDiagram;
