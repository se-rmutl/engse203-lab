# Fix: `npm install` times out on an internal registry address

## What happened

An earlier package lock file contained tarball URLs from a private build environment. Those addresses are not reachable from a normal macOS/Windows development machine. This v1.1 package has been corrected to use the public npm registry.

## Recommended command

Open Terminal in `solution/engse203-lab02-solution` and run:

```bash
npm install
npm run check
npm run dev
```

## Fix for an already-extracted older package

Run these commands inside the project folder:

```bash
rm -rf node_modules package-lock.json
npm config set registry https://registry.npmjs.org/
npm cache verify
npm install
```

Then verify:

```bash
npm config get registry
npm ping
npm run check
npm run dev
```

The registry should print:

```text
https://registry.npmjs.org/
```

## If the issue continues

Inspect the npm configuration sources:

```bash
npm config get registry
npm config ls -l
grep -n "registry" .npmrc ~/.npmrc 2>/dev/null || true
```

If the project `.npmrc` or `~/.npmrc` still points to an internal/private registry, remove or replace that `registry=` line with:

```text
registry=https://registry.npmjs.org/
```

Do not disable SSL protection as a workaround.
