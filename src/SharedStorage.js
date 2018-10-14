import {iframePost} from './iframePost.js';

// This is for user API (to be built-in to the browser but as module for now)
const iframeSource = 'https://unpkg.com/sharedstorage/index.html'; // 'http://localhost:8051'; // 'https://shared-storage.org';
const promises = {};
let id = 1;
const iframePostPromise = (msgObj) => {
  return new Promise((resolve, reject) => {
    iframePost(iframeSource, Object.assign(msgObj, {id, isSharedStorage: true}));
    promises[id++] = {resolve, reject};
  });
};

window.addEventListener('message', (e) => {
  if (!e.data.id) {
    return;
  }
  if (e.data.status === 'error') {
    promises[e.data.id].reject(e.data);
  } else {
    promises[e.data.id].resolve(e.data);
  }
});

window.SharedStorage = {
  async getItem ({namespace, namespacing}) {
    return iframePostPromise({
      namespacing,
      namespace,
      method: 'getItem'
    });
  },
  /*
  Todo:
  length,
  key,
  clear,
  async removeItem ({namespace, namespacing}) {
    return iframePostPromise({
      namespacing,
      namespace,
      method: 'remove'
    });
  },
  */
  async getMaxRemaining () {
    return iframePostPromise({
      method: 'getMaxRemaining'
    });
  },
  async setItem ({data, namespace, namespacing}) {
    return iframePostPromise({
      namespacing,
      namespace,
      data,
      method: 'setItem'
    });
  }
};
