import React, { useState } from "react";
import axios from "axios";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const newUser = { name, email, bio };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/users",
        newUser
      );
      console.log(response.data); 
      console.log(response.data._id)
      const userid= response.data._id
      localStorage.setItem("_id",JSON.stringify(userid))
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="bio">Bio:</label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength="200"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
