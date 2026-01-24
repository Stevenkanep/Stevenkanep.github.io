const SiteModule = (function () {
  function showMessage(el, text, color) {
    if (!el) return;
    if (typeof el === 'string') el = document.querySelector(el);
    if (!el) return;
    el.textContent = text;
    el.style.color = color || 'red';
  }

  function getOrCreateMsg(form, msgSelector) {
    let msgEl = msgSelector ? document.querySelector(msgSelector) : form.querySelector('p[id$="Msg"], .form-msg');
    if (!msgEl) {
      msgEl = document.createElement('p');
      msgEl.style.marginTop = '10px';
      form.appendChild(msgEl);
    }
    return msgEl;
  }

  // Improved attachSignup: accepts optional msg selector and stores minimal user info
  function attachSignup(formSelector, msgSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    const msg = getOrCreateMsg(form, msgSelector);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const first = form.querySelector('#first')?.value?.trim() || '';
      const last = form.querySelector('#last')?.value?.trim() || '';
      const email = form.querySelector('#su-email')?.value?.trim() || '';
      const pass1 = form.querySelector('#su-pass')?.value || '';
      const pass2 = form.querySelector('#su-pass2')?.value || '';

      if (pass1.length < 6) {
        showMessage(msg, 'Password must be at least 6 characters.');
        return;
      }
      if (pass1 !== pass2) {
        showMessage(msg, 'Passwords do not match.');
        return;
      }

      // store placeholder user in localStorage so login can work (this is client-only)
      try {
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', (first + ' ' + last).trim());
      } catch (err) {
        // ignore storage errors
      }

      showMessage(msg, 'Account created (placeholder). Redirecting…', 'green');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 900);
    });
  }

  // New: attachLogin
  function attachLogin(formSelector, msgSelector) {
    const form = document.querySelector(formSelector);
    if (!form) return;
    const msg = getOrCreateMsg(form, msgSelector);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = form.querySelector('#loginEmail')?.value?.trim() || '';
      const pass = form.querySelector('#loginPassword')?.value || '';

      if (!email || !pass) {
        showMessage(msg, 'Please enter email and password.');
        return;
      }

      // If a user_email exists in storage and doesn't match, show message
      const stored = localStorage.getItem('user_email');
      if (stored && stored !== email) {
        showMessage(msg, 'No account found for this email.');
        return;
      }

      // "Log in" (placeholder): store the email and redirect to profile
      try {
        localStorage.setItem('user_email', email);
      } catch (err) {}

      showMessage(msg, 'Signed in. Redirecting…', 'green');
      setTimeout(() => {
        window.location.href = 'profile.html';
      }, 600);
    });
  }

  function login(email) {
    try {
      localStorage.setItem('user_email', email);
    } catch (e) {}
    return true;
  }

  function logout() {
    try {
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_name');
    } catch (e) {}
  }

  return {
    attachSignup,
    attachLogin,
    login,
    logout
  };
})();