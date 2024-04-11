import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

//components
import Navbar from "./components/Navbar";

//pages
import Home from "@/pages/Home";
import EditProfile from "./pages/EditProfile";

import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";

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
        <Route
          path="/profile"
          element={auth ? <EditProfile /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/users/:id"
          element={auth ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
    </>
  );
}

export default App;
