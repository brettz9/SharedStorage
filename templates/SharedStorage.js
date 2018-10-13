import {jml, body, nbsp} from '../node_modules/jamilih/dist/jml-es.js';

export const SharedStorageTemplate = function ({
  _, prefs, boolPreferences, originKeySignallingExistencePreferences,
  originKeyPreferences, namespaceKeyPreferences
}) {
  jml('style', [
    `textarea {width: 50%; height: 180px;}`
  ], body);
  jml('form', [
    ['h2', [_('shared_storage_settings')]],
    ...boolPreferences.map((boolPref) => {
      return ['div', [
        ['label', [
          ['input', {
            id: boolPref,
            type: 'checkbox',
            checked: prefs[boolPref]
          }],
          nbsp,
          _(boolPref)
        ]]
      ]];
    }),
    ...originKeySignallingExistencePreferences.map((objectPref) => {
      return ['div', [
        ['label', [
          _(objectPref),
          nbsp,
          ['div', [
            ...Object.keys(prefs[objectPref] || {}).map((origin) => {
              return ['input', {
                id: objectPref,
                value: origin
              }];
            })
          ]]
        ]]
      ]];
    }),
    ...[...originKeyPreferences, ...namespaceKeyPreferences].map((objectPref) => {
      return ['div', [
        ['label', [
          _(objectPref),
          nbsp,
          ['textarea', {
            id: objectPref
          }, [
            prefs[objectPref] ? JSON.stringify(prefs[objectPref], null, 4) : ''
          ]]
        ]]
      ]];
    })
  ], body);
};
