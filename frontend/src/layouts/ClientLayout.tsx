import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from 'src/components/client/Footer';
import Header from 'src/components/client/Header';

const ClientLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default ClientLayout;
