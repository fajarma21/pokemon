import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

import styles from './index.module.scss';
import type { PokeThumbnailProps } from './index.types';

const PokeThumbnail = ({
  href,
  imgSrc,
  imgSize,
  priority,
  text,
  width = 0,
}: PokeThumbnailProps) => {
  const fullWidth = width + 28;
  const style = {
    width: width ? fullWidth : 'auto',
    height: width ? fullWidth : 180,
    '--name-max': `${imgSize}px`,
  } as CSSProperties;
  return (
    <Link href={href} className={styles.thumbnail} style={style}>
      <Image
        src={imgSrc}
        alt={text}
        width={imgSize}
        height={imgSize}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
      />

      <p>{text}</p>
    </Link>
  );
};

export default PokeThumbnail;
