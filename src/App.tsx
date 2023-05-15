import React from "react";
import { Routes, Route, Link } from 'react-router-dom'
import Loading from "./components/Loading";

const Issues = React.lazy(() => import('./pages/Issues'))
const Issue = React.lazy(() => import('./pages/Issue'))

function App() {
  return (
    <div className="App">
        <h1>Issue Tracker</h1>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="/issue/:number" element={<Issue />} />
          </Routes>
        </React.Suspense>
    </div>
  );
}

export default App;