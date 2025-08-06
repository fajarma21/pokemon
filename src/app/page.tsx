'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useIntersect } from 'fajarma-react-lib';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

import PokeThumbnail from '@/components/PokeThumbnail';
import getFirstName from '@/utils/getFirstName';
import getImgFromSrc from '@/utils/getImgFromSrc';
import Loader from './components/Loader';
import { getNextOffset, getPokemonList } from './page.helpers';
import styles from './page.module.scss';
import type { PokemonListData } from './page.types';
export default function Home() {
  const { data, hasNextPage, isLoading, isError, isFetching, fetchNextPage } =
    useInfiniteQuery<PokemonListData>({
      queryKey: ['pokemon-list'],
      queryFn: getPokemonList,
      initialPageParam: 0,
      getNextPageParam: (allpage) => getNextOffset(allpage.next),
    });

  const { pages = [] } = data || {};

  const { ref } = useIntersect<HTMLDivElement>(() => fetchNextPage());

  return (
    <>
      {isError && <p>Error...</p>}
      <ul className={styles.pokemonContainer}>
        {isLoading ? (
          [...Array(10)].map((_, index) => <Loader key={`loader-${index}`} />)
        ) : (
          <>
            {pages.map((page, index) => (
              <Fragment key={`page-${index}`}>
                {page.results.map((item, index2) => (
                  <motion.li
                    key={item.name}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index2 * 0.05 },
                    }}
                  >
                    <PokeThumbnail
                      imgSize={100}
                      href={`/detail/${item.name}`}
                      imgSrc={getImgFromSrc(item.url)}
                      priority={!index}
                      text={getFirstName(item.name)}
                    />
                  </motion.li>
                ))}
              </Fragment>
            ))}
            {isFetching &&
              [...Array(4)].map((_, index) => (
                <Loader key={`loader-${index}`} />
              ))}
          </>
        )}
      </ul>

      {hasNextPage && !isFetching && <div ref={ref} />}
    </>
  );
}
