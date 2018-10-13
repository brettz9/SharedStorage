import {iframePost} from './iframePost.js';

// This is for user API (to be built-in to the browser but as module for now)
const iframeSource = 'http://localhost:8051'; // 'https://shared-storage.org';
const promises = {};
let id = 0;
const iframePostPromise = (msgObj) => {
  return new Promise((resolve, reject) => {
    iframePost(iframeSource, Object.assign(msgObj, {id, isSharedStorage: true}));
    promises[id++] = {resolve, reject};
  });
};

window.addEventListener('message', (e) => {
  promises[e.data.id].resolve();
});

export const get = async ({namespace}) => {
  return iframePostPromise({
    namespacing: 'origin-top', // or 'origin-children' or not present
    namespace
  });
};
export const getMaxRemaining = async () => {
  return iframePostPromise({
    getMaxRemaining: true
  });
};
export const set = async ({data, namespace}) => {
  return iframePostPromise({
    namespacing: 'origin-top', // or 'origin-children' or not present
    namespace,
    data
  });
};
