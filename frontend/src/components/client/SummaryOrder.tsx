import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect, useCallback } from 'react';
import { Address } from 'src/types/users';
import axiosInstance from 'src/config/axiosConfig';
import { Cart } from 'src/types/cart';
import blue from '@mui/material/colors/blue';
import grey from '@mui/material/colors/grey';
import { Checkbox, TextField, Typography } from '@mui/material';

import MyButton from './buttons/MyButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'src/contexts/Snackbar';
import { Link } from 'react-router-dom';
import { useCart } from 'src/contexts/StateCart';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type AddressForm = {
  name: string;
  address: string;
  phone: string;
};

const SummaryOrder = () => {
  const [open, setOpen] = React.useState(false);
  const [shipPrice, setShipPrice] = useState<number | null>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  console.log(paymentMethod);
  const { showSnackbar } = useSnackbar();
  const [openChild, setOpenChild] = React.useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [carts, setCarts] = useState<Cart | undefined>();
  const { setCart } = useCart();

  const getAddress = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get('/carts');
      setAddresses(data.data.user.addresses);
      setCarts(data.data);

      if (data.data.user.addresses.length === 0) setOpenChild(true);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const addressDefault = addresses.find(
    (address) => address.isDefault === true
  );

  const handleChangeDefault = async (id: string) => {
    try {
      await axiosInstance.patch(`/users/update-status-address/${id}`);
      showSnackbar('success', 'This address is default address!');
      getAddress();
      // window.location.reload();
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  const hanldeOrderSubmit = async () => {
    const data = { payment: paymentMethod };
    try {
      await axiosInstance.post('/orders', data);
      showSnackbar('success', 'Order is successfully!');
      const cart = await axiosInstance.get('/carts');
      setCart(cart.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  useEffect(() => {
    getAddress();
  }, [getAddress]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddressForm>();

  const onSubmit: SubmitHandler<AddressForm> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('phone', data.phone);
    try {
      await axiosInstance.post('/users/address', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      showSnackbar('success', 'Add address is sucessfully!');
      getAddress();
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  const handlePaymentMethod = (payment: string) => {
    setPaymentMethod(payment);
    if (payment === 'COD') {
      setShipPrice(50);
    } else {
      setShipPrice(0);
    }
  };

  useEffect(() => {
    if (paymentMethod !== null) {
      console.log('Selected payment method:', paymentMethod);
    }
  }, [paymentMethod]);

  return (
    <div>
      <>
        <form
          action="#"
          className="mx-auto max-w-screen-xl px-6 py-8 bg-slate-50 2xl:px-0"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Order summary
            </h2>
            <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Billing &amp; Delivery information
              </h4>
              <dl>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {addressDefault?.name}
                </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {addressDefault?.phone}
                </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">
                  {addressDefault?.address}
                </dd>
              </dl>
              <Button
                onClick={handleOpen}
                sx={{
                  backgroundColor: blue[700],
                  color: grey[50],
                  '&:hover': {
                    backgroundColor: blue[800], // màu khi hover đậm hơn
                  },
                }}
              >
                Change
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
              >
                <Box sx={{ ...style, width: 800 }}>
                  <Box sx={{ borderBottom: '1px solid #ddd', py: 2 }}>
                    <Typography variant="h6" sx={{ fontVariant: 'normal' }}>
                      My addresses
                    </Typography>
                  </Box>
                  {addresses.map((address, index) => (
                    <Box
                      key={index}
                      sx={{
                        borderBottom: '1px solid #ddd',
                        pt: 1,
                        pb: 1,
                        mt: 1,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Box sx={{ mr: 3 }}>
                        <Checkbox
                          checked={address.isDefault}
                          onClick={
                            !address.isDefault
                              ? () => handleChangeDefault(address._id)
                              : undefined
                          }
                        />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: 'flex', // dùng flex để căn chỉnh các phần tử con
                            justifyContent: 'space-between', // căn chỉnh các phần tử con để chúng nằm ở hai đầu
                            alignItems: 'center', // căn chỉnh các phần tử con theo chiều dọc
                          }}
                        >
                          <Typography>
                            {address.name} | (+84){address.phone}
                          </Typography>
                          <Button>Update</Button>
                        </Box>
                        <Box sx={{ maxWidth: '400px' }}>
                          <Typography>{address.address}</Typography>
                        </Box>
                        {address.isDefault ? (
                          <Box
                            sx={{
                              p: 0.5,
                              mt: 2,
                              border: '1px solid #ddd',
                              borderColor: '#e65100',
                              width: '80px',
                              textAlign: 'center',
                              color: '#e65100',
                            }}
                          >
                            <Typography>Default</Typography>
                          </Box>
                        ) : undefined}
                      </Box>
                    </Box>
                  ))}

                  <Button
                    startIcon={<AddIcon />}
                    onClick={handleOpenChild}
                    sx={{
                      backgroundColor: 'white', // màu nền trắng
                      color: blue[700], // màu chữ xanh
                      '&:hover': {
                        backgroundColor: grey[100], // màu nền khi hover
                        color: blue[800], // màu chữ khi hover
                      },
                      border: `1px solid ${blue[700]}`,
                      mt: 4, // thêm border xanh nếu cần
                    }}
                  >
                    Add new address
                  </Button>
                </Box>
              </Modal>

              <React.Fragment>
                <Modal
                  open={openChild}
                  onClose={handleCloseChild}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 800, p: 15 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <h3 className="text-xl text-center mb-8 font-semibold text-gray-900 dark:text-white">
                        Add new address
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <Typography gutterBottom sx={{ fontSize: '15px' }}>
                            Name
                          </Typography>
                          <TextField
                            type={'text'}
                            sx={{ border: 'none' }}
                            {...register('name', {
                              required: 'Name is required!',
                            })}
                            error={!!errors?.name?.message}
                            helperText={errors?.name?.message}
                            placeholder="Type your name"
                            fullWidth
                          />
                        </div>
                        <div>
                          <Typography gutterBottom sx={{ fontSize: '15px' }}>
                            Phone
                          </Typography>
                          <TextField
                            type={'text'}
                            sx={{ border: 'none' }}
                            {...register('phone', {
                              required: 'Phone is required!',
                            })}
                            error={!!errors?.phone?.message}
                            helperText={errors?.phone?.message}
                            placeholder="Type your phone"
                            fullWidth
                          />
                        </div>
                        <div>
                          <Typography gutterBottom sx={{ fontSize: '15px' }}>
                            Address
                          </Typography>
                          <TextField
                            type={'text'}
                            sx={{ border: 'none' }}
                            {...register('address', {
                              required: 'Address is required!',
                            })}
                            error={!!errors?.address?.message}
                            helperText={errors?.address?.message}
                            placeholder="Type your addrress"
                            fullWidth
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <MyButton
                            symbol={<AddIcon />}
                            title="Add new address"
                          />
                        </div>
                      </div>
                      <Button onClick={handleCloseChild}>Back</Button>
                    </form>
                  </Box>
                </Modal>
              </React.Fragment>
            </div>
            <div className="mt-6 sm:mt-8">
              <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {carts?.orderItems?.map((cart, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                          <div className="flex items-center gap-4">
                            <a
                              href="#"
                              className="flex items-center aspect-square w-16 h-16 shrink-0"
                            >
                              <img
                                className="h-auto w-full max-h-full dark:hidden"
                                src={`/img/products/${cart.product.coverImg}`}
                                alt="imac image"
                              />
                            </a>
                            <a href="#" className="hover:underline">
                              {cart.product.name}
                            </a>
                          </div>
                        </td>
                        <td className="p-4 text-base font-normal text-gray-900 dark:text-white">
                          x{cart.quantity}
                        </td>
                        <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">
                          ${cart.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 space-y-6">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        Original price
                      </dt>
                      <dd className="text-base font-medium text-red-500">
                        ${carts?.totalPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">Ship</dt>
                      <dd className="text-base font-medium text-red-500">
                        ${shipPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-gray-500 dark:text-gray-400">
                        discountAmount
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        -$299.00
                      </dd>
                    </dl>
                  </div>
                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 pb-5 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">
                      $
                      {(carts?.totalPrice ? carts.totalPrice : 0) +
                        (shipPrice ? shipPrice : 0)}
                    </dd>
                  </dl>
                </div>
                <div className="space-y-4 border-b border-t border-gray-200 py-3 mb-5">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Payment
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="credit-card"
                            aria-describedby="credit-card-text"
                            type="radio"
                            name="payment-method"
                            defaultValue=""
                            onClick={() => handlePaymentMethod('CREDIT')}
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="credit-card"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            Credit Card
                          </label>
                          <p
                            id="credit-card-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Pay with your credit card
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="pay-on-delivery"
                            aria-describedby="pay-on-delivery-text"
                            type="radio"
                            name="payment-method"
                            defaultValue=""
                            onClick={() => handlePaymentMethod('COD')}
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="pay-on-delivery"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {' '}
                            Payment on delivery{' '}
                          </label>
                          <p
                            id="pay-on-delivery-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            +$15 payment processing fee
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="paypal-2"
                            aria-describedby="paypal-text"
                            type="radio"
                            name="payment-method"
                            onClick={() => handlePaymentMethod('PAYPAL')}
                            defaultValue=""
                            className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                          />
                        </div>
                        <div className="ms-4 text-sm">
                          <label
                            htmlFor="paypal-2"
                            className="font-medium leading-none text-gray-900 dark:text-white"
                          >
                            {' '}
                            Paypal account{' '}
                          </label>
                          <p
                            id="paypal-text"
                            className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                          >
                            Connect to your account
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-start sm:items-center">
                  <input
                    id="terms-checkbox-2"
                    type="checkbox"
                    defaultValue=""
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                  />
                  <label
                    htmlFor="terms-checkbox-2"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{' '}
                    <a
                      href="#"
                      title=""
                      className="text-primary-700 underline hover:no-underline dark:text-primary-500"
                    >
                      Terms and Conditions
                    </a>
                    of use of the Flowbite marketplace
                  </label>
                </div>
                <div className="gap-4 sm:flex sm:items-center">
                  <Link
                    to={'/products'}
                    type="button"
                    className="w-full text-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Return to Shopping
                  </Link>
                  <button
                    type="button"
                    onClick={hanldeOrderSubmit}
                    className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Send the order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    </div>
  );
};

export default SummaryOrder;
