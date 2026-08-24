(() => {
  const emailAddress = 'connect@intellumia.com';
  const input = document.querySelector('#conversation-email');
  const button = document.querySelector('#copy-email-address');
  const status = document.querySelector('#copy-email-status');

  if (!(input instanceof HTMLInputElement) || !(button instanceof HTMLButtonElement) || !status) {
    return;
  }

  input.addEventListener('focus', () => input.select());

  button.addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(emailAddress);
      } else {
        input.focus();
        input.select();

        if (!document.execCommand('copy')) {
          throw new Error('Copy command was not available.');
        }
      }

      status.textContent = 'Email address copied.';
    } catch {
      input.focus();
      input.select();
      status.textContent = 'Copy did not work. The address is selected for you to copy.';
    }
  });
})();
