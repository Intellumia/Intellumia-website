const emailAddress = 'connect@intellumia.com';

export default function CopyEmailAddress() {
  return (
    <div className="copy-email">
      <label className="system-label" htmlFor="conversation-email">
        Email address
      </label>
      <div className="copy-email-control">
        <input
          id="conversation-email"
          type="email"
          value={emailAddress}
          readOnly
          aria-describedby="copy-email-status"
        />
        <button
          id="copy-email-address"
          type="button"
          data-analytics-event="conversation_email_copy"
          data-analytics-location="connect_page"
        >
          Copy address
        </button>
      </div>
      <p id="copy-email-status" className="copy-email-status" role="status" aria-live="polite" />
    </div>
  );
}
