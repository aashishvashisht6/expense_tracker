import { useState } from "react";
import { Link } from "react-router-dom";


const sidebarItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Bank Account", path: "/bank-account" },
  { name: "Expenses", path: "/expenses" },
  { name: "Income", path: "/income" },
  { name: "Reports", path: "/reports" },
]
const Sidebar = () => {
  const [activePath, setActivePath] = useState<string>("/dashboard");
  return (
    <>
      {/* Desktop sidebar */}
      <div className="d-none d-lg-block bg-dark border-end vh-100 position-fixed p-3" style={{ width: "15rem" }}>
        <ul className="nav flex-column">
          {sidebarItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <Link className={`nav-link text-white ${item.path === activePath ? "bg-primary" : ""}`} 
              to={item.path}
              onClick={() => setActivePath(item.path)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile drawer */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5>Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Expenses</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Reports</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
