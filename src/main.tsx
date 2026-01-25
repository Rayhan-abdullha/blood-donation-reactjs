import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query" // Import added
import { Toaster } from "react-hot-toast" // Toast container
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
          {/* ৩. Toaster এখানে রাখলে পুরো অ্যাপে নোটিফিকেশন কাজ করবে */}
          <Toaster position="top-center" reverseOrder={false} />
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)