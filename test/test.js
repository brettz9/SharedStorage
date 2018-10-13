import {assert, testSeries} from '../simple-test.js';
import {iframePost} from '../src/iframePost.js';

const postURL = 'http://localhost:8050';

const tests = {
  'Can post to <code>set</code> and <code>get</code>' (done) {
    let ran = false;
    const data = '<b>test</b>';
    function messageListener (e) {
      if (ran) {
        assert( // Todo: Finish
          e.data.attempt === 'get' && e.data.status === 'success' && e.data.data === data && 'maxRemaining' in e.data,
          `Successful get attempt`
        );
        window.removeEventListener('message', messageListener);
        done();
        return;
      }
      assert( // Todo: Finish
        e.data.attempt === 'set' && e.data.status === 'success',
        `Successful set attempt`
      );
      ran = true;
      iframePost(postURL, {
        isSharedStorage: true,
        namespace: 'aaa'
      });
    }
    window.addEventListener('message', messageListener);
    iframePost(postURL, {
      isSharedStorage: true,
      namespace: 'aaa',
      data
    });
  },
  '<code>postMessage</code> with <code>getMaxRemaining</code>' (done) {
    let firstMaxRemaining;
    let ran = false;
    function messageListener (e) {
      if (ran) {
        assert(
          typeof e.data.maxRemaining === 'number' && e.data.maxRemaining < firstMaxRemaining,
          `New \`maxRemaining\` (${e.data.maxRemaining}) should be less than before (${firstMaxRemaining})`
        );
        localStorage.removeItem('bogus');
        window.removeEventListener('message', messageListener);
        done();
        return;
      }
      firstMaxRemaining = e.data.maxRemaining;
      assert(typeof firstMaxRemaining === 'number', 'First `maxRemaining` should be a number');
      const MEGABYTE = 1024 * 1000;
      const maxRemaining = (new Array((MEGABYTE * 2) + 1)).join('a');
      localStorage.setItem('bogus', maxRemaining);
      ran = true;
      iframePost(postURL, {
        isSharedStorage: true,
        getMaxRemaining: true
      });
    }
    localStorage.removeItem('bogus');
    window.addEventListener('message', messageListener);
    iframePost(postURL, {
      isSharedStorage: true,
      getMaxRemaining: true
    });
  }
};
testSeries(tests);
