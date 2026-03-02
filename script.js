// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Form submission ──
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const email     = document.getElementById('email').value.trim();

  if (!firstName || !email) {
    if (!firstName) {
      const el = document.getElementById('firstName');
      el.style.borderColor = '#e05c5c';
      el.addEventListener('input', () => el.style.borderColor = '', { once: true });
    }
    if (!email) {
      const el = document.getElementById('email');
      el.style.borderColor = '#e05c5c';
      el.addEventListener('input', () => el.style.borderColor = '', { once: true });
    }
    return;
  }

  const btn = this.querySelector('.submit-btn');
  btn.textContent = 'Enviando…';
  btn.disabled = true;

  // 👉 Replace 'xyzabcde' with your actual Formspree form ID
  fetch('https://formspree.io/f/xdalrgzp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      email,
      lastName: document.getElementById('lastName').value,
      whatsapp: document.getElementById('whatsapp').value,
      goal:     document.getElementById('goal').value,
    })
  })
  .then(res => {
    if (res.ok) {
      btn.style.display = 'none';
      document.getElementById('successToast').classList.add('show');
      this.reset();
    } else {
      btn.textContent = 'Algo salió mal — intenta de nuevo';
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = 'Algo salió mal — intenta de nuevo';
    btn.disabled = false;
  });
});
