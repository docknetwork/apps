// Copyright 2017-2020 @polkadot/apps-routing authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Routes } from './types';

import accounts from './accounts';
import addresses from './addresses';
import calendar from './calendar';
import claims from './claims';
import contracts from './contracts';
import council from './council';
// import dashboard from './dashboard';
import democracy from './democracy';
import explorer from './explorer';
import extrinsics from './extrinsics';
import masterSubmission from './master-proposals';
import anchor from './anchor';
import genericAsset from './generic-asset';
import js from './js';
import parachains from './parachains';
import poll from './poll';
import rpc from './rpc';
import settings from './settings';
import signing from './signing';
import society from './society';
import staking from './staking';
import storage from './storage';
import sudo from './sudo';
import techcomm from './techcomm';
import transfer from './transfer';
import treasury from './treasury';

export default function create (t: <T = string> (key: string, text: string, options: { ns: string }) => T): Routes {
  return [
    // dashboard(t),
    accounts(t),
    addresses(t),
    explorer(t),
    claims(t),
    poll(t),
    transfer(t),
    genericAsset(t),
    staking(t),
    democracy(t),
    council(t),
    treasury(t),
    techcomm(t),
    parachains(t),
    society(t),
    calendar(t),
    contracts(t),
    storage(t),
    extrinsics(t),
    masterSubmission(t),
    anchor(t),
    rpc(t),
    signing(t),
    sudo(t),
    js(t),
    settings(t)
  ];
}
