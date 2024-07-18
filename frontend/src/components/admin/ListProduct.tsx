import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { yellow } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Products } from 'src/types/products';

import DeleteDialog from './cofirm/Dialog';
import TextRating from '../ratings/rating';

import axiosInstance from 'src/config/axiosConfig';
import TransitionsModal from './Modal';
import AddProduct from './AddProduct';
import CardProduct from '../client/cards/CardProduct';

const ListProduct = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const reloadProduct = () => getAllProduct();
  const getAllProduct = async () => {
    try {
      const { data } = await axiosInstance.get('/laptops');
      setProducts(() => data.data);
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
      } else {
        console.log(error);
      }
    } finally {
      console.log('Hello');
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <div>
      <>
        {/* Start block */}
        <section className="bg-gray-50 dark:bg-gray-900 antialiased">
          <div className="w-full">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex-1 flex items-center space-x-2">
                  <h5>
                    <span className="text-gray-600">All Products:</span>
                    <span className="dark:text-white"> {products.length}</span>
                  </h5>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
                <div className="w-full md:w-1/2">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search for products"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      />
                    </div>
                  </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <TransitionsModal
                    useCustom={true}
                    icon={<AddIcon />}
                    title="Add product"
                    content={<AddProduct mode="create" />}
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4 text-center">
                        Image
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Name Product
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Category
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Monitor
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Rating
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Version
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Summary
                      </th>
                      <th scope="col" className="p-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                        key={index}
                      >
                        <th
                          scope="row"
                          className=" py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          <div className="flex items-center mr-3">
                            <img
                              src={`/img/products/${product.coverImg}`}
                              alt={product.name}
                              className=" w-28 mr-3 ml-2"
                            />
                          </div>
                        </th>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.category.name}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {product.monitor}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <TextRating value={product?.ratingsAverage} />
                            <span className="text-gray-500 text-sm dark:text-gray-400 ml-1">
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          2024
                        </td>
                        <td className="px-4 py-3">{product.summary}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center space-x-2">
                            <TransitionsModal
                              useCustom={false}
                              icon={<BorderColorIcon color="primary" />}
                              title=""
                              content={
                                <AddProduct
                                  mode="update"
                                  initialData={product}
                                />
                              }
                            />
                            <TransitionsModal
                              useCustom={false}
                              icon={
                                <VisibilityIcon sx={{ color: yellow[700] }} />
                              }
                              title=""
                              content={<CardProduct product={product} />}
                            />

                            <DeleteDialog
                              id={product._id}
                              reloadProduct={reloadProduct}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1-10
                  </span>
                  of
                  <span className="font-semibold text-gray-900 dark:text-white">
                    1000
                  </span>
                </span>
                <ul className="inline-flex items-stretch -space-x-px">
                  {/*Paginition*/}
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default ListProduct;
