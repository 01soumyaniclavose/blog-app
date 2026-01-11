import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBlogs } from "../context/BlogContext";

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { blogs, deleteBlogFromState } = useBlogs();

  const blog = blogs.find((b) => b.id === id);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`http://localhost:5000/blogs/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          deleteBlogFromState(id!);
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (!blog) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5">Blog not found!</Typography>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")}>
          Back to List
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Stack>
      </Stack>

      <Paper elevation={0}>
        {blog.imgUrl && (
          <Box
            component="img"
            src={blog.imgUrl}
            alt={blog.title}
            sx={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              borderRadius: 2,
              mb: 4,
            }}
          />
        )}

        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {blog.title}
        </Typography>

        <Typography variant="caption" color="text.secondary" display="block">
          Published on: {new Date(blog.createdAt).toLocaleDateString()}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mt: 4 }}>
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.8, whiteSpace: "pre-wrap", fontSize: "1.1rem" }}
          >
            {blog.content}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default BlogDetails;
