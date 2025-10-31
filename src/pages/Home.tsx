import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { fetchPosts } from "../api/api";
import type { Post } from "../types/types";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchPosts();
        if (!cancelled) setPosts(data.slice(0, 24)); // limit to 24 cards for layout
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load posts.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!posts || posts.length === 0) return <Typography>No posts found.</Typography>;

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      {posts.map((p) => (
        <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>
            <CardActionArea onClick={() => navigate(`/posts/${p.id}`)}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {p.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {p.body.slice(0, 100)}...
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
