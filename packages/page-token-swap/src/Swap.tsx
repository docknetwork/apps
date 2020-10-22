// Copyright 2017-2020 @polkadot/app-explorer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Table, Button, InputAddress, Modal, Password, Input, Extrinsic, TxButton } from '@polkadot/react-components';
import { KeyringPair } from '@polkadot/keyring/types';
import keyring from '@polkadot/ui-keyring';
import axios from 'axios';

import { useTranslation } from './translate';

import bs58 from 'bs58';
import bs58check from 'bs58check';
import { Buffer } from 'safe-buffer';


interface Props {
  title: string,
}

function SwapForm ({ title = 'token swap' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const headerRef = useRef([
    [t(title), 'start', 3]
  ]);

  const [submitting, setSubmitting] = useState<Boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [signature, setSignature] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [base58Check, setBase58Check] = useState<string>('');
  const [address, setAddress] = useState<string | null>(null);
  const [currentPair, setCurrentPair] = useState<KeyringPair | null>(keyring.getPairs()[0] || null);

  useEffect((): void => {
    setAddress(currentPair?.address || '');
  }, [currentPair?.address]);

  useEffect((): void => {
    if (!txHash || !address) {
      setBase58Check('');
      setError('');
      return;
    }

    // Trim 0x from hash incase
    let txnHash = txHash;
    if (txnHash.substr(0, 2) === '0x') {
      txnHash = txnHash.substr(2);
    }

    // Build payload
    try {
      const payloadRaw = Buffer.concat([bs58.decode(address), Buffer.from(txnHash, 'hex')]);
      const payloadCheck = bs58check.encode(payloadRaw);
      setBase58Check(payloadCheck);
      setError('');
    } catch (e) {
      setError(e.toString());
      setBase58Check('');
    }
  }, [address, txHash]);

  async function handleSubmitSwap() {
    setSubmitting(true);
    setError('');

    try {
      const res = await axios.post('http://localhost:8080/migrate', {
        payload: base58Check,
        signature,
      });
      console.log('res', res);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError(error.message);
      }
    }

    setSubmitting(false);
  }

  return (
    <Table
      header={headerRef.current}
      className={'visible-overflow'}
    >
      <tr>
        <td>
          <InputAddress
            label={t<string>('Dock mainnet address')}
            onChange={setAddress}
            type='account'
            value={address}
            isFull
          />

          <Modal.Columns>
            <Modal.Column>
              <Input
                help={t<string>('TODO: transaction hash helper msg')}
                label={t<string>('transaction hash')}
                onChange={setTxHash}
                value={txHash}
                isFull
              />
            </Modal.Column>
            <Modal.Column>
              <p>{t<string>(`TODO: transaction hash helper msg`)}</p>
            </Modal.Column>
          </Modal.Columns>

          <Modal.Columns>
            <Modal.Column>
              <Input
                help={t<string>('TODO: base58 check msg')}
                label={t<string>('base58 check encoding')}
                value={base58Check}
                disabled
                isFull
              />
            </Modal.Column>
            <Modal.Column>
              <p>
                The user will take this base58 string (including checksum), sign using mycrypto and his public key and get signature
              </p>
            </Modal.Column>
          </Modal.Columns>

          <Modal.Columns>
            <Modal.Column>
              <Input
                help={t<string>('TODO: signature msg')}
                label={t<string>('signature')}
                onChange={setSignature}
                value={signature}
                isFull
              />
            </Modal.Column>
            <Modal.Column>
              <p>{t<string>(`The signature is put in the form and form is submitted.`)}</p>
            </Modal.Column>
          </Modal.Columns>

          <Modal.Columns>
            <Modal.Column>
              <p style={{color: '#d82323'}}>
                {error}
              </p>
            </Modal.Column>
            <Modal.Column>
            <div style={{textAlign: 'right', display: 'inline-block', float: 'right'}}>
              <Button
                accountId={address}
                icon='sign-in-alt'
                isDisabled={submitting || !(address && signature && txHash)}
                isPrimary={true}
                label={t<string>(submitting ? 'Please wait...' : 'Submit')}
                onClick={handleSubmitSwap}
              />
            </div>
            </Modal.Column>
          </Modal.Columns>
        </td>
      </tr>
    </Table>
  );
}

export default React.memo(SwapForm);
