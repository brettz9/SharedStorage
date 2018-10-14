# SharedStorage

A proposed API for shared storage in the browser along with a working
polyfill (and browser settings emulator).

## Example usage

```js
let status, attempt, data;

({status, attempt, data} = await SharedStorage.set({namespace: 'test', data: 'abc'}));
assert(status === 'success' && attempt === 'set' && data === undefined, 'Passed setting');

({status, attempt, data} = await SharedStorage.get({namespace: 'test'}));
assert(status === 'success' && attempt === 'get' && data === 'abc', 'Passed getting');

const {maxRemaining} = await SharedStorage.getMaxRemaining();
assert(typeof maxRemaining === 'number');
```

## Use cases

- Operating on same files with different viewers/editors (e.g., word
  processing documents, SVG editors, etc.)
- Decentralized, offlineable social media
- Email, chat, and feed subscription systems
- Hierarchical pseudo-file system available to websites
- Plugin architecture for any web app (sites can use shared storage to save their
    plugin URLs while the main app uses `postMessage` to communicate with
    those apps)
- Web Intents replacement (see "Plugin architecture" just above)

## To-dos

1. Get other namespacing types working:
  1. origin -> namespace (written by single origin but read-only to others) -
    E.g., for `.gov` practicing Open Data
  2. namespace -> origins (written by each origin and read-only to others) -
    E.g., sites enumerating their details for a shared namespace (could be
    chaotic if versioned/interpreted differently, however). Useful, e.g., for
    delivery of emails
  3. origin -> namespace -> origins (main area written by single origin, but
    other origins being allowed to add to namespaces; read-only to others) -
    E.g., for plugins to a particular site (e.g., handling sites of `.gov`
    data)
