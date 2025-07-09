
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Header />
      <main className="pb-20 md:pb-0 w-full overflow-x-hidden">
        {children || <Outlet />}
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
