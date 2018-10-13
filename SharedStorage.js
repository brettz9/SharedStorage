/*
IMMEDIATE TODOS

0. Create iframe API and ensure working service worker added with
  update mechanism; offline iframe approach for use with ES6 modules
  0. Detect storage size since API does not, based on string value length? if
    approaching size limit, chain postMessages to other domains (not
    subdomains as the spec mentions user agents possibly preventing
    that) or allowing top level library to pass in the storage somehow
    (APIs to check overflow and then go to the next domain in the list)
    since "Blocking third-party storage" is anticipated in spec.
    0. make queries to find space available/used (for non-confirm or confirm sites)
    0. Note: storage may need to take into account the key length too?
  0. Randomize which store site is used to avoid too many successive checks
    (though remember those which were used before; may wish to remember
    within this SharedStorage file and provide an API to chain with
    storage at other shared domains so other sites could discover where
    the data spills over); "next" and "prev" can be sent along with payload?
    Also offer ability to add timestamps for each payload (not settable)
  0. Devise scheme for packet distribution to better anonymize data

0. Custom protocol for shared storage itself
0. Add this code to an HTTPS site (to ensure at least the https origin keys
  are secure for writing) and uncomment the code confirming that it is
  hosted on HTTPS. Then document using the integrity attribute of
  <script> as per https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/

0. README todos:
  0. Add recommendation that a separate site be used to register the
    SharedStorage protocol (and set up in example)
  0. Namespaces with domain origins as keys and THEN subnamespaces
    (so easier to iterate custom namespaces with integrity)
  0. Use cases:
    1) data ownership (e.g., social site, or any site which wants
      prefs, priv requests, content, to be full under (offline)
      user control); FF add-on to view `localStorage` for sites;
      review add-ons for `localStorage` and mention; idea for
      add-on to read/write `localStorage` via files (located anywhere);
      store credentials for each private access site separately;
      demo email/chat/social media and RSS; file system; blockchain?
    2) Extensible application (plugins, Web Intents, etc.)
  0. Options on whether the storage device will ask for user
    confirmation to avoid cross-domain spam/exploit attempts
    (even though apps ought to do their own checking too to
    the extent possible) and avoid size limits being broken
  0. Idea for Firefox add-on to add desktop listeners to file
    changes so, e.g., changes to a local file anywhere on the
    desktop could get reflected in local storage for a site
    (making data ownership even more meaningful)

TO-DOS

1. Subscribe to storage events! (only if web app already open or cause
  all registered sites to auto-open (if not open) upon an event?);
  could even have "get" events even though API does not support as
  well as error events to notify all subscribers of the error
2. Subobjects: Allow retrieving and setting subobjects by array of
  property names?
3. Iteration of origins, namespaces, or namespaceOrigins (none of
  this is intended to be secure from reading (unless the confirmation
  is added for reading) as this is SharedStorage!)
  a. Provide access to length and key?
4. Add optional AYW API to write storage to disk or retrieve data from disk?
5. Provide opportunity to clear()? Any real practical difference with
  setItem(..., undefined) and removeItem and thus need to add support
  for removeItem? Disallow deleting (and clearing!) at least from
  domain keys unless from origin
6. Need for IndexedDB (as for indexing)?
7. Add a demo: For domain-specific-enforcement forks (e.g., to minimize
  size limits potential), provide ability internally to apply JSON
  Schema on values (with size checks) and/or whitelisted origin checks
8. Accept postMessage Transferable argument (ArrayBuffer and
  MessagePort) storage?
9. Allow querying of total memory size by saving all keys to temp
  variable, setting up to max, and then resetting back to tmp?
10. Placement on CDN like https://github.com/jsdelivr/api ?

REJECTED IDEAS
1. Object-only payload: Avoid need for type-checking by apps by
  requiring normal object for root of payload? Could present
  unexpected problems into the future if other apps had added a
  property not used by an application and then later used by it
2. Track a "lastSetBy" value to store the origin for non-origin
  items? Might encourae over-writing and deter more usage out of
  privacy concerns.
3. Auto-inform with error if string calculated to be long enough
  to overpass the limit? Will get an error if we try to go over anyways.
4. Require HTTPS scheme for origin-related storage (to prevent DNS
  spoofing via TLS as per WebStorage spec)? Since the protocol/scheme
  is included along with the origin we are storing, we can just inform
  users that the process is not secure without HTTPS (including for the
  case where this storage app itself is not placed on an https server)!

OTHER TODOS/NOTES TO CLEAN-UP/INCORPORATE ABOVE

0. Expose even these preferences to requesting apps

Shared storage/add-on system
0. use shared storage for file banks and have demo browse these
  hierarchically
0. Same approach with trusted, offine HTTPS site confirming protocol and
  then redirecting if confirmed (could have even used this for AsYouWish
  but that needed an add-on anyways)--e.g., if implying privileges like
  something having side effects (non-idempotent) such as query to add
  data to server; use with XPath, etc. protocol against site

0. Addon/eval
  0. Idea for evalInSandbox by submitting string for eval via postMessage
    to script which just listens, evals (and optionally adds back
    postMessage return result); limited to JSON, but even more safe
    that way; see http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
  0. find-and-replace memory/buttons (in a protocol manner to avoid being
    site-specific); alternatively to the following, the editor web app
    may register as a registrar which tracks the user installation of
    add-ons and makes itself available to any other editor app (since
    otherwise, a registration will necessarily be targeted to just the
    currently open one)
  0. addon to use Blockly for pipelining button output together
  0. Generic offline storage->registrar;  text editor as utilizer of storage
  1. Text editor web app asks to register itself as a protocol handler for
    web+namespaceaddtoolbar (or registrar of add-on data so any other
    editors can access its info)
  2. The user visits a text editor add-ons site.
  3. The user clicks on a link with text like "Install toolbar button to
    replace all entities" and href like
    "web:namespaceaddtoolbar:Label=MyButton&TooltipDescription=...&site=http://.example.com"
    (or possibly &evalCode=.... for a privileged install)
  4. The user is brought to the text editor web app (or if the link click
    was simulated in JavaScript, the user might not need to visit the
    editor in order to use the add-on immediately; the editor might
    just remember the details for later use).
  5. The text editor web app (first checking the registrar if separate and
    comparing to its own copy) asks if the user wishes to install the
    toolbar button from the designated site, warning about risks if it
    is an eval install.
   6. If the user agrees, the text editor adds the button with label and
    tooltip, and the next time the button is clicked, the text editor
    code either:
    1. Calls the eval()-able function string after defining/supplying a
      variable to indicate the current value of the textbox, and then
      replaces the textbox with the return result (unless an error is thrown).
    2. Opens the site in a hidden iframe, and uses the same API for
      postMessage (more secure, but depends on the other site begin online).
      Other protocols could support UI overlays with pop-up dialogs, etc.
*/

/*
if (new URL(location).protocol !== 'https:') {
  alert("SharedStorage must be accessed at a properly secured, " +
    "HTTPS site so as to prevent compromises against user data.");
  return;
}
*/
import {JsonStorage} from './json-storage.js';
import {jml, body, nbsp} from './node_modules/jamilih/dist/jml-es.js';
import {i18n} from './i18n.js';

(async () => { // eslint-disable-line padded-blocks

const _ = await i18n({
  availableLocales: { // Could get this from server
    defaultLocale: 'en-US',
    otherLocales: []
  }
});

const js = new JsonStorage({appNamespace: 'shared-storage'});

let lastMaxRemaining = 0;
const MEGABYTE = 1024 * 1000;

const boolPreferences = ['ignoreNonHTTPSGet', 'ignoreNonHTTPSSet'];

const namespaceKeyPreferences = [
  'noOrigin'
];
const originKeyPreferences = [
  'origins',
  'namespacesWithOrigins'
];
const originKeySignallingExistencePreferences = [
  'originsGet',
  'originsSet'
];
const objectPreferences = [
  ...originKeyPreferences,
  ...namespaceKeyPreferences,
  ...originKeySignallingExistencePreferences
];
const prefs = {};
await Promise.all([
  ...objectPreferences,
  ...boolPreferences
].map(async (pref) => {
  prefs[pref] = await js.get(pref);
}));

objectPreferences.forEach((objectPref) => {
  if (!prefs[objectPref]) {
    prefs[objectPref] = {};
  }
});

jml('form', [
  ['h2', [_('shared_storage_settings')]],
  ...boolPreferences.map((boolPref) => {
    return ['div', [
      ['label', [
        ['input', {
          id: boolPref,
          type: 'checkbox',
          checked: prefs[boolPref]
        }],
        nbsp,
        _(boolPref)
      ]]
    ]];
  }),
  ...originKeySignallingExistencePreferences.map((objectPref) => {
    return ['div', [
      ['label', [
        _(objectPref),
        nbsp,
        ['div', [
          Object.keys(prefs[objectPref] || {}).map((origin) => {
            return ['input', {
              id: objectPref,
              value: origin
            }];
          })
        ]]
      ]]
    ]];
  }),
  ...[...originKeyPreferences, ...namespaceKeyPreferences].map((objectPref) => {
    return ['div', [
      ['label', [
        _(objectPref),
        nbsp,
        ['textarea', {
          id: objectPref
        }, [
          prefs[objectPref] ? JSON.stringify(prefs[objectPref]) : ''
        ]]
      ]]
    ]];
  })
], body);

function isSafeProtocol (protocol) {
  return ['https:', 'file:'].includes(protocol);
}

async function obtainMaxRemaining () {
  // 5241785 (file)/5241210 (127.0.0.1) in FF, 5242455 (file)/
  // 5242506 (127.0.0.1) in Chrome 32.0.1700.107 m,
  // 4999912 (127.0.0.1) in IE10 (doesn't allow file:// localStorage),
  // 2621217 (file)/2621352 (127.0.0.1) in Safari 5.1.7;
  // 5242792 (file://)/5242564 (127.0.0.1) in Opera
  // await js.set('maxRemaining', (new Array(5241785+1)).join('a'));
  // should be a safe minimum per above testing;
  //  todo: we could wipe out all data and rebuild in order to know
  //  full capacity vs. already used capacity
  let maxRemaining = ''; // (new Array((MEGABYTE*2)+1)).join('a');
  try {
    while (true) {
      // We increment significantly (1MB) to avoid browser crashes
      maxRemaining += (new Array((MEGABYTE) + 1)).join('a');
      await js.set('maxRemaining', maxRemaining);
      lastMaxRemaining = maxRemaining;
    }
  } catch (e) {
    // alert(e.code === 1014);
    // alert(e.name); // 'NS_ERROR_DOM_QUOTA_REACHED'
  }
  maxRemaining = lastMaxRemaining.length / MEGABYTE;
  await js.set('maxRemaining', null);
  return maxRemaining;
}

window.addEventListener('message', async function (e) {
  const {origin, source, data: {namespacing, namespace, getMaxRemaining}} = e;
  const postToOrigin = (msgObj) => {
    source.postMessage(msgObj, origin);
  };

  let prmpt, data, attempt, maxRemaining, safeProtocol;
  const mainData = e.data;

  if (!mainData || typeof mainData !== 'object') {
    return;
  }

  if (!origin) {
    // Origin ought to be set by the browser; if there is a problem,
    //  the security of the origin-based data would be in jeopardy.
    throw new Error('No origin');
  }

  const payload = mainData.data;
  const {protocol} = new URL(origin);

  try {
    const maxRemaining = obtainMaxRemaining();
    // Probably not a privacy concern to know the amount left, so we
    //   don't require confirmation here for now, nor checks on protocol
    if (getMaxRemaining) {
      attempt = 'getMaxRemaining';
      postToOrigin({
        status: 'success',
        attempt,
        maxRemaining
      });
      return;
    }

    safeProtocol = isSafeProtocol(protocol);
    // Do this as opposed to checking truthiness since user might
    //   wish to set a falsey value
    if (!mainData.hasOwnProperty('data')) {
      attempt = 'get';
      if (!safeProtocol && !prefs.ignoreNonHTTPSGet) {
        prmpt = prompt(
          `A site (supposedly of origin "${origin}") is attempting to get shared data
but it is not using the secure HTTPS protocol which can preclude DNS spoofing,
a kind of attack which could be used by a malicious site.
If you wish to allow despite the risks, type "y", and if you wish to always
allow such insecure retrieval of shared storage (NOT RECOMMENDED), type "a"?
Otherwise, cancel.`
        ).toLowerCase();
        if (prmpt === 'a') {
          prefs.ignoreNonHTTPSGet = true;
          await js.set('ignoreNonHTTPSGet', prefs.ignoreNonHTTPSGet);
        } else if (prmpt !== 'y') {
          postToOrigin({
            status: 'refused',
            attempt,
            reason: 'insecure'
          });
          return;
        }
      }
      if (!prefs.originsGet[origin]) {
        prmpt = prompt(
          `A site (` +
          (safeProtocol ? ' of supposed origin "' : 'of origin "') +
          `${origin}") is attempting to retrieve shared data. Do you wish to approve? If you
          wish to always trust this site, type "t", if just for now, type "y".
          Otherwise, cancel. (From site "${location.href}"; namespace: "
          ${namespace}"; namespacing type: "${namespacing}")`
        ).toLowerCase();

        // 0. Remember? one for each site doing retrieving, one for each site doing setting
        if (prmpt === 't') {
          prefs.originsGet[origin] = {};
          await js.set('originsGet', prefs.originsGet);
        } else if (prmpt !== 'y') {
          postToOrigin({
            status: 'refused',
            attempt
          });
          return;
        }
      }
      switch (namespacing) {
      case 'origin-top':
        data = prefs.origins[origin][namespace];
        break;
      case 'origin-children':
        data = prefs.namespacesWithOrigins[namespace][origin];
        break;
      default: // false, etc.
        data = prefs.noOrigin[namespace];
        break;
      }
      postToOrigin({
        status: 'success',
        attempt,
        data,
        maxRemaining // Easy enough to add here for convenience as well
      });
      return;
    }

    attempt = 'set';
    if (!isSafeProtocol(protocol) && !prefs.ignoreNonHTTPSSet) {
      prmpt = prompt(
        `A site (supposedly of origin "${origin}") is attempting to set shared data ` +
        (namespacing ? '(keyed to that origin) ' : '') +
        `but it is not using the secure HTTPS protocol which can preclude DNS spoofing,
        a kind of attack which could be used by a malicious site to store or overwrite data` +
        (namespacing ? ' in a location reserved for that site' : '') +
        `. If you wish to allow despite the risks, type "y", and if you wish to always
        allow the setting of such insecure shared storage (NOT RECOMMENDED), type "a"?
        Otherwise, cancel.`
      ).toLowerCase();
      if (prmpt === 'a') {
        prefs.ignoreNonHTTPSSet = true;
        await js.set('ignoreNonHTTPSSet', prefs.ignoreNonHTTPSSet);
      } else if (prmpt !== 'y') {
        postToOrigin({
          status: 'refused',
          attempt,
          reason: 'insecure'
        });
        return;
      }
    }

    if (!prefs.originsSet[origin]) {
      prmpt = prompt(
        'A site (' +
        (safeProtocol ? ' of supposed origin "' : 'of origin "') +
        `${origin}") is attempting to set shared data. If you wish to always trust
        this site, type "t", if just for now, type "y". Otherwise, cancel. (Onto site "
        ${location.href}"; namespace: "${namespace}"; namespacing type: "${namespacing}";
        payload: "${payload}")`
      ).toLowerCase();
      if (prmpt === 't') {
        prefs.originsSet[origin] = {};
        await js.set('originsSet', prefs.originsSet);
      } else if (prmpt !== 'y') {
        postToOrigin({
          status: 'refused',
          attempt
        });
        return;
      }
    }

    switch (namespacing) {
    // 1. Settable by origin and then namespace
    case 'origin-top':
      if (!prefs.origins[origin]) {
        prefs.origins[origin] = {};
      }
      prefs.origins[origin][namespace] = payload;
      await js.set('origins', prefs.origins);
      break;
    // 2. Settable by namespace and then origin (Namespace created by
    //    anyone, but children settable only by site though with arbitrary
    //    children retrievable by anyone)
    case 'origin-children':
      if (!prefs.namespacesWithOrigins[namespace]) {
        prefs.namespacesWithOrigins[namespace] = {};
      }
      prefs.namespacesWithOrigins[namespace][origin] = payload;
      await js.set('namespacesWithOrigins', prefs.namespacesWithOrigins);
      break;
    // 3. Retrievable and settable by anyone
    default: // false, etc.
      prefs.noOrigin[namespace] = payload;
      await js.set('noOrigin', prefs.noOrigin);
      break;
    }
    postToOrigin({
      status: 'success',
      attempt
      // We don't provide maxRemaining here since it may have changed with the new addition
      // Todo: return "amountSet: payload.length"?
    });
  } catch (err) {
    const {name, message, fileName, lineNumber} = err;
    postToOrigin({
      status: 'error',
      attempt,
      maxRemaining, // Provide for convenience
      name, // 'NS_ERROR_DOM_QUOTA_REACHED' for storage limit
      // code: err.code, // 1014 for storage limit (not sending since deprecated)

      // Not necessarily uniform across browsers
      error: err.toString(),
      message,
      // Not standard, but useful for debugging
      fileName,
      lineNumber
    });
  }
});

/*
var iframe = document.createElement('iframe');
iframe.onload = function () {
  // Setting
  iframe.postMessage({
    namespacing: 'origin-top', // or 'origin-children' or not present
    namespace: 'myNamespace',
    data: myData
  }, new URL(iframeSource).origin);

  // Retrieving
  iframe.postMessage({
    namespacing: 'origin-top', // or 'origin-children' or not present
    namespace: 'myNamespace'
  }, new URL(iframeSource).origin);

  iframe.postMessage({
    getMaxRemaining: true
  }, new URL(iframeSource).origin);
};
iframe.src = iframeSource;

*/
})();
