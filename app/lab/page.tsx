import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'The Lab | Intellumia',
  description:
    'Real, running prototypes behind Intellumia’s organisational intelligence thesis, public and evidence-honest about what is proven and what is not.',
  alternates: {
    canonical: '/lab',
  },
  openGraph: {
    type: 'article',
    url: 'https://intellumia.com/lab',
    title: 'The Lab | Intellumia',
    description:
      'Real, running prototypes behind Intellumia’s organisational intelligence thesis, public and evidence-honest about what is proven and what is not.',
  },
  twitter: {
    card: 'summary',
    title: 'The Lab | Intellumia',
    description:
      'Real, running prototypes behind Intellumia’s organisational intelligence thesis, public and evidence-honest about what is proven and what is not.',
  },
};

export default function LabPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" className="lab-page">
        <section className="pov-hero" aria-labelledby="lab-title">
          <div className="pov-hero-grid">
            <div className="hero-label system-label">
              <span>Intellumia / The Lab</span>
              <span>Public proof points</span>
            </div>
            <h1 id="lab-title">
              The <em>Lab.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                Everything below is real, running code, not a roadmap. Some of it is
                a working prototype. None of it is a finished product. We are naming
                that distinction on purpose, because a lot of what gets called AI
                capability right now is a slide, not a system.
              </p>
              <p>
                The underlying thesis is one bet, two layers. First, an
                organisation&rsquo;s memory is scattered across documents, email,
                calendar, Slack and meetings, and needs to be extracted into
                something structured before anything can reason over it. Second,
                once that memory exists, it can be reasoned over, to surface what a
                team already knows but has not written down, where accountability
                actually sits, and where risk is quietly concentrated.
              </p>
            </div>
          </div>
        </section>

        <aside className="pov-status" aria-label="Layer 02 status">
          <span className="system-label">Layer 02 status</span>
          <p>The reasoning layer is under active build and is not public yet.</p>
          <span>When it is, it will appear here.</span>
        </aside>

        <section className="intelligence-definition" aria-labelledby="lab-entries-title">
          <div className="section-number system-label">01 / What&rsquo;s public today</div>
          <div className="definition-heading">
            <h2 id="lab-entries-title">Four early proof points, not four products.</h2>
            <p>
              Each of these is real, running code you can inspect yourself, not a
              case study written after the fact.
            </p>
          </div>
          <div className="intelligence-capabilities">
            <article>
              <span>Layer 01 &middot; Memory</span>
              <h3>Cognitive Memory Extraction Agent</h3>
              <p>
                An agent that reads documents, email, calendar entries, Slack
                threads and meeting transcripts, and extracts what is actually
                happening into seven structured memory types, instead of one flat
                summary. This is the raw material layer: before anything can reason
                about an organisation, its scattered communication has to become
                something structured enough to reason over.
              </p>
              <p className="lab-status">
                Status: working prototype. Public, MIT licensed, with a CLI and a
                Python API.
              </p>
              <a
                className="text-link"
                href="https://github.com/Intellumia/cognitive-memory-extraction-agent"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span>Layer 01, extended</span>
              <h3>Synthetic Org Dataset and Agent Prototypes</h3>
              <p>
                Memory extraction only matters if it feeds something. This repo
                runs a full synthetic organisation, generated communications
                across email, Slack, CRM, HR records, calendar and meeting
                transcripts, through a three-stage pipeline: parse the raw data,
                extract memory from it, then synthesize that memory into personas
                and early insight.
              </p>
              <p className="lab-status">
                Status: early-stage R&amp;D. All data is synthetic; the
                insight-synthesis stage is a working prototype, not a finished
                product.
              </p>
              <a
                className="text-link"
                href="https://github.com/Intellumia/synthetic-org-dataset-and-agent-prototypes"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span>Control plane</span>
              <h3>Egrysa</h3>
              <p>
                A customer-owned checkpoint between an organisation&rsquo;s people
                and any AI provider they use. It classifies and redacts sensitive
                data before it leaves an organisation&rsquo;s own infrastructure,
                applies policy on what is allowed to go out, and returns signed,
                tamper-evident audit receipts, without storing the underlying
                content.
              </p>
              <p className="lab-status">
                Status: what its own documentation calls a security-oriented MVP,
                not a certified product. Public, Apache 2.0.
              </p>
              <a
                className="text-link"
                href="https://github.com/Intellumia/egrysa"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo <span aria-hidden="true">↗</span>
              </a>
            </article>
            <article>
              <span>Individual layer</span>
              <h3>Personal Insight Extraction Library</h3>
              <p>
                The same structured-extraction approach, one layer down: from an
                organisation&rsquo;s memory to an individual&rsquo;s professional
                one. Given a person&rsquo;s own documented history, it extracts
                structured insight about career trajectory, skills and working
                patterns, building a persistent professional profile instead of
                starting every conversation from zero.
              </p>
              <p className="lab-status">
                Status: early-stage R&amp;D. Public; extraction and profile
                detection are working, later stages are still roadmap.
              </p>
              <a
                className="text-link"
                href="https://github.com/Intellumia/personal-insight-extraction-library"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the repo <span aria-hidden="true">↗</span>
              </a>
            </article>
          </div>
        </section>

        <section className="conversation-section" aria-labelledby="conversation-title">
          <span className="system-label">Bring the future back to the present</span>
          <h2 id="conversation-title">
            <span>What&rsquo;s worth trying?</span>
            <span>What convinces you?</span>
          </h2>
          <Link
            href="/connect"
            className="conversation-link"
            data-analytics-event="conversation_path_open"
            data-analytics-location="lab_conversation"
          >
            Begin a conversation
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
