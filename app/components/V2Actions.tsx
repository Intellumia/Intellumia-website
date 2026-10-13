export const BOOK = 'https://cal.com/meetsk/30';
export const WHATSAPP = 'https://wa.me/918855884042';

export default function Actions({ where }: { where: string }) {
  return (
    <div className="v2-actions">
      <a className="button-primary" href={BOOK} target="_blank" rel="noopener noreferrer" data-analytics-event="book_call_click" data-analytics-location={where}>
        Book a call <span aria-hidden="true">↗</span>
      </a>
      <a className="button-secondary" href={WHATSAPP} target="_blank" rel="noopener noreferrer" data-analytics-event="whatsapp_click" data-analytics-location={where}>
        Message on WhatsApp <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
