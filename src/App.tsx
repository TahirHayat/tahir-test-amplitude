import { Routes, Route, Link } from "react-router-dom";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import './amplitude';

export default function App() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h6">Test Amplitude</Typography>
          </Link>
          <Box sx={{ flex: 1 }} />
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </Container>
    </>
  );
}
