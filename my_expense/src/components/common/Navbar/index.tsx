import Logo from "../../../assets/expense.svg";
import UserSection from "./UserSection";

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        {/* Used for Mobile SideBar */}
        <button
          className="btn btn-outline-secondary me-2 d-md-none"
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
        <UserSection />
      </div>
    </nav>
  );
};

export default Navbar;
