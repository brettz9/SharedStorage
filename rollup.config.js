import babel from '@rollup/plugin-babel';
import {terser} from 'rollup-plugin-terser';

function getRollupObject ({minifying, format = 'umd'} = {}) {
  const nonMinified = {
    input: 'src/SharedStorage.js',
    output: {
      format,
      sourcemap: minifying,
      file: `dist/index-${format}${minifying ? '.min' : ''}.js`,
      name: 'SharedStorage'
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  };
  if (minifying) {
    nonMinified.plugins.push(terser());
  }
  return nonMinified;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  getRollupObject(),
  getRollupObject({minifying: true}),
  getRollupObject({minifying: true, format: 'es'}),
  getRollupObject({minifying: false, format: 'es'}),
  {
    input: 'SharedStorageServer.js',
    output: {
      format: 'iife',
      sourcemap: true,
      file: `dist/SharedStorageServer.js`
    },
    plugins: [
      babel({
        babelHelpers: 'bundled'
      })
    ]
  }
];
