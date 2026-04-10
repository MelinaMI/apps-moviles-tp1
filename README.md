# Project Name

A vanilla JavaScript and CSS project with no frameworks or bundlers.

---

## File Structure

```
my-app/
  src/
    api/
      client.js         Base fetch wrapper. The only place fetch() is called.
    services/
      userService.js    Business logic. Calls api/, never fetch() directly.
    store/
      appStore.js       Reactive state. Plain objects with subscribe/set/get.
    components/
      UserCard.js       Render function that returns a DOM element.
      UserCard.css      Styles scoped to this component only.
    pages/
      home.js           Orchestrates components and services for a route.
      profile.js
    router.js           Maps URL paths to page handler functions.
    main.js             App entry point. Registers routes and boots the app.
  public/
    index.html          Single HTML file. Loads styles and main.js.
  styles/
    reset.css           Browser normalization.
    tokens.css          CSS custom properties (colors, spacing, typography).
    globals.css         Base element styles (body, a, h1-h6, img).
  .env                  Environment variables. Never committed.
  .env.example          Template showing which variables are required.
  .gitignore
  README.md
```

---

## Layer Rules

**api/client.js** owns all fetch calls. It handles headers, error throwing, and JSON parsing. Nothing else imports fetch or calls it directly.

**services/** contains functions that map to domain actions (`getUsers`, `createUser`). They call `api/`, return data, and have no knowledge of the DOM or store.

**store/** holds application state in a single plain object. Components and pages read from it via `get()`, write to it via `set()`, and react to changes via `subscribe()`. No external library needed.

**components/** are pure render functions. They receive data as arguments and return DOM elements or HTML strings. They never fetch or write to the store directly.

**pages/** are the orchestrators. They call services, update the store, and mount components into `#app`. One file per route.

**router.js** maps URL paths to page handler functions using `history.pushState`. Pages are loaded on navigation and on `popstate`.

**styles/** has a strict three-file separation: reset (browser normalization), tokens (all CSS variables), globals (element-level base styles). Component-specific styles live next to their component file.

## Conventions
- One export per service file.
- Components never import from pages.
- Pages never import from other pages.
- Utils are pure functions with no side effects.
- CSS variables are defined only in `tokens.css`.



## Sorces:
- https://gomakethings.com/how-i-structure-my-vanilla-js-projects/