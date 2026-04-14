import './GenreCard.css'

  export function GenreCard(genre, index = 0) {
      const count = genre.games_count?.toLocaleString('es-AR') ?? '—'
      const delay = (index % 8) * 40
      
      return `
      <article class="genre-card" role="listitem" style="animation-delay:${delay}ms">
        <a class="genre-card__link" href="/search?genre=${genre.slug}" data-link aria-label="Ver juegos de ${genre.name}">
          <div class="genre-card__img-wrapper">
            <img
              class="genre-card__img"
              src="${genre.image_background ?? ''}"
              alt="${genre.name}"
              loading="lazy"
              onerror="this.closest('.genre-card__img-wrapper').classList.add('genre-card__img-wrapper--fallback')"
            />
            <div class="genre-card__overlay"></div>
            
            <div class="genre-card__info-overlay">
              <h2 class="genre-card__name">${genre.name}</h2>
              <p class="genre-card__count">${count} juegos</p>
            </div>
          </div>
        </a>
      </article>
    `
  }

export function GenreCardSkeleton() {
  return `
    <div class="genre-card genre-card--skeleton" aria-hidden="true">
      <div class="genre-card__img-wrapper skeleton-box"></div>
      <div class="genre-card__body">
        <div class="skeleton-line skeleton-line--title"></div>
        <div class="skeleton-line skeleton-line--sub"></div>
      </div>
    </div>
  `
}

