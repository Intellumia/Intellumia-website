import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Our point of view | Intellumia',
  description:
    'Intellumia’s thesis: intelligence is free, judgement is the moat, and the layer a company’s judgement lives on should be its own.',
  alternates: {
    canonical: '/point-of-view',
  },
  openGraph: {
    type: 'article',
    images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: Intelligence is free. Judgement is the moat.' }],
    url: 'https://intellumia.com/point-of-view',
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Intellumia’s thesis on the intelligent organisation and the layer a company’s judgement lives on.',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/social/og-default.png'],
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Intellumia’s thesis on the intelligent organisation and the layer a company’s judgement lives on.',
  },
};

export default function PointOfViewPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" className="pov-page">
        <section className="pov-hero" aria-labelledby="pov-title">
          <div className="pov-hero-grid">
            <div className="hero-label system-label">
              <span>Intellumia / Point of view</span>
              <span>Thesis v0.2, October 2026</span>
            </div>
            <h1 id="pov-title">
              Intelligence is free. <em>Judgement is the moat.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                Every company will become an intelligent organisation. That is the
                premise, not the argument. Frontier models now supply, at near-zero
                cost, most of what a company once paid its people and advisers to
                know. What they cannot supply is the judgement that makes one company
                different from the next: which customer to keep, which risk to carry,
                when to stop, who to trust.
              </p>
              <p>
                That judgement either leaks into someone else&apos;s model or lives on a
                layer the company owns. Own the layer your judgement lives on, or
                someone else will.
              </p>
            </div>
          </div>
          <aside className="pov-status" aria-label="Evidence status">
            <span className="system-label">Evidence posture</span>
            <p>Bold in direction. Exact in evidence.</p>
            <span>Thesis, being tested with clients. Reviewed April 2027.</span>
          </aside>
        </section>

        <section className="pov-transition" aria-labelledby="transition-title">
          <div className="section-number system-label">01 / The turn</div>
          <div>
            <h2 id="transition-title">Same models, same company.</h2>
            <div className="pov-two-column">
              <p>
                Two companies running the same models, on the same vendor playbooks,
                with the same prompts, converge on the same decisions. Undifferentiated
                intelligence has become a cost of doing business, like electricity. It
                keeps you in the game and wins you nothing.
              </p>
              <p>
                What wins is judgement the competitor does not have and cannot buy,
                and judgement only stays yours if it stays inside a layer you own.
              </p>
            </div>
          </div>
        </section>

        <section className="risk-section pov-risk" aria-labelledby="risk-title">
          <div className="risk-intro">
            <span className="section-number system-label">02 / Trust</span>
          </div>
          <h2 id="risk-title">
            <span>Private inference protects </span>
            <span>your data. Nothing protects </span>
            <span>your judgement.</span>
          </h2>
          <div className="risk-grid">
            <article>
              <span className="risk-index">01</span>
              <h3>A clause is not control</h3>
              <p>
                The model makers sell private tiers: zero retention, private
                inference, nothing of yours trains their models. In the software era
                terms and conditions would have settled it. This is not the software era.
              </p>
            </article>
            <article>
              <span className="risk-index">02</span>
              <h3>The makers say so themselves</h3>
              <p>
                In their own safety reports they say they do not fully understand or
                control their models, and they have published cases of models
                deceiving evaluators and working around their limits.
              </p>
            </article>
            <article>
              <span className="risk-index">03</span>
              <h3>Judgement is still nowhere</h3>
              <p>
                It stays in a few heads, leaves when they do, and converges on the
                vendor&apos;s playbook every time your people type a decision into
                someone else&apos;s model.
              </p>
            </article>
          </div>
          <p className="risk-close">
            Own the layer. Rent the model. Trust nothing you cannot see.
          </p>
        </section>

        <section className="intelligence-definition" aria-labelledby="intelligence-title">
          <div className="section-number system-label">03 / The layer</div>
          <div className="definition-heading">
            <h2 id="intelligence-title">Organisations forget. Models don&apos;t.</h2>
            <p>
              The layer is a company&apos;s own system of evidence, memory, permissions
              and decisions. Sovereign means owned and controlled by the company, on
              any model it chooses, never data residency. It turns every decision into
              memory the next one can use, and compounds inside the company&apos;s own
              boundary. That compounding is what an intelligent organisation is.
            </p>
          </div>
          <div className="intelligence-capabilities">
            <article>
              <span>01</span>
              <h3>Recover context</h3>
              <p>Bring forward what is relevant when a material decision must be made.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Distinguish evidence</h3>
              <p>Separate facts, assumptions, beliefs and interpretations.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Connect accountability</h3>
              <p>Link decisions to owners, actions, intended outcomes and permissions.</p>
            </article>
            <article>
              <span>04</span>
              <h3>Learn from outcomes</h3>
              <p>Observe what happened and carry forward learning with provenance.</p>
            </article>
          </div>
          <p className="definition-close">
            Every decision records its evidence, outcome and owner, and the owner
            approves what changes, so the layer stays current instead of decaying.
            Ownership today is what lets capability feed from it tomorrow, on
            whichever model earns the trust.
          </p>
        </section>

        <section className="twin-section" aria-labelledby="twin-title">
          <div className="twin-heading">
            <span className="section-number system-label">04 / How it happens</span>
            <h2 id="twin-title">Start at the decision, not the task.</h2>
          </div>
          <div className="twin-definition">
            <p>
              AI does not change a company when it automates a task; that produces a
              faster version of the same company. It changes a company when it changes
              a decision: who makes it, what evidence sits in front of them, what the
              organisation remembers afterwards. Decisions are where judgement is
              exercised, so decisions are where the layer is built.
            </p>
          </div>
          <div className="twin-boundaries">
            <article>
              <span className="system-label">The embed</span>
              <p>
                A fixed window inside one company, on one decision, with a number
                agreed before we start. Establish the baseline, change the work,
                measure the outcome. The layer grows decision by decision, never as a
                platform rollout.
              </p>
            </article>
            <article>
              <span className="system-label">What it is not</span>
              <p>
                A pilot, a consulting engagement or a retainer. We are not the answer
                to every problem and we are not experts in every problem. We will
                never tell you that only Intellumia can solve it.
              </p>
            </article>
          </div>
        </section>

        <section className="evidence-sequence" aria-labelledby="sequence-title">
          <div className="section-number system-label">05 / How we intend to earn it</div>
          <div className="sequence-heading">
            <h2 id="sequence-title">Your judgement is your moat. Ours is the method.</h2>
            <p>
              Intellumia is a software company that starts inside its clients, not
              with a demo. The judgement is always the client&apos;s. Ours is the method
              that gets a company there, and the platform that method becomes, so the
              next company gets there faster. Each embed is the evidence engine for
              what becomes repeatable.
            </p>
          </div>
          <ol className="company-sequence" aria-label="Intellumia company sequence">
            <li>Trust</li>
            <li>Revenue</li>
            <li>Intelligence</li>
            <li>Reusable IP</li>
            <li>Product</li>
            <li>Platform</li>
          </ol>
          <div className="sequence-boundary">
            <p>
              The sequence is conditional. Client work does not automatically become
              reusable intellectual property. Repeated delivery does not automatically
              justify software. Platform ambition must wait for repeated value,
              explicit rights, technical feasibility and sound economics.
            </p>
            <Link className="text-link" href="/#how-we-help">
              See how Intellumia begins <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="principles-section" aria-labelledby="principles-title">
          <div className="section-number system-label">06 / How we intend to operate</div>
          <h2 id="principles-title">Bold in direction. Exact in evidence.</h2>
          <div className="principles-grid">
            <p>Truth before theatre.</p>
            <p>Business consequence before technology.</p>
            <p>Outcomes before billables.</p>
            <p>Human accountability for material decisions.</p>
            <p>Permissions and provenance before reuse.</p>
            <p>Change the approach when evidence requires it.</p>
          </div>
        </section>

        <section className="conversation-section" aria-labelledby="conversation-title">
          <span className="system-label">Bring the future back to the present</span>
          <h2 id="conversation-title">
            <span>What do you know?</span>
            <span>What would prove it?</span>
          </h2>
          <Link
            href="/connect"
            className="conversation-link"
            data-analytics-event="conversation_path_open"
            data-analytics-location="point_of_view_conversation"
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
