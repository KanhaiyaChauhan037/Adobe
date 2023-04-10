import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  ModalFooter,
  Input,
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

const UserList = () => {
  const [user, setUsers] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [editU, setEditU] = useState();

  const id = JSON.parse(localStorage.getItem("_id"));
  console.log('id', id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/users/users/${id}`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDeleteUser = (id) => {
    axios
      .delete(`http://localhost:3000/api/users/users/${id}`)
      .then((res) => {
        setUsers(res.data);
        alert("user deleted successfully")
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

 

  const handleEdit = (id) => {
    axios.put(`http://localhost:3000/api/users/users/${id}`,editU).then((res) => {
      console.log(res.data);
      window.location.reload();
    })
  }

  
  const handleInputChange = (e) => {
    setEditU({
      ...editU,
      [e.target.name]:e.target.value
    })
  }


  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Bio</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* {users.map((user) => ( */}
          <tr key={user._id}>
            <td>{user._id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.bio}</td>
            <td>{user.created_at}</td>
            <td>{user.updated_at}</td>
            <td>
              <Button onClick={() => handleDeleteUser(user._id)}>Delete</Button>
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
                    <FormLabel htmlFor="name">Name:</FormLabel>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      // value={user.name}
                      onChange={handleInputChange}
                    />

                    <FormLabel htmlFor="email">Email:</FormLabel>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      // value={user.email}
                      onChange={handleInputChange}
                    />

                    <FormLabel htmlFor="message">Bio:</FormLabel>
                    <Textarea
                      id="bio"
                      name="bio"
                      type='text'
                      // value={user.bio}
                      onChange={handleInputChange}
                    ></Textarea>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      colorScheme="blue"
                      mr={3}
                      onClick={() => handleEdit(user._id)}
                    >
                      Edit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </td>
          </tr>
          {/* ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
