import { ReactNode } from 'react';
import Footer from 'src/components/client/Footer';
import Header from 'src/components/client/Header';

interface ClientLayoutProps {
  children: ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
