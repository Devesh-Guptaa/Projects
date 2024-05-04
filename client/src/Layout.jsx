import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className='p-5 min-h-screen flex flex-col'>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
