import {iframePost} from './iframePost.js';

// This is for user API (to be built-in to the browser but as module for now)
const iframeSource = 'http://localhost:8051'; // 'https://shared-storage.org';
const promises = {};
let i = 0;
const iframePostPromise = (msgObj) => {
  return new Promise((resolve, reject) => {
    iframePost(iframeSource, Object.assign(msgObj, {i, isSharedStorage: true}));
    promises[i++] = {resolve, reject};
  });
};

export default { // `SharedStorage`
  async get ({namespace}) {
    return iframePostPromise({
      namespacing: 'origin-top', // or 'origin-children' or not present
      namespace
    });
  },
  async getMaxRemaining () {
    return iframePostPromise({
      getMaxRemaining: true
    });
  },
  async save ({data, namespace}) {
    return iframePostPromise({
      namespacing: 'origin-top', // or 'origin-children' or not present
      namespace,
      data
    });
  }
};
