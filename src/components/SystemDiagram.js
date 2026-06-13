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
  transform: translate(-50%, 11px);
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
  transform: translate(-50%, calc(-50% + 14px));
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
const PARTICLES_PER_EDGE = 4;
const PARTICLE_RADIUS    = 2;
const PARTICLE_SPEED     = 0.0018;

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
//
// Draws the incoming edge bezier and transitions it tangentially into an
// Archimedean spiral. The spiral's outer coil begins at the angle where the
// arriving tangent is perpendicular to the radius — giving a smooth join.

function drawSpiralEdge(ctx, p0, center) {
  // Direction the line arrives in (from source toward center)
  const dx = center.x - p0.x;
  const dy = center.y - p0.y;
  const dist = Math.hypot(dx, dy);
  const ux = dx / dist;
  const uy = dy / dist;

  // For an Archimedean spiral the tangent at radius r is ~perpendicular to the
  // radius. We want the tangent at the outer coil to equal (ux, uy), so the
  // radius at that point must be perpendicular: rotated 90° from (ux, uy).
  // Two choices — pick the one that puts pStart on the incoming-side of center.
  const thetaA = Math.atan2(-ux,  uy); // candidate A
  const thetaB = Math.atan2( ux, -uy); // candidate B (opposite)

  // Pick whichever candidate places pStart closer to p0 (the "arriving" side)
  const pA = { x: center.x + SPIRAL_RADIUS * Math.cos(thetaA), y: center.y + SPIRAL_RADIUS * Math.sin(thetaA) };
  const pB = { x: center.x + SPIRAL_RADIUS * Math.cos(thetaB), y: center.y + SPIRAL_RADIUS * Math.sin(thetaB) };
  const distA = Math.hypot(pA.x - p0.x, pA.y - p0.y);
  const distB = Math.hypot(pB.x - p0.x, pB.y - p0.y);
  const thetaStart = distA < distB ? thetaA : thetaB;
  const pStart = distA < distB ? pA : pB;

  // Control point: pull back from pStart in the incoming direction so the
  // bezier exits p0 aiming at center and arrives at pStart tangent-matched.
  const k  = Math.hypot(pStart.x - p0.x, pStart.y - p0.y) / 2.5;
  const cp = { x: pStart.x - k * ux, y: pStart.y - k * uy };

  // Build the full path in one stroke call
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 1;
  ctx.setLineDash([]);

  ctx.moveTo(p0.x, p0.y);
  ctx.quadraticCurveTo(cp.x, cp.y, pStart.x, pStart.y);

  // Archimedean spiral: r decreases from SPIRAL_RADIUS to 0 over SPIRAL_TURNS turns
  const totalAngle = SPIRAL_TURNS * 2 * Math.PI;
  const N = 300;
  for (let i = 1; i <= N; i++) {
    const t = i / N;
    const theta = thetaStart + t * totalAngle;
    const r = SPIRAL_RADIUS * (1 - t);
    ctx.lineTo(center.x + r * Math.cos(theta), center.y + r * Math.sin(theta));
  }

  ctx.stroke();
  ctx.restore();
}

// ─── Main draw ────────────────────────────────────────────────────────────────

function drawDiagram(ctx, w, h, nodes, edgePoints, particles) {
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
    drawSpiralEdge(ctx, spiralEp.p0, { x: spiralNode.nx * w, y: spiralNode.ny * h });
  }

  // Particles (regular edges only)
  ctx.fillStyle = '#111';
  particles.forEach(({ x, y }) => {
    ctx.beginPath();
    ctx.arc(x, y, PARTICLE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  });

  // Regular nodes
  nodes.filter(n => !n.special).forEach(({ nx, ny }) => {
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
          x: n.nx * w, y: n.ny * h,
        })),
        edges: edgePoints.filter(e => e.label && !e.toSpecial).map(e => {
          const mid = bezierPoint(e.p0, e.p1, e.p2, 0.5);
          return { label: e.label, x: mid.x, y: mid.y };
        }),
        spiral: spiralNode
          ? { name: spiralNode.label, sub: spiralNode.sublabel,
              x: spiralNode.nx * w, y: spiralNode.ny * h }
          : null,
      });
    };

    let rafId;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!w || !h || !edgePoints.length) return;

      const positions = edgePoints.flatMap((ep, ei) =>
        particleTs[ei].map(p => {
          p.t = (p.t + p.speed) % 1;
          return bezierPoint(ep.p0, ep.p1, ep.p2, p.t);
        })
      );

      drawDiagram(ctx, w, h, nodes, edgePoints, positions);
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
            <NodeLabel key={n.id} style={{ left: n.x, top: n.y }}>
              <NodeName>{n.name}</NodeName>
              {n.sub && <NodeSub>{n.sub}</NodeSub>}
            </NodeLabel>
          ))}
          {edgeLabels.map((e, i) => (
            <EdgeLabelEl key={i} style={{ left: e.x, top: e.y }}>
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
