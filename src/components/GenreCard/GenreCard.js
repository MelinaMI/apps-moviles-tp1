import './GenreCard.css'
import templateHTML from './GenreCard.html?raw'

let template = null;

function initTemplate() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = templateHTML.trim();
  template = wrapper.firstElementChild;
}

export function GenreCard(genre, index = 0) {
  if (!template) initTemplate();

  const node = template.cloneNode(true);

  const find = (ref) => node.querySelector(`[data-ref="${ref}"]`);

  const count = genre.games_count?.toLocaleString('es-AR') ?? '—';
  const delay = (index % 8) * 40;


  const link = find('link');
  link.href = `/search?genre=${genre.slug}`;
  link.setAttribute('aria-label', `Ver juegos de ${genre.name}`);


  const img = find('image');
  img.src = genre.image_background ?? '';
  img.alt = genre.name;

  img.onerror = () => {
    find('img-wrapper')?.classList.add('genre-card__img-wrapper--fallback');
  };


  find('name').textContent = genre.name;
  find('count').textContent = `${count} juegos`;


  node.style.animationDelay = `${delay}ms`;

  return node;
}


