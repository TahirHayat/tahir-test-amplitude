import React, { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import { fetchPostById, fetchUserById, fetchCommentsForPost } from "../api/api";
import type { Post, User, Comment } from "../types/types";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!id) return;
      setLoading(true);
      try {
        const postData = await fetchPostById(Number(id));
        if (cancelled) return;
        setPost(postData);

        // fetch user & comments in parallel
        const [userData, commentsData] = await Promise.all([
          fetchUserById(postData.userId),
          fetchCommentsForPost(postData.id),
        ]);
        if (cancelled) return;
        setUser(userData);
        setComments(commentsData);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Failed to load post details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!post) return <Typography>Post not found.</Typography>;

  return (
    <Box>
      <Button component={RouterLink} to="/" variant="outlined" sx={{ mb: 2 }}>
        ← Back to posts
      </Button>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {post.body}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1">Author</Typography>
        {user ? (
          <Box sx={{ mb: 1 }}>
            <Typography>{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{user.username} · {user.email}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body2">Loading author...</Typography>
        )}
      </Paper>

      <Typography variant="h6" gutterBottom>
        Comments ({comments?.length ?? 0})
      </Typography>

      <Paper>
        <List>
          {comments?.map((c) => (
            <React.Fragment key={c.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={c.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {c.email}
                      </Typography>
                      {" — " + c.body}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
          {!comments || comments.length === 0 ? (
            <ListItem>
              <ListItemText primary="No comments found." />
            </ListItem>
          ) : null}
        </List>
      </Paper>
    </Box>
  );
}
