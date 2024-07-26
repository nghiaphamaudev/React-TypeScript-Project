import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/config/axiosConfig';
import { useLinearLoading } from 'src/contexts/Progress';
import { useSnackbar } from 'src/contexts/Snackbar';
import { Products } from 'src/types/products';

export const useProduct = () => {
  const { showLoading, hideLoading } = useLinearLoading();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Products[]>([]);
  const getAllProduct = async () => {
    showLoading();
    try {
      const { data } = await axiosInstance.get('/laptops');
      setProducts(() => data.data);
    } catch (error: any) {
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
        console.log(error);
        return showSnackbar('error', 'API not found! Please connect again!');
      } else {
        navigate('/404');
      }
    } finally {
      hideLoading();
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
};
