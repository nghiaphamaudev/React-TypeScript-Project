import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Progress = () => {
  const [selected, setSelected] = useState<string[]>(['cart']);
  const handleClick = (...params: any) => {
    console.log(selected);
    setSelected(() => params);
  };

  return (
    <div>
      <ol className="items-center flex w-full text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base mb-10">
        <li className="after:border-1 flex items-center text-blue-500 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-blue-200 dark:text-blue-500 dark:after:border-green-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <Link
            to="/shopping-cart"
            onClick={() => handleClick('cart')}
            className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
          >
            <TaskAltIcon />
            <span className="ml-2">Cart</span>
          </Link>
        </li>
        <li className="after:border-1 flex items-center text-blue-500 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-blue-200 dark:text-blue-500 dark:after:border-green-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <Link
            to="/check-out"
            onClick={() => handleClick('cart', 'checkout')}
            className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
          >
            <TaskAltIcon />
            <span className="ml-2">Checkout</span>
          </Link>
        </li>

        <li className="after:border-1 flex items-center text-blue-500 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-blue-200 dark:text-blue-500 dark:after:border-green-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
          <Link
            to="/summary-order"
            onClick={() => handleClick('cart', 'checkout', 'order')}
            className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden"
          >
            <TaskAltIcon />
            <span className="ml-2"> Order</span>
          </Link>
        </li>

        <li className="flex shrink-0 items-center text-blue-500">
          <Link
            to="/payment"
            onClick={() => handleClick('cart', 'checkout', 'order', 'payment')}
          >
            <TaskAltIcon />
            <span className="ml-2"> Payment</span>
          </Link>
        </li>
      </ol>
    </div>
  );
};

export default Progress;
