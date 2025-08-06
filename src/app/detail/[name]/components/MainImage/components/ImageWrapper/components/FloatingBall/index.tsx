import Pokeball from '@/components/Pokeball';

import styles from './index.module.scss';
import type { FloatingBallProps } from './index.types';

const FloatingBall = ({
  display,
  throwing,
  onClickBall,
}: FloatingBallProps) => {
  return (
    <div className={styles.pokeballWrap} data-display={display || undefined}>
      <button
        type="button"
        className={styles.btnModifier}
        data-throw={throwing || undefined}
        onClick={onClickBall}
      >
        <Pokeball rotating />
      </button>
    </div>
  );
};

export default FloatingBall;
