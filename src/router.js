const routes = {}

export function registerRoute(path, handler) {
  routes[path] = handler
}

export function navigateTo(path) {
  history.pushState({}, '', path)
  resolve(path)
}

export function resolve(path) {
  const handler = routes[path] ?? routes['*']
  handler?.()
}

window.addEventListener('popstate', () => resolve(location.pathname))