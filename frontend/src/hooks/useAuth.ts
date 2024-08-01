import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/config/axiosConfig';
import { useUser } from 'src/contexts/AuthContext';
import { useSnackbar } from 'src/contexts/Snackbar';
import { useStateCart } from 'src/contexts/StateCart';
import { User } from 'src/types/user';

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

type LoginFormParams = {
  email: string;
  password: string;
};

const useAuth = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const { setUser } = useUser();
  const { setCart } = useStateCart();
  const loginForm = useForm<LoginFormParams>();
  const registerForm = useForm<RegisterFormParams>();
  const [currentUser, setCurrentUser] = useState<User>();

  const getUser = async () => {
    const id = JSON.parse(localStorage.getItem('user') ?? 'null') || null;
    try {
      const res = await axiosInstance.get(`/users/get-me/${id}`);
      setCurrentUser(res.data.data);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  const login: SubmitHandler<LoginFormParams> = async (data) => {
    try {
      const res = await axiosInstance.post('/users/signin', data);
      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('user', JSON.stringify(res.data.data._id));
      setUser(res.data.data);

      const respose = await axiosInstance.get('/carts');
      setCart(respose.data.data);
      showSnackbar('success', 'Login is successfully!');
      setTimeout(() => {
        navigate('/home');
      }, 3000);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  const registerUser: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      await axiosInstance.post('/users/signup', data);
      showSnackbar('success', 'Register is successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  const hanleLogout = async () => {
    try {
      await axiosInstance.get('/users/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
      setCart(null);
      showSnackbar('success', 'Logout is successfully!');
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    } finally {
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return {
    loginForm,
    login,
    registerForm,
    registerUser,
    hanleLogout,
    currentUser,
  };
};
export default useAuth;
