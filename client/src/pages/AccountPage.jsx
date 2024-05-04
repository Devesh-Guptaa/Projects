import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';

function AccountPage() {
  const { user, ready } = useContext(UserContext);
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

  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user) {
    return <Navigate to={'/login'} />;
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
    </div>
  );
}

export default AccountPage;
