export const iframePost = (iframeSource, msgObj, {
  origin = new URL(iframeSource).origin,
  loaded
} = {}) => {
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.addEventListener('load', (e) => {
    if (loaded) {
      loaded(e);
    }
    setTimeout(() => { // Chrome needs the timeout
      iframe.contentWindow.postMessage(msgObj, origin);
    }, 1000);
    // iframe.remove(); // Won't receive message back (in Firefox or Chrome)
  });
  iframe.src = iframeSource;
  document.body.append(iframe);
};
