import { Outlet } from 'react-router-dom';
import Progress from 'src/components/client/steps/Progress';

const ShoppingLayout = () => {
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <Progress />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default ShoppingLayout;
