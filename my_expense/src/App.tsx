import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import ListView from "./pages/ListView";
import Dashboard from "./pages/Dashboard";
import FormView from "./pages/FormView";
import Report from "./pages/Report";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="bank-account" element={<ListView doctype="bank_account"/>} />
          <Route path="expenses" element={<ListView doctype="expenses"/>} />
          <Route path="income" element={<ListView doctype="income"/>} />
          <Route path=":doctype/:name" element={<FormView />} />
          <Route path="reports" element={<Report/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
