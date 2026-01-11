// import "./App.css";
// import BlogCard from "./components/BlogCard";

// function App() {
//   return <BlogCard />;
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogCard from "./components/BlogCard";
import BlogForm from "./pages/BlogForm";
import { BlogProvider } from "./context/BlogContext";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogCard />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/new" element={<BlogForm key="new" />} />
          <Route path="/edit/:id" element={<BlogForm key="edit" />} />
        </Routes>
      </BrowserRouter>
    </BlogProvider>
  );
}
export default App;
