import styles from './index.module.scss';
import type { PokeballProps } from './index.types';

const Pokeball = ({ rotating }: PokeballProps) => {
  return (
    <div className={styles.ball} data-rotating={rotating || undefined}>
      <div className={styles.circle} />
    </div>
  );
};

export default Pokeball;
