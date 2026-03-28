import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">Portal da Transparência</h1>
        <p className="text-gray-600">
          Portal da Transparência
        </p>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors cursor-pointer" onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
