import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import "./index.css"

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        {/* Main content */}
        <main className="flex-grow-1 p-3 content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
