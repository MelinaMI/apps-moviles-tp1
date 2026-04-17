const routes = {}

export function registerRoute(path, handler) {
  routes[path] = handler
}

export function navigateTo(path) {
  history.pushState({}, '', path)
  resolve(path)
}

export function resolve(path) {
  const cleanPath = path.split('?')[0];
  const handler = routes[cleanPath] ?? routes['*'];
  handler?.();
}

window.addEventListener('popstate', () => resolve(location.pathname))