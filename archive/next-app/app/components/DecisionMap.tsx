const STEPS = [
  {
    n: '01',
    title: 'Find',
    tone: '#FFC484',
    text: 'Where the judgement lives today: which decision, whose heads, what evidence they use.',
  },
  {
    n: '02',
    title: 'Test',
    tone: '#C7FF3D',
    text: 'Whether it can be codified. Some judgement can; some should stay human. We say which.',
  },
  {
    n: '03',
    title: 'Build',
    tone: '#14EEEE',
    text: 'The layer it runs on: evidence, memory and permissions, owned by you, on any model.',
  },
  {
    n: '04',
    title: 'Run',
    tone: '#BCA7FF',
    text: 'The decision repeats, is measured against the number agreed at the start, and improves.',
  },
];

const SLAB_W = 230;
const SLAB_H = 168;
const CUT = 133; // 230 * tan(30deg): the brand's 30 degree cut
const GAP = 60;

export default function DecisionMap() {
  const width = STEPS.length * SLAB_W + (STEPS.length - 1) * GAP;
  const height = SLAB_H + CUT + 24;
  return (
    <div className="decision-map">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Four slabs in sequence: find, test, build, run"
        className="decision-map-art"
      >
        {STEPS.map((s, i) => {
          const x = i * (SLAB_W + GAP);
          const top = 12;
          const pts = [
            [x, top + CUT],
            [x + SLAB_W, top],
            [x + SLAB_W, top + SLAB_H],
            [x, top + SLAB_H + CUT],
          ]
            .map((p) => p.join(','))
            .join(' ');
          return (
            <g key={s.n} className="map-slab" style={{ ['--i' as string]: i }}>
              <polygon points={pts} fill="#1B1D24" stroke="#3A3D48" strokeWidth="2" />
              <rect
                className="map-lit"
                x={x + SLAB_W - 16}
                y={top}
                width="16"
                height={SLAB_H}
                fill={s.tone}
              />
              <line
                className="map-lit"
                x1={x + 40}
                y1={top + CUT + 36}
                x2={x + 40}
                y2={top + SLAB_H + CUT - 36}
                stroke={s.tone}
                strokeWidth="3"
              />
            </g>
          );
        })}
      </svg>
      <ol className="decision-map-steps">
        {STEPS.map((s) => (
          <li key={s.n}>
            <span className="system-label" style={{ color: s.tone }}>
              {s.n} / {s.title}
            </span>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
