import { MdOutlineBusinessCenter } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav>
      <Link className="logoContainer" to="/">
        <h1>MERN Job Postings</h1>
        <MdOutlineBusinessCenter />
      </Link>
      <div className="navBarButtonContainer">
        {pathname === "/" && isLoggedIn && (
          <Link to="/create-job">Create a Job</Link>
        )}
        {pathname === "/create-job" && <Link to="/">Browse Jobs</Link>}
        {isLoggedIn ? (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{ marginLeft: 16 }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={{ marginLeft: 16 }} id={"adminLoginLink"}>
            Admin Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
