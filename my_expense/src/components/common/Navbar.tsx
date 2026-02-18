import Logo from "../../assets/expense.svg";
import Avatar from "../../assets/account.svg";
import { useState } from "react";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Used for Mobile SideBar */}
        <button
          className="btn btn-outline-secondary me-2 d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
        >
          ☰
        </button>

        <a className="navbar-brand" href="#">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            width="30"
            height="30"
          />
          <h5 className="ms-2 d-inline">Expense Tracker</h5>
        </a>

        {/* Right side */}
        <div className="justify-content-end" id="navbarContent">
          <div className="dropdown">
            {/* Avatar button */}
            <button
              className="btn d-flex align-items-center border-0 bg-transparent"
              type="button"
              data-bs-toggle="dropdown"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <img
                src={Avatar}
                alt="User"
                width="36"
                height="36"
                className="rounded-circle"
              />
            </button>

            {/* Dropdown */}
            <ul
              className={`dropdown-menu dropdown-menu-end dropdown-menu-lg-start shadow ${showDropdown ? "show" : ""}`}
              style={{ right: "0px" }}
            >
              <li className="px-3 py-2 text-muted small">
                Signed in as <br />
                <strong>John Doe</strong>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a className="dropdown-item" href="/profile">
                  My Profile
                </a>
              </li>

              <li>
                <button className="dropdown-item text-danger">Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
