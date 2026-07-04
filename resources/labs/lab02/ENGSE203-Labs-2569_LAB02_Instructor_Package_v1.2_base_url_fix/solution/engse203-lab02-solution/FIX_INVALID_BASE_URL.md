# Fix: `Failed to construct 'URL': Invalid base URL`

## Cause

In an earlier solution package, `src/api.js` used this pattern:

```js
new URL("data/learning-tasks.json", import.meta.env.BASE_URL)
```

In Vite, `import.meta.env.BASE_URL` is commonly a public **path**, for example:

```text
/engse203-lab02-solution/
```

That path is correct for `fetch()`, but it is not an absolute URL such as `http://localhost:5173/...`. Therefore the browser rejects it as the `base` argument of `new URL()`.

## Correct implementation

`src/api.js` in this v1.2 package has been corrected to use the Vite public base path directly:

```js
const url = `${import.meta.env.BASE_URL}data/learning-tasks.json`;
const response = await fetch(url);
```

This works both for local development and when the project is published under the GitHub Pages repository path.

## Apply the hotfix to an existing extracted project

Open `src/api.js` and replace these two lines:

```js
const url = new URL("data/learning-tasks.json", import.meta.env.BASE_URL);
const response = await fetch(url);
```

with:

```js
const url = `${import.meta.env.BASE_URL}data/learning-tasks.json`;
const response = await fetch(url);
```

Then restart Vite:

```bash
Ctrl+C
npm run dev
```

Before deployment, rebuild:

```bash
npm run check
npm run build
npm run preview
```
