import { ReactNode } from 'react';
import Progress from 'src/components/client/steps/Progress';

interface ShoppingLayoutProps {
  children: ReactNode;
}

const ShoppingLayout: React.FC<ShoppingLayoutProps> = ({ children }) => {
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <Progress />
          <main>{children}</main>
        </div>
      </section>
    </div>
  );
};

export default ShoppingLayout;
