import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Required for editor styles, rich text editor
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Blog } from "../models/blog";
import { useBlogs } from "../context/BlogContext";

const BlogForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = Boolean(id);
  const { blogs, addBlogToState } = useBlogs();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Blog>({
    defaultValues: {
      title: "",
      content: "",
      imgUrl: "",
    },
  });

  useEffect(() => {
    if (isEditMode && blogs.length > 0) {
      const blogToEdit = blogs.find((b) => b.id === id);
      if (blogToEdit) {
        reset(blogToEdit);
      }
    }
  }, [id, blogs, isEditMode, reset]);
  const onSubmit = async (data: Blog) => {
    try {
      //Simplify ID calculation
      const maxId = blogs.reduce((max: number, blog: any) => {
        const idNum = parseInt(blog.id);
        return idNum > max ? idNum : max;
      }, 0);
      const nextId = maxId + 1;

      //Clean content
      const plainTextContent = data.content
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ");

      // Prepare final object
      const newBlogEntry: Blog = {
        id: nextId.toString(),
        title: data.title,
        content: plainTextContent,
        imgUrl: data.imgUrl || null,
        createdAt: new Date().toISOString(),
      };
      const url = isEditMode
        ? `http://localhost:5000/blogs/${id}`
        : "http://localhost:5000/blogs";

      const method = isEditMode ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlogEntry),
      });

      if (response.ok) {
        addBlogToState(newBlogEntry);
        navigate("/");
      }
    } catch (error) {
      console.error("Error processing blog:", error);
    }
  };
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/")}
        sx={{ mb: 2 }}
      >
        Back to Blog List
      </Button>

      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 2 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {isEditMode ? "Edit Blog Post" : "New Blog Post"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          {isEditMode
            ? "Update your content below."
            : "Fill out the fields below to publish your story."}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "A title is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Post Title"
                  fullWidth
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
            <Controller
              name="imgUrl"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Featured Image URL"
                  placeholder="https://example.com/image.jpg"
                  fullWidth
                />
              )}
            />
            <Box>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: "bold" }}
              >
                Content
              </Typography>
              <Controller
                name="content"
                control={control}
                rules={{
                  required: "Content cannot be empty",
                  validate: (value) =>
                    value !== "<p><br></p>" || "Content cannot be empty",
                }}
                render={({ field }) => (
                  <Box
                    sx={{
                      ".ql-editor": { minHeight: "250px" },
                      border: errors.content
                        ? "1px solid #d32f2f"
                        : "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <ReactQuill
                      theme="snow"
                      placeholder="Start writing your blog content..."
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </Box>
                )}
              />
              {errors.content && (
                <Typography
                  variant="caption"
                  color="error"
                  sx={{ mt: 1, display: "block" }}
                >
                  {errors.content.message}
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                sx={{ px: 5, py: 1.5 }}
              >
                {isEditMode ? "Update Post" : "Submit"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default BlogForm;
