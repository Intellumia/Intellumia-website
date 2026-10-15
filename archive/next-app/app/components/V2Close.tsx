import Actions from './V2Actions';

export default function Close({ where }: { where: string }) {
  return (
    <section className="conversation-section v2-close" aria-labelledby={`close-${where}`}>
      <span className="system-label">Begin with one question</span>
      <h2 id={`close-${where}`}>
        <span>How will AI change</span>
        <span>your business?</span>
      </h2>
      <ol className="v2-next">
        <li>Book a call or send a message.</li>
        <li>Talk to Sundeep about your business.</li>
        <li>Get a short note on whether a First Look makes sense.</li>
      </ol>
      <Actions where={where} />
    </section>
  );
}
