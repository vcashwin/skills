// The video: a list of scenes (see timeline.mjs for the fields). This sample explains a job queue in ~45 s and shows the
// moves: a title card, a chapter card, pieces entering on the caption that names them, connectors drawing on, packets for
// what flows, a failure in red, a dashed path for the retry, the focus dimming what is not being talked about, an end card.
// Replace it with your own; keep the shape.
import {
  P, k, vis, clamp, G, In, Pop, text, caption2, chip, glow, row, cross, tick,
  iso, laptop, server, curve, arrow, packets, dot,
} from "./iso.mjs";
import { timeline } from "./timeline.mjs";

// ── shared pieces: one drawing per thing, reused in every scene it appears in ──
const APP = [380, 540], Q = [960, 520], WK = [[1480, 360], [1480, 560], [1480, 760]];
const label = (x, y, a, b, o = 1) => caption2(x, y, a, b, o, { size: 26 });
const app = (t, at) => In(t, at, laptop(iso(APP[0], APP[1], 1.1)) + label(APP[0], APP[1] + 130, "App", "answers right away"));
const worker = (t, at, i, { light = P.green, o = 1 } = {}) =>
  In(t, at, G(server(iso(WK[i][0], WK[i][1] + 20, 0.95), { units: 2, h: 18, gap: 5, lights: [light, light] }) +
    text(WK[i][0] + 90, WK[i][1] - 4, `worker ${i + 1}`, { size: 22, weight: 560, anchor: "start" }), { o }), [18, 0]);
const queueRows = (t, jobs, o = 1) => G(text(Q[0], Q[1] - 130, "QUEUE", { size: 17, weight: 600, color: P.muted, ls: 2.2 }) +
  jobs.map((j, i) => row(Q[0], Q[1] - 80 + i * 58 + (j.dy ?? 0), 250, j.name, { dot: j.dot ?? P.yellow, mono: true, o: j.o ?? 1 })).join(""), { o });
const toQueue = curve([APP[0] + 90, APP[1] - 30], [Q[0] - 140, Q[1] - 30], -30);
const toWorker = i => curve([Q[0] + 135, Q[1] - 40], [WK[i][0] - 70, WK[i][1]], 0);

const scenes = [
  {
    id: "title", dur: 5,
    draw: t => text(960, 520, "Job queues", { size: 92, weight: 650, color: P.title, o: k(t, 0.3, 0.8), ls: -1.5 }) +
      text(960, 590, "How work leaves the request, and survives a crash", { size: 32, weight: 450, color: P.muted, o: k(t, 0.9, 0.8) }),
  },
  { id: "part1", chapter: ["Part 1", "The happy path"], dur: 3 },
  {
    id: "queue", part: "Part 1 · The happy path", title: "Out of the request", accent: P.yellow,
    captions: [
      "Some work is too slow to do while someone waits: those are **jobs**.",
      "The app writes each job to a **queue** and answers right away.",
      "**Workers** take jobs off the queue, one at a time each.",
      "Add a worker and the same queue drains faster.",
    ],
    draw(t, c) {
      // jobs arrive one every 0.8 s from c[1]; workers take them, in order, one every 1.1 s from c[2] + 1 (they fade from their slot)
      const arrived = clamp(Math.floor((t - c[1] - 0.9) / 0.8) + 1, 0, 5);
      const jobs = Array.from({ length: arrived }, (_, i) => ({ name: `job #${41 + i}`, o: 1 - k(t, c[2] + 1 + i * 1.1, 0.3) }));
      let s = app(t, c[0]) + In(t, c[1], queueRows(t, jobs));
      s += arrow(t, c[1] + 0.2, toQueue, { trim: [0, 10] }) + packets(t, toQueue, { at: c[1] + 0.2, until: c[1] + 3.6, period: 0.8, travel: 0.7, r: 5 });
      for (let i = 0; i < 3; i++) {
        const at = i < 2 ? c[2] + i * 0.3 : c[3];
        s += worker(t, at, i) + arrow(t, at + 0.4, toWorker(i), { trim: [0, 10] }) +
          packets(t, toWorker(i), { at: c[2] + 1 + i * 0.37, period: i < 2 ? 2.2 : 1.4, travel: 0.8, r: 5, color: P.green, n: i < 2 ? 99 : 0 }) +
          (i === 2 ? packets(t, toWorker(2), { at: c[3] + 1, period: 1.4, travel: 0.8, r: 5, color: P.green }) : "");
      }
      return glow(Q[0], Q[1], 220, "yellow", 0.35 * vis(t, c[1], c[2] + 0.5)) + s;
    },
  },
  { id: "part2", chapter: ["Part 2", "When a worker dies"], accent: P.red, dur: 3 },
  {
    id: "crash", part: "Part 2 · When a worker dies", title: "Back on the queue", accent: P.red,
    captions: [
      "Sometimes a worker **dies** halfway through a job.",
      "It never said the job was done, so after a timeout the job goes **back on the queue**.",
      "Another worker picks it up. Nothing is lost, but a job can run **twice**.",
      "So every job is written to be safe to repeat: **idempotent**.",
    ],
    draw(t, c) {
      const dead = k(t, c[0] + 0.8, 0.3), back = k(t, c[1] + 1.2, 1.2), redo = k(t, c[2] + 0.4, 1);
      const retryPath = curve([WK[0][0] - 70, WK[0][1] + 10], [Q[0] + 135, Q[1] - 70], -60);
      let s = app(t, -5) + queueRows(t, [{ name: "job #42 · retry", dot: P.red, o: k(t, c[1] + 2.2, 0.4) * (1 - k(t, c[2] + 0.2, 0.4)) }, ...["job #45", "job #46"].map(name => ({ name, dy: -58 * k(t, c[2] + 0.5, 0.6) }))]);
      // the focus: what is not being talked about steps back
      const focus = 1 - 0.6 * vis(t, c[0], c[1] + 1);
      s = G(s, { o: focus });
      s += worker(t, -5, 0, { light: dead > 0.5 ? P.red : P.green, o: 1 - 0.5 * dead }) + cross(WK[0][0], WK[0][1] - 40, 16, P.red, dead);
      s += worker(t, -5, 1, { o: 1 - 0.4 * vis(t, c[0], c[2]) }) + worker(t, -5, 2, { o: 0.4 + 0.6 * vis(t, c[2], Infinity) });
      // the job sits on worker 1, goes back along the dashed retry path, then to worker 3
      s += dot(toWorker(0), 1, P.yellow, 7, 1 - back) + arrow(t, c[1] + 0.6, retryPath, { dashed: true, color: P.red, trim: [10, 10] });
      if (back > 0 && back < 1) s += dot(retryPath, back, P.yellow, 7);
      if (redo > 0) s += dot(toWorker(2), redo, P.yellow, 7) + tick(WK[2][0], WK[2][1] - 40, 14, P.green, k(t, c[2] + 1.5, 0.4));
      s += Pop(t, c[3] + 0.3, [960, 840], chip(960, 840, "run(job) twice = run(job) once", { mono: true, color: P.green, size: 22 }));
      return s;
    },
  },
  {
    id: "end", dur: 5,
    draw: t => text(960, 520, "Jobs leave the request, and survive a crash.", { size: 44, weight: 600, color: P.title, o: k(t, 0.2, 0.8) }) +
      text(960, 580, "made with the illustration-video skill", { size: 22, color: P.muted, mono: true, o: k(t, 0.8, 0.8) }),
  },
];

export const { frame, DURATION, sceneList } = timeline(scenes);
