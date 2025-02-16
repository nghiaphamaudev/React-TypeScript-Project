import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Typography,
  Divider,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { Add, East as EastIcon } from '@mui/icons-material';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import useCart from 'src/hooks/useCart';

const ShoppingCart = () => {
  const { carts, handleDeleteProduct, handleUpdateQuantityCart } = useCart();

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
                        <th className="text-base p-4  font-semibold text-center">
                          Price {'   '}
                        </th>
                        <th className="text-base p-4 text-center  font-semibold">
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
                          <td className="py-4 px-8 text-center">
                            <h4 className="text-base font-normal text-gray-800">
                              ${item.price}
                            </h4>
                          </td>
                          <td className="p-4">
                            <>
                              {/* Input Number */}
                              <div
                                className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700"
                                data-hs-input-number=""
                              >
                                <div className="flex items-center gap-x-1.5">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUpdateQuantityCart(
                                        'minus',
                                        item?.product?.id
                                      )
                                    }
                                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                    tabIndex={-1}
                                    aria-label="Decrease"
                                    data-hs-input-number-decrement=""
                                  >
                                    <RemoveIcon />
                                  </button>
                                  <input
                                    className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
                                    style={{ MozAppearance: 'textfield' }}
                                    type="number"
                                    aria-roledescription="Number field"
                                    value={item?.quantity}
                                    data-hs-input-number-input=""
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleUpdateQuantityCart(
                                        'plus',
                                        item?.product?.id
                                      )
                                    }
                                    className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                                    tabIndex={-1}
                                    aria-label="Increase"
                                    data-hs-input-number-increment=""
                                  >
                                    <Add />
                                  </button>
                                </div>
                              </div>
                              {/* End Input Number */}
                            </>
                          </td>

                          <td className="p-4 text-center">
                            <h4 className="text-base font-normal text-gray-800">
                              $
                              {parseFloat(
                                (item.price * item.quantity).toFixed(1)
                              )}
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
                  {/* <Box
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
                  </Box> */}
                  <Divider sx={{ my: 2 }} />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      Total
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      ${carts?.totalPrice}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Box
                    sx={{
                      display: 'inline-block',
                      textAlign: 'center',
                      py: 1,
                      px: 4,
                      width: '100%',
                      maxWidth: 300,
                      textDecoration: 'none',
                      color: 'white',
                      backgroundColor: 'primary.main', // Hoặc màu bạn muốn
                      borderRadius: '4px',
                      '&:hover': {
                        backgroundColor: 'primary.dark', // Hoặc màu hover bạn muốn
                      },
                    }}
                  >
                    <Link to={'/shopping-cart/order'}>Proceed to Checkout</Link>
                  </Box>
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
                  <Link to={'/products'}>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      sx={{ mx: 1, color: blue[700] }}
                    >
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
