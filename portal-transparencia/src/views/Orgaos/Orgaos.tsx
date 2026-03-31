import { useState, useEffect, useCallback, useMemo } from 'react';
import { orgaosService } from '@/services/orgaos';
import type { Orgao } from '@/types/orgao.types'
import { OrgaoCard } from '@/components/Modals/OrgaoCard';
import { OrgaoFormModal } from '@/components/Modals/OrgaoFormModal';
import { ConfirmDeleteModal } from '@/components/Modals/ConfirmDeleteModal';
import { Loader2, Plus, AlertCircle, Building2, Search, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useDebounce } from '@/hooks/useDebounce'
import { PaginationBar } from '@/components/ui/PaginationBar'
import { SortSelector } from '@/components/ui/SortSelector'
import type { AppError } from '@/types/error.types'
import PullToRefresh from 'react-simple-pull-to-refresh';

const PER_PAGE = 15;

const ORGAO_SORT_OPTIONS = [
  { label: 'Nome A-Z', value: 'name_asc' },
  { label: 'Nome Z-A', value: 'name_desc' },
  { label: 'Mais recentes', value: 'date_desc' },
  { label: 'Mais antigos', value: 'date_asc' },
]

function EmptyState({ term }: { term?: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl p-10 sm:p-16 text-center">
      <div className="bg-gray-50 dark:bg-gray-800 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Nenhum órgão encontrado</h3>
      <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-xs mx-auto text-sm">
        {term
          ? `Nenhum resultado para "${term}". Tente outro nome ou ID.`
          : 'Cadastre uma nova unidade institucional para começar.'}
      </p>
    </div>
  )
}

export function Orgaos() {
  const [allOrgaos, setAllOrgaos] = useState<Orgao[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [localPage, setLocalPage] = useState(1)
  const debouncedSearch = useDebounce(searchQuery, 400)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [orgaoToEdit, setOrgaoToEdit] = useState<Orgao | null>(null)

  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [orgaoToDelete, setOrgaoToDelete] = useState<Orgao | null>(null)
  const [sortBy, setSortBy] = useState('name_asc')

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await orgaosService.getAll()
      setAllOrgaos(res as Orgao[])
    } catch (err: unknown) {
      const error = err as AppError
      setError(error.friendlyMessage || 'Falha ao carregar os órgãos.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  const sortedOrgaos = useMemo(() => {
    let items = [...allOrgaos]
    
    if (debouncedSearch.trim()) {
      const term = debouncedSearch.trim().toLowerCase()
      items = items.filter(o => 
        o.name.toLowerCase().includes(term) ||
        o.id.toString() === term
      )
    }

    switch (sortBy) {
      case 'name_asc': return items.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
      case 'name_desc': return items.sort((a, b) => b.name.localeCompare(a.name, 'pt-BR'))
      case 'date_desc': return items.sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
      case 'date_asc': return items.sort((a, b) => (a.created_at ?? '').localeCompare(b.created_at ?? ''))
      default: return items
    }
  }, [allOrgaos, debouncedSearch, sortBy])

  const totalPages = Math.ceil(sortedOrgaos.length / PER_PAGE)
  const from = (localPage - 1) * PER_PAGE
  const to = Math.min(from + PER_PAGE, sortedOrgaos.length)
  const paginatedOrgaos = sortedOrgaos.slice(from, to)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setLocalPage(1)
  }

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const reload = () => fetchAll()

  const handleEdit = (orgao: Orgao) => {
    setOrgaoToEdit(orgao)
    setIsFormOpen(true)
  }

  const handleDeleteRequest = (orgao: Orgao) => {
    setOrgaoToDelete(orgao)
    setIsDeleteOpen(true)
  }

  const confirmDelete = async () => {
    if (!orgaoToDelete) return
    try {
      await orgaosService.delete(orgaoToDelete.id)
      toast.success('Órgão excluído com sucesso!')
      reload()
    } catch (err: unknown) {
      const error = err as AppError
      toast.error(error.friendlyMessage || 'Erro ao excluir o órgão. Verifique se existem despesas vinculadas.')
    } finally {
      setIsDeleteOpen(false)
      setOrgaoToDelete(null)
    }
  }

  return (
    <PullToRefresh
      onRefresh={async () => { reload() }}
      refreshingContent={<div className="flex justify-center p-4"><RefreshCw className="w-6 h-6 animate-spin text-blue-500" /></div>}
      pullingContent={""}
      className="flex-1 w-full"
    >
      <div className="p-4 md:p-6 space-y-4 max-w-7xl mx-auto w-full min-h-[calc(100vh-160px)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Órgãos</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Gerenciamento de unidades institucionais</p>
          </div>
          <Button
            onClick={() => { setOrgaoToEdit(null); setIsFormOpen(true); }}
            className="h-10 sm:h-11 rounded-xl px-4 sm:px-6 w-full sm:w-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Cadastrar Órgão
          </Button>
        </div>

        <form onSubmit={handleSearch} className="relative group w-full">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <Input
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            placeholder="Buscar por nome ou ID..."
            className="pl-10 h-11 rounded-xl bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus-visible:ring-blue-500 w-full shadow-sm"
          />
        </form>

        <div className="flex items-center justify-end">
          <SortSelector options={ORGAO_SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
        </div>
          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              <p className="text-gray-500 dark:text-gray-400 animate-pulse">Carregando unidades...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedOrgaos.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {paginatedOrgaos.map(orgao => (
                      <OrgaoCard
                        key={orgao.id}
                        orgao={orgao}
                        onEdit={() => handleEdit(orgao)}
                        onDelete={() => handleDeleteRequest(orgao)}
                      />
                    ))}
                  </div>

                  <PaginationBar
                    currentPage={localPage}
                    lastPage={totalPages}
                    total={sortedOrgaos.length}
                    from={from + 1}
                    to={to}
                    onPrev={() => setLocalPage(prev => Math.max(prev - 1, 1))}
                    onNext={() => setLocalPage(prev => Math.min(prev + 1, totalPages))}
                  />
                </>
              ) : (
                <EmptyState term={debouncedSearch} />
              )}
            </div>
          )}
        <OrgaoFormModal
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          initialData={orgaoToEdit}
          onSuccess={reload}
        />

        <ConfirmDeleteModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={confirmDelete}
          title="Excluir Órgão"
          description={`Tem certeza que deseja excluir o órgão "${orgaoToDelete?.name}"?\n\nEssa ação é irreversível e só poderá ser realizada se não houverem despesas vinculadas a este órgão.`}
        />
      </div>
    </PullToRefresh>
  )
}