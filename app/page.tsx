import Link from 'next/link';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content">
        <section className="hero client-hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-label system-label">
              Business consequence before technology
            </div>

            <div className="hero-statement">
              <h1 id="hero-title">
                Every company will become an{' '}
                <em>intelligent organisation.</em>
              </h1>
            </div>

            <div className="hero-consequence client-consequence">
              <p>
                AI is creating more possibilities than most organisations can
                convert into business value. Leaders still have to decide where
                to act, what to stop, who owns the outcome and what must change
                in the work.
              </p>
              <p>
                Intellumia helps accountable leaders turn business and technology
                inflection points into decisions, operating systems and measurable
                outcomes.
              </p>
            </div>
          </div>

          <aside className="home-rail" aria-label="Intellumia starting point">
            <span className="system-label">Start here</span>
            <p>Begin with one material consequence.</p>
            <Link
              href="/point-of-view"
              data-analytics-event="point_of_view_click"
              data-analytics-location="hero_rail"
            >
              Read our point of view <span aria-hidden="true">↗</span>
            </Link>
          </aside>
        </section>

        <section className="value-section" aria-labelledby="value-title">
          <div className="section-number system-label">01 / When value is stuck</div>
          <div className="value-heading">
            <h2 id="value-title">Possibility is not the same as an operating outcome.</h2>
            <p>
              AI initiatives and material transformations often stall between
              intention and production value. The unresolved questions are usually
              about priority, economics, ownership, workflow, governance and the
              path from a decision to action.
            </p>
          </div>

          <div className="trigger-grid" aria-label="Situations where Intellumia may help">
            <article>
              <span className="trigger-index">01</span>
              <h3>From pilot to production</h3>
              <p>
                AI or data investment needs a business priority, an economic
                baseline and a credible production path.
              </p>
            </article>
            <article>
              <span className="trigger-index">02</span>
              <h3>Across functional boundaries</h3>
              <p>
                A material transformation has a sponsor but lacks the operating
                ownership needed to move decisions and dependencies.
              </p>
            </article>
            <article>
              <span className="trigger-index">03</span>
              <h3>At an inflection point</h3>
              <p>
                Growth, integration or business-model change requires sharper
                choices, accountable execution and evidence of what follows.
              </p>
            </article>
          </div>
        </section>

        <section
          className="begin-section client-begin"
          id="how-we-help"
          aria-labelledby="begin-title"
        >
          <div className="begin-heading">
            <span className="section-number system-label">02 / How we help</span>
            <h2 id="begin-title">One consequence. One decision or workflow.</h2>
          </div>
          <div className="begin-intro begin-intro-simple">
            <p className="begin-lead">
              Intellumia begins with one business outcome, not a technology
              catalogue. A bounded consulting engagement can continue as
              operating-partner support when the outcome requires it.
            </p>
          </div>

          <ol className="value-path" aria-label="How an engagement progresses">
            <li>
              <span>01</span>
              <strong>Establish the baseline</strong>
              <p>See what happens now, what it costs and what happens if nothing changes.</p>
            </li>
            <li>
              <span>02</span>
              <strong>Change the work</strong>
              <p>Bring the right ownership, context, evidence and permissions into the decision.</p>
            </li>
            <li>
              <span>03</span>
              <strong>Measure the outcome</strong>
              <p>Compare what followed and decide to scale, redesign, hold or stop.</p>
            </li>
          </ol>
        </section>

        <section className="direction-teaser" aria-labelledby="direction-title">
          <div className="section-number system-label">03 / The longer direction</div>
          <div>
            <h2 id="direction-title">Better decisions should compound.</h2>
            <p>
              Organisational intelligence is the permissioned combination of
              evidence, memory, relationships, judgment and learning that helps a
              company decide and act.
            </p>
            <p>
              Intellumia&apos;s longer direction is to help that intelligence endure
              and improve with use. The Intelligence Twin is one bounded thesis
              within that direction, not a validated product.
            </p>
            <Link
              className="text-link"
              href="/point-of-view"
              data-analytics-event="point_of_view_click"
              data-analytics-location="direction_teaser"
            >
              Explore our point of view <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="conversation-section" aria-labelledby="conversation-title">
          <span className="system-label">Begin with the consequential question</span>
          <h2 id="conversation-title">
            <span>What outcome matters now?</span>
            <span>What must change to reach it?</span>
          </h2>
          <Link
            href="/connect"
            className="conversation-link"
            data-analytics-event="conversation_path_open"
            data-analytics-location="conversation_section"
          >
            Begin a conversation
            <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        data-static-script="true"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Intellumia',
            legalName: 'Intellumia Pte. Ltd.',
            url: 'https://intellumia.com/',
            email: 'connect@intellumia.com',
            foundingDate: '2025',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '60 Paya Lebar Road, #07-54, Paya Lebar Square',
              addressLocality: 'Singapore',
              postalCode: '409051',
              addressCountry: 'SG',
            },
          }),
        }}
      />
    </>
  );
}
