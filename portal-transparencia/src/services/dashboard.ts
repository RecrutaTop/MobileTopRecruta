import { api } from '@/services/api';
import type { GastoOrgao, GastoFornecedor } from '@/types/dashboard.types';

async function get<T>(url: string): Promise<T> {
  try {
    const { data } = await api.get<T>(url)
    return data
  } catch (error) {
    console.error(`Erro ao buscar ${url}`, error)
    throw new Error('Erro ao carregar dados do dashboard')
  }
}

export const dashboardService = {
  getTotalPorOrgao: () => get<GastoOrgao[]>('/despesas/total/orgao'),
  getTotalPorFornecedor: () => get<GastoFornecedor[]>('/despesas/total/fornecedor'),
}