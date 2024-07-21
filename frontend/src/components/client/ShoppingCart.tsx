import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Typography,
  Divider,
  Button,
  Link,
  TextField,
} from '@mui/material';
import { East as EastIcon } from '@mui/icons-material';
import { blue, green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Cart } from 'src/types/cart';
import { useLinearLoading } from 'src/contexts/Progress';
import axiosInstance from 'src/config/axiosConfig';
import { useSnackbar } from 'src/contexts/Snackbar';
import TextRating from '../ratings/rating';

const ShoppingCart = () => {
  const { showLoading, hideLoading } = useLinearLoading();
  const { showSnackbar } = useSnackbar();
  const [cart, setCart] = useState<Cart | undefined>();
  const getCart = async () => {
    showLoading();
    try {
      const data = await axiosInstance.get('/carts');
      setCart(data.data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl text-center">
          Shopping Cart
        </h2>
        <div className="mt-6 sm:mt-8 p-6 shadow-xl  bg-slate-50 rounded md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            {cart?.orderItems.map((item, index) => (
              <div className=" relative mb-5" key={index}>
                <div className="absolute right-0 ">
                  <button>
                    <ClearIcon />
                  </button>
                </div>
                <div className="space-y-6 ">
                  <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={`/img/products/${item.product.coverImg}`}
                          alt="imac image"
                        />
                      </a>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            type="button"
                            id="decrement-button"
                            data-input-counter-decrement="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <RemoveIcon fontSize="small" />
                          </button>
                          <input
                            type="text"
                            id="counter-input"
                            data-input-counter=""
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                            placeholder=""
                            defaultValue={item.quantity}
                          />
                          <button
                            type="button"
                            id="increment-button"
                            data-input-counter-increment="counter-input"
                            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                          >
                            <AddIcon fontSize="small" />
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ${item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <a className=" block text-base font-medium text-gray-900 hover:underline dark:text-white">
                          {item.product.name} {item.product.monitor}{' '}
                          {item.product.version}
                        </a>

                        <span className="text-base font-medium text-gray-900 hover:underline dark:text-white">
                          Black
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <Box
              sx={{
                p: 4,
                borderRadius: 2,
                border: 1,
                borderColor: 'grey.300',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                '.MuiTypography-root': { color: 'text.primary' },
                '.MuiTypography-root.dark': { color: 'text.secondary' },
              }}
            >
              <Typography variant="h6" component="p" fontWeight="bold">
                Order summary
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Original price
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    $7,592.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Savings
                  </Typography>
                  <Typography
                    variant="body1"
                    fontWeight="medium"
                    sx={{ color: green[600] }}
                  >
                    -$299.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Store Pickup
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    $99
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Tax
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    $799
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    $8,191.00
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ py: 1, px: 4, width: '100%', maxWidth: 300 }}
                >
                  Proceed to Checkout
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mt: 3,
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  or
                </Typography>
                <Link
                  href="/products"
                  underline="none"
                  sx={{ mx: 1, color: blue[700] }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Continue Shopping
                  </Typography>
                </Link>
                <EastIcon fontSize="small" sx={{ color: blue[900] }} />
              </Box>
            </Box>
            <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <Box component="form" sx={{ mt: 4, mb: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography
                    component="label"
                    htmlFor="voucher"
                    variant="body1"
                    sx={{
                      display: 'block',
                      mb: 1,
                      fontWeight: 'medium',
                      color: 'text.primary',
                    }}
                  >
                    Do you have a voucher or gift card?
                  </Typography>
                  <TextField
                    id="voucher"
                    fullWidth
                    placeholder=""
                    variant="outlined"
                    InputProps={{
                      sx: {
                        height: '40px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'grey.300',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                    sx={{
                      '& .MuiInputBase-root': {
                        backgroundColor: 'grey.50',
                        color: 'text.primary',
                        borderRadius: '8px',
                      },
                      '& .MuiInputBase-input': {
                        color: 'text.primary',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'grey.300',
                        },
                        '&:hover fieldset': {
                          borderColor: 'primary.main',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'primary.main',
                        },
                      },
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    type="button"
                    fullWidth
                    sx={{
                      py: 1,
                      backgroundColor: blue[700],
                      color: 'white',
                      '&:hover': {
                        backgroundColor: blue[800],
                      },
                      fontWeight: 'medium',
                      borderRadius: '8px',
                      mb: 2,
                    }}
                  >
                    Apply Code
                  </Button>
                </Box>
              </Box>
            </div>
          </div>
        </div>

        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16  mt-10">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              People also bought
            </h2>
            <div className="hidden xl:mt-8 xl:block">
              <div className="mt-6 grid grid-cols-4 gap-4 sm:mt-8">
                {/* <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct />
              <CardProduct /> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShoppingCart;
