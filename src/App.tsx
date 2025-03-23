import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
import Layout from "./Layout/Layout";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Loader from "./components/Loader";

function App() {
  const Home = lazy(() => import("./pages/Home"));
  const Login = lazy(() => import("./pages/Login"));
  const SignUp = lazy(() => import("./pages/SignUp"));
  const Connections = lazy(() => import("./pages/Connections"));
  const Requests = lazy(() => import("./pages/Requests"));
  const Profile = lazy(() => import("./pages/Profile"));
  const PageNotFound = lazy(() => import("./pages/PageNotFound"));

  return (
    <>
      <Suspense fallback={<Loader />}>
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
            <Route
              path="/connections"
              element={
                <ProtectedRoutes>
                  <Connections />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/requests"
              element={
                <ProtectedRoutes>
                  <Requests />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
