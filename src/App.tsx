import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Layout from "./Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));
  const SignUp = lazy(() => import("./pages/SignUp"));

  return (
    <>
      <Suspense fallback={<div>Loading</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
