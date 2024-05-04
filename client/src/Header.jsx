import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserContext from './context/UserContext';

function Header() {
  const { user } = useContext(UserContext);
  return (
    <div>
      <header className='flex justify-between'>
        <Link to={'/'} href='' className='flex items-center gap-1'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            class='w-8 h-8'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
            />
          </svg>
          <span className='font-bold text-xl'>Airbnb</span>
        </Link>

        <div className='flex border border-grey-500 shadow-md shadow-grey-700 rounded-full px-4 py-1 gap-2'>
          <div>Anywhere</div>
          <div class='h-[25px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400'></div>
          <div>Any week</div>
          <div class='h-[25px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400'></div>
          <div>Add guests</div>
          <div class='h-[25px] min-h-[1em] w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:via-neutral-400'></div>
          <button className='bg-primary rounded-full p-1.5'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-4 h-4'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </button>
        </div>

        <Link
          to={user ? '/account' : '/login'}
          className='flex items-center border border-grey-500 shadow-md shadow-grey-700 rounded-full px-4 py-1 gap-2'
        >
          <div>
            <svg
              xmlns='http://www.w3.org /2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-6 h-6'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
              />
            </svg>
          </div>
          <div className='bg-gray-500 text-white rounded-full border border-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              class='w-6 h-6 relative top-1'
            >
              <path
                fill-rule='evenodd'
                d='M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z'
                clip-rule='evenodd'
              />
            </svg>
          </div>
          {!!user && <div>{user.Name}</div>}
        </Link>
      </header>
    </div>
  );
}

export default Header;
