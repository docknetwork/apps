// Copyright 2017-2022 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyedEvent } from '@polkadot/react-query/types';

import React, { useContext, useMemo, useRef } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import { BlockAuthorsContext, EventsContext } from '@polkadot/react-query';

import BlockInfo from './BlockInfo';
import Forks from './Forks';
import Latency from './Latency';
import Main from './Main';
import NodeInfo from './NodeInfo';
import MasterMembersList from './Dock/MasterMembersList';
import { useTranslation } from './translate';

interface Props {
  basePath: string;
  className?: string;
  newEvents?: KeyedEvent[];
}

function ExplorerApp ({ basePath, className }: Props): React.ReactElement<Props> {
  // const { loading, error, data } = useQuery(GET_DOGS);
  const { t } = useTranslation();
  const { api } = useApi();
  const { lastHeaders } = useContext(BlockAuthorsContext);
  const { eventCount, events } = useContext(EventsContext);

  const itemsRef = useRef([
    {
      isRoot: true,
      name: 'chain',
      text: t<string>('Chain info')
    },
    {
      hasParams: true,
      name: 'query',
      text: t<string>('Block details')
    },
    {
      name: 'latency',
      text: t<string>('Latency')
    },
    {
      name: 'forks',
      text: t<string>('Forks')
    },
    {
      name: 'node',
      text: t<string>('Node info')
    },
    {
      name: 'master-members',
      text: t<string>('Master Members')
    },
  ]);

  const hidden = useMemo(
    () => api.query.babe ? [] : ['forks'],
    [api]
  );

  return (
    <main className={className}>
      <header>
        <Tabs
          basePath={basePath}
          hidden={api.query.babe ? undefined : HIDDESN_NOBABE}
          items={itemsRef.current}
        />
      </header>
      <Switch>
        <Route path={`${basePath}/forks`}><Forks /></Route>
        <Route path={`${basePath}/latency`}><Latency /></Route>
        <Route path={`${basePath}/query/:value`}><BlockInfo /></Route>
        <Route path={`${basePath}/query`}><BlockInfo /></Route>
        <Route path={`${basePath}/node`}><NodeInfo /></Route>
        <Route path={`${basePath}/master-members`}><MasterMembersList /></Route>
        <Route>
          <Main
            eventCount={eventCount}
            events={events}
            headers={lastHeaders}
          />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(ExplorerApp);
