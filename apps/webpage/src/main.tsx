import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {store} from "@repo/store"
import AuthProvider from "./auth/AuthProvider.tsx"
import { Provider } from "react-redux"

const queryClient = new QueryClient();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
