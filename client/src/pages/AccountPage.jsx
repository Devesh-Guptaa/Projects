import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Navigate } from 'react-router-dom';

function AccountPage() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user) {
    return <Navigate to={'/login'} />;
  }
  return <div>AccountPage of {user?.Name}</div>;
}

export default AccountPage;
