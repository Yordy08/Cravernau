import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import GeneradorNoticiaPage from './pages/GeneradorNoticia/GeneradorNoticiaPage'
import GeneradorHistoriaPage from './pages/GeneradorHistoria/GeneradorHistoriaPage'
import { GeneratorProvider } from './features/generators/state/GeneratorProvider'

export default function App() {
  return (
    <GeneratorProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/generador/noticia" element={<GeneradorNoticiaPage />} />
        <Route path="/generador/historia" element={<GeneradorHistoriaPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GeneratorProvider>
  )
}

