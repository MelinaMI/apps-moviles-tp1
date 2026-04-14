import './platforms.css'
import { getAll } from '../../services/platformService.js';
import { PlatformCard, PlatformCardSkeleton } from '../../components/platformCard.js';

export async function platformsPage() {
    const app = document.getElementById('app')
    app.innerHTML = `
    <section class="platforms">
      <header class="platforms__header">
        <h1 class="platforms__title">Plataformas</h1>
        <p class="platforms__subtitle">Filtrar por consola o sistema</p>
      </header>

      <div id="platforms-grid" class="platforms__grid" role="list">
        </div>

      <div id="platforms-error" class="platforms__error" hidden>
        <p id="platforms-error-msg"></p>
        <button id="platforms-retry" class="btn-retry" type="button">Reintentar</button>
      </div>
    </section>
  `;

  loadPlatforms();
}
async function loadPlatforms() {
  const grid = document.getElementById('platforms-grid');
  const errorContainer = document.getElementById('platforms-error');
  const errorMsg = document.getElementById('platforms-error-msg');
  const retryBtn = document.getElementById('platforms-retry');

 //Mostrar Skeletons mientras carga
  grid.innerHTML = Array.from({ length: 12 }, () => PlatformCardSkeleton()).join('');
  errorContainer.hidden = true;

  try {
    const { results: platforms } = await getAll(); //llamada a la API

    // Renderizado de las cards de plataformas
    grid.innerHTML = platforms
      .map((platform, index) => PlatformCard(platform, index))
      .join('');

  } catch (err) {
    grid.innerHTML = '';
    errorMsg.textContent = err.message || 'Error al cargar las plataformas.';
    errorContainer.hidden = false;

    if (retryBtn) {
      retryBtn.onclick = () => loadPlatforms();
    }
  }
}