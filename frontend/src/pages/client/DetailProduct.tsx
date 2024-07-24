import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { blue, yellow } from '@mui/material/colors';
import { Products } from 'src/types/products';
import { useNavigate, useParams } from 'react-router-dom';
import { IconButton, TextField } from '@mui/material';
import { useSnackbar } from 'src/contexts/Snackbar';
import TextRating from 'src/components/ratings/rating';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useLinearLoading } from 'src/contexts/Progress';
import axiosInstance from 'src/config/axiosConfig';
import { useCart } from 'src/contexts/StateCart';

const DetailProduct = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();
  const { id } = useParams();
  const { showSnackbar } = useSnackbar();
  const { showLoading, hideLoading } = useLinearLoading();
  const [value, setValue] = React.useState('1');
  const [count, setCount] = useState<number>(1);
  const [img, setImg] = useState<string>();
  const [product, setProduct] = useState<Products | undefined>();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const getProduct = async (id: string) => {
    showLoading();
    try {
      const { data } = await axiosInstance.get(`/laptops/${id}`);
      setProduct(() => data.data);
      setImg(() => data.data.coverImg);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const hanldeClickAdd = () => {
    setCount((currentValue) => (currentValue += 1));
  };

  const handleAddToCart = async (idProduct: string, price: number) => {
    const data = {
      product: idProduct,
      quantity: count,
      price: price,
    };
    try {
      const response = await axiosInstance.post('/carts', data);
      showSnackbar('success', 'Add to cart is successfully!');
      setCart(response.data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  const hanldeClickMinus = () => {
    if (count === 1) {
      return setCount((currentValue) => currentValue);
    }
    return setCount((currentValue) => (currentValue -= 1));
  };
  const handleChangeValue = (event: any) => {
    const value = Math.max(Number(event.target.value), 0);
    setCount(value);
  };

  const hanldeClickImg = (imgLink: string | undefined) => {
    setImg(() => imgLink);
  };

  return (
    <div>
      {!product ? (
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <section className="bg-white dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
              <div className="mx-auto max-w-screen-sm text-center">
                <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                  Products is missing{' '}
                </p>
                <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                  Sorry, we have a few error. You'll find lots to explore on the
                  home page.{' '}
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          {' '}
          <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
            <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                <div className="grid items-start grid-cols-1 lg:grid-cols-4 gap-12">
                  <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                    <div className=" px-6 py-8 rounded-xl ">
                      <img
                        src={`/img/products/${img}`}
                        alt="Product"
                        className="w-12/12 rounded object-cover mx-auto"
                      />
                    </div>
                    {/* List image */}
                    <div className=" flex flex-wrap justify-center gap-4 mx-auto">
                      <button
                        onClick={() => hanldeClickImg(product?.coverImg)}
                        className="w-32 h-40 flex items-cemter justify-center rounded-xl p-4 cursor-pointer"
                        key={product?._id}
                      >
                        <img
                          src={`/img/products/${product?.coverImg}`}
                          alt="Product2"
                          className="w-full object-contain"
                        />
                      </button>
                      {product?.images.map((image, index) => (
                        <button
                          onClick={() => hanldeClickImg(image)}
                          className="w-32 h-40 flex items-cemter justify-center rounded-xl p-4 cursor-pointer"
                          key={index}
                        >
                          <img
                            src={`/img/products/${image}`}
                            alt="Product2"
                            className="w-full object-contain"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 lg:mt-0">
                  <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                    {product?.name} {product?.monitor}" All-In-One Computer,
                    256GB SSD, Mac OS, Pink
                  </h1>
                  <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                    <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                      ${product?.price}
                    </p>
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      <div className="flex items-center gap-1">
                        <TextRating value={product?.ratingsAverage} />
                      </div>
                      <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                        ({product?.ratingsAverage})
                      </p>
                      <a
                        href="#"
                        className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                      >
                        {product?.ratingsQuantity} Reviews
                      </a>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold text-gray-800">
                      Quantity
                    </h3>
                    <div className="flex divide-x  w-max mt-4 rounded overflow-hidden">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',

                          borderRadius: 1,
                          overflow: 'hidden',
                          mt: 2,
                          boxShadow: 1, // thêm đổ bóng
                        }}
                      >
                        <IconButton
                          onClick={hanldeClickMinus}
                          sx={{
                            backgroundColor: 'lightgrey',
                            color: 'black',
                            borderRadius: 0,
                            '&:hover': {
                              backgroundColor: 'darkgrey',
                            },
                            minWidth: '3rem', // thêm kích thước tối thiểu để cân bằng với TextField
                            height: '2.25rem',
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>

                        <TextField
                          type="number"
                          value={count}
                          onChange={handleChangeValue}
                          variant="outlined"
                          InputProps={{
                            sx: {
                              backgroundColor: 'grey.100',
                              width: '5rem',
                              height: '2.25rem',
                              fontWeight: 'bold',
                              textAlign: 'center', // căn giữa văn bản
                              '& input': {
                                textAlign: 'center', // căn giữa văn bản trong input
                              },
                            },
                          }}
                        />

                        <IconButton
                          onClick={hanldeClickAdd}
                          sx={{
                            backgroundColor: 'black',
                            color: 'white',
                            borderRadius: 0,
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                            minWidth: '3rem', // thêm kích thước tối thiểu để cân bằng với TextField
                            height: '2.25rem',
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </div>
                  </div>

                  <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <FavoriteIcon />
                      <span className="ml-2">Add to favorite</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(product._id, product.price)
                      }
                      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >
                      <AddShoppingCartIcon />
                      <span className="ml-2"></span> Add to cart
                    </button>
                  </div>
                  <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
                  <p className="text-base font-semibold text-gray-900 dark:text-white mb-6">
                    {product?.name} {product?.monitor} {product?.version}
                  </p>
                  <p className="mb-6 text-gray-500 dark:text-gray-400">
                    {product?.summary}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    Two Thunderbolt USB 4 ports and up to two USB 3 ports.
                    Ultrafast Wi-Fi 6 and Bluetooth 5.0 wireless. Color matched
                    Magic Mouse with Magic Keyboard or Magic Keyboard with Touch
                    ID.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="flex border-b mx-auto max-w-screen-xl px-4 2xl:px-0">
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Item One" value="1" />
                    <Tab label="Item Two" value="2" />
                    <Tab label="Item Three" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16  ">
                    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                          Reviews
                        </h2>
                        <div className="mt-2 flex items-center gap-2 sm:mt-0">
                          <div className="flex items-center gap-0.5">
                            <TextRating value={product?.ratingsAverage} />
                          </div>
                          <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">
                            (4.6)
                          </p>
                          <a
                            href="#"
                            className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
                          >
                            {' '}
                            645 Reviews{' '}
                          </a>
                        </div>
                      </div>
                      <div className="my-6 gap-8 sm:flex sm:items-start md:my-8">
                        <div className="shrink-0 space-y-4">
                          <p className="text-2xl font-semibold leading-none text-gray-900 dark:text-white">
                            4.65 out of 5
                          </p>
                          <button
                            type="button"
                            data-modal-target="review-modal"
                            data-modal-toggle="review-modal"
                            className="mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                          >
                            Write a review
                          </button>
                        </div>
                        <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
                          <div className="flex items-center gap-2">
                            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                              5
                            </p>
                            <StarIcon sx={{ color: yellow[700] }} />

                            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-1.5 rounded-full bg-yellow-400"
                                style={{ width: '20%' }}
                              />
                            </div>
                            <a
                              href="#"
                              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                            >
                              239{' '}
                              <span className="hidden sm:inline">reviews</span>
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                              4
                            </p>
                            <StarIcon sx={{ color: yellow[700] }} />
                            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-1.5 rounded-full bg-yellow-300"
                                style={{ width: '60%' }}
                              />
                            </div>
                            <a
                              href="#"
                              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                            >
                              432{' '}
                              <span className="hidden sm:inline">reviews</span>
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                              3
                            </p>
                            <StarIcon sx={{ color: yellow[700] }} />
                            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-1.5 rounded-full bg-yellow-300"
                                style={{ width: '15%' }}
                              />
                            </div>
                            <a
                              href="#"
                              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                            >
                              53{' '}
                              <span className="hidden sm:inline">reviews</span>
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                              2
                            </p>
                            <StarIcon sx={{ color: yellow[700] }} />
                            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-1.5 rounded-full bg-yellow-300"
                                style={{ width: '5%' }}
                              />
                            </div>
                            <a
                              href="#"
                              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                            >
                              32{' '}
                              <span className="hidden sm:inline">reviews</span>
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 dark:text-white">
                              1
                            </p>
                            <StarIcon sx={{ color: yellow[700] }} />
                            <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                              <div
                                className="h-1.5 rounded-full bg-yellow-300"
                                style={{ width: '0%' }}
                              />
                            </div>
                            <a
                              href="#"
                              className="w-8 shrink-0 text-right text-sm font-medium leading-none text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                            >
                              13{' '}
                              <span className="hidden sm:inline">reviews</span>
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="flex"></div>
                      <section className="bg-white dark:bg-gray-900 lg:py-8 antialiased border-t-2 border-slate-100 border-b-2">
                        <div className="max-w-2xl w-full px-4">
                          <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                              Post your comment
                            </h2>
                          </div>
                          <form className="mb-6">
                            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-400 dark:bg-gray-800 dark:border-gray-700">
                              <label htmlFor="comment" className="sr-only">
                                Your comment
                              </label>
                              <textarea
                                id="comment"
                                rows={6}
                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                placeholder="Write a comment..."
                                defaultValue={''}
                              />
                            </div>
                            <button
                              type="button"
                              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
                            >
                              Post Comment
                            </button>
                          </form>
                        </div>
                      </section>

                      <div className="mt-6 divide-y divide-gray-200 dark:divide-gray-700 ">
                        <div className="gap-3 pb-6 sm:flex sm:items-start">
                          <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                            <div className="flex items-center gap-0.5">
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-base font-semibold text-gray-900 dark:text-white">
                                Micheal Gough
                              </p>
                              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                November 18 2023 at 15:35
                              </p>
                            </div>
                            <div className="inline-flex items-center gap-1">
                              <VerifiedIcon sx={{ color: blue[500] }} />
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Verified purchase
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                              My old IMAC was from 2013. This replacement was
                              well needed. Very fast, and the colour matches my
                              office set up perfectly. The display is out of
                              this world and I’m very happy with this purchase.
                            </p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Was it helpful to you?
                              </p>
                              <div className="flex items-center">
                                <input
                                  id="reviews-radio-1"
                                  type="radio"
                                  defaultValue=""
                                  name="reviews-radio"
                                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                  htmlFor="reviews-radio-1"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {' '}
                                  Yes: 3{' '}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="reviews-radio-2"
                                  type="radio"
                                  defaultValue=""
                                  name="reviews-radio"
                                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                  htmlFor="reviews-radio-2"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  No: 0{' '}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="gap-3 py-6 sm:flex sm:items-start">
                          <div className="shrink-0 space-y-2 sm:w-48 md:w-72">
                            <div className="flex items-center gap-0.5">
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                              <StarIcon
                                fontSize="small"
                                sx={{ color: yellow[700] }}
                              />
                            </div>
                            <div className="space-y-0.5">
                              <p className="text-base font-semibold text-gray-900 dark:text-white">
                                Jese Leos
                              </p>
                              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                November 18 2023 at 15:35
                              </p>
                            </div>
                            <div className="inline-flex items-center gap-1">
                              <VerifiedIcon sx={{ color: blue[500] }} />
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Verified purchase
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 min-w-0 flex-1 space-y-4 sm:mt-0">
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                              It’s fancy, amazing keyboard, matching
                              accessories. Super fast, batteries last more than
                              usual, everything runs perfect in this computer.
                              Highly recommend!
                            </p>
                            <div className="flex gap-2">
                              <img
                                className="h-32 w-20 rounded-lg object-cover"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-1.jpg"
                                alt=""
                              />
                              <img
                                className="h-32 w-20 rounded-lg object-cover"
                                src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-photo-2.jpg"
                                alt=""
                              />
                            </div>
                            <div className="flex items-center gap-4">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Was it helpful to you?
                              </p>
                              <div className="flex items-center">
                                <input
                                  id="reviews-radio-3"
                                  type="radio"
                                  defaultValue=""
                                  name="reviews-radio-2"
                                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                  htmlFor="reviews-radio-3"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  {' '}
                                  Yes: 1{' '}
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="reviews-radio-4"
                                  type="radio"
                                  defaultValue=""
                                  name="reviews-radio-2"
                                  className="h-4 w-4 border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                  htmlFor="reviews-radio-4"
                                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  No: 0{' '}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 text-center">
                        <button
                          type="button"
                          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        >
                          View more reviews
                        </button>
                      </div>
                    </div>
                  </section>
                  {/* Add review modal */}
                  <div
                    id="review-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased"
                  >
                    <div className="relative max-h-full w-full max-w-2xl p-4">
                      {/* Modal content */}
                      <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
                        {/* Modal header */}
                        <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700 md:p-5">
                          <div>
                            <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                              Add a review for:
                            </h3>
                            <a
                              href="#"
                              className="font-medium text-primary-700 hover:underline dark:text-primary-500"
                            >
                              Apple iMac 24" All-In-One Computer, Apple M1, 8GB
                              RAM, 256GB SSD
                            </a>
                          </div>
                          <button
                            type="button"
                            className="absolute right-5 top-5 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="review-modal"
                          >
                            <svg
                              className="h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                              />
                            </svg>
                            <span className="sr-only">Close modal</span>
                          </button>
                        </div>
                        {/* Modal body */}
                        <form className="p-4 md:p-5">
                          <div className="mb-4 grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <svg
                                  className="h-6 w-6 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="ms-2 h-6 w-6 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="ms-2 h-6 w-6 text-yellow-300"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg
                                  className="ms-2 h-6 w-6 text-gray-300 dark:text-gray-500"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 22 20"
                                >
                                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <span className="ms-2 text-lg font-bold text-gray-900 dark:text-white">
                                  3.0 out of 5
                                </span>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="title"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Review title
                              </label>
                              <input
                                type="text"
                                name="title"
                                id="title"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="description"
                                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Review description
                              </label>
                              <textarea
                                id="description"
                                rows={6}
                                className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                defaultValue={''}
                              />
                              <p className="ms-auto text-xs text-gray-500 dark:text-gray-400">
                                Problems with the product or delivery?{' '}
                                <a
                                  href="#"
                                  className="text-primary-600 hover:underline dark:text-primary-500"
                                >
                                  Send a report
                                </a>
                                .
                              </p>
                            </div>
                            <div className="col-span-2">
                              <p className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                                Add real photos of the product to help other
                                customers{' '}
                                <span className="text-gray-500 dark:text-gray-400">
                                  (Optional)
                                </span>
                              </p>
                              <div className="flex w-full items-center justify-center">
                                <label
                                  htmlFor="dropzone-file"
                                  className="dark:hover:bg-bray-800 flex h-52 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 20 16"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                      />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                      <span className="font-semibold">
                                        Click to upload
                                      </span>{' '}
                                      or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                  </div>
                                  <input
                                    id="dropzone-file"
                                    type="file"
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                            <div className="col-span-2">
                              <div className="flex items-center">
                                <input
                                  id="review-checkbox"
                                  type="checkbox"
                                  defaultValue=""
                                  className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                                />
                                <label
                                  htmlFor="review-checkbox"
                                  className="ms-2 text-sm font-medium text-gray-500 dark:text-gray-400"
                                >
                                  By publishing this review you agree with the{' '}
                                  <a
                                    href="#"
                                    className="text-primary-600 hover:underline dark:text-primary-500"
                                  >
                                    terms and conditions
                                  </a>
                                  .
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 pt-4 dark:border-gray-700 md:pt-5">
                            <button
                              type="submit"
                              className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                              Add review
                            </button>
                            <button
                              type="button"
                              data-modal-toggle="review-modal"
                              className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </TabContext>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailProduct;
