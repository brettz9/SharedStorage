// This is for user API (to be built-in to the browser but as module for now)
const iframeSource = 'http://localhost:8051'; // 'https://shared-storage.org';
const promises = {};
let i = 0;

const iframePost = (msgObj) => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.addEventListener('load', () => {
    iframe.postMessage(Object.assign(msgObj, {i, isSharedStorage: true}), new URL(iframeSource).origin);
    iframe.remove();
  });
  iframe.src = iframeSource;
  document.body.append(iframe);
};
const iframePostPromise = (msgObj) => {
  return new Promise((resolve, reject) => {
    iframePost(msgObj);
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
