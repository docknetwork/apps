// Copyright 2017-2020 @polkadot/react-hooks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { ApiPromise } from '@polkadot/api';
import type { LedgerTypes } from '@polkadot/hw-ledger/types';

import { useCallback, useMemo } from 'react';

import { Ledger } from '@polkadot/hw-ledger';
import networks from '@polkadot/networks';
import uiSettings from '@polkadot/ui-settings';
import { assert } from '@polkadot/util';

import { useApi } from './useApi';

interface StateBase {
  isLedgerCapable: boolean;
  isLedgerEnabled: boolean;
}

interface State extends StateBase {
  getLedger: () => Ledger;
}

const EMPTY_STATE: StateBase = {
  isLedgerCapable: false,
  isLedgerEnabled: false
};

// TODO: Temporary
networks.push({
  "decimals": [
      6
  ],
  "displayName": "Dock PoS Testnet",
  "genesisHash": [
      "0x59d93e2ce42abb8aa52ca9a9e820233667104751f8f2980578a47a26a7235027"
  ],
  "hasLedgerSupport": true,
  "network": "dock",
  "prefix": 21,
  "slip44": 594,
  "standardAccount": "*25519",
  "symbols": [
      "DOCK"
  ],
  "website": "https://dock.io",
  "icon": "substrate"
});

networks.push({
  "decimals": [
      6
  ],
  "displayName": "Dock PoS Mainnet",
  "genesisHash": [
      "0x6bfe24dca2a3be10f22212678ac13a6446ec764103c0f3471c71609eac384aae"
  ],
  "hasLedgerSupport": true,
  "network": "dock",
  "prefix": 22,
  "slip44": 594,
  "standardAccount": "*25519",
  "symbols": [
      "DOCK"
  ],
  "website": "https://dock.io",
  "icon": "substrate"
});

const hasWebUsb = !!(window as unknown as { USB?: unknown }).USB;
const ledgerChains = networks.filter((n) => !!n.hasLedgerSupport);
let ledger: Ledger | null = null;

function retrieveLedger (api: ApiPromise): Ledger {
  if (!ledger) {
    const genesisHex = api.genesisHash.toHex();
    const def = ledgerChains.find(({ genesisHash }) => genesisHash[0] === genesisHex);

    assert(def, `Unable to find supported chain for ${genesisHex}`);

    ledger = new Ledger(uiSettings.ledgerConn as LedgerTypes, def.network);
  }

  return ledger;
}

function getState (api: ApiPromise): StateBase {
  const isLedgerCapable = hasWebUsb && ledgerChains.map(({ genesisHash }) => genesisHash[0]).includes(api.genesisHash.toHex());
  return {
    isLedgerCapable,
    isLedgerEnabled: isLedgerCapable && uiSettings.ledgerConn !== 'none'
  };
}

export function useLedger (): State {
  const { api, isApiReady } = useApi();

  const getLedger = useCallback(
    () => retrieveLedger(api),
    [api]
  );

  return useMemo(
    () => ({ ...(isApiReady ? getState(api) : EMPTY_STATE), getLedger }),
    [api, getLedger, isApiReady]
  );
}
