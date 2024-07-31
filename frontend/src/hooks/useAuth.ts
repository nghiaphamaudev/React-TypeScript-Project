import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'src/config/axiosConfig';
import { useUser } from 'src/contexts/AuthContext';
import { useSnackbar } from 'src/contexts/Snackbar';
import { useCart } from 'src/contexts/StateCart';

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
  const { setCart } = useCart();
  const loginForm = useForm<LoginFormParams>();
  const registerForm = useForm<RegisterFormParams>();

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

  return { loginForm, login, registerForm, registerUser };
};
export default useAuth;
