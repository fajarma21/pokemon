import Link from 'next/link';

import styles from './index.module.scss';
import type { PokebagProps } from './index.types';

const Pokebag = ({ hasNew, onClick }: PokebagProps) => {
  return (
    <div className={styles.pokebagWrap} onClick={onClick}>
      <Link href="/collection">
        <div className={styles.inner}>
          {hasNew && <div className={styles.notif}>!</div>}
          <div className={styles.icon}></div>
        </div>
      </Link>
    </div>
  );
};

export default Pokebag;
