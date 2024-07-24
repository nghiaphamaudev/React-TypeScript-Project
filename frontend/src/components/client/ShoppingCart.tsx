import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Divider,
  Button,
  Link,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Input,
} from '@mui/material';

import { East as EastIcon } from '@mui/icons-material';
import { blue, green } from '@mui/material/colors';
import { useState, useEffect } from 'react';
import { Cart } from 'src/types/cart';
import { useLinearLoading } from 'src/contexts/Progress';
import axiosInstance from 'src/config/axiosConfig';
import { useSnackbar } from 'src/contexts/Snackbar';
import { useCart } from 'src/contexts/StateCart';

const ShoppingCart = () => {
  const { showLoading, hideLoading } = useLinearLoading();
  const { showSnackbar } = useSnackbar();
  const [carts, setCarts] = useState<Cart | undefined>();
  const { setCart } = useCart();
  const getCart = async () => {
    showLoading();
    try {
      const data = await axiosInstance.get('/carts');
      setCarts(data.data.data);
    } catch (error: any) {
      if (error.response.data.error.name === 'JsonWebTokenError')
        return showSnackbar(
          'error',
          'Your session has expired. Please log in again.'
        );
      showSnackbar('error', error.response.data.message);
    } finally {
      hideLoading();
    }
  };
  const handleDeleteProduct = async (idProduct: string) => {
    try {
      const response = await axiosInstance.delete(`/carts/${idProduct}`);
      showSnackbar('success', 'Delete product is successfully!');
      setCart(response.data.data);
      setCarts(response.data.data);
    } catch (error: any) {
      console.log(error);
      showSnackbar('error', error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <div className="">
        {carts?.orderItems.length || 0 > 0 ? (
          <div className="mt-6 sm:mt-8 p-6 shadow-xl  bg-slate-50 rounded md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="grid lg:grid-cols-2">
                <div className="lg:col-span-2 p-6 bg-white overflow-x-auto rounded-lg shadow-lg">
                  <div className="flex gap-2 border-b pb-4">
                    <h2 className="text-2xl font-bold text-gray-800 flex-1">
                      Shopping Cart
                    </h2>
                    <h3 className="text-base text-gray-800">
                      {carts?.orderItems.length} Items
                    </h3>
                  </div>
                  <table className="mt-6 w-full border-collapse divide-y">
                    <thead className="whitespace-nowrap text-left">
                      <tr>
                        <th className="text-base p-4"></th>
                        <th className="text-base p-4 font-semibold">Product</th>
                        <th className="text-base p-4  font-semibold">
                          Quantity
                        </th>
                        <th className="text-base text-gray-800 p-4 text-center font-semibold">
                          Subtotal
                        </th>
                        <th className="text-base text-gray-800 p-4"></th>
                      </tr>
                    </thead>
                    <tbody className="whitespace-nowrap divide-y">
                      {carts?.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4 text-center">
                            <div className="h-24 shrink-0">
                              <img
                                src={`/img/products/${item.product.coverImg}`}
                                className="w-full h-full object-contain rounded-lg"
                              />
                            </div>
                          </td>
                          <td className="ml-2 pt-4">
                            <div className="flex items-center gap-4 w-max">
                              <div>
                                <p className="text-base text-center font-normal text-gray-800">
                                  {item.product.name}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center border w-16 rounded-lg overflow-hidden">
                              <input
                                type="number"
                                id="number-input"
                                aria-describedby="helper-text-explanation"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={item.quantity}
                              />
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <h4 className="text-base font-normal text-gray-800">
                              ${item.price}
                            </h4>
                          </td>
                          <td className="p-4 text-center">
                            <IconButton
                              onClick={() =>
                                handleDeleteProduct(item.product.id)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
                      ${carts?.totalPrice}
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
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
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
        ) : (
          <div className="mt-6 sm:mt-8 p-6 shadow-xl  bg-slate-50 rounded md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto">
              <section className=" dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div className="mx-auto max-w-screen-sm text-center">
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
                      Shopping cart is empty
                    </p>
                    <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
                      Back to shop to buy every product. Regards
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16  mt-10">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
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
