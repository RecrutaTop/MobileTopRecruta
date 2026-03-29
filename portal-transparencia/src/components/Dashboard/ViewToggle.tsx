import type { ViewToggleProps } from '@/types/viewToggle.types';

export function ViewToggle({ active, onChange }: ViewToggleProps) {
  return (
    <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-lg shrink-0">
      <button onClick={() => onChange('valor')} 
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
          active === 'valor' 
            ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' 
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
        }`}
      >
        Valores (R$)
      </button>
      <button onClick={() => onChange('pct')} 
        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
          active === 'pct' 
            ? 'bg-white dark:bg-gray-800 shadow-sm text-blue-600 dark:text-blue-400' 
            : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer'
        }`}
      >
        Proporção (%)
      </button>
    </div>
  );
}
