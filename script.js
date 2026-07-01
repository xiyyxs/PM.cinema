const playerBtn = document.getElementById('playerBtn');

playerBtn?.addEventListener('click', () => {
  const screen = playerBtn.closest('.player-screen');
  const label = screen?.querySelector('.player-empty strong');
  const hint = screen?.querySelector('.player-empty span');

  if (label && hint) {
    label.textContent = 'Плеєр поки порожній';
    hint.textContent = 'Сюди можна буде вставити iframe або пряме посилання на відео.';
  }

  playerBtn.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(0.92)' },
      { transform: 'scale(1)' }
    ],
    { duration: 260, easing: 'ease-out' }
  );
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.16 });

document.querySelectorAll('.reveal').forEach((el) => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});
