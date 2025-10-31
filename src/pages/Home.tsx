import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { fetchPosts } from "../api/api";
import type { Post } from "../types/types";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
    <>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>

      <Grid container spacing={2}>
        {posts.map((p) => (  
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <PostCard post={p} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
