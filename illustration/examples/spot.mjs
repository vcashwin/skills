// A spot illustration (an empty state, an onboarding step): 280×210, 1.5px outlines, one accent, a short entrance.
import { P, setStroke, svg, iso, rect, circle, line, face, dots, bar, ring, ghosts, slab, spark, In, Pop } from "../scripts/iso.mjs";

setStroke(1.5);

export default t => {
  const W = iso(140, 116, 1.2), card = pl => rect(pl, 0, 0, 96, 70, 9), top = W.flat(0, 0, 0), s = W.at(-6, -18, 52);
  return svg(280, 210,
    In(t, 0, ring(circle(W.flat(0, 0, -24), 0, 0, 72))) +
    In(t, 0.05, ghosts(W, card, 0)) +
    In(t, 0.2, slab(W, card, 0) + face(circle(top, -30, -14, 5), P.blue, P.blue) + bar(line(top, [-18, -14], [24, -14])) +
      dots(line(top, [-30, 2], [30, 2])) + dots(line(top, [-30, 15], [12, 15])), [0, -14]) +
    Pop(t, 0.6, s, spark(s, 12) + spark([s[0] + 20, s[1] - 20], 5, P.muted)));
};
