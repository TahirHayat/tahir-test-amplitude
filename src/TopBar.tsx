import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useAuth } from "./context/AuthContext";

const TopBar: React.FC = () => {
  const { userName, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side - App title */}
        <Typography variant="h6" component="div">
          Test Amplitude
        </Typography>
        
        {userName && (
          <Box display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">Hello, {userName}</Typography>
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleLogout}
              sx={{ borderColor: "white" }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
