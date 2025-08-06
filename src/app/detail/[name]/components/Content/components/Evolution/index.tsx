'use client';

import { useQuery } from '@tanstack/react-query';
import { Fragment, useMemo } from 'react';

import IntersectSection from '@/components/IntersectSection';
import PokeThumbnail from '@/components/PokeThumbnail';
import getFirstName from '@/utils/getFirstName';
import getImgFromSrc from '@/utils/getImgFromSrc';

import { getAnyPokemonData, mapChainEvolution } from './index.helpers';
import styles from './index.module.scss';
import type { EvolutionProps, PokemonEvolutionData } from './index.types';

const Evolution = ({ url }: EvolutionProps) => {
  const { data: dataEvolution, isLoading: isLoadingEvolution } =
    useQuery<PokemonEvolutionData>({
      queryKey: ['pokemon-evolution', [url]],
      queryFn: () => getAnyPokemonData(url),
      enabled: Boolean(url),
    });
  const { chain } = dataEvolution || {};
  const evolutions = useMemo(() => mapChainEvolution(chain), [chain]);

  return (
    <IntersectSection>
      <h3>Evolution Chain</h3>
      <div className={styles.evoContainer}>
        {isLoadingEvolution ? (
          <p>Loading...</p>
        ) : (
          evolutions.map((list, index) => (
            <div key={`row-${index}`} className={styles.evoRow}>
              {list.map((item, index) => (
                <Fragment key={`${item.name}-${index}`}>
                  {Boolean(index) && <div className={styles.evoGap} />}
                  <div className={styles.evoWrapper}>
                    <PokeThumbnail
                      imgSrc={getImgFromSrc(item.url)}
                      imgSize={100}
                      href={item.name}
                      text={getFirstName(item.name)}
                      width={120}
                    />
                  </div>
                </Fragment>
              ))}
            </div>
          ))
        )}
      </div>
    </IntersectSection>
  );
};

export default Evolution;
