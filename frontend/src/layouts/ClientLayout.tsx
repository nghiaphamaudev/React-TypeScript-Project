import { Outlet } from 'react-router-dom';
import Footer from 'src/components/client/Footer';
import Header from 'src/components/client/Header';
import { CartProvider } from 'src/contexts/StateCart';

const ClientLayout = () => {
  return (
    <>
      <CartProvider>
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
};

export default ClientLayout;
