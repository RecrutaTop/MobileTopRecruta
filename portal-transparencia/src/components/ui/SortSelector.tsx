import { ArrowUpDown, Check, Clock, History, TrendingDown, TrendingUp, SortAsc, SortDesc, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useIsMobile } from '@/hooks/useIsMobile'
import type { SortSelectorProps } from '@/types/sort.types'
import { cn } from '@/lib/utils'

function getSortIcon(label: string) {
  const l = label.toLowerCase()
  if (l.includes('recente')) return <Clock className="w-4 h-4" />
  if (l.includes('antigo')) return <History className="w-4 h-4" />
  if (l.includes('maior valor')) return <TrendingUp className="w-4 h-4" />
  if (l.includes('menor valor')) return <TrendingDown className="w-4 h-4" />
  if (l.includes('descrição a-z') || l.includes('nome a-z')) return <SortAsc className="w-4 h-4" />
  if (l.includes('descrição z-a') || l.includes('nome z-a')) return <SortDesc className="w-4 h-4" />
  return <ArrowUpDown className="w-4 h-4" />
}

export function SortSelector({ options, value, onChange }: SortSelectorProps) {
  const isMobile = useIsMobile()
  const activeOption = options.find(o => o.value === value)
  const activeLabel = activeOption?.label ?? 'Ordenar'

  const trigger = (
    <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors active:scale-95 shrink-0 shadow-sm">
      <ArrowUpDown className="w-3.5 h-3.5" />
      <span className="max-w-[120px] truncate">{activeLabel}</span>
    </button>
  )

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="pb-8">
          <DrawerHeader className="relative pb-2">
            <DrawerTitle className="text-base font-semibold text-center mt-2">Ordenar por</DrawerTitle>
            <DrawerClose className="absolute right-4 top-2 p-2 rounded-full text-gray-400 hover:text-gray-900 transition-colors">
              <X className="w-4 h-4" />
            </DrawerClose>
          </DrawerHeader>
          <div className="flex flex-col p-2">
            {options.map(opt => {
              const isActive = opt.value === value
              return (
                <DrawerClose key={opt.value} asChild>
                  <button
                    onClick={() => onChange(opt.value)}
                    className={cn(
                      "flex items-center justify-between w-full h-14 px-4 rounded-xl transition-all active:scale-[0.98] active:bg-gray-50 dark:active:bg-gray-800/50",
                      isActive ? "bg-blue-50/30 dark:bg-blue-500/5" : ""
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={cn(
                        "flex items-center justify-center transition-colors",
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                      )}>
                        {getSortIcon(opt.label)}
                      </div>
                      <span className={cn(
                        "text-sm font-medium transition-colors",
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-100"
                      )}>
                        {opt.label}
                      </span>
                    </div>
                    {isActive && (
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
                    )}
                  </button>
                </DrawerClose>
              )
            })}
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl min-w-[200px] p-2">
        {options.map(opt => {
          const isActive = opt.value === value
          return (
            <DropdownMenuItem
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex items-center justify-between py-2.5 px-3 cursor-pointer rounded-lg transition-colors focus:bg-blue-50 dark:focus:bg-blue-500/10",
                isActive ? "text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-500/5" : "text-gray-700 dark:text-gray-300"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span className={cn(
                  "opacity-70",
                  isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                )}>
                  {getSortIcon(opt.label)}
                </span>
                {opt.label}
              </div>
              {isActive && (
                <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}