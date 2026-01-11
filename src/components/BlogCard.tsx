import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useBlogs } from "../context/BlogContext";

const BlogCard: React.FC = () => {
  const { blogs } = useBlogs();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const cardsPerPage = 6; // 2 rows of 3 cards
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  //Filter blogs based on search term
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate which cards to show on the current page
  const indexOfLastCard = page * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredBlogs.slice(indexOfFirstCard, indexOfLastCard);

  return (
    //
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search by title..."
          size="small"
          sx={{ maxWidth: 500 }}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{
            whiteSpace: "nowrap",
            height: "40px",
            px: 3,
          }}
          onClick={() => navigate("/new")}
        >
          Add Blog
        </Button>
      </Box>
      <Grid container spacing={3}>
        {currentCards.map((blog) => (
          <Grid key={blog.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Box width="100%">
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { transform: "translateY(-4px)", boxShadow: 4 },
                }}
              >
                <CardActionArea onClick={() => navigate(`/blog/${blog.id}`)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      blog.imgUrl
                        ? blog.imgUrl
                        : "https://placehold.co/600x400?text=No+Image+Available"
                    }
                    alt="blog image"
                  ></CardMedia>
                  <CardContent
                    sx={{ flexGrow: 1 }}
                    onClick={() => navigate(`/blog/${blog.id}`)}
                  >
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {blog.content}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Math.ceil(filteredBlogs?.length / cardsPerPage)}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};
export default BlogCard;
