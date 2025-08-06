'use client';

import dayjs from 'dayjs';
import getLS from 'fajarma-package/dist/storage/getLS';
import setLS from 'fajarma-package/dist/storage/setLS';
import { useIntersect } from 'fajarma-react-lib';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import Pokeball from '@/components/Pokeball';
import { COLLECTION_DEFAULT, LS_POKEMON } from '@/constants';
import { useCatchContext } from '@/contexts/catch';
import type { PokeLS } from '@/types';

import dynamic from 'next/dynamic';
import CatchDialog from './components/CatchDialog';
import FloatingBall from './components/FloatingBall';
import styles from './index.module.scss';
import type { ImageWrapperProps } from './index.types';

const CatchedIconLazy = dynamic(() => import('./components/CatchedIcon'), {
  ssr: false,
});

const ImageWrapper = ({ children, id, name }: ImageWrapperProps) => {
  const searchParams = useSearchParams();
  const cID = searchParams.get('c');

  const { handleChangeCatchNew } = useCatchContext();

  const [displayCatch, setDisplayCatch] = useState(false);

  const [throwing, setThrowing] = useState(false);
  const [catchTime, setCatchTime] = useState(0);
  const [catchSuccess, setCatchSuccess] = useState(false);
  const [isCatched, setIsCatched] = useState(false);

  const [collectionData, setCollectionData] =
    useState<PokeLS>(COLLECTION_DEFAULT);

  const isCollection = Boolean(collectionData.id);
  const pokeStorage = useMemo(() => getLS<PokeLS[]>(LS_POKEMON) || [], []);

  const handleCloseDialog = (nickname = '') => {
    setThrowing(false);
    setCatchSuccess(false);
    setDisplayCatch(false);
    handleChangeCatchNew(true);
    setIsCatched(true);

    const newData = {
      id,
      name,
      nickname,
      time: new Date().getTime(),
    };
    if (pokeStorage.length) {
      setLS(LS_POKEMON, [
        ...pokeStorage,
        { ...newData, queue: pokeStorage[pokeStorage.length - 1].queue + 1 },
      ]);
    } else setLS(LS_POKEMON, [{ ...newData, queue: 1 }]);
  };

  const handleCatch = () => {
    setThrowing(true);

    const randomTime = Math.ceil(Math.random() * 3000);
    const isSuccess = Boolean(randomTime % 2);
    setCatchTime(randomTime);

    setTimeout(() => {
      setCatchSuccess(isSuccess);
      setTimeout(() => {
        setCatchTime(0);
        if (!isSuccess) {
          setThrowing(false);
          setCatchSuccess(false);
        } else setDisplayCatch(true);
      }, 3000);
    }, randomTime);
  };

  const { ref: imgRef, intersecting } = useIntersect<HTMLImageElement>(
    undefined,
    {
      threshold: 0.7,
    }
  );

  return (
    <>
      {isCollection && (
        <div className={styles.collectionRow}>
          <h3>{collectionData.nickname || collectionData.name}</h3>
          <p>{dayjs(collectionData.time).format('DD/MM/YY/ HH:mm:ss')}</p>
        </div>
      )}
      <div
        ref={imgRef}
        className={`${styles.imgWrapper} ${
          catchTime || catchSuccess ? styles.imgModifier : ''
        }`}
      >
        {children}

        {!isCollection && (
          <CatchedIconLazy
            catchId={cID}
            display={isCatched}
            id={id}
            storage={pokeStorage}
            handleAddCollection={setCollectionData}
          />
        )}

        {Boolean(catchTime) && (
          <div className={styles.throwedPokeball}>
            <Pokeball />
          </div>
        )}
      </div>

      {!isCollection && (
        <>
          <FloatingBall
            display={intersecting}
            throwing={throwing}
            onClickBall={handleCatch}
          />

          <CatchDialog
            display={displayCatch}
            id={id}
            name={name}
            onClose={handleCloseDialog}
          />
        </>
      )}
    </>
  );
};

export default ImageWrapper;
