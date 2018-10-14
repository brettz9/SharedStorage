These to-dos were from some time ago, and may no longer be relevant or need revising.

## To-dos (Immediate)

0. Make settings more than read-only; also could trigger storage events
0. Ensure working service worker added with update mechanism
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
  `<script>` as per https://hacks.mozilla.org/2015/09/subresource-integrity-in-firefox-43/
0. README todos:
  0. Add recommendation that a separate site be used to register the
    SharedStorage protocol (and set up in example)
  0. Namespaces with domain origins as keys and THEN subnamespaces
    (so easier to iterate custom namespaces with integrity)
  0. Use cases:
    1. data ownership (e.g., social site, or any site which wants
      prefs, priv requests, content, to be full under (offline)
      user control); FF add-on to view `localStorage` for sites;
      review add-ons for `localStorage` and mention; idea for
      add-on to read/write `localStorage` via files (located anywhere);
      store credentials for each private access site separately;
      demo email/chat/social media and RSS; file system; blockchain?
    2. Extensible application (plugins, Web Intents, etc.)
  0. Options on whether the storage device will ask for user
    confirmation to avoid cross-domain spam/exploit attempts
    (even though apps ought to do their own checking too to
    the extent possible) and avoid size limits being broken
  0. Idea for Firefox add-on to add desktop listeners to file
    changes so, e.g., changes to a local file anywhere on the
    desktop could get reflected in local storage for a site
    (making data ownership even more meaningful)

## To-dos (normal priority)

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

## Rejected ideas

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

## Other to-dos/notes to clean-up/incorporate above

0. Expose even these preferences to requesting apps

0. Shared storage/add-on system
  0. use shared storage for file banks and have demo browse these
    hierarchically
  0. Same approach with trusted, offline HTTPS site confirming protocol and
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
