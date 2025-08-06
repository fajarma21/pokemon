import { useIntersect } from 'fajarma-react-lib';

import styles from './index.module.scss';
import type { IntersectSectionProps } from './index.types';

const IntersectSection = ({ children }: IntersectSectionProps) => {
  const { ref, intersecting } = useIntersect<HTMLDivElement>(undefined, {
    threshold: 0.3,
  });

  return (
    <section ref={ref}>
      <div className={styles.section} data-display={intersecting || undefined}>
        {children}
      </div>
    </section>
  );
};

export default IntersectSection;
