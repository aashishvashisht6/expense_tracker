import { NavLink } from "react-router-dom";

const sidebarItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Bank Account", path: "/bank-account" },
  { name: "Expenses", path: "/expenses" },
  { name: "Income", path: "/income" },
  { name: "Reports", path: "/reports" },
];

type SideBarProps = {
  showMobileSideBar: boolean;
  setShowMobileSideBar: (value: boolean) => void;
};
const Sidebar = ({ showMobileSideBar, setShowMobileSideBar }: SideBarProps) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className="d-none d-md-block bg-dark border-end vh-100 position-fixed p-3"
        style={{ width: "240px" }}
      >
        <ul className="nav flex-column">
          {sidebarItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "fw-bold bg-primary rounded" : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Drawer */}
      <div
        className={showMobileSideBar ?"offcanvas offcanvas-start d-md-none show": "offcanvas offcanvas-start d-md-none"}
        tabIndex={-1}
        id="mobileSidebar"
        style={{ maxWidth: "50%" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            onClick={() => setShowMobileSideBar(false)}
          />
        </div>

        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {sidebarItems.map((item) => (
              <li className="nav-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "fw-bold bg-primary rounded" : ""}`
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
