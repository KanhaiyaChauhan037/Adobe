import React from 'react';
import {Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import UserAnalytics from './components/UserAnalytics';
import PostAnalytics from './components/PostAnalytics';
import Navbar from './components/Navbar';

function App() {
  return (
 
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/new" element={<PostForm />} />
          <Route path="/posts/:id/edit" element={<PostForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/analytics/users" element={<UserAnalytics />} />
          <Route path="/analytics/posts" element={<PostAnalytics />} />
        </Routes>
      </div>
 
  );
}

export default App;
