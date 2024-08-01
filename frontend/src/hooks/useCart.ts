import { useLinearLoading } from 'src/contexts/Progress';
import { useSnackbar } from 'src/contexts/Snackbar';
import { useStateCart } from 'src/contexts/StateCart';
import { Cart } from 'src/types/cart';
import { useEffect, useState } from 'react';
import axiosInstance from 'src/config/axiosConfig';

const useCart = () => {
  const { showLoading, hideLoading } = useLinearLoading();
  const { showSnackbar } = useSnackbar();
  const [carts, setCarts] = useState<Cart | undefined>();
  const { setCart } = useStateCart();
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
  useEffect(() => {
    getCart();
  }, []);

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

  const handleUpdateQuantityCart = async (mode: string, id: string) => {
    const data = { mode, id };
    try {
      const res = await axiosInstance.patch(`/carts`, data);
      console.log(res.data.data);
      setCarts(res.data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  return { carts, handleDeleteProduct, handleUpdateQuantityCart };
};
export default useCart;
