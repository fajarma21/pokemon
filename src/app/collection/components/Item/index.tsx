import dayjs from 'dayjs';
import Image from 'next/image';

import getFirstName from '@/utils/getFirstName';
import getPokemonImg from '@/utils/getPokemonImg';

import styles from './index.module.scss';
import type { ItemProps } from './index.types';

const Item = ({ data, onClickEdit, onClickRelease }: ItemProps) => {
  const { id, time, name, nickname } = data;

  return (
    <>
      <div className={styles.btnContainer}>
        <button
          type="button"
          title="Edit"
          className={styles.btnIcon}
          onClick={onClickEdit}
        >
          <div className={styles.editIcon} />
        </button>
        <button
          type="button"
          title="Release"
          className={styles.btnIcon}
          onClick={onClickRelease}
        >
          <div className={styles.releaseIcon} />
        </button>
      </div>
      <Image
        priority
        src={getPokemonImg(id)}
        alt={String(time)}
        width={100}
        height={100}
      />
      <p className={styles.name}>
        <b>{nickname || getFirstName(name)}</b>
      </p>
      <p>
        <small>{dayjs(time).format('DD/MM/YY/ HH:mm:ss')}</small>
      </p>
    </>
  );
};

export default Item;
