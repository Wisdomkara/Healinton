
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />
      <main className="pb-20 md:pb-0 w-full overflow-x-hidden">
        <Outlet />
      </main>
      <MobileNavigation />
    </div>
  );
};

export default Layout;
