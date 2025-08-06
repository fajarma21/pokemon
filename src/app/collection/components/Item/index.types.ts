import type { PokeLS } from '@/types';
import type { MouseEvent } from 'react';

export interface ItemProps {
  data: PokeLS;
  onClickEdit: (e: MouseEvent<HTMLButtonElement>) => void;
  onClickRelease: (e: MouseEvent<HTMLButtonElement>) => void;
}
