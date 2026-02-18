import { NavLink } from "react-router-dom";


const sidebarItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Bank Account", path: "/bank-account" },
  { name: "Expenses", path: "/expenses" },
  { name: "Income", path: "/income" },
  { name: "Reports", path: "/reports" },
]
const Sidebar = () => {
  return (
    <>
      {/* Desktop sidebar */}
      <div className="d-none d-md-block bg-dark border-end vh-100 position-fixed p-3" style={{ width: "15rem" }}>
        <ul className="nav flex-column">
          {sidebarItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "bg-primary" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile drawer */}
      <div className="offcanvas offcanvas-start" tabIndex={-1} id="mobileSidebar">
        <div className="offcanvas-header">
          <h5>Menu</h5>
          <button className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {sidebarItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                  data-bs-dismiss="offcanvas"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;