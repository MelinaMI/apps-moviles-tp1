import './PlatformCard.css'

export function PlatformCard(platform, index = 0) {
  const gamesCount = platform.games_count?.toLocaleString('es-AR') ?? '—';
  const releaseYear = platform.year_start ? `Desde ${platform.year_start}` : '';
  const delay = (index % 8) * 40;

  return `
    <article class="platform-card" role="listitem" style="animation-delay:${delay}ms">
      <a class="platform-card__link" href="/search?platform=${platform.id}" data-link aria-label="Juegos de ${platform.name}">
        <div class="platform-card__img-wrapper">
          <img
            class="platform-card__img"
            src="${platform.image_background ?? ''}"
            alt="${platform.name}"
            loading="lazy"
            
          />
          <div class="platform-card__overlay"></div>
          
          <div class="platform-card__info-overlay">
            <h2 class="platform-card__name">${platform.name}</h2>
            <p class="platform-card__count">${gamesCount} juegos disponibles</p>
          </div>
        </div>
      </a>
    </article>
  `;
}

export function PlatformCardSkeleton() {
  return `
    <div class="platform-card platform-card--skeleton" aria-hidden="true">
      <div class="platform-card__img-wrapper skeleton-box"></div>
      <div class="platform-card__footer">
        <div class="skeleton-line"></div>
      </div>
    </div>
  `;
}