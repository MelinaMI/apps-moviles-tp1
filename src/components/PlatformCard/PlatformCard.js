import './PlatformCard.css';
import templateHTML from './PlatformCard.html?raw';

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML.trim();
  template = wrapper.firstElementChild;
}

export function PlatformCard(platform, index = 0) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);

  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  const gamesCount = platform.games_count?.toLocaleString('es-AR') ?? '—';
  const delay = (index % 8) * 40;

  const link = find('link');
  link.href = `/search?platform=${platform.id}`;
  link.setAttribute('aria-label', `Juegos de ${platform.name}`);

  const img = find('image');
  img.src = platform.image_background ?? '';
  img.alt = platform.name;

  img.onerror = () => {
    find('img-wrapper')?.classList.add('platform-card__img-wrapper--fallback');
  };

  find('name').textContent = platform.name;
  find('count').textContent = `${gamesCount} juegos disponibles`;

  node.style.animationDelay = `${delay}ms`;

  return node;
}