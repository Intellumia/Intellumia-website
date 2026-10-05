import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Our point of view | Intellumia',
  description:
    'Intellumia’s core thesis: intelligence is free, judgement is the moat, and the layer a company’s judgement lives on should be its own. What we are not, and what would change our mind.',
  alternates: {
    canonical: '/point-of-view',
  },
  openGraph: {
    type: 'article',
    images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: Intelligence is free. Judgement is the moat.' }],
    url: 'https://intellumia.com/point-of-view',
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Intellumia’s core thesis on the intelligent organisation and the layer a company’s judgement lives on.',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/social/og-default.png'],
    title: 'Intelligence is free. Judgement is the moat.',
    description:
      'Intellumia’s core thesis on the intelligent organisation and the layer a company’s judgement lives on.',
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
              <span>Core thesis v0.4, 5 October 2026</span>
            </div>
            <h1 id="pov-title">
              Intelligence is free. <em>Judgement is the moat.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                Every company will become an intelligent organisation, running on the
                same models as its competitors. What sets it apart is the judgement it
                brings to them, and that judgement is unprotected: it sits in a few
                heads, leaves when they do, and leaks into someone else&apos;s model.
              </p>
              <p>
                The protection is ownership of the layer your judgement lives on. We
                help a company build that layer and operate it. The company owns it.
              </p>
            </div>
          </div>
          <aside className="pov-status" aria-label="Evidence status">
            <span className="system-label">Evidence posture</span>
            <p>Bold in direction. Exact in evidence.</p>
            <span>Sundeep Kumar, Founder &amp; CEO. Reviewed April 2027.</span>
          </aside>
        </section>

        <section className="essay-section" aria-labelledby="claims-title">
          <div className="section-number system-label">01 / Three claims</div>
          <div className="essay-body">
            <h2 id="claims-title">What we believe, and why.</h2>
            <p>
              <strong>Intelligence is free.</strong> Frontier models supply, at close to
              zero cost, most of what a company once paid people and advisers to know.
              Two firms on the same models converge on the same decisions, so
              intelligence alone no longer separates them.
            </p>
            <p>
              <strong>Judgement is the moat, and nothing protects it.</strong> Private
              inference protects your data. It does not protect your judgement, and the
              people who build these systems say they do not fully understand them (
              <a href="https://darioamodei.com/post/the-urgency-of-interpretability" target="_blank" rel="noopener noreferrer">
                Amodei, April 2025
              </a>
              ;{' '}
              <a href="https://venturebeat.com/security/openais-new-private-intelligence-targets-a-growing-enterprise-concern-who-can-see-your-ai-data" target="_blank" rel="noopener noreferrer">
                OpenAI&apos;s Private Intelligence, 29 September 2026
              </a>
              ). A clause is not control.
            </p>
            <p>
              <strong>Own the layer. Rent the model.</strong> The layer is a
              company&apos;s own system of evidence, memory, permissions and decisions,
              owned and controlled by the company, on any model it chooses.
              Organisations forget. Models do not. The layer is how a company
              remembers.
            </p>
          </div>
        </section>

        <section className="essay-section essay-alt" aria-labelledby="how-title">
          <div className="section-number system-label">02 / How we get there</div>
          <div className="essay-body">
            <h2 id="how-title">One problem at a time, until it is solved.</h2>
            <p>
              We start inside a company, on one problem that is specific to it, with a
              number agreed before we begin. We stay until it is solved. Where you are
              today is where the work starts, which is why we embed with your team
              rather than arrive with a product.
            </p>
            <p>
              When a solution proves it repeats, it becomes a product, on its own or
              combined with another. That is how a platform gets built: from solved
              problems, not from a roadmap. The platform is where this ends. The method
              is how we get there.
            </p>
            <p>
              The company keeps its layer throughout. We bring the know-how to build it
              and operate it. Where it runs is your decision. Inside your own network is
              our first suggestion, with the trade-offs laid out, and you make the call.
            </p>
          </div>
        </section>

        <section className="essay-section" aria-labelledby="not-title">
          <div className="section-number system-label">03 / What we are not</div>
          <div className="essay-body">
            <h2 id="not-title">Not the answer to everything.</h2>
            <p>
              We do not serve every company. We serve every unique problem, until it is
              solved. We are not the answer to every problem, and we are not experts in
              every problem. We will never tell you that only Intellumia can solve it.
              Your judgement is your moat, never ours. What we build with you belongs to
              you.
            </p>
          </div>
        </section>

        <section className="essay-section essay-alt" aria-labelledby="change-title">
          <div className="section-number system-label">04 / What would change our mind</div>
          <div className="essay-body">
            <h2 id="change-title">We would revise this if we found any of these.</h2>
            <p>We will review the thesis against our evidence in April 2027.</p>
            <ol className="essay-list">
              <li>Most of a company&apos;s judgement cannot be made explicit enough to improve a decision.</li>
              <li>Model makers give customers durable memory that they own and can take to another model.</li>
              <li>A generic model, given no company history, decides as well as the company&apos;s best people.</li>
              <li>Buyers still hand their decisions to a single vendor once the trust argument is understood.</li>
            </ol>
            <p>
              <Link href="/point-of-view/full">Read the full argument, with sources</Link>
              {' '}(Thesis v0.3, October 2026).
            </p>
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
