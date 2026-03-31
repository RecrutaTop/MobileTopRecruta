import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie
} from 'recharts';
import { formatCurrency, formatPercentage } from '@/utils/formatters';
import type { ChartRendererProps } from '@/types/chartRenderer.types';
import { ChevronDown } from 'lucide-react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1', '#D946EF', '#14B8A6', '#F43F5E', '#1D4ED8', '#047857', '#B45309', '#BE123C', '#4338CA' ]

export function ChartRenderer({ data, viewMode }: ChartRendererProps) {
  if (data.length == 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">Sem dados fornecidos</div>
  }

  const coloredData = data.map((item, index) => ({
    ...item,
    fill: COLORS[index % COLORS.length]
  }));

  if (viewMode === 'valor') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={coloredData} margin={{ top: 10, right: 30, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} angle={-45} textAnchor="end" interval={0} height={60}/>
          <YAxis tickFormatter={(value) => `R$ ${value / 1000}k`} tick={{ fontSize: 12, fill: '#6b7280' }} width={70}/>
          <Tooltip cursor={{fill: 'rgba(59, 130, 246, 0.1)'}}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-bg, #fff)' }}
            formatter={formatCurrency} />
          <Bar dataKey="value" name="Gastos" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip formatter={formatPercentage} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--color-bg, #fff)' }}/>
            <Pie data={coloredData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={4} dataKey="percentage" nameKey="name" labelLine={false}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <details className="w-full shrink-0 group relative z-10">
        <summary className="w-full text-xs font-medium text-gray-500 dark:text-gray-400 cursor-pointer flex justify-center items-center gap-1.5 py-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg list-none [&::-webkit-details-marker]:hidden transition-colors mt-1 select-none border border-transparent dark:hover:border-gray-700/50 hover:border-gray-200">
          <span>Acessar Legenda ({data.length})</span>
          <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200" />
        </summary>
        
        <div className="absolute bottom-[calc(100%+4px)] left-0 right-0 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-50">
          <div className="flex flex-col gap-y-1 text-xs max-h-[220px] overflow-y-auto p-2 w-full custom-scrollbar">
            {data.map((item, i) => (
              <div key={i} className="flex items-center gap-2 w-full p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <span className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm" style={{backgroundColor: COLORS[i % COLORS.length]}} />
                <span className="text-gray-600 dark:text-gray-300 truncate flex-1">{item.name}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </details>
    </div>
  )
}
