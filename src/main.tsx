import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";
import { QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"

const container = document.getElementById('root');
const root = createRoot(container!);


const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60
    }
  }
})

new Promise((res) => setTimeout(res, 100))
  .then(() =>{
      worker.start({
        quiet: true,
        onUnhandledRequest: "bypass",
      })
  })
  .then(() => {
    root.render(
      <React.StrictMode>
        <QueryClientProvider client={client} >
            <Router>
              <div className="container">
                <App />
              </div>
            </Router>
            <ReactQueryDevtools />
        </QueryClientProvider>
      </React.StrictMode>
    );
  });