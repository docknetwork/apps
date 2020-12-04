// Copyright 2017-2020 @polkadot/react-components authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import type { AccountId, AccountIndex, Address } from '@polkadot/types/interfaces';
import { Available } from '@polkadot/react-query';

export interface Props {
  className?: string;
  label?: React.ReactNode;
  params?: AccountId | AccountIndex | Address | string | Uint8Array | null;
}

function AvailableDisplay ({ className = '', label, params }: Props): React.ReactElement<Props> | null {
  if (!params) {
    return null;
  }

  return (
    <Available
      className={`ui--Available ${className}`}
      label={label}
      params={params}
    />
  );
}

export default React.memo(AvailableDisplay);
