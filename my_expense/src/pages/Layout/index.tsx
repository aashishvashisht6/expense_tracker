import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/Navbar";
import Sidebar from "../../components/common/Sidebar";
import "./index.css"
import { useState } from "react";

const Layout = () => {
  const [showMobileSideBar, setShowMobileSideBar] = useState<boolean>(false);
  return (
    <div>
      <Navbar setShowMobileSideBar={setShowMobileSideBar}/>
      <div className="d-flex">
        <Sidebar showMobileSideBar={showMobileSideBar} setShowMobileSideBar={setShowMobileSideBar}/>
        {/* Main content */}
        <main className="flex-grow-1 p-3 content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
