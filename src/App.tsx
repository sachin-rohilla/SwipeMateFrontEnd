import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import Layout from "./Layout/Layout";

function App() {
  const Home = React.lazy(() => import("./pages/Home"));
  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<h1>About</h1>} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
