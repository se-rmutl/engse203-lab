# Build verification

This reference solution was checked after the v1.2 base URL repair:

- `npm ci` completed successfully using the public npm registry.
- `npm run check` passed.
- `npm run build` passed with Vite 7.3.6.

`node_modules/` is intentionally excluded from this package. Run `npm install` or `npm ci` after extraction.
