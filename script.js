let currentPage = 'home';

function openPage(page, scrollTop = true) {
  currentPage = page;
  document.querySelectorAll('.page-view').forEach((section) => {
    section.classList.toggle('hidden', section.id !== `${page}-page`);
  });
  if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('.player-start');
  if (!button) return;

  const screen = button.closest('.player-screen');
  const label = screen?.querySelector('.player-empty strong');
  const hint = screen?.querySelector('.player-empty span');

  if (label && hint) {
    label.textContent = 'Плеєр поки порожній';
    hint.textContent = 'Сюди можна буде вставити iframe або пряме посилання на відео.';
  }

  button.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)' },
      { transform: 'translate(-50%, -50%) scale(0.92)' },
      { transform: 'translate(-50%, -50%) scale(1)' }
    ],
    { duration: 260, easing: 'ease-out' }
  );
});
