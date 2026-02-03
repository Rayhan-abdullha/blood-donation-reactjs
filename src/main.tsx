import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query" // Import added
import App from "./App"
import "./index.css"
import { GlobalErrorFallback } from "./components/ErrorFallback"

// ১. QueryClient কনফিগারেশন
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, 
      refetchOnWindowFocus: false, 
      staleTime: 1000 * 60 * 5, // ৫ মিনিট পর্যন্ত ডাটা ফ্রেশ থাকবে
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* ২. QueryClientProvider দিয়ে পুরো অ্যাপ র‍্যাপ করা হয়েছে */}
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ErrorBoundary
          FallbackComponent={GlobalErrorFallback}
          onReset={() => {
            window.location.reload()
          }}
        >
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)