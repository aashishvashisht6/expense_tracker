import Avatar from "../../../assets/account.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../PrivateRoute";
import { logout } from "../../../services/user";
import { useNavigate } from "react-router-dom";

const UserSection = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const user = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = () => {
    logout().then(resp => {
        if(resp){
            navigate("/login")
        }
    })
  }
  return (
    <>
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
              <strong>{user.full_name}</strong>
            </li>

            <li>
              <hr className="dropdown-divider" />
            </li>

            <li>
              <a className="dropdown-item" href="#">
                My Profile
              </a>
            </li>

            <li>
              <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserSection;
