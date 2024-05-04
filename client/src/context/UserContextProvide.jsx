import { React, useEffect, useState } from 'react';
import UserContext from './UserContext';
import axios from 'axios';

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      console.log('Inside useEffect');
      axios
        .get('/profile', { withCredentials: true })
        .then((res) => {
          const Name = res.data.Name;
          console.log('Name to be setted by token', Name);
          setUser(res.data);
          setReady(true);
        })
        .catch(() => {
          console.log('no user via token');
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
