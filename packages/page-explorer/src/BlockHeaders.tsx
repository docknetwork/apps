// Copyright 2017-2020 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { HeaderExtended } from '@polkadot/api-derive';
import { Table } from '@polkadot/react-components';

import BlockHeader from './BlockHeader';
import { useTranslation } from './translate';

interface Props {
  headers: HeaderExtended[],
  title: string,
}

function BlockHeaders ({ headers, title = 'recent blocks' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const headerRef = useRef([
    [t(title), 'start', 3]
  ]);

  return (
    <Table
      empty={t<string>('No blocks available')}
      header={headerRef.current}
    >
      {headers
        .filter((header) => !!header)
        .map((header): React.ReactNode => (
          <BlockHeader
            key={header.number.toString()}
            value={header}
          />
        ))}
    </Table>
  );
}

export default React.memo(BlockHeaders);
