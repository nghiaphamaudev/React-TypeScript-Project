import { useEffect, useState } from 'react';
import axiosInstance from 'src/config/axiosConfig';
import { useLinearLoading } from 'src/contexts/Progress';
import { useSnackbar } from 'src/contexts/Snackbar';
import { Error } from 'src/types/error';
import { Order } from 'src/types/orders';

const useOrder = () => {
  const { showSnackbar } = useSnackbar();
  const { showLoading, hideLoading } = useLinearLoading();
  const [orders, setOrders] = useState<Order[]>([]);

  const getAllOrder = async () => {
    showLoading();
    try {
      const res = await axiosInstance.get('/orders');
      setOrders(res.data.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  return { orders };
};

export default useOrder;
