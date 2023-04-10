import React, { useEffect, useState } from "react";
import axios from "axios";

const PostAnalytics = () => {
  const [totalPosts, setTotalPosts] = useState(0);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);



async function getdata(){
const res = await fetch(
  "http://localhost:3000/api/posts/analytics/posts/top-liked"
);
const data = await res.json();
console.log(data)
};
getdata();

 useEffect(() => {
  //  axios.get("http://localhost:3000/api/posts/analytics/posts")
  //    .then((response) => {
  //      setTotalPosts(response.data);
  //    })
  //    .catch((error) => {
  //      console.log(error);
  //    });



// console.log(totalPosts);
//    axios.get("http://localhost:3000/api/posts/analytics/posts/top-liked")
//      .then((response) => {
//        setMostLikedPosts(response.data);
//      })
//      .catch((error) => {
//        console.log(error);
//      });
     
// console.log(mostLikedPosts);
 }, []);



  return (
    <div>
      <h2>Post Analytics</h2>
      <p>Total posts: {totalPosts}</p>
      <h3>Top 5 most liked posts:</h3>
      <ul>
        {mostLikedPosts.map((post) => (
          <li key={post._id}>
            <p>{post.content}</p>
            <p>{post.likes} likes</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostAnalytics;
