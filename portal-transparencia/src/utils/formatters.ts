import type { ChartValue } from '@/types/dashboard.types';

export const formatCurrency = (value: ChartValue) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0)
}

export const formatPercentage = (value: ChartValue) => {
  return `${Number(value) || 0}%`
}
