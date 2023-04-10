
import { Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <Box>
      <Box>
        <Link to="/">Home</Link>

        <Link to="/users">Users</Link>

        <Link to="/posts">Posts</Link>

        <Link to="/analytics/users">User Analytics</Link>

        <Link to="/analytics/posts">Post Analytics</Link>

        <Link to="/users/new">New User</Link>

        <Link to="/posts/new">New Post</Link>
      </Box>
    </Box>
  );
}

export default Navbar;
