'use client';

import { useState } from 'react';

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

export default function LayerMap() {
  const [active, setActive] = useState('all');
  const industry = INDUSTRIES.find((i) => i.id === active) ?? INDUSTRIES[0];

  return (
    <div className="layer-map">
      <div className="layer-picker" role="group" aria-label="Choose an industry">
        {INDUSTRIES.map((i) => (
          <button
            key={i.id}
            type="button"
            className="layer-pick"
            aria-pressed={active === i.id}
            onClick={() => setActive(i.id)}
          >
            {i.label}
          </button>
        ))}
      </div>
      <p className="layer-line" aria-live="polite">
        <span className="system-label">Where judgement leaves a trace (illustrative)</span>
        {industry.line}
      </p>

      <div className="layer-stack">
        <div className="layer-side layer-side-left" aria-hidden="true">
          <span className="system-label">Built and operated with you by Intellumia</span>
        </div>

        <div className="layer-bands">
          <div className="layer-band layer-use">
            <span className="system-label">Where it is used</span>
            <p>A brief in front of the person deciding. The outcome recorded, and the next decision starts from it.</p>
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

          <div className="layer-gate" aria-hidden="true">
            <span className="system-label">Control point: what may leave, and what returns</span>
          </div>

          <div className="layer-models">
            <span className="system-label">Models, rented and swappable</span>
            <span className="layer-chip">Any model you choose</span>
          </div>

          <div className="layer-arrow layer-arrow-up" aria-hidden="true" />

          <div className="layer-band layer-sources">
            <span className="system-label">Extractors, by source</span>
            <ul>
              {SOURCES.map((s) => {
                const on = industry.lit.includes(s.id);
                return (
                  <li
                    key={s.id}
                    className={`layer-source layer-source-${s.state}${on ? ' is-lit' : ''}`}
                    data-lit={on}
                  >
                    <strong>{s.label}</strong>
                    <span>{s.note}</span>
                  </li>
                );
              })}
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
