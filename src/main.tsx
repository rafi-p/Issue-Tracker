import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { worker } from "@uidotdev/react-query-api";

const container = document.getElementById('root');
const root = createRoot(container!);

new Promise((res) => setTimeout(res, 100))
  .then(() =>
    worker.start({
      quiet: true,
      onUnhandledRequest: "bypass",
    })
  )
  .then(() => {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <div className="container">
            <App />
          </div>
        </BrowserRouter>
      </React.StrictMode>
    );
  });