import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarLayout = () => {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "/dashboard", icon: "📊", label: "Dashboard" },
    { id: "/bank-accounts", icon: "🏦", label: "Bank Accounts" },
    { id: "/transaction", icon: "💳", label: "Transaction" },
  ];

  return (
    <div>
      {/* Fixed Sidebar */}
      <div
        className="bg-dark text-white d-flex flex-column"
        style={{
          width: "250px",
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "auto",
          overflowX: "hidden",
          zIndex: 1000,
        }}
      >
        {/* Sidebar Header */}
        <div className="p-3 border-bottom border-secondary">
          <h4 className="mb-1 mt-2">Expense Tracker</h4>
        </div>

        {/* Sidebar Menu - Scrollable */}
        <nav className="flex-grow-1" style={{ overflowY: "auto" }}>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.id}
                  className={`nav-link text-white d-flex align-items-center py-3 px-3 ${
                    activeItem === item.id ? "bg-primary" : ""
                  }`}
                  onClick={() => {
                    setActiveItem(item.id);
                  }}
                  style={{
                    transition: "background-color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (activeItem !== item.id) {
                      e.currentTarget.style.backgroundColor =
                        "rgba(255,255,255,0.1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeItem !== item.id) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <span className="me-3" style={{ fontSize: "1.2rem" }}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button - Fixed at Bottom */}
        <div className="border-top border-secondary">
          <Link
            to="/logout"
            className={`nav-link text-white d-flex align-items-center py-3 px-3 ${
              activeItem === "logout" ? "bg-danger" : ""
            }`}
            onClick={() => {
              setActiveItem("logout");
              // Handle logout logic here
            }}
            style={{
              transition: "background-color 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (activeItem !== "logout") {
                e.currentTarget.style.backgroundColor = "rgba(220,53,69,0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeItem !== "logout") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            <span className="me-3" style={{ fontSize: "1.2rem" }}>
              🚪
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default SidebarLayout;
