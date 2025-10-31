import type { Post } from "../types/types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  const truncated = post.body.length > 120 ? post.body.slice(0, 120) + "…" : post.body;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {truncated}
        </Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ flex: 1 }} />
        <Button
          component={RouterLink}
          to={`/posts/${post.id}`}
          size="small"
          aria-label={`Open details for ${post.title}`}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}
