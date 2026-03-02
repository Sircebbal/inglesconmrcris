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
  const level     = document.getElementById('level').value;

  // Basic validation — highlight empty required fields
  if (!firstName || !email || !level) {
    const empties = [];
    if (!firstName) empties.push('firstName');
    if (!email)     empties.push('email');
    if (!level)     empties.push('level');

    empties.forEach(id => {
      const el = document.getElementById(id);
      el.style.borderColor = '#e05c5c';
      el.addEventListener('input', () => el.style.borderColor = '', { once: true });
    });
    return;
  }

  const btn = this.querySelector('.submit-btn');
  btn.textContent = 'Sending…';
  btn.disabled = true;

  // 👉 Replace 'xyzabcde' with your actual Formspree form ID
  fetch('https://formspree.io/f/xdalrgzp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstName,
      email,
      level,
      lastName: document.getElementById('lastName').value,
      whatsapp: document.getElementById('whatsapp').value,
      goal: document.getElementById('goal').value,
    })
  })
  .then(res => {
    if (res.ok) {
      btn.style.display = 'none';
      document.getElementById('successToast').classList.add('show');
      this.reset();
    } else {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
    }
  })
  .catch(() => {
    btn.textContent = 'Something went wrong — try again';
    btn.disabled = false;
  });
});