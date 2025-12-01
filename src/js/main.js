document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  function showError(name, msg = true) {
    const p = document.querySelector(`[data-error-for="${name}"]`);
    if (!p) return;
    p.textContent = msg === true ? p.textContent : msg;
    p.classList.remove('hidden');
  }
  function hideError(name) {
    const p = document.querySelector(`[data-error-for="${name}"]`);
    if (p) p.classList.add('hidden');
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    const fields = ['prenom','nom','email','objet','message'];
    fields.forEach(f => {
      const el = form.querySelector(`[name="${f}"]`);
      if (!el) return;
      if (!el.value.trim()) {
        ok = false;
        showError(f, 'Ce champ est requis.');
      } else {
        hideError(f);
        if (f === 'email' && !isEmail(el.value.trim())) {
          ok = false;
          showError('email', 'Email invalide.');
        }
      }
    });

    if (!ok) {
      success.classList.add('hidden');
      return;
    }

    // front-only: afficher succès
    success.classList.remove('hidden');
    // reset si tu veux
    // form.reset();
  });
});
