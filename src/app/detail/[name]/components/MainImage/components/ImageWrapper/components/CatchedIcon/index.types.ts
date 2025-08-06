import type { PokeLS } from '@/types';

export interface CatchedIconProps {
  catchId: string | null;
  display: boolean;
  id: number;
  storage: PokeLS[];
  handleAddCollection: (arg: PokeLS) => void;
}
