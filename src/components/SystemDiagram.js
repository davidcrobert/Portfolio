import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// ─── Styled ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 16px auto 40px;
  background: #fafafa;
  border: 1px solid black;
  overflow: hidden;

  @media (max-width: 600px) {
    padding-bottom: 24px;
  }
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

  @media (max-width: 600px) {
    aspect-ratio: 4 / 3;
  }
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

// Camera lens — rings slowly pulse outward from the node, fading as they expand
const LENS_RINGS  = 3;   // concurrent rings in flight
const LENS_MAX_R  = 26;  // radius at which a ring has fully faded out
const LENS_PERIOD = 12;   // seconds for one ring to travel from node to max (slow)

// AI face landmark mesh — the canonical 68-point iBUG/dlib layout, floated above the
// node like a live face-detection readout. Coordinates are normalised (x 0–1, y ~0.24–1).
const FACE_MESH_W   = 56;   // rendered face width in pixels
const FACE_MESH_H   = 70;   // rendered face height in pixels
const FACE_MESH_DY  = 54;   // distance the mesh floats above the node centre
const FACE_JITTER   = 0.4;  // per-point detection jitter in pixels
const FACE_JIT_SPD  = 2.2;  // jitter oscillation speed (radians per second)

// 68 facial landmarks (x right, y down) in a front-facing canonical face.
const FACE_68 = [
  // jaw line (0–16)
  [0.00, 0.40], [0.02, 0.52], [0.05, 0.64], [0.09, 0.75], [0.15, 0.85],
  [0.23, 0.93], [0.33, 0.98], [0.43, 1.00], [0.50, 1.01], [0.57, 1.00],
  [0.67, 0.98], [0.77, 0.93], [0.85, 0.85], [0.91, 0.75], [0.95, 0.64],
  [0.98, 0.52], [1.00, 0.40],
  // right eyebrow (17–21)
  [0.12, 0.30], [0.19, 0.25], [0.27, 0.24], [0.35, 0.26], [0.43, 0.29],
  // left eyebrow (22–26)
  [0.57, 0.29], [0.65, 0.26], [0.73, 0.24], [0.81, 0.25], [0.88, 0.30],
  // nose bridge (27–30)
  [0.50, 0.36], [0.50, 0.44], [0.50, 0.52], [0.50, 0.60],
  // lower nose (31–35)
  [0.42, 0.64], [0.46, 0.66], [0.50, 0.67], [0.54, 0.66], [0.58, 0.64],
  // right eye (36–41)
  [0.18, 0.40], [0.23, 0.37], [0.29, 0.37], [0.34, 0.40], [0.29, 0.43], [0.23, 0.43],
  // left eye (42–47)
  [0.66, 0.40], [0.71, 0.37], [0.77, 0.37], [0.82, 0.40], [0.77, 0.43], [0.71, 0.43],
  // outer lip (48–59)
  [0.36, 0.78], [0.41, 0.75], [0.46, 0.74], [0.50, 0.75], [0.54, 0.74], [0.59, 0.75],
  [0.64, 0.78], [0.59, 0.82], [0.54, 0.84], [0.50, 0.85], [0.46, 0.84], [0.41, 0.82],
  // inner lip (60–67)
  [0.39, 0.78], [0.46, 0.77], [0.50, 0.78], [0.54, 0.77], [0.61, 0.78],
  [0.54, 0.80], [0.50, 0.81], [0.46, 0.80],
];

// Upper/lower eyelid landmark indices for blink animation
const BLINK_UPPER = new Set([37, 38, 43, 44]); // upper lid points (right and left eye)
const BLINK_LOWER = new Set([40, 41, 46, 47]); // lower lid points

// Feature groups as [startIndex, endIndex, closed?] for the faint connecting strokes.
const FACE_GROUPS = [
  [0, 16, false],  // jaw
  [17, 21, false], // right brow
  [22, 26, false], // left brow
  [27, 30, false], // nose bridge
  [31, 35, false], // lower nose
  [36, 41, true],  // right eye
  [42, 47, true],  // left eye
  [48, 59, true],  // outer lip
  [60, 67, true],  // inner lip
];

// Mirror / screen node (rectangle instead of circle). When it carries a face it is
// drawn larger, as a portrait "display" with the 68-point face turning its head inside.
const MIRROR_W = 36;  // half-width of the mirror screen (portrait 9:16)
const MIRROR_H = 64;  // half-height (MIRROR_W * 16/9)
const MIRROR_FACE_W = 44.8;  // face width  (80% of the Python face's 56)
const MIRROR_FACE_H = 56;    // face height (80% of the Python face's 70)
const MIRROR_YAW    = 0.7;  // peak head-turn yaw (left/right) in radians (~40°)
const MIRROR_PITCH  = 0.45; // peak head-tilt pitch (up/down) in radians (~26°)
const MIRROR_LOOK_K = 200;  // px distance to cursor that maps to a near-full turn

// Approximate per-landmark depth (how far each point protrudes) used to fake a 3D
// head-turn: high-depth points (the nose) swing across as the face yaws.
const FACE_DEPTH = [
  // jaw 0–16 (chin protrudes more than the ears)
  0, 0, 0.02, 0.04, 0.06, 0.07, 0.08, 0.09, 0.10, 0.09, 0.08, 0.07, 0.06, 0.04, 0.02, 0, 0,
  // eyebrows 17–26
  0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15,
  // nose bridge 27–30
  0.20, 0.30, 0.42, 0.55,
  // lower nose 31–35
  0.42, 0.50, 0.55, 0.50, 0.42,
  // right eye 36–41
  0.20, 0.20, 0.20, 0.20, 0.20, 0.20,
  // left eye 42–47
  0.20, 0.20, 0.20, 0.20, 0.20, 0.20,
  // outer lip 48–59
  0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30, 0.30,
  // inner lip 60–67
  0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32, 0.32,
];

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

// Archive — a growing stack of recordings: a new line is written in periodically, the
// stack scrolls down, and the oldest recording fades off the bottom.
const ARCH_LINE_COUNT = 7;    // visible recordings in the stack
const ARCH_LINE_GAP   = 4.5;  // vertical spacing between recordings
const ARCH_W_MIN      = 13;   // shortest recording line (px)
const ARCH_W_MAX      = 28;   // longest recording line (px)
const ARCH_INTERVAL   = 1.5;  // seconds between new recordings
const ARCH_SLIDE      = 9;    // px the newest line slides in from the right
const ARCH_TOP_GAP    = 2;    // gap from node centre down to the newest line
const ARCH_OFFSET_X   = 16;   // shift the stack right, clear of the node's edges

// LED strands — a branching system of wave-textured tubes (the same LED tubes as the
// Spiral piece). The brightness wave flows out from the node and forks at each split,
// echoing "voice travels as light along branching paths, forking at the columns".
const LED_TRUNK_LEN   = 20;   // length of the root tube in pixels
const LED_DEPTH       = 3;    // number of times each tube forks
const LED_SPREAD      = 0.5;  // fork half-angle in radians
const LED_DECAY       = 0.74; // length multiplier at each fork
const LED_SEG_SAMPLES = 6;    // points sampled per tube (wave smoothness)
const LED_LABEL_DY    = 46;   // push the node label below the branch system

// Voice packet — particles on audio edges render as a tiny travelling waveform, each
// with its own randomly generated shape (assigned once per particle, so each is unique)
const VOICE_BAR_GAP = 2.2;  // spacing between bars along travel

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
    return {
      p0, p1, p2, dashed: !!edge.dashed, label: edge.label, toSpecial: !!to.special,
      voice: !!edge.voice, toR: NODE_RADIUS, toMirror: !!to.mirror,
    };
  });
}

// Blink curve: fast close (80 ms), brief hold (70 ms), slower open (150 ms)
function computeBlinkT(elapsed) {
  if (elapsed < 0)    return 0;
  if (elapsed < 0.08) return elapsed / 0.08;
  if (elapsed < 0.15) return 1;
  if (elapsed < 0.30) return 1 - (elapsed - 0.15) / 0.15;
  return 0;
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

  // The coil tangent at thetaStart for positive winding is (-sin θ, cos θ).
  // If that opposes the entry direction (ux, uy), flip winding so the join is smooth.
  const windSign = (-Math.sin(thetaStart) * ux + Math.cos(thetaStart) * uy) >= 0 ? 1 : -1;
  const totalAngle = windSign * SPIRAL_TURNS * 2 * Math.PI;
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

// ─── LED strands & voice packets ───────────────────────────────────────────────

// Draws a polyline with the same travelling brightness wave used by the spiral coil.
function drawWavePolyline(ctx, pts, arcStart, time) {
  let arc = arcStart;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.setLineDash([]);
  for (let i = 1; i < pts.length; i++) {
    arc += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
    const wave = 0.5 + 0.5 * Math.sin(arc * WAVE_FREQ - time * WAVE_SPEED);
    const b = Math.round(WAVE_DARK + wave * (WAVE_BRIGHT - WAVE_DARK));
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${b},${b},${b})`;
    ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
    ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();
  }
  ctx.restore();
}

// Builds the LED branch system as a list of { pts, arc0 } tubes rooted at (cx, cy),
// growing downward and forking. arc0 carries the cumulative length up to each tube's
// start so the wave flows continuously through the forks.
function buildLedBranches(cx, cy) {
  const tubes = [];
  const grow = (x, y, ang, len, depth, arc0) => {
    const ex = x + Math.cos(ang) * len;
    const ey = y + Math.sin(ang) * len;
    const pts = [];
    for (let i = 0; i <= LED_SEG_SAMPLES; i++) {
      const t = i / LED_SEG_SAMPLES;
      pts.push({ x: x + (ex - x) * t, y: y + (ey - y) * t });
    }
    tubes.push({ pts, arc0 });
    if (depth > 0) {
      const childArc = arc0 + len;
      grow(ex, ey, ang - LED_SPREAD, len * LED_DECAY, depth - 1, childArc);
      grow(ex, ey, ang + LED_SPREAD, len * LED_DECAY, depth - 1, childArc);
    }
  };
  grow(cx, cy, Math.PI / 2, LED_TRUNK_LEN, LED_DEPTH, 0);
  return tubes;
}

// A unique little waveform shape (array of bar half-heights) for one voice packet.
function makeWaveform() {
  const n = 5 + Math.floor(Math.random() * 3); // 5–7 bars
  return Array.from({ length: n }, (_, i) => {
    const env = Math.sin(((i + 0.5) / n) * Math.PI); // 0→1→0 envelope
    return 1.5 + env * (2 + Math.random() * 5);
  });
}

// Stable pseudo-random width for archive recording #i (so each line keeps its length).
function archWidth(i) {
  const r = Math.abs(Math.sin(i * 12.9898 + 4.1) * 43758.5453) % 1;
  return ARCH_W_MIN + r * (ARCH_W_MAX - ARCH_W_MIN);
}

// Draws the 68-point face landmark mesh centred at (cx, cy), sized fw × fh. `yaw` and
// `pitch` fake a 3D head orientation (per-point depth swings the protruding features
// across/down); `jitter` adds detection noise.
function drawFaceMesh(ctx, cx, cy, fw, fh, time, yaw, pitch, jitter, blinkT = 0) {
  const cosY = Math.cos(yaw), sinY = Math.sin(yaw);
  const cosP = Math.cos(pitch), sinP = Math.sin(pitch);
  const pt = (i) => {
    const [lx, ly] = FACE_68[i];
    const z = FACE_DEPTH[i];
    let lyb = ly;
    if (blinkT > 0) {
      if (BLINK_UPPER.has(i)) lyb += blinkT * 0.03;
      else if (BLINK_LOWER.has(i)) lyb -= blinkT * 0.03;
    }
    const xRot = (lx - 0.5) * cosY + z * sinY;
    const yRot = (lyb - 0.625) * cosP + z * sinP;
    const jx = jitter ? Math.sin(time * FACE_JIT_SPD + i * 1.7) * jitter : 0;
    const jy = jitter ? Math.cos(time * FACE_JIT_SPD + i * 2.3) * jitter : 0;
    return { x: cx + xRot * fw + jx, y: cy + yRot * fh + jy };
  };
  ctx.save();
  ctx.setLineDash([]);
  ctx.strokeStyle = '#dcdcdc';
  ctx.lineWidth = 0.6;
  FACE_GROUPS.forEach(([a, b, closed]) => {
    ctx.beginPath();
    for (let i = a; i <= b; i++) {
      const p = pt(i);
      if (i === a) ctx.moveTo(p.x, p.y); else ctx.lineTo(p.x, p.y);
    }
    if (closed) ctx.closePath();
    ctx.stroke();
  });
  ctx.fillStyle = '#9a9a9a';
  for (let i = 0; i < FACE_68.length; i++) {
    const p = pt(i);
    ctx.beginPath();
    ctx.arc(p.x, p.y, 0.9, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

// ─── Main draw ────────────────────────────────────────────────────────────────

function drawDiagram(ctx, w, h, nodes, edgePoints, particles, time, pointer, blinkT = 0) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#fafafa';
  ctx.fillRect(0, 0, w, h);

  // Regular edges
  edgePoints.filter(e => !e.toSpecial).forEach(({ p0, p1, p2, dashed, toR, toMirror }) => {
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
    // distance to back off p2 so the arrowhead sits at the node's edge — for the mirror
    // that means the rectangle boundary, otherwise the circular node radius
    const back = toMirror
      ? Math.min(MIRROR_W / Math.max(Math.abs(ux), 1e-4), MIRROR_H / Math.max(Math.abs(uy), 1e-4)) + 2
      : toR + 2;
    const tipX = p2.x - back * ux;
    const tipY = p2.y - back * uy;
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

  // Particles — plain dots, or a unique little travelling waveform on "voice" edges
  particles.forEach(({ x, y, voice, angle, bars }) => {
    if (!voice) {
      ctx.fillStyle = '#111';
      ctx.beginPath();
      ctx.arc(x, y, PARTICLE_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    const span = (bars.length - 1) * VOICE_BAR_GAP;
    bars.forEach((hh, i) => {
      const bx = -span / 2 + i * VOICE_BAR_GAP;
      ctx.beginPath();
      ctx.moveTo(bx, -hh);
      ctx.lineTo(bx, hh);
      ctx.stroke();
    });
    ctx.restore();
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

  // Archive — a growing stack of recordings written in below the node
  nodes.filter(n => n.archive).forEach(({ nx, ny }) => {
    const cx = nx * w, cy = ny * h;
    const progress = time / ARCH_INTERVAL;
    const k    = Math.floor(progress); // index of the newest recording
    const frac = progress - k;         // 0→1 progress of the current write
    const startY = cy + NODE_RADIUS + ARCH_TOP_GAP;
    ctx.save();
    ctx.setLineDash([]);
    ctx.lineWidth = 0.8;
    for (let j = 0; j < ARCH_LINE_COUNT; j++) {
      const gi = k - j; // global recording index (stable identity)
      if (gi < 0) continue;
      const y = startY + (j + frac) * ARCH_LINE_GAP; // smooth downward scroll
      let alpha = 1, slide = 0, shade = 200;
      if (j === 0) {                       // newest: slides in from the right, fades up, darker
        alpha = frac;
        slide = (1 - frac) * ARCH_SLIDE;
        shade = 130 + frac * 70;
      } else if (j === ARCH_LINE_COUNT - 1) { // oldest: fades off the bottom
        alpha = 1 - frac;
      }
      const lw = archWidth(gi);
      const c = Math.round(shade);
      const lx = cx + ARCH_OFFSET_X + slide;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = `rgb(${c},${c},${c})`;
      ctx.beginPath();
      ctx.moveTo(lx - lw / 2, y);
      ctx.lineTo(lx + lw / 2, y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  });

  // LED strands — branching wave-textured tubes flowing out from the node
  nodes.filter(n => n.ledStrand).forEach(({ nx, ny }) => {
    const cx = nx * w, cy = ny * h;
    buildLedBranches(cx, cy).forEach(({ pts, arc0 }) => drawWavePolyline(ctx, pts, arc0, time));
    // small solid root so the incoming arrow has a clear target
    ctx.beginPath();
    ctx.arc(cx, cy, 2, 0, Math.PI * 2);
    ctx.fillStyle = '#111';
    ctx.fill();
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

  // Camera lens: rings slowly pulse outward and fade, like a sonar ping
  nodes.filter(n => n.lens).forEach(({ nx, ny }) => {
    const x = nx * w, y = ny * h;
    ctx.save();
    ctx.setLineDash([]);
    ctx.lineWidth = 0.8;
    for (let i = 0; i < LENS_RINGS; i++) {
      const p = ((time / LENS_PERIOD) + i / LENS_RINGS) % 1; // 0 at node → 1 at max radius
      const r = NODE_RADIUS + p * (LENS_MAX_R - NODE_RADIUS);
      ctx.globalAlpha = Math.sin(p * Math.PI) * 0.6; // fade in from node, fade out at edge
      ctx.strokeStyle = '#aaa';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  });

  // AI face landmark mesh (Python) — 68 points floated above the node, facing forward
  // with a subtle per-point detection jitter
  nodes.filter(n => n.aiNode).forEach(({ nx, ny }) => {
    drawFaceMesh(ctx, nx * w, ny * h - FACE_MESH_DY, FACE_MESH_W, FACE_MESH_H, time, 0, 0, FACE_JITTER);
  });

  // — Node shapes ———————————————————————————————————————————————————————————

  // Regular nodes (circles) — excludes spiral, mirror and LED-strand nodes
  nodes.filter(n => !n.special && !n.mirror && !n.ledStrand).forEach(({ nx, ny }) => {
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

  // Mirror / screen nodes — a portrait screen, with the reflected face turning its head
  nodes.filter(n => n.mirror).forEach((n) => {
    const { nx, ny } = n;
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
    if (n.mirrorFace) {
      // the reflected face turns to look at the cursor anywhere on the page
      let yaw = 0, pitch = 0;
      if (pointer) {
        yaw   =  MIRROR_YAW   * Math.tanh((pointer.x - x) / MIRROR_LOOK_K);
        pitch =  MIRROR_PITCH * Math.tanh((pointer.y - y) / MIRROR_LOOK_K);
      }
      drawFaceMesh(ctx, x, y, MIRROR_FACE_W, MIRROR_FACE_H, time, yaw, pitch, 0, blinkT);
    }
  });
}

// ─── Component ────────────────────────────────────────────────────────────────

const SystemDiagram = ({ nodes, edges, title = 'System Architecture' }) => {
  const canvasRef = useRef(null);
  const blinkRef  = useRef({ startTime: null });
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
        bars: makeWaveform(),
      }));
    });

    let w = 0, h = 0, edgePoints = [];

    // Track mouse and touch points anywhere on the page, then smooth toward them
    // in canvas space so the mirror face follows without snapping.
    let pointerTargetClient = null;
    let pointerCurrent = null;
    let lastFrameTime = null;
    const onPointerMove = (e) => {
      pointerTargetClient = { x: e.clientX, y: e.clientY };
    };
    const onTouchPoint = (e) => {
      const touches = e.touches && e.touches.length ? e.touches : e.changedTouches;
      if (!touches || !touches.length) return;
      let x = 0;
      let y = 0;
      for (let i = 0; i < touches.length; i++) {
        x += touches[i].clientX;
        y += touches[i].clientY;
      }
      pointerTargetClient = { x: x / touches.length, y: y / touches.length };
    };
    const onBlink = () => { blinkRef.current.startTime = lastFrameTime; };
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('click', onBlink);
    window.addEventListener('touchstart', onTouchPoint, { passive: true });
    window.addEventListener('touchstart', onBlink,     { passive: true });
    window.addEventListener('touchmove', onTouchPoint, { passive: true });

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
          x: n.nx * w + (n.labelDx || 0),
          y: n.ny * h + (n.ledStrand ? LED_LABEL_DY : 0) - (n.mirrorFace ? MIRROR_H : 0),
          above: !!n.labelAbove,
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
      const timeSeconds = time * 0.001;
      const dt = lastFrameTime === null ? 0 : Math.min(timeSeconds - lastFrameTime, 0.05);
      lastFrameTime = timeSeconds;

      const positions = edgePoints.flatMap((ep, ei) =>
        particleTs[ei].map(p => {
          p.t = (p.t + p.speed) % 1;
          const pt = bezierPoint(ep.p0, ep.p1, ep.p2, p.t);
          if (!ep.voice) return { x: pt.x, y: pt.y, voice: false };
          const tan = bezierTangent(ep.p0, ep.p1, ep.p2, p.t);
          return { x: pt.x, y: pt.y, voice: true, angle: Math.atan2(tan.y, tan.x), bars: p.bars };
        })
      );

      let pointer = null;
      if (pointerTargetClient) {
        const rect = canvas.getBoundingClientRect();
        const pointerTarget = {
          x: pointerTargetClient.x - rect.left,
          y: pointerTargetClient.y - rect.top,
        };
        if (!pointerCurrent) {
          pointerCurrent = { x: w / 2, y: h / 2 };
        }
        const ease = 1 - Math.exp(-dt * 10);
        pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * ease;
        pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * ease;
        pointer = pointerCurrent;
      }

      const blinkElapsed = blinkRef.current.startTime !== null
        ? timeSeconds - blinkRef.current.startTime
        : Infinity;
      const blinkT = computeBlinkT(blinkElapsed);
      drawDiagram(ctx, w, h, nodes, edgePoints, positions, timeSeconds, pointer, blinkT);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    requestAnimationFrame(() => { resize(); rafId = requestAnimationFrame(animate); });

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('click', onBlink);
      window.removeEventListener('touchstart', onTouchPoint);
      window.removeEventListener('touchstart', onBlink);
      window.removeEventListener('touchmove', onTouchPoint);
    };
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
