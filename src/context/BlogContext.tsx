import React, { createContext, useState, useEffect, useContext } from "react";
import { Blog } from "../models/blog";

interface BlogContextType {
  blogs: Blog[];
  loading: boolean;
  addBlogToState: (newBlog: Blog) => void;
  deleteBlogFromState: (id: string) => void;
  refreshBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const addBlogToState = (newBlog: Blog) => {
    setBlogs((prev) => [...prev, newBlog]);
  };
  const deleteBlogFromState = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog.id !== id));
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        addBlogToState,
        deleteBlogFromState,
        refreshBlogs: fetchBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook for easy access
export const useBlogs = () => {
  const context = useContext(BlogContext);
  if (!context) throw new Error("useBlogs must be used within a BlogProvider");
  return context;
};
