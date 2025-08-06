import styles from './index.module.scss';
import type { ScrollToTopProps } from './index.types';

const ScrollToTop = ({ display }: ScrollToTopProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      aria-label="scroll to top"
      type="button"
      className={styles.scrollTop}
      data-display={display || undefined}
      onClick={handleScrollToTop}
    />
  );
};

export default ScrollToTop;
