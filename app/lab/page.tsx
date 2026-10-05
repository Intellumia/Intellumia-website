import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'The Lab | Intellumia',
  description:
    'The components of the intelligence layer we are building, grouped by what they do, with an honest status for each.',
  alternates: {
    canonical: '/lab',
  },
  openGraph: {
    type: 'article',
    images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: Intelligence is free. Judgement is the moat.' }],
    url: 'https://intellumia.com/lab',
    title: 'The Lab | Intellumia',
    description:
      'The components of the intelligence layer we are building, grouped by what they do, with an honest status for each.',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/social/og-default.png'],
    title: 'The Lab | Intellumia',
    description:
      'The components of the intelligence layer we are building, grouped by what they do, with an honest status for each.',
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
              <span>Pieces of the layer</span>
            </div>
            <h1 id="lab-title">
              The <em>Lab.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                The layer is not one product. It is a set of components that work
                together: one makes the record legible, others find what the
                organisation knows, others keep it yours, and a test bench scores
                all of them. Here are the pieces we are building, grouped by what
                they do.
              </p>
              <p>
                Everything below is code we have written and are testing. None of it
                is a finished product, and we say so on purpose, because a lot of
                what gets called AI capability right now is a slide, not a system.
              </p>
            </div>
          </div>
          <aside className="pov-status" aria-label="Status of the Lab">
            <span className="system-label">Status</span>
            <p>Private, in active development. Egrysa is public.</p>
            <span>Updated October 2026.</span>
          </aside>
        </section>

        <section className="lab-group" aria-labelledby="lab-g0-title">
          <div className="section-number system-label">01 / Make the record legible</div>
          <div className="lab-intro">
            <h2 id="lab-g0-title">Before anything can be found, the record has to make sense.</h2>
            <p>
              Email, chat and meetings arrive in different shapes and under different names. These two pieces turn them into one clean record of what was said, and by whom.
            </p>
          </div>
          <div className="lab-cards">
            <article>
              <h3>Normalizer</h3>
              <p>
                Turns email, Slack and meeting-transcript exports into one clean, threaded message format.
              </p>
            </article>
            <article>
              <h3>Identity resolver</h3>
              <p>
                Resolves email addresses, display names, chat handles and meeting roles to the people behind them.
              </p>
            </article>
          </div>
        </section>

        <section className="lab-group lab-alt" aria-labelledby="lab-g1-title">
          <div className="section-number system-label">02 / Find what the organisation knows</div>
          <div className="lab-intro">
            <h2 id="lab-g1-title">Six questions an organisation cannot answer about itself today.</h2>
            <p>
              Each piece reads the record and answers one question, and is built to show its evidence: the exact text from the source it came from.
            </p>
          </div>
          <div className="lab-cards">
            <article>
              <h3>Decision extractor</h3>
              <p>
                Finds the decisions in email threads, chat and meetings, each backed by exact quotes from the source.
              </p>
            </article>
            <article>
              <h3>Commitment tracker</h3>
              <p>
                Finds commitments in email, chat and meetings: the owner, the resolved due date and a verified status.
              </p>
            </article>
            <article>
              <h3>Risk finder</h3>
              <p>
                Finds risks and live issues, with who raised them and what became of them.
              </p>
            </article>
            <article>
              <h3>Gap finder</h3>
              <p>
                Finds the questions asked in email and chat threads, and which of them nothing ever answered.
              </p>
            </article>
            <article>
              <h3>Contradiction detector</h3>
              <p>
                Finds statements that conflict across email, chat, meetings and documents, and tells conflicts from updates.
              </p>
            </article>
            <article>
              <h3>Expertise finder</h3>
              <p>
                Finds who knows what: the topics each person has shown real knowledge of, with the quotes that show it.
              </p>
            </article>
          </div>
        </section>

        <section className="lab-group" aria-labelledby="lab-g2-title">
          <div className="section-number system-label">03 / Put it in front of the decision</div>
          <div className="lab-intro">
            <h2 id="lab-g2-title">Memory is only useful at the moment of a decision.</h2>
            <p>
              The last step turns what has been found into something a decision-maker can read in a minute.
            </p>
          </div>
          <div className="lab-cards">
            <article>
              <h3>Brief writer</h3>
              <p>
                Turns email, chat, meetings and documents into a short brief where every item cites the source text.
              </p>
            </article>
          </div>
        </section>

        <section className="lab-group lab-alt" aria-labelledby="lab-g3-title">
          <div className="section-number system-label">04 / Keep it yours</div>
          <div className="lab-intro">
            <h2 id="lab-g3-title">The layer is only yours if nothing leaves without your say.</h2>
            <p>
              These two pieces sit between your people and any model. One strips personal data and secrets before text leaves. The other enforces your policy on what may go out at all.
            </p>
          </div>
          <div className="lab-cards">
            <article>
              <h3>Redactor</h3>
              <p>
                Offline, reversible redaction of personal data and secrets before text reaches an LLM.
              </p>
            </article>
            <article>
              <h3>Egrysa</h3>
              <p>
                A customer-owned checkpoint between an organisation and any AI provider: it classifies and redacts sensitive data, applies policy and returns signed, tamper-evident audit receipts, without storing the content. Public, Apache 2.0. By its own documentation a security-oriented MVP, not a certified product.
              </p>
            </article>
          </div>
        </section>

        <section className="lab-group lab-dark" aria-labelledby="lab-g4-title">
          <div className="section-number system-label">05 / Prove it</div>
          <div className="lab-intro">
            <h2 id="lab-g4-title">A component you cannot measure is a claim.</h2>
            <p>
              We build the test before we trust the result. A fictional organisation with every decision, reversal, commitment and risk planted as an exact label gives us ground truth. Everything else is scored against it.
            </p>
          </div>
          <div className="lab-cards">
            <article>
              <h3>Organisation generator</h3>
              <p>
                Generates a fictional organisation&apos;s email, chat and meetings over months, with every decision, reversal, commitment, risk, outcome and lesson planted as an exact label.
              </p>
            </article>
            <article>
              <h3>Third-party baselines</h3>
              <p>
                Runs other people&apos;s systems on the same held-out data as our components, so their benchmarks have something honest to compare against.
              </p>
            </article>
            <article>
              <h3>Model sweeps</h3>
              <p>
                Sweeps cheaper models across the components&apos; held-out benchmarks, to find where a smaller model is good enough.
              </p>
            </article>
            <article>
              <h3>Shared foundations</h3>
              <p>
                A common data contract, and shared code that includes quote verification and a spending cap on every model call.
              </p>
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
