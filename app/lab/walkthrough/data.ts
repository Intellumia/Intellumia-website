// The walkthrough page reads one file, run.json, written by walkthrough/export.py in the org-generator
// repository from a real run of the components. Nothing on the page is typed in by hand except the prose
// around it and the held-out benchmark lines, which are copied from each component's RESULTS.md.

import run from './run.json';

export type Citation = {
  quote: string | null;
  message_id?: string | null;
  source?: string;
  who?: string | null;
  when?: string;
  where?: string;
};

export type Item = Record<string, unknown> & {
  id?: string;
  citations?: Citation[];
  status_citations?: Citation[];
};

export type ScoreRow = Record<string, unknown> & {
  quote?: string;
  who?: string | null;
  when?: string;
  where?: string;
  found?: string[];
};

export type FinderData = {
  items: Item[];
  score: Record<string, unknown> & {
    rows?: ScoreRow[];
    lookalikes?: Item[];
    outside?: Item[];
    items?: Item[];
    changes?: ScoreRow[];
    issues?: ScoreRow[];
  };
  run?: { exit: number; stderr: string[]; seconds: number } | null;
  calls?: CallStats | null;
};

export type CallStats = {
  calls: number;
  models: string[];
  prompt_tokens: number;
  completion_tokens: number;
  cost_usd: number;
};

export type BriefItem = {
  text: string;
  owner?: string;
  due?: string;
  status?: string;
  citations: Citation[];
};

export type Brief = {
  title?: string;
  source_count: number;
  period?: { from: string; to: string };
  sections: Record<string, BriefItem[]>;
  filled_by?: Record<string, string>;
};

export type Walkthrough = {
  generated_at: string;
  sources: {
    company: string;
    domain: string;
    seed: number;
    writer: string;
    months: number;
    projects: string[];
    people: { name: string; role: string }[];
    first: string;
    last: string;
    generated: { email: number; chat: number; meeting_turns: number; documents: number; total: number };
    threads: { email: number; chat: number; meetings: number };
    normalised: Record<string, number>;
    labels: Record<string, number>;
    fallbacks: number;
    generation_cost_usd: number;
  };
  normalizer: {
    by_source: Record<string, Record<string, number>>;
    normalised_messages: number;
    generated_messages: number;
  };
  examples: {
    rule: string;
    email?: {
      raw: string;
      headers: { from: string; subject: string; date: string; message_id: string };
      normalised: Record<string, unknown>;
    };
    chat?: { raw: Record<string, unknown>; normalised: Record<string, unknown> };
    meeting?: { file: string; raw: string; normalised: Record<string, unknown> };
  };
  identity: {
    people: {
      name: string;
      role?: string;
      appears_as: string[];
      evidence: (Citation & { kind: string; detail: string })[];
      evidence_kinds: Record<string, number>;
      uncertain: number;
    }[];
    sender_ids: string[];
    score: Record<string, unknown> & { unresolved_sender_ids?: string[] };
  };
  finders: Record<string, FinderData>;
  briefs: { cut?: Brief; full?: Brief };
  outcome: {
    decision?: Citation & { statement?: string; choice?: string; rationale?: string; cited_by_full_brief: boolean; cited_by_cut_brief: boolean };
    outcome?: Citation & { metric?: string; baseline?: string; target?: string; actual?: string; verdict?: string; cited_by_full_brief: boolean; cited_by_cut_brief: boolean };
  };
  redact: {
    component?: string;
    characters?: number;
    replaced?: Record<string, number>;
    sent?: string | null;
    redacted?: string | null;
  };
  calls: Record<string, CallStats>;
  ledger: { spent_usd: number | null; estimate: Record<string, unknown> | null };
  versions: Record<string, { version: string | null; commit: string | null }>;
};

const data = run as unknown as Walkthrough;

// Only a run written by the model writer may be published. The free template writer exists for tests, and its
// plain sentences must never be shown as if they were the walkthrough. Set WALKTHROUGH_PREVIEW=1 to look at a
// template run locally.
if (data.sources.writer !== 'model' && process.env.WALKTHROUGH_PREVIEW !== '1') {
  throw new Error(
    `walkthrough/run.json comes from a ${data.sources.writer} run; only a model-written run may be published.`,
  );
}

export default data;

export function usd(value: number | null | undefined, digits = 2): string {
  return value == null ? 'not recorded' : `$${value.toFixed(digits)}`;
}

export function count(n: number, one: string, many?: string): string {
  return `${n} ${n === 1 ? one : (many ?? `${one}s`)}`;
}

export function num(value: unknown): number {
  return typeof value === 'number' ? value : 0;
}
