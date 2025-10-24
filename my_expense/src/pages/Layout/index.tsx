import { Outlet } from "react-router-dom";
import SidebarLayout from "../../components/Sidebar";

const Layout = () => {
return(
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
    <SidebarLayout/>

    {/* Main Content Area */}
      <div
        className="flex-grow-1 bg-light"
        style={{
          marginLeft: "250px",
          overflowY: "auto",
          height: "100vh",
        }}
      >
        <div className="container-fluid p-4">
          <h1 className="mb-4">
            {/* {menuItems.find((item) => item.id === activeItem)?.label} */}
          </h1>
          {/* <div className="card">
            <div className="card-body">
              <h5 className="card-title">Main Content Area</h5>
              <p className="card-text">
                This is the main content area. The sidebar on the left is fixed
                and scrollable. Try scrolling the sidebar to see all menu items.
              </p>
              {[...Array(10)].map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              ))}
            </div>
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
)
}

export default Layout;