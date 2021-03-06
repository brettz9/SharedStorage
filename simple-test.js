import {jml, nbsp, body} from './vendor/jamilih/dist/jml-es.js';

let passes = 0, failures = 0;

export const assert = function assert (assertion, msg) {
  if (!assertion) {
    failures++;
  } else {
    passes++;
  }
  jml('div', [
    assertion
      ? ['span', {style: 'color: white; background-color: green;'}, ['Pass']]
      : ['span', {style: 'color: white; background-color: red;'}, ['Fail']],
    nbsp.repeat(2),
    msg
  ], body);
};

export const testSeries = async function (tests) {
  passes = 0;
  failures = 0;
  await Object.entries(tests).reduce(async (prom, [testName, test]) => {
    await prom;
    jml('div', [
      ['b', [
        // Todo: Switch to markdown option rather than uglier raw
        //   HTML in test name
        ['u', {innerHTML: testName}]
      ]]
    ], body);
    if (test.length === 1) {
      // eslint-disable-next-line promise/avoid-new
      return new Promise((resolve, reject) => {
        test(resolve);
      });
    }
    return test();
  }, Promise.resolve());
  jml(
    'hr',
    'div', [
      ['span', {
        style: !failures ? 'color: white; background-color: green;' : ''
      }, [
        'Passes'
      ]],
      nbsp.repeat(2),
      passes
    ],
    'div', [
      ['span', {
        style: failures ? 'color: white; background-color: red;' : ''
      }, [
        'Failures'
      ]],
      nbsp.repeat(2),
      failures
    ],
    body
  );
};
