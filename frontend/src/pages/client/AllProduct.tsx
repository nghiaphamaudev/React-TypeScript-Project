import CardProduct from 'src/components/client/cards/CardProduct';
import { useEffect, useState } from 'react';
import { Products } from 'src/types/products';
import axios from 'axios';
import LinearLoading from 'src/components/client/Progress/LinearLoading';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'src/components/client/snackbar/Snackbar';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const AllProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const getAllProduct = async () => {
    setLoading(() => true);
    try {
      const { data } = await axios.get('http://127.0.0.1:8000/api/v1/laptops');
      setProducts(() => data.data);
    } catch (error: any) {
      console.log(error);
      //Khi ko co internet
      if (error.code === 'ERR_NETWORK') {
        return showSnackbar(
          'error',
          'There is currently a network issue. Please try again later.'
        );
        //Api ko ton tai
      }
      if (error.code === 'ERR_BAD_REQUEST') {
        //Api ko ton tai
        return showSnackbar('error', 'API not found! Please connect again!');
      } else {
        navigate('/404');
      }
    } finally {
      setLoading(() => false);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <LinearLoading isShow={loading} />
      <section className="bg-gray-50 py-8  dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {/* Heading & Filters */}
          <div className="mb-4 items-end justify-between space-y-4 sm:flex sm:space-y-0 md:mb-8">
            <div>
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                  <li className="inline-flex items-center">
                    <a
                      href="#"
                      className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white"
                    >
                      <svg
                        className="me-2.5 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                      </svg>
                      Home
                    </a>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-400 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m9 5 7 7-7 7"
                        />
                      </svg>
                      <a
                        href="#"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-400 dark:hover:text-white md:ms-2"
                      >
                        Products
                      </a>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <div className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 sm:w-auto">
                  <svg
                    className="-ms-0.5 me-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4"
                    />
                  </svg>
                  Sort
                  <svg
                    className="-me-0.5 ms-2 h-4 w-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 9-7 7-7-7"
                    />
                  </svg>
                </div>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem>
                  <ul
                    className="p-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400"
                    aria-labelledby="sortDropdownButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        The most popular{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        Newest{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        Increasing price{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        Decreasing price{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        No. reviews{' '}
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="group inline-flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        {' '}
                        Discount %{' '}
                      </a>
                    </li>
                  </ul>
                </MenuItem>
              </Menu>

              <div
                id="dropdownSort1"
                className="z-50  w-40 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700 hidden"
                data-popper-placement="bottom"
              ></div>
            </div>
          </div>

          <h2 className="mt-3 text-xl mb-4 ml-1 font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Lenovo
          </h2>
          <div className="mb-12 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => {
              return <CardProduct product={product} key={index} />;
            })}
          </div>

          <div className="w-full text-center">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              View more reviews
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProduct;
