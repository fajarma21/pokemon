import type { PokemonData } from '@/types';

export interface StatsProps {
  stats: NonNullable<PokemonData['stats']>;
}
