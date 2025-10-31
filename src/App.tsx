import Container from "@mui/material/Container";
import TopBar from './TopBar';
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <TopBar />
        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/:id"
              element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}
export default App;
