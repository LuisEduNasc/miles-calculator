import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ErrorBoundary } from './components/errorBoundary'
import { HeaderComponent } from './components/header'
import { Home } from './pages/home'
import { MainContainer } from './styles'
import { SearchFormProvider } from './contexts/home'
import { ResultsPage } from './pages/results'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 5 * 60 * 1000,
    },
  },
})

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <SearchFormProvider>
        <Home />
      </SearchFormProvider>
    ),
  },
  {
    path: '/results',
    element: <ResultsPage />,
  },
])

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <HeaderComponent />
        <MainContainer>
          <RouterProvider router={router} />
        </MainContainer>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
