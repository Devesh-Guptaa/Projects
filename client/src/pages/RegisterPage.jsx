import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
function RegisterPage() {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  async function sendCredentials(ev) {
    ev.preventDefault();
    try {
      await axios.post('/register', {
        Name,
        Email,
        Password,
      });
      alert('Registration successful');
    } catch (err) {
      alert('Please try again from client');
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col grow items-center justify-center grow'>
      <div>
        <h1 className='text-center text-2xl mb-4'>Register</h1>
        <form class='max-w-md mx-auto' onSubmit={sendCredentials}>
          <input
            type='text'
            placeholder='Joe Biden'
            value={Name}
            onChange={(data) => setName(data.target.value)}
          />
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
          <button className='loginButton'>Register</button>
        </form>
        <h1 className='text-center mt-2 text-gray-500'>
          Already a User?{' '}
          <Link to={'/login'} className='underline text-black'>
            Login
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default RegisterPage;
