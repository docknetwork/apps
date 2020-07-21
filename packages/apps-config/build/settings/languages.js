"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = create;

// Copyright 2017-2020 @polkadot/apps-config authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
function create(t) {
  return [{
    text: t('lng.detect', 'Default browser language (auto-detect)', {
      ns: 'apps-config'
    }),
    value: 'default'
  }, {
    text: 'English',
    value: 'en'
  }, {
    text: 'Español',
    value: 'es'
  }, {
    text: '日本語',
    value: 'ja'
  }, {
    text: 'Português',
    value: 'pt'
  }, {
    text: 'русский',
    value: 'ru'
  }, {
    text: '汉语',
    value: 'zh'
  }];
}