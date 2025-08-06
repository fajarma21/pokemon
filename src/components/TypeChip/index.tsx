import styles from './index.module.scss';
import type { TypeChipProps } from './index.types';

const TypeChip = ({ long, type, children }: TypeChipProps) => {
  return (
    <div
      className={styles.chip}
      data-type={type || undefined}
      data-long={long || undefined}
    >
      {children}
    </div>
  );
};

export default TypeChip;
