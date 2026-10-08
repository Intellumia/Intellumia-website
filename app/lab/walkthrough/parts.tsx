import type { ReactNode } from 'react';
import type { Citation, FinderData, Item, ScoreRow } from './data';
import { num } from './data';

export type EvidenceState =
  | 'Thesis'
  | 'Thesis, illustrative'
  | 'Early-stage R&D'
  | 'Working prototype'
  | 'Early proof point'
  | 'Client outcome'
  | 'Not run';

// Violet chips carry thesis and R&D; ink chips carry prototypes and anything above (Brand System v1.0).
export function Chip({ state }: { state: EvidenceState }) {
  const tone = state.startsWith('Thesis') || state === 'Early-stage R&D' ? 'wt-chip-violet' : 'wt-chip-ink';
  return <span className={`wt-chip ${tone}`}>{state}</span>;
}

export function Source({ c }: { c: Citation }) {
  return (
    <figure className="wt-quote">
      <blockquote>{c.quote}</blockquote>
      <figcaption className="system-label">
        {[c.who, c.when, c.where].filter(Boolean).join(' · ')}
      </figcaption>
    </figure>
  );
}

function text(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(text).filter(Boolean).join(', ');
  if (typeof value === 'object') {
    const v = value as Record<string, unknown>;
    return text(v.name ?? v.date ?? v.text ?? '');
  }
  return '';
}

export type Field = { key: string; label: string };

export const FIELDS: Record<string, { headline: string[]; fields: Field[] }> = {
  'decision-extractor': {
    headline: ['statement'],
    fields: [
      { key: 'status', label: 'Status' },
      { key: 'owner', label: 'Owner' },
      { key: 'rationale', label: 'Why' },
      { key: 'alternatives', label: 'Ruled out' },
    ],
  },
  'commitment-tracker': {
    headline: ['statement'],
    fields: [
      { key: 'owner', label: 'Owner' },
      { key: 'due', label: 'Due' },
      { key: 'status', label: 'Status' },
      { key: 'overdue', label: 'Overdue' },
    ],
  },
  'risk-finder': {
    headline: ['statement'],
    fields: [
      { key: 'kind', label: 'Kind' },
      { key: 'status', label: 'Status' },
      { key: 'raised_by', label: 'Raised by' },
      { key: 'owner', label: 'Owner' },
    ],
  },
  'gap-finder': {
    headline: ['question'],
    fields: [
      { key: 'status', label: 'Status' },
      { key: 'asked_by', label: 'Asked by' },
      { key: 'kind', label: 'Kind' },
    ],
  },
  'contradiction-detector': {
    headline: ['topic'],
    fields: [
      { key: 'kind', label: 'Kind' },
      { key: 'explanation', label: 'Why' },
    ],
  },
  'expertise-finder': {
    headline: ['person', 'topic'],
    fields: [
      { key: 'summary', label: 'Shown' },
      { key: 'signals', label: 'How' },
    ],
  },
};

export function ItemView({ finder, item }: { finder: string; item: Item }) {
  const spec = FIELDS[finder];
  const headline = spec.headline.map((k) => text(item[k])).filter(Boolean).join(': ');
  const due = item.due as { text?: string; date?: string } | undefined;
  return (
    <article className="wt-item">
      <div className="wt-item-output">
        <span className="system-label wt-item-label">What it wrote</span>
        <h4>{headline}</h4>
        <dl>
          {spec.fields.map(({ key, label }) => {
            let value = text(item[key]);
            if (key === 'due' && due) value = [due.text, due.date].filter(Boolean).join(', resolved to ');
            if (key === 'overdue') value = item.overdue ? 'yes' : '';
            return value ? (
              <div key={key}>
                <dt className="system-label">{label}</dt>
                <dd>{value}</dd>
              </div>
            ) : null;
          })}
        </dl>
      </div>
      <div className="wt-item-source">
        <span className="system-label wt-item-label">The source text it quotes</span>
        {(item.citations ?? []).map((c, i) => (
          <Source key={i} c={c} />
        ))}
        {item.status_citations?.length ? (
          <>
            <span className="system-label wt-item-label">And the later message its status rests on</span>
            {item.status_citations.map((c, i) => (
              <Source key={`s${i}`} c={c} />
            ))}
          </>
        ) : null}
      </div>
    </article>
  );
}

export function Tally({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="wt-tally">
      {rows.map(([value, label]) => (
        <div key={label}>
          <dt>{value}</dt>
          <dd>{label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Planted({ row, what }: { row: ScoreRow; what: string }) {
  const otherwise = (row.found_otherwise as string[] | undefined) ?? [];
  return (
    <article className="wt-miss">
      <span className="system-label wt-item-label">
        {otherwise.length ? `${what}; found only as ${otherwise.map((o) => o.replace(/^.*\(/, '').replace(')', '')).join(', ')}` : what}
      </span>
      <Source c={{ quote: (row.quote as string) ?? null, who: row.who, when: row.when, where: row.where }} />
    </article>
  );
}

export function tallies(finder: string, f: FinderData): [string, string][] {
  const s = f.score;
  const of = (a: unknown, b: unknown) => `${num(a)} of ${num(b)}`;
  switch (finder) {
    case 'decision-extractor':
      return [
        [of(s.found_as_made, s.planted), 'planted decisions it found as made'],
        [of(s.reversals_found_as_made, s.reversals), 'reversals among them found as a new decision'],
        [of(s.lookalikes_reported_as_made, s.lookalikes_planted), 'look-alikes it reported as decisions'],
        [String(num(s.made_outside_labels)), 'other items it called made decisions'],
      ];
    case 'commitment-tracker':
      return [
        [of(s.found, s.planted), 'planted commitments found'],
        [of(s.due_right, s.found), 'with the due date right'],
        [of(s.status_right, s.found), 'with the status right'],
        [String(num(s.outside_labels) + num(s.lookalikes_reported)), 'other items it called commitments'],
      ];
    case 'risk-finder':
      return [
        [of(s.found, s.planted), num(s.found_as_issue) ? `planted risks found, ${num(s.found_as_issue)} filed as a live issue` : 'planted risks found'],
        [of(s.status_right, s.found), 'with what became of them right'],
        [of(s.came_true_seen_as_separate_issue, s.came_true), 'that came true, reported as a separate live issue'],
        [String(num(s.outside_labels)), 'other risks or issues it reported'],
      ];
    case 'gap-finder':
      return [
        [of(s.found, s.planted_in_material_given), 'planted questions found, in email and chat'],
        [of(s.status_right, s.found), 'answered or open, right'],
        [String(num(s.outside_labels)), 'other questions it reported'],
        [String(num(s.outside_on_lookalikes)), 'of those, option lists or doubts it read as open questions'],
      ];
    case 'contradiction-detector':
      return [
        [of(s.changes_reported, s.changes_planted), 'planted changes of plan it reported'],
        [of(s.changes_reported_as_update, s.changes_planted), 'of those, called an update, not a conflict'],
        [String(num((s.by_kind as Record<string, number> | undefined)?.conflict)), 'standing conflicts it reported'],
        [String(num(s.reported)), num(s.reported) === 1 ? 'item in all' : 'items in all'],
      ];
    case 'expertise-finder':
      return [
        [of(s.person_right, s.planted_in_material_given), 'planted explanations credited to the right person'],
        [of(s.referrals_credited, s.referrals), 'times someone was pointed to, credited'],
        [String(num(s.outside_labels)), 'other credits it gave'],
        [String(num(s.outside_on_lookalikes)), 'of those, for listing options'],
      ];
    default:
      return [];
  }
}

export function Panel({ id, children }: { id: string; children: ReactNode }) {
  return (
    <section className="wt-panel" data-for={id} aria-labelledby={`wt-panel-${id}`}>
      {children}
    </section>
  );
}

export function Pre({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="wt-pre">
      <figcaption className="system-label">{label}</figcaption>
      <pre>{children}</pre>
    </figure>
  );
}

// The kinds of message the generator wrote, in plain words, for items the labels do not hold.
export const KIND_WORDS: Record<string, string> = {
  filler: 'small talk and status',
  kickoff: 'the kickoff',
  commitment: 'commitments',
  done: 'work reported done',
  slip: 'slipped dates',
  question: 'questions',
  answer: 'answers',
  risk: 'risks',
  issue: 'live issues',
  decision: 'decisions',
  reaffirm: 'reaffirmed decisions',
  reversal: 'reversals',
  outcome: 'results',
  lesson: 'lessons',
  expertise: 'explanations',
  referral: 'pointers to who knows',
  discussion: 'options listed without deciding',
  challenge: 'doubts',
  proposal: 'ideas nobody took up',
};

export function kinds(list: unknown): string {
  const words = ((list as string[]) ?? []).map((k) => KIND_WORDS[k] ?? k);
  return words.length ? words.join(', ') : 'messages with no label';
}

function and(parts: string[]): string {
  return parts.length < 2 ? (parts[0] ?? '') : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

// What fell short, read mechanically from the counts; nothing here is written by hand.
export function shortfalls(finder: string, f: FinderData): string[] {
  const s = f.score;
  const out: string[] = [];
  const gap = (have: unknown, of: unknown) => num(of) - num(have);
  const outsideKinds = and(Object.keys((s.outside_kinds as Record<string, number>) ?? {}).map((k) => KIND_WORDS[k] ?? k));
  const outside = (n: number, what: string) => void [n, what, outsideKinds]; // not errors: see unchecked()
  const lookalikes = (n: number) => (n ? out.push(`reported ${n} ${n === 1 ? 'look-alike' : 'look-alikes'}, a false positive by construction`) : 0);
  switch (finder) {
    case 'decision-extractor':
      if (gap(s.found_as_made, s.planted)) out.push(`missed ${gap(s.found_as_made, s.planted)} of ${num(s.planted)} planted decisions`);
      lookalikes(num(s.lookalikes_reported_as_made));
      outside(num(s.made_outside_labels), 'called');
      break;
    case 'commitment-tracker':
    case 'risk-finder':
    case 'gap-finder': {
      const planted = finder === 'gap-finder' ? s.planted_in_material_given : s.planted;
      if (gap(s.found, planted)) out.push(`missed ${gap(s.found, planted)} of ${num(planted)} planted items`);
      if (finder === 'commitment-tracker' && gap(s.due_right, s.found)) out.push(`got ${gap(s.due_right, s.found)} due dates wrong`);
      if (gap(s.status_right, s.found)) out.push(`got the status of ${gap(s.status_right, s.found)} wrong`);
      if (finder === 'risk-finder' && gap(s.came_true_seen_as_separate_issue, s.came_true))
        out.push(`did not see ${gap(s.came_true_seen_as_separate_issue, s.came_true)} of ${num(s.came_true)} risks that came true`);
      lookalikes(num(s.lookalikes_reported));
      outside(num(s.outside_labels), 'reported');
      break;
    }
    case 'contradiction-detector':
      if (gap(s.changes_reported, s.changes_planted))
        out.push(`did not report ${gap(s.changes_reported, s.changes_planted)} of ${num(s.changes_planted)} planted changes of plan`);
      if (gap(s.changes_reported_as_update, s.changes_reported))
        out.push(`called ${gap(s.changes_reported_as_update, s.changes_reported)} changes of plan a conflict rather than an update`);
      break;
    case 'expertise-finder':
      if (gap(s.person_right, s.planted_in_material_given))
        out.push(`missed ${gap(s.person_right, s.planted_in_material_given)} of ${num(s.planted_in_material_given)} planted explanations`);
      if (gap(s.referrals_credited, s.referrals)) out.push(`did not credit ${gap(s.referrals_credited, s.referrals)} of ${num(s.referrals)} times someone was pointed to`);
      lookalikes(num(s.lookalikes_reported));
      outside(num(s.outside_labels), 'gave');
      break;
  }
  return out;
}

// What each finder reported that the planted labels do not cover. Not counted as errors: read the quotes.
export function unchecked(finder: string, f: FinderData): string | null {
  const s = f.score;
  const n = num(s.outside_labels) + (finder === 'decision-extractor' ? num(s.made_outside_labels) : 0);
  if (!n) return null;
  const kindsList = and(Object.keys((s.outside_kinds as Record<string, number>) ?? {}).map((k) => KIND_WORDS[k] ?? k));
  return `${n} ${n === 1 ? 'item' : 'items'}${kindsList ? `, citing ${kindsList}` : ''}`;
}
