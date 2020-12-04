// Copyright 2017-2020 @polkadot/app-addresses authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useRef } from 'react';
import { Route, Switch } from 'react-router';

import type { AppProps as Props } from '@polkadot/react-components/types';
import { Tabs } from '@polkadot/react-components';

import Contacts from './Contacts';
import { useTranslation } from './translate';

function AddressesApp ({ basePath, onStatusChange }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'contacts',
      text: t<string>('My contacts')
    }
  ]);

  return (
    <main>
      <header>
        <Tabs
          basePath={basePath}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route>
          <Contacts
            basePath={basePath}
            onStatusChange={onStatusChange}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(AddressesApp);
