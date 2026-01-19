import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"

import App from "./App"
import "./index.css"
import { GlobalErrorFallback } from "./components/ErrorFallback"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
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
  </React.StrictMode>
)
