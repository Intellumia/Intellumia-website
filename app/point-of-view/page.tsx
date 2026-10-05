import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

export const metadata: Metadata = {
  title: 'Our point of view | Intellumia',
  description:
    'Intellumia’s thesis v0.3: intelligence is free, judgement is the moat, and the layer a company’s judgement lives on should be its own. With sources, and what would change our mind.',
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

function N({ n }: { n: number }) {
  return (
    <sup className="essay-note-ref">
      <a href={`#note-${n}`} id={`ref-${n}`} aria-label={`Note ${n}`}>
        {n}
      </a>
    </sup>
  );
}

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
              <span>Thesis v0.3, 5 October 2026</span>
            </div>
            <h1 id="pov-title">
              Intelligence is free. <em>Judgement is the moat.</em>
            </h1>
            <div className="pov-hero-copy">
              <p>
                Every company will become an intelligent organisation, running on the
                same frontier models as its competitors, so the models cannot be what
                sets it apart. What sets it apart is judgement: which customer to
                keep, which risk to carry, when to stop. That judgement either leaks
                into someone else&apos;s model or lives on a layer the company owns.
              </p>
              <p>
                We build that layer, inside the company&apos;s own teams, one decision at a
                time. Own the layer your judgement lives on, or someone else will.
              </p>
            </div>
          </div>
          <aside className="pov-status" aria-label="Evidence status">
            <span className="system-label">Evidence posture</span>
            <p>Bold in direction. Exact in evidence.</p>
            <span>Sundeep Kumar, Founder &amp; CEO. Reviewed April 2027.</span>
          </aside>
        </section>

        <section className="essay-section" aria-labelledby="premise-title">
          <div className="section-number system-label">01 / The premise</div>
          <div className="essay-body">
            <h2 id="premise-title">Every company will become an intelligent organisation.</h2>
            <p>
              We do not argue that here. It is the ground we stand on, in the way that
              every company eventually became a software company, and the ones that
              waited paid for it.
            </p>
            <p>
              Transformation has kept organisations alive through every earlier wave,
              and the good ones transform again. This essay is about what comes next:
              how the change happens, and who ends up owning what when it does.
            </p>
            <p>
              We hold ourselves to one rule in writing it. Bold in direction, exact in
              evidence. Where a claim rests on a source, you will find it in the notes
              at the end. Where it rests on conviction, we say so.
            </p>
          </div>
        </section>

        <section className="essay-section essay-alt" aria-labelledby="free-title">
          <div className="section-number system-label">02 / Intelligence is free</div>
          <div className="essay-body">
            <h2 id="free-title">Same models, same company.</h2>
            <p>
              Frontier models now supply, at close to zero marginal cost, most of what
              a company once paid its people and its advisers to know. Analysis,
              drafting, research and a competent first view on routine questions are
              all metered services, sold on the same terms to every competitor.
            </p>
            <p>
              The consequence is one most companies have not yet noticed. Two firms
              running the same models, on the same vendor playbooks, with the same
              prompts, converge on the same decisions. Undifferentiated intelligence
              has become a cost of doing business, like electricity. It keeps you in
              the game and wins you nothing.
            </p>
            <p>What wins is what a competitor cannot buy.</p>
            <p className="essay-pull">
              Intelligence is free. <em>Judgement is the moat.</em>
            </p>
          </div>
        </section>

        <section className="essay-section" aria-labelledby="lives-title">
          <div className="section-number system-label">03 / Where judgement lives</div>
          <div className="essay-body">
            <h2 id="lives-title">Three things happen to it.</h2>
            <p>
              Judgement is the set of calls that makes one company different from the
              next: which customer to keep, which risk to carry, when to stop, who to
              trust. It is rarely written down. It sits in the heads of a few people
              and in the habits of the organisation around them.
            </p>
            <p>
              <strong>It stays in a few heads.</strong> The calls that set you apart
              are made by a handful of people, case by case, and explained to no one.
            </p>
            <p>
              <strong>It leaves when they do.</strong> Succession, growth and attrition
              take the reasoning with them. The next similar decision starts from
              nothing.
            </p>
            <p>
              <strong>It converges on the vendor&apos;s playbook.</strong> Each time someone
              types a decision into another company&apos;s model, some of your judgement
              goes in and some of the vendor&apos;s generic answer comes back. Satya Nadella
              put it as paying for intelligence twice: once in money, and again in the
              proprietary knowledge you must reveal to make it useful.
              <N n={1} />
            </p>
          </div>
        </section>

        <section className="essay-section essay-dark" aria-labelledby="trust-title">
          <div className="section-number system-label">04 / Trust</div>
          <div className="essay-body">
            <h2 id="trust-title">
              Private inference protects your data. Nothing protects your judgement.
            </h2>
            <p>
              The model makers have heard the data concern and answered it. OpenAI&apos;s
              Private Intelligence, announced at DevDay on 29 September 2026, offers
              zero data retention, safety review without its staff seeing your
              content and, from this autumn, private inference on confidential
              computing. Its promise is that you do not have to let them see it.
              <N n={3} />
            </p>
            <p>
              That is real progress on a real problem: your data in flight. In the
              software era a clause like that would have settled the matter, because
              terms and conditions governed what a vendor could do.
            </p>
            <p>
              This is not the software era. The people who build these systems say
              they do not fully understand them. Dario Amodei wrote in April 2025 that
              people are surprised and alarmed to learn that the makers do not
              understand how their own creations work.
              <N n={4} /> Controlled tests by OpenAI and Apollo Research found
              behaviour consistent with hidden misalignment in frontier models from
              several labs, and noted that models often become more aware of being
              evaluated.
              <N n={5} /> Anthropic and Redwood Research showed a model complying with
              its training strategically while keeping its original preferences.
              <N n={6} />
            </p>
            <p>
              None of that says today&apos;s models are a danger to your business. It says
              control is moving, slowly, from the contract to a system its makers
              cannot fully inspect, and that the trust a clause assumes has not been
              built yet. No clause builds it.
            </p>
            <p>
              So private inference protects your data. Nothing protects your
              judgement. It stays in a few heads, leaves when they do, and converges on
              the vendor&apos;s playbook every time a decision is typed into someone
              else&apos;s model. The only protection is ownership.
            </p>
            <p className="essay-pull">
              Own the layer. Rent the model. <em>Trust nothing you cannot see.</em>
            </p>
          </div>
        </section>

        <section className="essay-section" aria-labelledby="layer-title">
          <div className="section-number system-label">05 / The layer</div>
          <div className="essay-body">
            <h2 id="layer-title">Organisations forget. Models don&apos;t.</h2>
            <p>
              The layer is a company&apos;s own system of evidence, memory, permissions and
              decisions: what it knew, who decided, on what evidence, and what
              followed. It is owned and controlled by the company, on any model it
              chooses. We call that sovereign, and we mean exactly that. We never mean
              data residency.
            </p>
            <p>
              Any model can be given access to the layer. No model owns it. BCG reached
              the same conclusion from the vendor lock-in side in August: own the
              content, rent the containers, and buy or build the components from the
              best available.
              <N n={2} />
            </p>
            <p>
              Organisations forget. The reasoning behind a decision is usually gone
              within months, and the next similar decision starts from nothing. Models
              do not forget. A company that turns each decision, with its evidence,
              options and outcome, into memory the next decision can use stops
              repeating itself and starts to compound. That compounding, inside the
              company&apos;s own boundary, is what an intelligent organisation is. It is
              also why the layer grows more valuable with age and harder to replace.
            </p>
            <p>
              The obvious objection is that models will learn judgement from the traces
              anyway. They may. Whoever holds the decision record, its permissions and
              its outcomes holds the asset, on any model, and capability can feed from
              it later on whichever model earns the trust. Ownership today is what
              keeps that choice yours.
            </p>
          </div>
        </section>

        <section className="essay-section essay-alt" aria-labelledby="decision-title">
          <div className="section-number system-label">06 / How it happens</div>
          <div className="essay-body">
            <h2 id="decision-title">Start at the decision, not the task.</h2>
            <p>
              AI does not change a company when it automates a task. That produces a
              faster version of the same company. It changes a company when it changes
              a decision: who makes it, what evidence sits in front of them, what the
              organisation remembers afterwards and what it does differently next time.
              Decisions are where judgement is exercised, so decisions are where the
              layer is built.
            </p>
            <p>
              So we do not begin with a platform. We begin with one material decision
              and an embed: a fixed window inside your company, on that decision, with
              a number agreed before we start. Three moves follow. Establish the
              baseline. Change the work. Measure the outcome. Each decision leaves the
              layer a little larger, and none of it arrives as a rollout.
            </p>
            <p>
              Where you are today is where the work starts. We do not arrive with a
              product and ask you to fit it. That is why we embed in your teams: the
              starting point is yours, not ours.
            </p>
          </div>
        </section>

        <section className="essay-section" aria-labelledby="moat-title">
          <div className="section-number system-label">07 / Whose moat</div>
          <div className="essay-body">
            <h2 id="moat-title">Your judgement is your moat. It is never ours.</h2>
            <p>
              What we bring is the method that takes a company from where it is to a
              layer it owns, and the platform that method becomes, so the next company
              gets there faster.
            </p>
            <p>
              We are a software company that starts inside its clients rather than
              with a demo. The platform is a thesis, being tested with clients, and we
              say so plainly. <Link href="/lab">The Lab</Link> shows what runs today and
              what does not.
            </p>
            <p>
              This is not a pilot, a consulting engagement or a retainer. We are not
              the answer to every problem, and we are not experts in every problem. We
              will never tell you that only Intellumia can solve it. What we build with
              you belongs to you.
            </p>
          </div>
        </section>

        <section className="essay-section essay-alt" aria-labelledby="mind-title">
          <div className="section-number system-label">08 / What would change our mind</div>
          <div className="essay-body">
            <h2 id="mind-title">A thesis that cannot be wrong is a slogan.</h2>
            <p>
              We would revise this one if we found any of the following, and we will
              review it against our evidence in April 2027.
            </p>
            <ol className="essay-list">
              <li>
                <strong>Judgement does not codify.</strong> If, in real embeds, most of
                a company&apos;s judgement cannot be made explicit enough to improve a
                decision, the layer is thinner than we think and the method has to
                change.
              </li>
              <li>
                <strong>The vendors give customers the layer.</strong> If model makers
                offer durable memory that a customer owns, controls and can take to
                another model, ownership stops being a separate problem and our value
                narrows to the method.
              </li>
              <li>
                <strong>Models match good judgement without the company&apos;s own record.</strong>{' '}
                If a generic model, given no company history, decides as well as the
                company&apos;s best people, the moat claim fails.
              </li>
              <li>
                <strong>Companies choose convenience over control.</strong> If, once the
                trust argument is understood, buyers still hand their decisions to a
                single vendor, ownership is a view we hold and the market does not.
              </li>
            </ol>
          </div>
        </section>

        <section className="essay-section" aria-labelledby="investors-title">
          <div className="section-number system-label">09 / For investors</div>
          <div className="essay-body">
            <h2 id="investors-title">The same thesis, in investor terms.</h2>
            <p>
              Nothing here changes the argument above. It names the market the
              argument implies.
            </p>
            <p>
              <strong>Alpha.</strong> The judgement that makes one company different is
              its alpha. The only place it can compound is a layer the company owns.
            </p>
            <p>
              <strong>Memory.</strong> Organisations forget and models do not. A layer
              that turns each decision into memory the next one can use grows more
              valuable with age and is harder to replace.
            </p>
            <p>
              <strong>Context.</strong> The constraint on enterprise AI is no longer the
              capability of the model. It is that nobody inside the company owns its
              context: the evidence, permissions, memory and judgement a machine needs
              in order to act well on its behalf. Model vendors cannot own it without
              the company losing its edge. Integrators do not stay long enough.
              Internal IT was never asked to. Whoever builds and holds that layer for a
              company holds the position that matters in the next decade of enterprise
              software. That is our conviction, not a measured fact.
            </p>
            <p>
              <strong>Our own moat.</strong> It is the method and the platform the
              method becomes, never the client&apos;s judgement. Each embed is the evidence
              engine for what turns out to be repeatable. The sequence runs trust,
              revenue, intelligence, reusable IP, product, platform, and it is
              conditional: client work does not automatically become reusable IP,
              repeated delivery does not automatically justify software, and the
              platform waits for repeated value, explicit rights, technical
              feasibility and sound economics.
            </p>
          </div>
        </section>

        <section className="essay-section essay-notes" aria-labelledby="notes-title">
          <div className="section-number system-label">Notes and sources</div>
          <div className="essay-body">
            <h2 id="notes-title">Where each claim comes from.</h2>
            <p>
              Each source below was opened on 5 October 2026. Where we describe a
              source, we describe what it says and nothing more.
            </p>
            <ol className="essay-list essay-sources">
              <li id="note-1">
                Satya Nadella, &ldquo;Reverse Information Paradox&rdquo;, essay posted on X,{' '}
                <a href="https://x.com/satyanadella/status/2076323181154230284" target="_blank" rel="noopener noreferrer">
                  12 July 2026
                </a>
                ; reported by{' '}
                <a href="https://www.outlookbusiness.com/deeptech/reverse-information-paradox-satya-nadella-explains-how-firms-can-protect-their-ip-in-ai-age" target="_blank" rel="noopener noreferrer">
                  Outlook Business
                </a>{' '}
                and{' '}
                <a href="https://thenextweb.com/news/nadella-reverse-information-paradox-ai-ip" target="_blank" rel="noopener noreferrer">
                  The Next Web
                </a>
                . <a href="#ref-1" aria-label="Back to text">↑</a>
              </li>
              <li id="note-2">
                Aaron Arnoldsen, Rich Lesser, Djon Kleine and Sanjeev Reddy,{' '}
                <a href="https://www.bcg.com/publications/2026/how-ceos-avoid-ai-vendor-lock-in-risk" target="_blank" rel="noopener noreferrer">
                  Do You Own Your Enterprise Cortex?
                </a>
                , BCG, 6 August 2026. <a href="#ref-2" aria-label="Back to text">↑</a>
              </li>
              <li id="note-3">
                OpenAI, Private Intelligence, announced at DevDay on 29 September 2026;
                described in{' '}
                <a href="https://venturebeat.com/security/openais-new-private-intelligence-targets-a-growing-enterprise-concern-who-can-see-your-ai-data" target="_blank" rel="noopener noreferrer">
                  VentureBeat
                </a>
                . Private inference is listed there as arriving in autumn 2026.{' '}
                <a href="#ref-3" aria-label="Back to text">↑</a>
              </li>
              <li id="note-4">
                Dario Amodei,{' '}
                <a href="https://darioamodei.com/post/the-urgency-of-interpretability" target="_blank" rel="noopener noreferrer">
                  The Urgency of Interpretability
                </a>
                , April 2025. <a href="#ref-4" aria-label="Back to text">↑</a>
              </li>
              <li id="note-5">
                OpenAI and Apollo Research,{' '}
                <a href="https://openai.com/index/detecting-and-reducing-scheming-in-ai-models/" target="_blank" rel="noopener noreferrer">
                  Detecting and reducing scheming in AI models
                </a>
                , 17 September 2025. <a href="#ref-5" aria-label="Back to text">↑</a>
              </li>
              <li id="note-6">
                Anthropic, Redwood Research, New York University and Mila,{' '}
                <a href="https://www.alphaxiv.org/abs/2412.14093" target="_blank" rel="noopener noreferrer">
                  Alignment faking in large language models
                </a>
                , 20 December 2024. <a href="#ref-6" aria-label="Back to text">↑</a>
              </li>
            </ol>
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
