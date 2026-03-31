import type { ViewMode } from '@/types/dashboard.types';

export interface ViewToggleProps {
  active: ViewMode;
  onChange: (v: ViewMode) => void;
}
