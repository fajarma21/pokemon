import Image from 'next/image';
import Link from 'next/link';

import pokemonLogo from '@/assets/logo-pokemon.png';

import styles from './index.module.scss';

const Header = () => {
  return (
    <header className={styles.floatHeader}>
      <Link href="/">
        <Image
          priority
          src={pokemonLogo}
          alt="pokemon"
          width={106}
          height={39}
          className={styles.headerImg}
        />
      </Link>
    </header>
  );
};

export default Header;
