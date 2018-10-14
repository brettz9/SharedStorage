/* globals SharedStorage */
import {assert, testSeries} from '../simple-test.js';
import {iframePost} from '../src/iframePost.js';
import '../src/SharedStorage.js';

const postURL = 'https://unpkg.com/sharedstorage/index.html';

const tests = {
  'Can post to <code>set</code> and <code>get</code>' (done) {
    let ran = false;
    const data = '<b>test</b>';
    function messageListener (e) {
      if (ran) {
        assert(
          e.data.attempt === 'getItem' && e.data.status === 'success' && e.data.data === data && 'maxRemaining' in e.data,
          `Successful get attempt`
        );
        window.removeEventListener('message', messageListener);
        done();
        return;
      }

      assert(
        e.data.attempt === 'setItem' && e.data.status === 'success',
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
      localStorage.removeItem('bogus');
      firstMaxRemaining = e.data.maxRemaining;
      assert(typeof firstMaxRemaining === 'number', 'First `maxRemaining` should be a number');
      const MEGABYTE = 1024 * 1000;
      const maxRemaining = (new Array((MEGABYTE * 2) + 1)).join('a');
      try {
        localStorage.setItem('bogus', maxRemaining);
      } catch (err) {
        localStorage.setItem('bogus', 'a');
      }
      ran = true;
      iframePost(postURL, {
        isSharedStorage: true,
        getMaxRemaining: true
      });
    }
    window.addEventListener('message', messageListener);
    iframePost(postURL, {
      isSharedStorage: true,
      getMaxRemaining: true
    });
  },
  async 'Use <code>getItem</code> and <code>setItem</code> of public API' () {
    let status, attempt, data;
    ({status, attempt, data} = await SharedStorage.setItem({namespace: 'test', data: 'abc'}));
    assert(status === 'success' && attempt === 'setItem' && data === undefined, 'Passed setting');
    ({status, attempt, data} = await SharedStorage.getItem({namespace: 'test'}));
    assert(status === 'success' && attempt === 'getItem' && data === 'abc', 'Passed getting');
    const {maxRemaining} = await SharedStorage.getMaxRemaining();
    assert(typeof maxRemaining === 'number', 'maxRemaining is a number');
  }
};

document.querySelector('#startTests').addEventListener('click', () => {
  testSeries(tests);
});
