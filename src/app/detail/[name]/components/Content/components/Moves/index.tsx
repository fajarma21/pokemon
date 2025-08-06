import IntersectSection from '@/components/IntersectSection';
import TypeChip from '@/components/TypeChip';

import styles from './index.module.scss';
import type { MovesProps } from './index.types';

const Moves = ({ moves }: MovesProps) => {
  return (
    <IntersectSection>
      <h3>Moves ({moves.length})</h3>
      <div className={styles.scrollRow}>
        {moves.map((item, index) => {
          const { move } = item || {};
          const { name: moveName = '' } = move || {};
          return <TypeChip key={`type-${index}`}>{moveName}</TypeChip>;
        })}
      </div>
    </IntersectSection>
  );
};

export default Moves;
