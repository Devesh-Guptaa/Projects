import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
function LoginPage() {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  async function handleLoginCredentials(ev) {
    ev.preventDefault();
    console.log(Email, Password);
    try {
      const UserDoc = await axios.post(
        '/login',
        {
          Email,
          Password,
        },
        { withCredentials: true }
      );
      alert('Login Successfull!!');
      setUser(UserDoc.data);
      setRedirect(true);
    } catch {
      alert('Login Unsuccessfull!!');
    }
  }

  if (Redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className='flex flex-col grow items-center justify-center grow'>
      <div>
        <h1 className='text-center text-2xl mb-4'>Login</h1>
        <form class='max-w-md mx-auto' onSubmit={handleLoginCredentials}>
          <input
            type='email'
            placeholder='id@email.com'
            value={Email}
            onChange={(data) => setEmail(data.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={Password}
            onChange={(data) => setPassword(data.target.value)}
          />
          <button className='loginButton'>Login</button>
        </form>
        <h1 className='text-center mt-2 text-gray-500'>
          New User?{' '}
          <Link to={'/register'} className='underline text-black'>
            Register Now
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default LoginPage;
