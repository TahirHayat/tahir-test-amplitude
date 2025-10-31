import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { identifyUser, logoutUser } from './amplitude';

const TopBar: React.FC = () => {
  // track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // mock login logic
  const handleLogin = () => {
    console.log("Mock login executed...");
    identifyUser('user1', {
      email: 'user1@test.com',
      name: 'User 1',
      plan_type: 'Enterprise'
    });
    
    setTimeout(() => {
      setIsLoggedIn(true);
      console.log("User logged in!");
    }, 500);
  };

  // mock logout logic
  const handleLogout = () => {
    console.log("Mock logout executed...");
    logoutUser();
    setTimeout(() => {
      setIsLoggedIn(false);
      console.log("User logged out!");
    }, 500);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side - App title */}
        <Typography variant="h6" component="div">
          Test Amplitude
        </Typography>

        {/* Right side - Login/Logout button */}
        <Box>
          {isLoggedIn ? (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
