type Source = {
  id: string;
  label: string;
  note: string;
  state: 'lab' | 'client';
};

const SOURCES: Source[] = [
  { id: 'comms', label: 'Email, chat, meetings', note: 'Extractors in the Lab', state: 'lab' },
  { id: 'docs', label: 'Documents and contracts', note: 'Partly in the Lab', state: 'lab' },
  { id: 'code', label: 'Code, tickets, runbooks', note: 'Built when a client needs it', state: 'client' },
  { id: 'field', label: 'Site and field records', note: 'Built when a client needs it', state: 'client' },
  { id: 'ops', label: 'ERP, CRM, structured data', note: 'With a partner, if needed', state: 'client' },
];

const INDUSTRIES = [
  {
    id: 'all',
    label: 'All sources',
    line: 'Every company leaves a trace of its judgement somewhere different.',
    lit: ['comms', 'docs', 'code', 'field', 'ops'],
  },
  {
    id: 'services',
    label: 'Advisory and law',
    line: 'Often in client conversations and in how documents get revised.',
    lit: ['comms', 'docs'],
  },
  {
    id: 'software',
    label: 'Software',
    line: 'Often in code review, design decisions and incident threads.',
    lit: ['code', 'comms'],
  },
  {
    id: 'build',
    label: 'Construction and property',
    line: 'Often in site decisions, change orders and who got the call.',
    lit: ['field', 'docs', 'comms', 'ops'],
  },
];

const LAYER = [
  { title: 'Evidence', text: 'What was said, with the source text.' },
  { title: 'Memory', text: 'What the company has decided and learned.' },
  { title: 'Permissions', text: 'Who may see and change what.' },
  { title: 'Decisions', text: 'Owner, outcome and what followed.' },
];

const USES = [
  {
    title: 'Briefs',
    text: 'Before a decision, the evidence and the history in front of the person deciding.',
    icon: (
      <>
        <path d="M6 3h9l4 4v14H6z" />
        <path d="M9 11h7M9 15h7M9 7h3" />
      </>
    ),
  },
  {
    title: 'Answers',
    text: 'Ask the company a question. Get the answer with its source.',
    icon: (
      <>
        <path d="M4 5h16v11H9l-5 4z" />
        <path d="m9 10 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Agents',
    text: 'Routine work done within the permissions you set.',
    icon: (
      <>
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 12h5l5-5M12 12l5 5" />
      </>
    ),
  },
  {
    title: 'Signals',
    text: 'A flag when a decision drifts from what the company has learned.',
    icon: <path d="M3 12h4l3-7 4 14 3-7h4" />,
  },
  {
    title: 'Products',
    text: 'A solved problem, packaged so it repeats.',
    icon: (
      <>
        <path d="M4 8 12 4l8 4-8 4z" />
        <path d="m4 12 8 4 8-4M4 16l8 4 8-4" />
      </>
    ),
  },
];

const CHECKS = [
  {
    title: 'Send only what is needed',
    text: 'A task gets the context it requires, not the whole archive.',
    icon: <path d="M3 5h18l-7 8v6l-4-2v-4z" />,
  },
  {
    title: 'Check permissions',
    text: 'Who may ask, and what they may see, is enforced here.',
    icon: (
      <>
        <rect x="5" y="11" width="14" height="9" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    title: 'Record every call',
    text: 'What left, which model, and what came back, on a log you own.',
    icon: (
      <>
        <path d="M5 4h14v16H5z" />
        <path d="M8 9h8M8 13h8M8 17h4" />
      </>
    ),
  },
  {
    title: 'Verify what returns',
    text: 'Answers are checked against the source before anyone relies on them.',
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="m8.5 12 2.5 2.5 4.5-5" />
      </>
    ),
  },
];

const MODELS = ['Hosted frontier model', 'Open model inside your network', 'Specialist model'];

export default function LayerMap() {
  return (
    <div className="layer-map">
      <fieldset className="layer-picker">
        <legend className="system-label layer-pick-prompt">
          Pick an industry to see where its judgement sits
        </legend>
        {INDUSTRIES.map((i, n) => (
          <span key={i.id} className="layer-pick-wrap">
            <input
              type="radio"
              name="layer-industry"
              id={`ind-${i.id}`}
              className="layer-radio"
              defaultChecked={n === 0}
            />
            <label htmlFor={`ind-${i.id}`} className="layer-pick">
              {i.label}
            </label>
          </span>
        ))}
      </fieldset>
      {INDUSTRIES.map((i) => (
        <p key={i.id} className="layer-line" data-for={i.id}>
          <span className="system-label">Where judgement leaves a trace (illustrative)</span>
          {i.line}
        </p>
      ))}

      <div className="layer-stack">
        <div className="layer-side layer-side-left" aria-hidden="true">
          <span className="system-label">Built and operated with you by Intellumia</span>
        </div>

        <div className="layer-bands">
          <div className="layer-band layer-use">
            <span className="system-label">What it feeds</span>
            <ul className="layer-uses">
              {USES.map((u) => (
                <li key={u.title}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {u.icon}
                  </svg>
                  <strong>{u.title}</strong>
                  <span>{u.text}</span>
                </li>
              ))}
            </ul>
            <p className="layer-loop">
              <span aria-hidden="true">↺</span> Every outcome is recorded back into the layer, and the
              next decision starts from it.
            </p>
          </div>

          <div className="layer-arrow" aria-hidden="true" />

          <div className="layer-band layer-core">
            <span className="system-label">Your intelligence layer, owned by you</span>
            <ul className="layer-slabs">
              {LAYER.map((l) => (
                <li key={l.title}>
                  <strong>{l.title}</strong>
                  <span>{l.text}</span>
                </li>
              ))}
            </ul>
            <p className="layer-where">Runs where you choose: inside your network or outside it. Your call.</p>
          </div>

          <div className="layer-control">
            <span className="system-label">The control point: every request to a model passes through it</span>
            <ul className="layer-checks">
              {CHECKS.map((c) => (
                <li key={c.title}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    {c.icon}
                  </svg>
                  <strong>{c.title}</strong>
                  <span>{c.text}</span>
                </li>
              ))}
            </ul>
            <div className="layer-models">
              <span className="system-label">Models, rented and swappable</span>
              <ul className="layer-model-list">
                {MODELS.map((m) => (
                  <li key={m} className="layer-chip">
                    {m}
                  </li>
                ))}
              </ul>
              <p>Change a model without rebuilding the layer. The memory stays with you.</p>
            </div>
          </div>

          <div className="layer-arrow layer-arrow-up" aria-hidden="true" />

          <div className="layer-band layer-sources">
            <span className="system-label">Extractors, by source</span>
            <ul>
              {SOURCES.map((s) => (
                <li
                  key={s.id}
                  className={`layer-source layer-source-${s.state}`}
                  data-in={INDUSTRIES.filter((i) => i.lit.includes(s.id))
                    .map((i) => i.id)
                    .join(' ')}
                >
                  <strong>{s.label}</strong>
                  <span>{s.note}</span>
                </li>
              ))}
            </ul>
            <p className="layer-legend">
              <i className="swatch swatch-lab" /> Running in the Lab
              <i className="swatch swatch-client" /> Built for you when you need it
            </p>
          </div>
        </div>

        <div className="layer-side layer-side-right" aria-hidden="true">
          <span className="system-label">You own the layer</span>
        </div>
      </div>
    </div>
  );
}
