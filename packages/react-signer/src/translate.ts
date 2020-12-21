// Copyright 2017-2020 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { UseTranslationResponse } from 'react-i18next';

import { useTranslation as useTranslationBase, withTranslation } from 'react-i18next';

export function useTranslation (): UseTranslationResponse<string> {
  return useTranslationBase('react-signer');
}

export default withTranslation(['react-signer']);
