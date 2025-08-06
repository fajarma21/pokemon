'use client';

import getLS from 'fajarma-package/dist/storage/getLS';
import setLS from 'fajarma-package/dist/storage/setLS';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import { COLLECTION_DEFAULT, LS_POKEMON } from '@/constants';
import type { EditMode, PokeLS } from '@/types';
import getFirstName from '@/utils/getFirstName';

import EmptyState from './components/EmptyState';
import Item from './components/Item';
import OptionDialog from './components/OptionDialog';
import styles from './page.module.scss';

const Collection = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PokeLS[]>([]);
  const [selectedData, setSelectedData] = useState<PokeLS>(COLLECTION_DEFAULT);

  const [displayDialog, setDisplayDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<EditMode>('');

  const handleOpenEdit = (
    e: MouseEvent<HTMLButtonElement>,
    mode: EditMode,
    value: PokeLS
  ) => {
    e.preventDefault();
    e.stopPropagation();

    setDialogMode(mode);
    setSelectedData(value);
    setDisplayDialog(true);
  };

  const handleCloseDialog = () => {
    setDisplayDialog(false);
  };

  const handleEdit = (value = '') => {
    const newData = data.map((item) => {
      if (item.queue === selectedData.queue) {
        return {
          ...item,
          nickname: value,
        };
      }
      return item;
    });

    setData(newData);
    setLS(LS_POKEMON, newData);

    handleCloseDialog();
  };

  const handleRelease = () => {
    const newData = data.filter((item) => item.queue !== selectedData.queue);
    setData(newData);
    setLS(LS_POKEMON, newData);

    handleCloseDialog();
  };

  useEffect(() => {
    const lsData = getLS<PokeLS[]>(LS_POKEMON) || [];
    setLoading(false);
    setData(lsData);
  }, []);

  return (
    <>
      <h1>Collection ({data.length})</h1>
      {data.length ? (
        <ul className={styles.collection}>
          <AnimatePresence>
            {data.map((item, index) => (
              <motion.li
                key={item.time + item.name}
                layout
                role="button"
                tabIndex={0}
                className={styles.item}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: index * 0.05 },
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                }}
              >
                <Link href={`/detail/${item.name}?c=${item.queue}`}>
                  <Item
                    data={item}
                    onClickEdit={(e) => handleOpenEdit(e, 'edit', item)}
                    onClickRelease={(e) => handleOpenEdit(e, 'release', item)}
                  />
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <EmptyState loading={loading} />
      )}

      <OptionDialog
        {...selectedData}
        name={getFirstName(selectedData.name)}
        display={displayDialog}
        mode={dialogMode}
        onClose={handleCloseDialog}
        onEdit={handleEdit}
        onRelease={handleRelease}
      />
    </>
  );
};

export default Collection;
