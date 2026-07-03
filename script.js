let currentPage = 'home';

function openPage(page, scrollTop = true) {
  currentPage = page;
  document.querySelectorAll('.page-view').forEach((section) => {
    section.classList.toggle('hidden', section.id !== `${page}-page`);
  });
  if (scrollTop) window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatTime(value) {
  if (!Number.isFinite(value)) return '0:00';
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function initCustomPlayer(player) {
  const video = player.querySelector('video');
  const playButtons = player.querySelectorAll('[data-play]');
  const progress = player.querySelector('[data-progress]');
  const time = player.querySelector('[data-time]');
  const mute = player.querySelector('[data-mute]');
  const fullscreen = player.querySelector('[data-fullscreen]');

  if (!video || !progress || !time) return;

  function setPlayingState() {
    player.classList.toggle('is-playing', !video.paused);
  }

  function updateTime() {
    const duration = video.duration || 0;
    const percent = duration ? (video.currentTime / duration) * 100 : 0;
    progress.value = percent;
    progress.style.setProperty('--progress', `${percent}%`);
    time.textContent = `${formatTime(video.currentTime)} / ${formatTime(duration)}`;
  }

  async function togglePlay() {
    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        player.classList.remove('is-playing');
      }
    } else {
      video.pause();
    }
  }

  playButtons.forEach((button) => button.addEventListener('click', togglePlay));
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', setPlayingState);
  video.addEventListener('pause', setPlayingState);
  video.addEventListener('loadedmetadata', updateTime);
  video.addEventListener('timeupdate', updateTime);
  video.addEventListener('ended', () => {
    player.classList.remove('is-playing');
    updateTime();
  });

  progress.addEventListener('input', () => {
    const duration = video.duration || 0;
    video.currentTime = duration * (Number(progress.value) / 100);
    updateTime();
  });

  mute?.addEventListener('click', () => {
    video.muted = !video.muted;
    player.classList.toggle('is-muted', video.muted);
  });

  fullscreen?.addEventListener('click', async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    if (player.requestFullscreen) {
      await player.requestFullscreen();
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  });

  updateTime();
}

document.querySelectorAll('[data-player]').forEach(initCustomPlayer);

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
