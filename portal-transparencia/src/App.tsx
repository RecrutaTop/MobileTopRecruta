import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import { Dashboard } from '@/views/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <ThemeToggle />
        <main className="w-full min-h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
