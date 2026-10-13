import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import FirstLookMap from '../components/FirstLookMap';
import Close from '../components/V2Close';

export const metadata: Metadata = {
  title: 'How it works | Intellumia',
  description: 'Start small and own what we build: a First Look, one Embed on one measure, then run and improve until it is yours.',
  alternates: { canonical: '/how-it-works' },
  openGraph: { type: 'website', url: 'https://intellumia.com/how-it-works', title: 'How it works | Intellumia', description: 'One place first. One measure. Then the next step, only if it worked.', images: [{ url: '/social/og-default.png', width: 1200, height: 630, alt: 'Intellumia: AI that knows your business. Built with your team. Owned by you.' }] },
};

const faqs = [
  ['Do we need our data or systems ready?', 'No. We start with how your business works today.'],
  ['What does it cost?', 'We price the result, never the hours. A First Look is free for our first five clients; every later step is priced before it starts.'],
  ['Who owns what we build?', 'You do: your data, your system and your people’s judgement.'],
  ['Which AI do you use?', 'Whichever fits. We are independent of every model maker, and your data never trains a model.'],
  ['How fast is it?', 'We hold ourselves to a first working build within 30 days.'],
];

export default function HowItWorks() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteHeader />
      <main id="main-content" className="v2">
        <section className="v2-hero v2-hero-short" aria-labelledby="hero-title">
          <p className="system-label v2-kicker">How it works</p>
          <h1 id="hero-title">
            <span className="heading-line">Start small.</span>
            <span className="heading-line hero-muted">Own what we build.</span>
          </h1>
          <p className="v2-sub">One place first. One measure. Then the next step, only if it worked.</p>
          <div className="arc-rule v2-arc" aria-hidden="true" />
        </section>

        <section className="v2-section v2-light" aria-labelledby="steps-title">
          <div className="v2-band v2-band-slabs" aria-hidden="true" />
          <p className="system-label v2-index">01 / The steps</p>
          <h2 id="steps-title" className="v2-visually-hidden">The steps</h2>
          <ol className="v2-timeline">
            <li className="v2-s1"><span className="v2-dot" aria-hidden="true" /><strong>First Look</strong><span className="v2-time">2 to 3 weeks</span><p>How AI will change your business, and the first move.</p></li>
            <li className="v2-s2"><span className="v2-dot" aria-hidden="true" /><strong>Embed</strong><span className="v2-time">60 to 90 days</span><p>One place, one measure, a working build.</p></li>
            <li className="v2-s3"><span className="v2-dot" aria-hidden="true" /><strong>Run and Improve</strong><span className="v2-time">Until it holds</span><p>Then we hand it over. It is yours.</p></li>
            <li className="v2-s4"><span className="v2-dot" aria-hidden="true" /><strong>Your intelligence layer</strong><span className="v2-time">Over time</span><p>Each step adds to a layer built on your own judgement.</p></li>
          </ol>
        </section>

        <section className="v2-section v2-dark v2-split v2-sample-section" aria-labelledby="map-title">
          <div>
            <p className="system-label v2-index">02 / The First Look</p>
            <h2 id="map-title">
              <span className="heading-line">See your business</span>
              <span className="heading-line">the way AI will.</span>
            </h2>
            <p className="v2-body">We map where AI helps you, where it threatens you, and where a few people&apos;s judgement matters most. Then we pick one place to start.</p>
          </div>
          <figure className="v2-sample">
            <FirstLookMap />
            <figcaption className="system-label">Illustration · an example business</figcaption>
          </figure>
        </section>

        <section className="v2-section v2-light" aria-labelledby="faq-title">
          <div className="v2-band v2-band-both" aria-hidden="true" />
          <p className="system-label v2-index">03 / Common questions</p>
          <h2 id="faq-title" className="v2-visually-hidden">Common questions</h2>
          <dl className="v2-faq">
            {faqs.map(([q, a]) => (
              <div key={q}><dt>{q}</dt><dd>{a}</dd></div>
            ))}
          </dl>
        </section>

        <Close where="how_it_works_close" />
      </main>
      <SiteFooter />
    </>
  );
}
