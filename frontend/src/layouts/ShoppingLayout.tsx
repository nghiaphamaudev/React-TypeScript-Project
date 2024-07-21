import { Outlet } from 'react-router-dom';
import HorizontalLinearAlternativeLabelStepper from 'src/components/client/Steps/Step';

const ShoppingLayout = () => {
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <HorizontalLinearAlternativeLabelStepper />
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default ShoppingLayout;
