// A diagram still at the video's 1920×1080: pieces with labels, connectors trimmed off them, a packet in flight, a dashed
// boundary, a glow behind the piece the picture is about. Colour only on the request that moves and the boundary it crosses.
import { P, svg, iso, text, caption2, chip, glow, laptop, server, cylinder, zone, curve, arrow, dot, In } from "../scripts/iso.mjs";

const label = (x, y, a, b) => caption2(x, y, a, b, 1, { size: 27 });

export default t => {
  const A = [470, 520], S = [960, 500], D = [1450, 520], ly = 650;
  const AS = curve(A, S, -40), SD = curve(S, D, -40);
  return svg(1920, 1080,
    text(96, 92, "AN EXAMPLE", { size: 17, weight: 600, color: P.muted, anchor: "start", ls: 2.2 }) +
    text(96, 136, "One request, end to end", { size: 38, weight: 640, color: P.title, anchor: "start" }) +
    `<rect x="96" y="154" width="48" height="3" rx="1.5" fill="${P.yellow}"/>` +
    In(t, 0.2, laptop(iso(A[0], A[1] + 10, 1.1)) + label(A[0], ly, "Browser", "the page you are on")) +
    In(t, 0.5, zone(790, 330, 840, 400, P.blue, { label: "one transaction" })) +
    In(t, 0.4, glow(S[0], S[1] - 30, 170, "blue", 0.5) + server(iso(S[0], S[1] + 40, 1.1), { lights: [P.green, P.green, P.blue] }) +
      label(S[0], ly, "Server", "validates · writes · replies")) +
    In(t, 0.6, cylinder(iso(D[0], D[1] + 30, 1.1)) + label(D[0], ly, "Database", "one commit")) +
    arrow(t, 0.9, AS, { trim: [90, 90] }) + arrow(t, 1.2, SD, { trim: [90, 80] }) +
    dot(AS, 0.62, P.yellow, 7, Math.min(1, Math.max(0, t - 1.8))) +
    In(t, 1.4, chip(670, 452, "POST /issues", { mono: true, color: P.yellow })) +
    text(960, 1000, "A **request** crosses one boundary, and lands in one commit.", { size: 34, weight: 480, accent: P.yellow }));
};
