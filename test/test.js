window.addEventListener('message', (e) => {
  console.log('teste', e);
});

const ifr = document.createElement('iframe');
ifr.style.display = 'none';
ifr.addEventListener('load', () => {
  console.log('loaded');
  ifr.contentWindow.postMessage({
    isSharedStorage: true,
    getMaxRemaining: true
  }, '*');
});
ifr.src = 'http://localhost:8050';
document.body.append(ifr);
