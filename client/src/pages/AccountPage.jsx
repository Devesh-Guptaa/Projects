import React, { useContext, useState } from 'react';
import UserContext from '../context/UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BookingPage from './BookingsPage';
import AccomodationPage from './AccomodationPage';

function AccountPage() {
  const { user, setUser, ready } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  var { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  function linkClasses(type) {
    var dynamicClassName = 'px-4 py-2 border rounded-full';
    if (type === subpage)
      dynamicClassName += '  bg-primary text-white';
    else{
      dynamicClassName += ' bg-gray-200';
    }
    return dynamicClassName;
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

      {subpage === 'profile' && (
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
      )}
      {subpage === 'bookings' && (
        <BookingPage/>
      )}
      {subpage === 'places' && (
        <AccomodationPage/>
      )}
    </div>
  );
}

export default AccountPage;
