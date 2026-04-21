const key = 'favorites';

export function getFavoriteGames() {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function addFavoriteGame(game, extraData = {}) {
    const favorites = getFavoriteGames();
    if (!favorites.some(g => g.id === game.id)) {
        favorites.push(mapGame(game, extraData));
        localStorage.setItem(key, JSON.stringify(favorites));
    } 
}

export function removeFavoriteGame(gameId) {
    const favorites = getFavoriteGames();
    const updatedFavorites = favorites.filter(g => g.id !== gameId);
    localStorage.setItem(key, JSON.stringify(updatedFavorites));
}

export function isFavoriteGame(gameId) {
    const favorites = getFavoriteGames();
    return favorites.some(g => g.id === gameId);
}   

export function hasFavorites() {
  return getFavoriteGames().length > 0;
}   
function mapGame(game, extraData = {}) {
  return {
    id: game.id,
    name: game.name,
    image: game.background_image,
    priority: extraData.priority || 0,
    category: extraData.category || 'Uncategorized',
    note: extraData.note || '',
  };
}