'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useIntersect } from 'fajarma-react-lib';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import pokemonLogo from '@/assets/logo-pokemon.png';
import { CatchProvider } from '@/contexts/catch';
import getCurrentPath from '@/utils/getCurrentPath';

import Header from './components/Header';
import Pokebag from './components/Pokebag';
import ScrollToTop from './components/ScrollToTop';
import styles from './layout.module.scss';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const queryClient = new QueryClient();

function PokemonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [catchNew, setCatchNew] = useState(false);
  const { ref, intersecting } = useIntersect<HTMLImageElement>();

  const isCollection = getCurrentPath(pathname) === 'collection';

  const handleChangeCatchNew = (value: boolean) => {
    setCatchNew(value);
  };

  return (
    <html lang="en">
      <head>
        <title>Pokemon</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="root-container">
          <QueryClientProvider client={queryClient}>
            <CatchProvider onChangeCatchNew={handleChangeCatchNew}>
              <div className={styles.container}>
                {!intersecting && <Header />}
                <Link href="/">
                  <Image
                    ref={ref}
                    priority
                    src={pokemonLogo}
                    alt="pokemon"
                    width={212}
                    height={78}
                    className={styles.titleImg}
                  />
                </Link>
                <div className={styles.content}>{children}</div>
                <ScrollToTop display={!intersecting} />
                {!isCollection && (
                  <Pokebag
                    hasNew={catchNew}
                    onClick={() => handleChangeCatchNew(false)}
                  />
                )}
                <div className={styles.footer}>
                  <p>
                    Powered by{' '}
                    <a href="https://pokeapi.co/" target="_blank">
                      pokeapi.co
                    </a>
                  </p>
                </div>
              </div>
            </CatchProvider>
          </QueryClientProvider>
        </div>
      </body>
    </html>
  );
}

export default PokemonLayout;
