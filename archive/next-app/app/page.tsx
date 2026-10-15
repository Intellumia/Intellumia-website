import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import FirstLookMap from './components/FirstLookMap';
import Actions from './components/V2Actions';
import Close from './components/V2Close';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main-content" className="v2">
        <section className="v2-hero" aria-labelledby="hero-title">
          <div className="v2-hero-plate" aria-hidden="true" />
          <p className="system-label v2-kicker">An AI-native services company</p>
          <h1 id="hero-title">
            <span className="heading-line">AI that knows your business.</span>
            <span className="heading-line hero-muted">Built with your team. Owned by you.</span>
          </h1>
          <p className="v2-sub">
            You know your business. We help you see how AI will change it, and where to start.
          </p>
          <Actions where="hero" />
          <div className="arc-rule v2-arc" aria-hidden="true" />
        </section>

        <div className="v2-band v2-band-spectrum" aria-hidden="true" />
        <section className="v2-section v2-dark" aria-labelledby="fit-title">
          <p className="system-label v2-index">01 / Where most businesses are</p>
          <h2 id="fit-title" className="v2-visually-hidden">
            What we hear most
          </h2>
          <ul className="v2-quotes">
            <li>
              <p className="v2-quote">&ldquo;How will AI change my business?&rdquo;</p>
              <p>Where it helps you, where it threatens you, and what to do first.</p>
            </li>
            <li>
              <p className="v2-quote">&ldquo;Where do I even start?&rdquo;</p>
              <p>With one place in your business, not a tool.</p>
            </li>
            <li>
              <p className="v2-quote">&ldquo;My best people carry this business.&rdquo;</p>
              <p>AI makes their judgement go further, and keeps it yours.</p>
            </li>
          </ul>
        </section>

        <div className="v2-band v2-band-slabs" aria-hidden="true" />
        <section
          className="v2-section v2-light"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <p className="system-label v2-index">02 / How it works</p>
          <h2 id="how-title">
            <span className="heading-line">Start small.</span>
            <span className="heading-line">Own what we build.</span>
          </h2>
          <ol className="v2-timeline">
            <li className="v2-s1">
              <span className="v2-dot" aria-hidden="true" />
              <strong>First Look</strong>
              <span className="v2-time">2 to 3 weeks</span>
              <p>How AI will change your business, and the first move.</p>
            </li>
            <li className="v2-s2">
              <span className="v2-dot" aria-hidden="true" />
              <strong>Embed</strong>
              <span className="v2-time">60 to 90 days</span>
              <p>One place, one measure, a working build.</p>
            </li>
            <li className="v2-s3">
              <span className="v2-dot" aria-hidden="true" />
              <strong>Run and Improve</strong>
              <span className="v2-time">Until it holds</span>
              <p>Then we hand it over. It is yours.</p>
            </li>
            <li className="v2-s4">
              <span className="v2-dot" aria-hidden="true" />
              <strong>Your intelligence layer</strong>
              <span className="v2-time">Over time</span>
              <p>Each step adds to a layer built on your own judgement.</p>
            </li>
          </ol>
          <p className="v2-note">A First Look is free for our first five clients.</p>
        </section>

        <section className="v2-section v2-dark v2-split v2-sample-section" aria-labelledby="sample-title">
          <div>
            <p className="system-label v2-index">03 / What you get</p>
            <h2 id="sample-title">
              <span className="heading-line">See your business</span>
              <span className="heading-line">the way AI will.</span>
            </h2>
            <p className="v2-body">
              We map where AI helps you, where it threatens you, and where a few
              people&apos;s judgement matters most. Then we pick one place to start,
              with one number to move.
            </p>
          </div>
          <figure className="v2-sample">
            <FirstLookMap />
            <figcaption className="system-label">Illustration · an example business</figcaption>
          </figure>
        </section>

        <section className="v2-section v2-dark v2-split" id="about" aria-labelledby="about-title">
          <img
            className="v2-portrait"
            src="/team/sundeep-kumar.jpg"
            alt="Sundeep Kumar, Founder and CEO of Intellumia"
            width={720}
            height={720}
            loading="lazy"
          />
          <div>
            <p className="system-label v2-index">04 / Who you will work with</p>
            <h2 id="about-title">Sundeep Kumar</h2>
            <p className="system-label v2-role">Founder &amp; CEO</p>
            <p className="v2-body">
              Twenty-five years inside enterprise technology, working with large
              companies across Asia-Pacific. Now on your side of the table, wherever
              your business is.
            </p>
          </div>
        </section>

        <section className="v2-promise-wrap v2-light" aria-labelledby="promise-title">
          <div className="v2-promise-plate" aria-hidden="true" />
          <div className="v2-promise-text">
            <p className="system-label v2-index">05 / The promise</p>
            <h2 id="promise-title" className="v2-vision">
              <span className="heading-line">What we build</span>
              <span className="heading-line">with you is yours.</span>
            </h2>
            <ul className="v2-promises">
              <li>Your data stays in your accounts.</li>
              <li>AI models that never train on your data.</li>
              <li>Independent of every model maker.</li>
            </ul>
          </div>
        </section>

        <Close where="close" />
      </main>

      <SiteFooter />
    </>
  );
}
