(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.SharedStorage = {})));
}(this, (function (exports) { 'use strict';

  const iframePost = (iframeSource, msgObj, {
    origin = new URL(iframeSource).origin,
    loaded
  } = {}) => {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.addEventListener('load', e => {
      if (loaded) {
        loaded(e);
      }

      iframe.contentWindow.postMessage(msgObj, origin); // iframe.remove(); // Won't receive message back (in Firefox or Chrome)
    });
    iframe.src = iframeSource;
    document.body.append(iframe);
  };

  const iframeSource = 'http://localhost:8051'; // 'https://shared-storage.org';

  const promises = {};
  let id = 1;

  const iframePostPromise = msgObj => {
    return new Promise((resolve, reject) => {
      iframePost(iframeSource, Object.assign(msgObj, {
        id,
        isSharedStorage: true
      }));
      promises[id++] = {
        resolve,
        reject
      };
    });
  };

  window.addEventListener('message', e => {
    if (!e.data.id) {
      return;
    }

    if (e.data.status === 'error') {
      promises[e.data.id].reject(e.data);
    } else {
      promises[e.data.id].resolve(e.data);
    }
  });
  const get = async ({
    namespace,
    namespacing
  }) => {
    return iframePostPromise({
      namespacing,
      namespace
    });
  };
  const getMaxRemaining = async () => {
    return iframePostPromise({
      getMaxRemaining: true
    });
  };
  const set = async ({
    data,
    namespace,
    namespacing
  }) => {
    return iframePostPromise({
      namespacing,
      namespace,
      data
    });
  };

  exports.get = get;
  exports.getMaxRemaining = getMaxRemaining;
  exports.set = set;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
