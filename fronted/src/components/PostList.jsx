import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ModalFooter,
  Input,
  Heading,
  Textarea,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  Text,
  ModalOverlay,
  Modal,
  useDisclosure,
  FormLabel,
} from "@chakra-ui/react";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [EditD, setEditD] = useState();
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    console.log(postId);
    try {
      await axios.delete(`http://localhost:3000/api/posts/posts/${postId}`);
      setPosts(posts.filter((post) => post.id !== postId));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/posts/${postId}/like`
      );
      const updatedPost = response.data;
      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnlike = async (postId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/posts/posts/${postId}/unlike`
      );
      const updatedPost = response.data;

      setPosts(
        posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      axios.put(`http://localhost:3000/api/posts/posts/${id}`,EditD).then((res) => {
        console.log(res.data)
        alert("content Edit successfully!")
        window.location.reload()
      })
    } catch (error) {
      console.log(error);
    }

    console.log(EditD);
    console.log(id)
  };

  const handleInputChange = (e) => {
    setEditD({
      ...EditD,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Heading>Post List</Heading>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <p>{post.content}</p>
              <p>Likes: {post.likes}</p>
              <Button onClick={() => handleDelete(post._id)}>Delete</Button>
              <Button onClick={() => handleLike(post._id)}>Like</Button>
              <Button onClick={() => handleUnlike(post._id)}>Unlike</Button>
              <Button onClick={onOpen}>Edit</Button>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormLabel>User Id</FormLabel>
                    <Input
                      type="text"
                      name="user_id"
                     value={post.user_id}
                      
                    />
                    <FormLabel htmlFor="content">content:</FormLabel>
                    <Textarea
                      type="text"
                      id="content"
                      name="content"
                      onChange={handleInputChange}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => handleEdit(post._id)}
                    >
                      Edit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
