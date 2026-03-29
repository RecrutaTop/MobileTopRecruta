import type { CardProps } from '@/types/card.types';

export function Card({ title, action, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          {title && <h3 className="font-semibold text-gray-800 dark:text-gray-100">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5 flex-1">
        {children}
      </div>
    </div>
  );
}
