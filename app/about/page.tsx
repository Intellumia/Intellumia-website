import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import Close from '../components/V2Close';

export const metadata: Metadata = {
  title: 'About | Intellumia',
  description: 'Intellumia is an AI-native services company. AI does most of the work, people own the decisions, and you own what we build.',
  alternates: { canonical: '/about' },
  openGraph: { type: 'website', url: 'https://intellumia.com/about', title: 'About | Intellumia', description: 'AI does most of the work. People own the decisions. You own what we build.', images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: AI that knows your business. Built with your team. Owned by you.' }] },
};

export default function About() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="v2">
        <section className="v2-hero v2-hero-short v2-hero-own" aria-labelledby="hero-title">
          <div className="v2-hero-plate" aria-hidden="true" />
          <p className="system-label v2-kicker">About</p>
          <h1 id="hero-title">
            <span className="heading-line">An AI-native</span>
            <span className="heading-line">services company.</span>
          </h1>
          <p className="v2-sub">AI does most of the work. People own the decisions. You own what we build.</p>
          <div className="arc-rule v2-arc" aria-hidden="true" />
        </section>

        <section className="v2-section v2-dark v2-split" aria-labelledby="founder-title">
          <img className="v2-portrait" src="/team/sundeep-kumar.jpg" alt="Sundeep Kumar, Founder and CEO of Intellumia" width={720} height={720} loading="lazy" />
          <div>
            <p className="system-label v2-index">01 / Who you will work with</p>
            <h2 id="founder-title">Sundeep Kumar</h2>
            <p className="system-label v2-role">Founder &amp; CEO</p>
            <p className="v2-body">Twenty-five years inside enterprise technology at Microsoft and IBM, working with large companies across Asia-Pacific. Now on your side of the table, wherever your business is.</p>
          </div>
        </section>

        <section className="v2-section v2-light" aria-labelledby="how-title">
          <p className="system-label v2-index">02 / How we work</p>
          <h2 id="how-title">Three rules we keep.</h2>
          <ul className="v2-quotes v2-rules">
            <li><p className="v2-quote">AI first.</p><p>AI does most of the work and checks it before a person does. People frame it and judge it.</p></li>
            <li><p className="v2-quote">Independent.</p><p>We choose the best model and tool for you, not for us, and switch when something better appears.</p></li>
            <li><p className="v2-quote">Honest.</p><p>We say plainly what is proven and what is still early.</p></li>
          </ul>
        </section>

        <section className="v2-promise-wrap v2-light" aria-labelledby="promise-title">
          <div className="v2-promise-plate" aria-hidden="true" />
          <div className="v2-promise-text">
            <p className="system-label v2-index">03 / The promise</p>
            <h2 id="promise-title" className="v2-vision">
              <span className="heading-line">What we build</span>
              <span className="heading-line">with you is yours.</span>
            </h2>
            <ul className="v2-promises">
              <li>Your data stays in your accounts.</li>
              <li>AI models that never train on your data.</li>
              <li>We will never tell you only Intellumia can solve it.</li>
            </ul>
          </div>
        </section>

        <Close where="about_close" />
      </main>
      <SiteFooter />
    </>
  );
}
