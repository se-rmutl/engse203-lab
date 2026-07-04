# ENGSE203 Learning Dashboard — Instructor Solution

> **Internal teaching material — do not push this folder to the public/student Course Repository.**

## Scope

This is a completed reference implementation for **LAB 02 — Modern JavaScript, Modules & Async Data**.

It demonstrates:

- ES Modules: `api.js`, `utils.js`, `ui.js`, `main.js`
- Modern JavaScript: destructuring, spread syntax, arrow functions, `map`, `filter`, `reduce`, nullish coalescing
- `fetch`, `async/await`, `response.ok`, `try/catch/finally`
- UI states: loading, success, error, empty result
- Vite scripts: dev, build, preview, check
- Static deployment output in `docs/` for GitHub Pages

## Run locally

```bash
npm install
npm run check
npm run dev
```

Open the URL reported by Vite. Because `vite.config.js` has a GitHub Pages base path, use the URL that includes the repository path.

## Test cases

Normal state:

```text
http://localhost:5173/engse203-lab02-solution/
```

Error state:

```text
http://localhost:5173/engse203-lab02-solution/?simulateError=1
```

Build:

```bash
npm run build
npm run preview
```

## Deployment note

Before reusing this solution in another repository, change `repositoryName` in `vite.config.js` to exactly match the GitHub repository name, then run `npm run build` and commit the generated `docs/` folder. Configure GitHub Pages to deploy `main /docs`.

## Teaching note

The solution intentionally favors readable code and clear separation of responsibility over feature density. Students may use a different visual design or function names, but they must still satisfy the observable behavior and technical criteria in the rubric.

## v1.2 Local development hotfix

The JSON loader uses:

```js
const url = `${import.meta.env.BASE_URL}data/learning-tasks.json`;
```

This is intentional: it supports Vite's `base` path in both local development and GitHub Pages. See [`FIX_INVALID_BASE_URL.md`](./FIX_INVALID_BASE_URL.md).
