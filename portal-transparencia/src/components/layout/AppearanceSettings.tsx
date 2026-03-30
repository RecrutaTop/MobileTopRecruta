import { Sun, Moon, Palette } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'

export function AppearanceSettings() {
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <DropdownMenuLabel className="px-2 py-1.5 flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
        <Palette className="h-3.5 w-3.5" />
        Aparência
      </DropdownMenuLabel>
      <DropdownMenuSeparator className="my-1" />
      <DropdownMenuRadioGroup value={theme} onValueChange={(val) => {
        if (val !== theme) toggleTheme()
      }}>
        <DropdownMenuRadioItem 
          value="light" 
          className="rounded-lg h-10 px-2 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600 dark:focus:text-blue-400"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Tema Claro</span>
        </DropdownMenuRadioItem>
        <DropdownMenuRadioItem 
          value="dark" 
          className="rounded-lg h-10 px-2 cursor-pointer focus:bg-blue-50 dark:focus:bg-blue-900/20 focus:text-blue-600 dark:focus:text-blue-400"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Tema Escuro</span>
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </>
  )
}
