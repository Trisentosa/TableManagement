import { Link } from "react-router-dom";
import UserContext from "../store/user-context";
import { useContext, useState } from "react";
import { logout } from "../api-calls";
import { Navbar, Container } from "react-bootstrap";
import { GoProject } from "react-icons/go";
import { FiLogOut, FiHelpCircle } from "react-icons/fi";
import InfoModal from "./InfoModal";

const Nav = () => {
  let menu;
  let userContext = useContext(UserContext);
  const [infoModalOpen, setInfoModalOpen] = useState(true);

  const openInfo = () => {
    setInfoModalOpen(true);
  };

  const logoutUser = async () => {
    await logout();
    userContext.resetName("");
  };

  if (userContext.name === "" || !userContext.name) {
    menu = (
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </li>
      </ul>
    );
  } else {
    menu = (
      <>
        <InfoModal show={infoModalOpen} setShow={setInfoModalOpen} />;
        <span className="centered-label">
          <Link className="navbar-brand" to="/">
            <GoProject style={{ color: "orange" }} /> Home
          </Link>
        </span>
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li>
            <Link className="nav-link" to="/login" onClick={logoutUser}>
              Logout <FiLogOut />
            </Link>
          </li>
          <li>
            <span
              className="nav-link"
              onClick={openInfo}
              style={{ cursor: "pointer" }}
            >
              Info <FiHelpCircle />
            </span>
          </li>
        </ul>
      </>
    );
  }
  return (
    <Navbar
      style={{ backgroundColor: "black" }}
      variant="dark"
      className="mb-3"
    >
      <Container>{menu}</Container>
    </Navbar>
  );
};

export default Nav;
