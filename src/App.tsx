import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

//components
import Navbar from "./components/Navbar";

//pages
import Home from "@/pages/Home";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={auth ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!auth ? <Login /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/register"
          element={!auth ? <Register /> : <Navigate to={"/home"} />}
        />
      </Routes>
    </>
  );
}

export default App;
