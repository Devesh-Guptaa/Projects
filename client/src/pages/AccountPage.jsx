import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AccountPage() {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  var { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  function linkClasses(type) {
    var dynamciClassName = 'px-4 py-2';
    if (type === subpage)
      dynamciClassName += ' border rounded-full bg-primary text-white';
    return dynamciClassName;
  }

  async function Logout() {
    await axios.get('/logout', { withCredentials: true });
    setRedirect('/');
    setUser(null);
    console.log(document.cookie);
  }

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <nav className='w-full flex gap-5 justify-center mt-6'>
        <Link className={linkClasses('profile')} to={'/account'}>
          My Profile
        </Link>
        <Link className={linkClasses('bookings')} to={'/account/bookings'}>
          My bookings
        </Link>
        <Link className={linkClasses('places')} to={'/account/places'}>
          My accommodations
        </Link>
      </nav>

      <div className='text-center max-w-lg mx-auto my-4'>
        Logged in as {user.Name}, email : {user.Email}
        <br />
        <button
          onClick={Logout}
          className='bg-primary rounded-full py-1 min-w-full'
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
