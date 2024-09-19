import Sidebar from "@/components/Sidebar";
import React, { useEffect } from "react";

const BlogsPage: React.FC = () => {

  useEffect(() => {
    document.title = "ACE | Blogs"
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div></div>
    </div>
  );
}

export default BlogsPage;
