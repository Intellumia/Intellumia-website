import Link from 'next/link';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import DecisionMap from './components/DecisionMap';
import LayerMap from './components/LayerMap';

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
              A software company for the intelligence era
            </div>

            <div className="hero-statement">
              <h1 id="hero-title">
                Intelligence is free.{' '}
                <em>Judgement is the moat.</em>
              </h1>
              <div className="hero-actions">
                <Link
                  className="button-primary"
                  href="/connect"
                  data-analytics-event="conversation_path_open"
                  data-analytics-location="hero_primary"
                >
                  Begin a conversation <span aria-hidden="true">↗</span>
                </Link>
                <Link
                  className="button-secondary"
                  href="/point-of-view"
                  data-analytics-event="point_of_view_click"
                  data-analytics-location="hero_secondary"
                >
                  Read our point of view
                </Link>
                <p className="hero-note system-label">
                  A fixed window. One decision. A number agreed first.
                </p>
              </div>
            </div>

            <div className="hero-consequence client-consequence">
              <p>
                Own the layer your judgement lives on, or someone else will. Every
                company will become an intelligent organisation; we build the layer
                that makes yours its own.
              </p>
              <p>
                Intellumia is a software company for the intelligence era. We embed
                with leadership teams to find where their judgement lives, test
                whether it can be codified, and build the layer they will run it on.
              </p>
            </div>
          </div>

          <aside className="home-rail" aria-label="Where Intellumia is today">
            <span className="system-label">Evidence state</span>
            <p>Public thesis · Method documented · Embeds in conversation</p>
            <Link
              href="/point-of-view"
              data-analytics-event="point_of_view_click"
              data-analytics-location="hero_rail"
            >
              Read the thesis <span aria-hidden="true">↗</span>
            </Link>
          </aside>
          <div className="arc-rule" aria-hidden="true" />
        </section>

        <section className="value-section" aria-labelledby="value-title">
          <div className="section-number system-label">01 / The problem</div>
          <div className="value-heading">
            <h2 id="value-title">Private inference protects your data. Nothing protects your judgement.</h2>
            <p>
              The model makers now sell private tiers, and the people who build these
              systems say they do not fully understand them. A clause is not control. Your real intelligence is not in your systems;
              it is in how you decide, and three things happen to it.
            </p>
          </div>

          <div className="trigger-grid" aria-label="What happens to a company's judgement">
            <article>
              <span className="trigger-index">01</span>
              <h3>It stays in a few heads</h3>
              <p>
                Which customer to keep, which risk to carry, when to stop: the calls
                that make you different sit with a handful of people.
              </p>
            </article>
            <article>
              <span className="trigger-index">02</span>
              <h3>It leaves when they do</h3>
              <p>
                Succession, growth and attrition take the reasoning with them. The
                next decision starts from nothing.
              </p>
            </article>
            <article>
              <span className="trigger-index">03</span>
              <h3>It converges on the vendor&apos;s playbook</h3>
              <p>
                Same models, same company. Undifferentiated intelligence is a cost.
                Differentiated judgement is the moat.
              </p>
            </article>
          </div>
        </section>

        <section className="layer-section" aria-labelledby="layer-title">
          <div className="map-heading">
            <span className="section-number system-label">02 / The layer, drawn</span>
            <h2 id="layer-title">
              Where your judgement lives, <em>and what holds it.</em>
            </h2>
            <p className="layer-intro">
              The layer sits between your people and any model. What goes into it
              differs for every company, so the extractors that feed it do too.
            </p>
          </div>
          <LayerMap />
        </section>

        <section className="map-section" aria-labelledby="map-title">
          <div className="map-heading">
            <span className="section-number system-label">03 / The embed, drawn</span>
            <h2 id="map-title">
              Four moves, one decision, <em>a number agreed first.</em>
            </h2>
          </div>
          <DecisionMap />
        </section>

        <section
          className="begin-section client-begin"
          id="how-we-help"
          aria-labelledby="begin-title"
        >
          <div className="begin-heading">
            <span className="section-number system-label">04 / How we help</span>
            <h2 id="begin-title">Start at the decision, not the task.</h2>
          </div>
          <div className="begin-intro begin-intro-simple">
            <p className="begin-lead">
              AI changes a company when it changes who decides, with what evidence.
              The first engagement is an embed: a fixed window inside your company,
              on one decision, with a number agreed before we start. Where you are
              today is where the work starts.
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
          <div className="promise-plate" aria-hidden="true" />
          <div className="section-number system-label">05 / The promise</div>
          <div>
            <h2 id="direction-title">Every company operating from its own intelligence.</h2>
            <p>
              The layer is a company&apos;s own system of evidence, memory, permissions
              and decisions: owned and controlled by the company, on any model it
              chooses. Organisations forget. Models don&apos;t. The layer turns every
              decision into memory the next one can use.
            </p>
            <p>
              We are not the answer to every problem, and we are not experts in every
              problem. We will never tell you that only Intellumia can solve it. What
              we build with you belongs to you. The platform we are building from that
              work is a thesis, being tested with clients, and we say so plainly.
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
            <span>What matters now?</span>
            <span>What changes first?</span>
          </h2>
          <p className="conversation-payoff">
            Own the layer. Rent the model. Trust nothing you cannot see.
          </p>
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
            email: 'sundeep@intellumia.com',
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
