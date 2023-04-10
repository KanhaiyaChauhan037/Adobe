import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAnalytics = () => {
  const [userCount, setUserCount] = useState(0);
  const [topActiveUsers, setTopActiveUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/analytics/users")
      .then((response) => {
        setUserCount(response.data.count);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3000/api/users/analytics/users/top-active")
      .then((response) => {
        setTopActiveUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>User Analytics</h2>
      <p>Total number of users: {userCount}</p>
      <p>Top 5 most active users:</p>
      <ul>
        {topActiveUsers.map((user) => (
          <li key={user.id}>
            {user.name} - {user.post_count} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAnalytics;
