import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Our point of view | Intellumia',
  description:
    'Intellumia’s thesis on intelligent organisations, organisational intelligence and bounded Intelligence Twins.',
  alternates: {
    canonical: '/point-of-view',
  },
  openGraph: {
    type: 'article',
    url: 'https://intellumia.com/point-of-view',
    title: 'Every company will become an intelligent organisation.',
    description:
      'Intellumia’s point of view on organisational intelligence and the future of the intelligent organisation.',
  },
  twitter: {
    card: 'summary',
    title: 'Every company will become an intelligent organisation.',
    description:
      'Intellumia’s point of view on organisational intelligence and the future of the intelligent organisation.',
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
              <span>Day 0 company thesis</span>
            </div>
            <h1 id="pov-title">
              Every company will become an <em>intelligent organisation.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                The world is moving from systems that record and distribute
                information to systems that can interpret context, support judgment,
                take bounded action and learn from outcomes.
              </p>
              <p>
                Model access will become less differentiating. What will matter is
                the intelligence distinctive to each organisation and the operating
                system that turns it into better outcomes.
              </p>
            </div>
          </div>
          <aside className="pov-status" aria-label="Evidence status">
            <span className="system-label">Evidence posture</span>
            <p>Bold in direction. Exact in evidence.</p>
            <span>This is a thesis, not a claim of validated demand or product.</span>
          </aside>
        </section>

        <section className="pov-transition" aria-labelledby="transition-title">
          <div className="section-number system-label">01 / The transition</div>
          <div>
            <h2 id="transition-title">
              AI changes what an organisation can remember, decide and learn.
            </h2>
            <div className="pov-two-column">
              <p>
                Every organisation already contains substantial intelligence:
                leadership judgment, employee experience, customer understanding,
                relationships, the context behind past decisions and lessons from
                successes, failures and exceptions.
              </p>
              <p>
                Much of that intelligence remains fragmented across people,
                conversations and systems. AI creates a new possibility, but the
                destination is not AI itself. It is an organisation that becomes
                better at thinking and acting over time.
              </p>
            </div>
          </div>
        </section>

        <section className="risk-section pov-risk" aria-labelledby="risk-title">
          <div className="risk-intro">
            <span className="section-number system-label">02 / Intelligence continuity</span>
          </div>
          <h2 id="risk-title">
            <span>What makes a company </span>
            <span>distinctive can be difficult </span>
            <span>to see and easy to lose.</span>
          </h2>
          <div className="risk-grid">
            <article>
              <span className="risk-index">01</span>
              <h3>Trapped in individuals</h3>
              <p>
                Important judgment, relationships and the reasons behind exceptions
                often remain concentrated in founders, leaders and experienced operators.
              </p>
            </article>
            <article>
              <span className="risk-index">02</span>
              <h3>Fragmented across systems</h3>
              <p>
                Transactions may be recorded while the context behind a decision is
                separated from the action, owner and outcome.
              </p>
            </article>
            <article>
              <span className="risk-index">03</span>
              <h3>Lost through change</h3>
              <p>
                Growth, succession, professionalisation and technology change expose
                what the organisation has not learned to preserve or transfer.
              </p>
            </article>
          </div>
          <p className="risk-close">
            The problem is not information scarcity. It is intelligence continuity.
          </p>
        </section>

        <section className="intelligence-definition" aria-labelledby="intelligence-title">
          <div className="section-number system-label">03 / Organisational intelligence</div>
          <div className="definition-heading">
            <h2 id="intelligence-title">Intelligence only matters when it changes outcomes.</h2>
            <p>
              Organisational intelligence is the permissioned combination of
              evidence, memory, relationships, judgment and learning that helps an
              organisation decide and act.
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
            This is an operating capability, not a software feature. It requires
            leadership intent, work design, governance, memory, data, technology and
            behavioural change to function as one system.
          </p>
        </section>

        <section className="twin-section" aria-labelledby="twin-title">
          <div className="twin-heading">
            <span className="section-number system-label">04 / A bounded thesis</span>
            <h2 id="twin-title">An Intelligence Twin has a defined purpose and boundary.</h2>
          </div>
          <div className="twin-definition">
            <p>
              An Intelligence Twin is built for a defined purpose, governed by
              permissions and informed by relevant context. It is connected to a
              person, role, team, workflow or decision domain.
            </p>
          </div>
          <div className="twin-boundaries">
            <article>
              <span className="system-label">What it may do</span>
              <p>
                Recover relevant context, support questions and decisions, preserve
                learning and enable bounded action within declared permissions.
              </p>
            </article>
            <article>
              <span className="system-label">What it is not</span>
              <p>
                A digital clone, autonomous replacement, complete replica of a human
                being or currently validated Intellumia software product.
              </p>
            </article>
          </div>
        </section>

        <section className="evidence-sequence" aria-labelledby="sequence-title">
          <div className="section-number system-label">05 / How we intend to earn it</div>
          <div className="sequence-heading">
            <h2 id="sequence-title">The first business is not the final company.</h2>
            <p>
              Intellumia begins through consulting and operating partner work for the
              AI era, focused on problems owned by executives. That work is the evidence engine for
              discovering what should become repeatable, reusable or eventually
              software-shaped.
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
          <h2 id="principles-title">Direction should be bold. Evidence should be exact.</h2>
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
            <span>What must your company become?</span>
            <span>What should change first?</span>
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
