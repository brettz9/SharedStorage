let lastMaxRemaining = 0;
const MEGABYTE = 1024 * 1000;

// Async to support potential async `localStorage` in future: https://domenic.github.io/async-local-storage/
export const getMaximumRemainingStorage = async function () {
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
      localStorage.setItem(
        'SharedStorage_getMaximumRemainingStorage',
        maxRemaining
      );
      lastMaxRemaining = maxRemaining;
    }
  } catch (e) {
    // alert(e.code === 1014);
    // alert(e.name); // 'NS_ERROR_DOM_QUOTA_REACHED'
  }
  maxRemaining = lastMaxRemaining.length / MEGABYTE;
  await localStorage.removeItem('SharedStorage_getMaximumRemainingStorage');
  return maxRemaining;
};
