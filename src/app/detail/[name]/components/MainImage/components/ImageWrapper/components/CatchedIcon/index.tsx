import { useEffect } from 'react';

import Pokeball from '@/components/Pokeball';
import styles from './index.module.scss';
import type { CatchedIconProps } from './index.types';

const CatchedIcon = ({
  catchId,
  display,
  id,
  storage,
  handleAddCollection,
}: CatchedIconProps) => {
  const catched = storage.some((item) => item.id === id);

  useEffect(() => {
    const numberCID = Number(catchId);
    if (!Number.isNaN(numberCID)) {
      const data = storage.find((item) => item.queue === numberCID);
      if (data) handleAddCollection(data);
    }
  }, [catchId, handleAddCollection, storage]);

  return (
    (display || catched) && (
      <div className={styles.catched} title="Already in collection">
        <Pokeball />
      </div>
    )
  );
};

export default CatchedIcon;
