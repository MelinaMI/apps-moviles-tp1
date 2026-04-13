import './genres.css'

import { getAll } from '../../services/genreService.js';
import { GenreCard, GenreCardSkeleton } from '../../components/genreCard.js';

export async function genresPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <section class="genres">
      <header class="genres__header">
        <h1 class="genres__title">Géneros</h1>
        <p class="genres__subtitle">Explorá por categoría</p>
      </header>

      <div id="genres-grid" class="genres__grid" role="list">
        </div>

      <div id="genres-error" class="genres__error" hidden>
        <p id="genres-error-msg"></p>
        <button id="genres-retry" class="btn-retry" type="button">Reintentar</button>
      </div>
    </section>
  `;

  loadGenres();
}

async function loadGenres() {
  const grid = document.getElementById('genres-grid');
  const errorContainer = document.getElementById('genres-error');
  const errorMsg = document.getElementById('genres-error-msg');
  const retryBtn = document.getElementById('genres-retry');

  //Mostrar Skeletons mientras carga
  grid.innerHTML = Array.from({ length: 12 }, () => GenreCardSkeleton()).join('');
  errorContainer.hidden = true;

  try {
    const { results: genres } = await getAll(); //llamada a la API

    //Renderiza las cards reales usando componente GenreCard
    grid.innerHTML = genres
      .map((genre, index) => GenreCard(genre, index))
      .join('');

  } catch (err) {
    //Manejo de errores
    grid.innerHTML = '';
    errorMsg.textContent = err.message || 'No se pudieron cargar los géneros. Revisá tu conexión.';
    errorContainer.hidden = false;

    //Configurar reintento
    retryBtn.onclick = () => loadGenres();
  }
}