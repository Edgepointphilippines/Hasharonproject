import React, { useState } from 'react';
import truck from '../images/truck.png';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'; // Import MUI components
import './section1.css';

const Section1 = () => {
  // State to manage modal visibility
  const [openModal, setOpenModal] = useState(false);

  // Toggle modal visibility
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <section id="section1">
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 align-items-center">
          <div id="contentDiv">
            <div className=" " id="content1">
              <h1>Machines: The farmer's best friend.</h1>
              <p>- The future of farming is automated.</p>
              <a href="#" onClick={handleOpen}>Create Account</a>
            </div>
          </div>
          <div id="contentImg">
            <img src={truck} alt="Truck" />
          </div>
        </div>
      </div>

      {/* Modal for Sign-Up using Material-UI */}
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>Create Account</DialogTitle>
        <DialogContent>
          <form id="signupForm">
            <TextField
              label="Username"
              name="username"
              type="text"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              type="email"
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
          </form>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} color="black">
            Cancel
          </Button>
          <Button id='signUp' type="submit" form="signupForm" color="primary">
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default Section1;
