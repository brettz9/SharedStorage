import {jml, body, nbsp} from '../vendor/jamilih/dist/jml-es.js';

export const SharedStorageTemplate = function ({
  _, prefs, boolPreferences, originKeySignallingExistencePreferences,
  originKeyPreferences, namespaceKeyPreferences
}) {
  jml(
    'style', [`
      textarea {width: 500px; height: 180px;}
      label {vertical-align: middle;}
    `],
    'form', [
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
      ['div', {
        style: 'display: table'
      }, [
        ...originKeySignallingExistencePreferences.map((objectPref) => {
          return ['div', {style: 'display: table-row;'}, [
            ['label', {for: objectPref, style: 'display: table-cell;'}, [
              _(objectPref)
            ]],
            ['div', {id: objectPref, style: 'display: table-cell;'}, [
              ...Object.keys(prefs[objectPref] || {}).map((orign) => {
                return ['input', {
                  id: objectPref,
                  value: orign
                }];
              })
            ]]
          ]];
        }),
        ...[
          ...originKeyPreferences,
          ...namespaceKeyPreferences
        ].map((objectPref) => {
          return ['div', {style: 'display: table-row;'}, [
            ['label', {for: objectPref, style: 'display: table-cell;'}, [
              _(objectPref)
            ]],
            ['textarea', {
              id: objectPref,
              style: 'display: table-cell;'
            }, [
              prefs[objectPref]
                ? JSON.stringify(prefs[objectPref], null, 4)
                : ''
            ]]
          ]];
        })
      ]]
    ],
    body
  );
};
