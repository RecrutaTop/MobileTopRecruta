export interface GastoOrgao {
  orgao: {
    id: number;
    name: string;
    tenant_id?: string;
  }
  total: number
}

export interface GastoFornecedor {
  fornecedor: {
    id: number;
    name: string;
    document?: string;
    tenant_id?: string;
  }
  total: number
}

export type DataItem = { 
  name: string; 
  value: number; 
  percentage: number;
}

export type ViewMode = 'valor' | 'pct'

export type ChartValue = number | string | readonly (number | string)[] | undefined
