import type { EditMode } from '@/types';

export interface OptionDialogProps {
  display: boolean;
  id: number;
  mode: EditMode;
  name: string;
  nickname: string;
  onClose: () => void;
  onEdit: (data?: string) => void;
  onRelease: () => void;
}
