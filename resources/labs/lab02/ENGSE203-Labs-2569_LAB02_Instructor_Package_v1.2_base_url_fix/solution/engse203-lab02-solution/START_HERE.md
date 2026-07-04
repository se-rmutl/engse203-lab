# LAB 02 Starter Files

1. Copy the contents of this folder into your own repository.
2. Run `npm install`.
3. Update the `repositoryName` in `vite.config.js`.
4. Complete every `TODO` in `src/`.
5. Run `npm run check` until it passes.
6. Run `npm run build`, commit the generated `docs/`, then deploy GitHub Pages from `main /docs`.

Read the complete student assignment at [`../README.md`](../README.md).

## npm install note (public npm registry)

This package lock file is configured for the public npm registry. Run:

```bash
npm install
```

If an older download still tries to reach an internal `packages.applied-caas...` address, remove only the local install artifacts and retry using the public registry:

```bash
rm -rf node_modules package-lock.json
npm config set registry https://registry.npmjs.org/
npm cache verify
npm install
```
