# Changes for SharedStorage

## 0.8.0

- Linting (ESLint): As per latest ash-nazg / ESLint 7 (including checking
    RC file)
- Build: Update Jamilih copy
- npm: Add rollup config to ignore
- npm: Update `rollup-plugin-babel` to `@rollup/plugin-babel`
    and make explicit `babelHelpers` value of `bundled`
- npm: Update devDeps.

## 0.7.0

- Fix: Allow SharedStorageServer to pass any obtained `maxRemaining`
  with error
- Linting (ESLint): Apply ash-nazg/sauron; apply to HTML/MD; use
  a recommended file extension (js)
- Docs: Indicate storage value can be array or object as well
- Maintenance: Add `.editorconfig`
- npm: `opn-cli`-> non-deprecated `open-cli`
- npm: Update devDeps (and Jamilih copy)

## 0.6.0

- npm: Add `browser` and `module` to `package.json`
- License: Add MIT license file
- Docs: Add to test page instructions

## 0.5.3

- Try URLs to unpkg.com

## 0.5.2

- Fix path

## 0.5.1

- npm: Copy dependency out of `node_modules` to work on unpkg.com

## 0.5.0

- Docs: Clarify/reorganize
- npm: Allow `test` in npm (to work on unpkg, etc.)

## 0.4.0

- Breaking change: Require `SharedStorage` API (more clearly indicating
  intent for this to become a polyfill)

## 0.3.0

- Rollup/Babel API and server
- Fix race condition with server (and avoid timeout before posting,
  now that race condition is resolved)
- npm: Update devDeps

## 0.2.0

- First functioning release

## 0.1.0

- Initial placeholder release (non-functional)
