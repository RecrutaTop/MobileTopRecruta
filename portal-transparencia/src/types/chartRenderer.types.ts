import type { DataItem, ViewMode } from '@/types/dashboard.types';

export interface ChartRendererProps {
  data: DataItem[];
  viewMode: ViewMode;
}
