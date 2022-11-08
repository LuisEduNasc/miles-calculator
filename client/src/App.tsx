import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from './components/errorBoundary'
import { HeaderComponent } from './components/header'
import { Home } from './pages/home'
import { MainContainer } from './styles'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
])

function App() {
  return (
    <ErrorBoundary>
      <HeaderComponent />
      <MainContainer>
        <RouterProvider router={router} />
      </MainContainer>
    </ErrorBoundary>
  )
}

export default App
