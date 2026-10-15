type Node = { label: string; x: number; y: number; first?: boolean };

// Illustrative business. x: -1 (AI threatens) to 1 (AI helps); y: 0 (little judgement) to 1 (a few people's judgement).
const nodes: Node[] = [
  { label: 'Sales follow-up', x: 0.62, y: 0.78, first: true },
  { label: 'Pricing', x: 0.28, y: 0.9 },
  { label: 'Quotation speed', x: -0.6, y: 0.66 },
  { label: 'Key accounts', x: -0.3, y: 0.86 },
  { label: 'Customer service', x: 0.55, y: 0.36 },
  { label: 'Reporting', x: 0.82, y: 0.14 },
  { label: 'Procurement', x: 0.2, y: 0.46 },
  { label: 'Data entry', x: -0.55, y: 0.14 },
];

export default function FirstLookMap() {
  const W = 640, H = 500, x0 = 40, y0 = 40, w = 560, h = 400;
  const px = (v: number) => x0 + ((v + 1) / 2) * w;
  const py = (v: number) => y0 + (1 - v) * h;
  const first = nodes.find((n) => n.first)!;
  return (
    <svg
      className="v2-map"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Illustration: an example business mapped by how much each activity depends on a few people's judgement and whether AI helps or threatens it, with sales follow-up chosen as the first move"
    >
      <rect x={x0} y={y0} width={w} height={h} fill="none" stroke="var(--rule-dark)" />
      <line x1={x0 + w / 2} x2={x0 + w / 2} y1={y0} y2={y0 + h} stroke="var(--rule-dark)" />
      <line x1={x0} x2={x0 + w} y1={y0 + h / 2} y2={y0 + h / 2} stroke="var(--rule-dark)" />

      <g className="v2-map-quad">
        <text x={x0 + w - 12} y={y0 + 22} textAnchor="end" className="v2-map-start">Start here</text>
        <text x={x0 + 12} y={y0 + 22}>Protect</text>
        <text x={x0 + w - 12} y={y0 + h - 14} textAnchor="end">Automate</text>
        <text x={x0 + 12} y={y0 + h - 14}>Watch</text>
      </g>

      <g className="v2-map-axis">
        <text x={x0} y={y0 + h + 28}>AI threatens you</text>
        <text x={x0 + w} y={y0 + h + 28} textAnchor="end">AI helps you</text>
        <text x={x0 - 14} y={y0 + h} transform={`rotate(-90 ${x0 - 14} ${y0 + h})`}>Little judgement</text>
        <text x={x0 - 14} y={y0 + 4} textAnchor="end" transform={`rotate(-90 ${x0 - 14} ${y0 + 4})`}>A few people&apos;s judgement</text>
      </g>

      {nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={px(n.x) - 7}
            y={py(n.y) - 7}
            width="14"
            height="14"
            fill={n.first ? 'var(--signal-dark)' : 'none'}
            stroke={n.first ? 'var(--signal-dark)' : 'var(--dark-secondary)'}
            strokeWidth="1.5"
          />
          <text
            x={n.x > 0.5 ? px(n.x) - 14 : px(n.x) + 14}
            y={py(n.y) + 4}
            textAnchor={n.x > 0.5 ? 'end' : 'start'}
            className={n.first ? 'v2-map-first' : 'v2-map-label'}
          >
            {n.label}
          </text>
        </g>
      ))}

      <g className="v2-map-callout">
        <line x1={px(first.x)} x2={px(first.x)} y1={py(first.y) + 9} y2={py(first.y) + 58} stroke="var(--signal-dark)" />
        <text x={px(first.x) - 4} y={py(first.y) + 76} textAnchor="middle" className="v2-map-first">First move</text>
        <text x={px(first.x) - 4} y={py(first.y) + 96} textAnchor="middle">Replies within an hour: 40% to 90%</text>
      </g>
    </svg>
  );
}
