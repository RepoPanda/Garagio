import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../App.css";

function Nav() {
  return (
    <>
      <div className="nav-bar">
        <header>
          <h1 className="app-logo">
            <a href="/">
              <svg
                version="1.1"
                width="200"
                height="100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="105, 0 200, 115 20, 115" fill="#08c17d" />
                {/* <rect x="45" y="20" width="125" height="100" fill="black" /> */}
                <text
                  x="105"
                  y="75"
                  fontSize="30"
                  textAnchor="middle"
                  fill="#fffdd0"
                >
                  GARAGIO
                </text>
              </svg>
            </a>
          </h1>
        </header>
        <nav>
          <Link to="/">Home</Link>
          {Auth.loggedIn() ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  Auth.logout();
                }}
              >
                Log Out
              </a>
            </>
          ) : (
            <>
              <Link to="/signup">SignUp</Link>

              <Link to="/login">Login</Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Nav;
