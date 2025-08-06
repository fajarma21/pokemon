import Pokeball from '@/components/Pokeball';

import styles from './index.module.scss';
import type { EmptyStateProps } from './index.types';

const EmptyState = ({ loading }: EmptyStateProps) => {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.ballWrapper}>
        <Pokeball rotating />
      </div>
      {!loading && (
        <p>
          ...
          <br />
          There is nothing here.
          <br />
          Go throw some pokeballs.
        </p>
      )}
    </div>
  );
};

export default EmptyState;
