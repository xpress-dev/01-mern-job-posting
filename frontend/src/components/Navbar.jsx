import { MdOutlineBusinessCenter } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      <Link className="logoContainer" to="/">
        <h1>MERN Job Postings</h1>
        <MdOutlineBusinessCenter />
      </Link>
      {pathname === "/" && <Link to="/create-job">Create a Job</Link>}
      {pathname === "/create-job" && <Link to="/">Browse Jobs</Link>}
    </nav>
  );
};

export default Navbar;
