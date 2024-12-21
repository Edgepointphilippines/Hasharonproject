import React, { useState } from "react";
import "./Navbar.css";
import logo from "../images/hasharon logo.png";
import menu from "../images/burger-bar.png";
import { Link } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Typography } from "@mui/material"; // Import MUI components
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

const Home = () => {
  // State to manage modal visibility
  const [showModal, setShowModal] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Toggle modal visibility
  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setShowForgotPassword(false); // Reset forgot password modal state
  };

  // Toggle forgot password modal visibility
  const handleForgotPasswordClick = () => {
    setShowForgotPassword(true);
  };

  return (
    <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid gap-5 mx-2">
        <div id="forLogo">
          <a href="#section1">
            <img src={logo} alt="Logo" />
          </a>
        </div>

        <div className="d-block d-lg-none" id="menu">
          <button
            className="btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            <img src={menu} alt="Menu" />
          </button>

          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">
                Menu
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#categories">
                    Categories
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="#section4">
                    Contact
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#categories">
                Categories
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#section4">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/admin">
                Admin Dashboard
              </Link>
            </li>
          </ul>
          <div className="profile">
            <a href="./user account/user.html">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
              </svg>
            </a>
          </div>
          <div id="signinCart">
            <Button
              variant="contained"
              color="primary"
              onClick={handleShow}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>

      {/* Sign In Modal */}
      <Dialog open={showModal} onClose={handleClose}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <form className="row" action="/login" method="POST" id="formSignup">
            <TextField
              label="Username"
              name="username"
              type="text"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              required
              fullWidth
              margin="normal"
            />
            {/* Forgot Password Link */}
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', textAlign: 'right', marginTop: 1 }}
              onClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </Typography>
          </form>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button id="signin" type="submit" form="formSignup" color="primary">
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotPassword} onClose={handleClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <form id="forgotPasswordForm">
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button id="cancel" onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            id="resetPassword"
            type="submit"
            form="forgotPasswordForm"
            color="primary"
          >
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
};

export default Home;
