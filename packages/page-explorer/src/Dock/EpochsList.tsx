import React, { useState, useEffect, useRef } from 'react';
import { useApi } from '@polkadot/react-hooks';
import Epoch from '../Epoch';
import { useTranslation } from '../translate';

import { Table, Button } from '@polkadot/react-components';

const epochsPerPage = 16;
const startPage = 1;

function Pagination ({ page, maxPages, maxIndex, onPageChange }): React.ReactElement<Props> {
  const [ currentPage, setCurrentPage ] = useState(page || 0);
  const { t } = useTranslation();

  function handlePreviousClick() {
    if (currentPage > 1) {
      const targetPage = currentPage - 1;
      setCurrentPage(targetPage);
      onPageChange(targetPage, maxPages, maxIndex);
    }
  }

  function handleNextClick() {
    if (currentPage < maxPages) {
      const targetPage = currentPage + 1;
      setCurrentPage(targetPage);
      onPageChange(targetPage, maxPages, maxIndex);
    }
  }

  return (
    <Button.Group>
      <Button
        icon='arrow-left'
        isDisabled={currentPage <= 1}
        label={t<string>('previous page')}
        onClick={handlePreviousClick}
      />
      <Button
        isDisabled={true}
        label={'Page: ' + currentPage}
      />
      <Button
        icon='arrow-right'
        isDisabled={currentPage >= maxPages}
        label={t<string>('next page')}
        onClick={handleNextClick}
      />
    </Button.Group>
  );
}

function EpochsList (): React.ReactElement<Props> {
  const { api } = useApi();
  const { t } = useTranslation();
  const [ totalRewards, setTotalRewards ] = useState({});
  const [ accounts, setAccounts ] = useState([]);
  const [ { maxPages, maxIndex }, setMaxPages ] = useState([]);
  const headers = [
    [t('validators'), 'start', 5],
    [t('produced blocks'), 'expand'],
  ];

  function handlePageChange(index, max, maxIndex) {
    const startIndex = maxIndex - (index - 1) * epochsPerPage;
    const promises = [];
    for (let i = startIndex; i >= Math.max(startIndex - epochsPerPage, 1); i--) {
      promises.push({
        index: i
      });
    }
    setAccounts(promises);
  }

  async function setEpochIndices() {
    const currentEpoch = await api.query.poAModule.epoch();
    const maxPages = Math.ceil(currentEpoch.toNumber() / epochsPerPage);
    handlePageChange(startPage, maxPages, currentEpoch.toNumber());
    setMaxPages({
      maxPages,
      maxIndex: currentEpoch.toNumber(),
    });
  }

  useEffect(() => {
    if (accounts.length === 0) {
      setEpochIndices();
    }
  }, []);

  const headerRef = useRef([
    [t('epochs'), 'start'],
    [t('validator count')],
    [t('starting slot')],
    [t('expected ending slot')],
    [t('ending slot')],
    [t('total emission')],
    [t('treasury rewards')],
    [t('validator rewards'), 'expand'],
    [],
  ]);

  return (
    <>
      <Table
        empty={t<string>('No epochs available')}
        header={headerRef.current}
      >
        {accounts
          .filter((header) => !!header)
          .map((header): React.ReactNode => (
            <Epoch key={header.index} value={header} />
          ))}
      </Table>
      <Pagination page={startPage} maxPages={maxPages} maxIndex={maxIndex} onPageChange={handlePageChange} />
    </>
  );
}

export default React.memo(EpochsList);
