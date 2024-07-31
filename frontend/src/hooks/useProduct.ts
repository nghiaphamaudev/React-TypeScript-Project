import { useState, useEffect, useCallback } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/config/axiosConfig';
import { useLinearLoading } from 'src/contexts/Progress';
import { useSnackbar } from 'src/contexts/Snackbar';
import { Category } from 'src/types/category';
import { Products } from 'src/types/products';

type AddProductParams = {
  _id: string | null;
  name: string;
  price: number;
  priceDiscount: number;
  version: number;
  coverImg: File | null | string;
  images: File[] | [string];
  summary: string;
  description: string;
  category: string;
};
// props
type AddProductProps = {
  initialData?: Products;
  mode: 'create' | 'update';
};

const useProducts = (initialData?: any, mode?: 'create' | 'update') => {
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { showSnackbar } = useSnackbar();
  const { showLoading, hideLoading } = useLinearLoading();
  const navigate = useNavigate();

  const getAllProduct = useCallback(async () => {
    showLoading();
    try {
      const { data } = await axiosInstance.get('/laptops');
      setProducts(data.data);

      localStorage.setItem('product', JSON.stringify(data.data));
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        showSnackbar(
          'error',
          'There is currently a network issue. Please try again later.'
        );
      } else if (error.code === 'ERR_BAD_REQUEST') {
        console.log(error);
        showSnackbar('error', 'API not found! Please connect again!');
      } else {
        navigate('/404');
      }
    } finally {
      hideLoading();
    }
  }, [navigate, showLoading, hideLoading, showSnackbar]);

  //Add Product
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddProductParams>({
    defaultValues: {
      ...initialData,
      category: initialData?.category?._id || '',
    },
  });

  const getCategory = async () => {
    showLoading();
    try {
      const { data } = await axiosInstance.get('/categories');
      setCategories(data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    } finally {
      hideLoading();
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      if (filesArray.length === 0) {
        showSnackbar('error', 'You must choose a photo before submit!');
      } else if (filesArray.length > 2) {
        showSnackbar('error', 'You can only upload a maximum of 2 photos.');
      } else {
        setValue('images', filesArray);
      }
    } else {
      showSnackbar('error', 'You must choose a photo before submit!');
    }
  };

  const handleCoverImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      showSnackbar('error', 'You must choose a cover image before submit.');
    } else {
      setValue('coverImg', selectedFile);
    }
  };
  const addProduct: SubmitHandler<AddProductParams> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('priceDiscount', data.priceDiscount.toString());
    formData.append('version', data.version.toString());
    if (data.coverImg) {
      formData.append('coverImg', data.coverImg);
    } else {
      showSnackbar('error', 'You must choose a cover image before submit.');
      return;
    }
    formData.append('summary', data.summary);
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    } else {
      showSnackbar('error', 'You must choose a image before submit.');
      return;
    }

    try {
      await axiosInstance.post('/laptops', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showSnackbar('success', 'Add product is successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };
  const updateProduct: SubmitHandler<AddProductParams> = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price.toString());
    formData.append('priceDiscount', data.priceDiscount.toString());
    formData.append('version', data.version.toString());
    if (data.coverImg) {
      formData.append('coverImg', data.coverImg);
    }
    formData.append('summary', data.summary);
    formData.append('description', data.description);
    formData.append('category', data.category);
    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    try {
      await axiosInstance.patch(`/laptops/${initialData?._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showSnackbar('success', 'Update product is successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return {
    products,
    getAllProduct,
    categories,
    register,
    handleSubmit,
    errors,
    handlePhotoChange,
    handleCoverImgChange,
    addProduct,
    updateProduct,
  };
};

export default useProducts;
