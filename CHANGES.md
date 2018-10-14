# Changes for SharedStorage

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
