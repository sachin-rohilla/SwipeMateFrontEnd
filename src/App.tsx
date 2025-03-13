import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { Suspense } from "react";
import Layout from "./Layout/Layout";

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<h1>Home</h1>} />
            <Route path="/about" element={<h1>About</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
