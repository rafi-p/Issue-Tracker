import React from "react";
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import Loading from "./components/Loading";
import FetchingIndicator from "./components/FetchingIndicator"
import AddIssue from "./pages/AddIssue";

const Issues = React.lazy(() => import('./pages/Issues'))
const Issue = React.lazy(() => import('./pages/Issue'))

function App() {
  const isRootPath = useMatch({path: '/', end: true})
  return (
    <div className="App">
      {
        !isRootPath
        ? <Link to='/'>Back to Issues List</Link>
        : <span>&nbsp;</span>
      }
        <h1>Issue Tracker</h1>
        <React.Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Issues />} />
            <Route path="/issue/:number" element={<Issue />} />
            <Route path="/add" element={<AddIssue />} />
          </Routes>
          <FetchingIndicator />
        </React.Suspense>
    </div>
  );
}

export default App;