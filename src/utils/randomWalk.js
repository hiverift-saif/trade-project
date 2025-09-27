function randomWalk(base, i) {
  const noise = Math.sin(i / 9) * 0.0007 + Math.cos(i / 5) * 0.0003;
  const drift = (Math.random() - 0.5) * (base > 1000 ? 40 : base > 10 ? 0.02 : 0.0012);
  const v = base + noise + drift;
  return Number(v.toFixed(base > 1000 ? 0 : base > 10 ? 2 : 5));
}

export { randomWalk };