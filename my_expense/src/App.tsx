import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Layout from "./pages/Layout";
import PrivateRoute from "./components/PrivateRoute";
import ListView from "./pages/ListView";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Layout />} />
            <Route path="bank-accounts" element={<ListView />} />
            <Route path="transaction" element={<Layout />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
