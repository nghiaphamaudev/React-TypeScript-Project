import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSnackbar } from 'src/contexts/Snackbar';

import Box from '@mui/material/Box';

import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from 'src/components/client/buttons/Button';
import { Link, useNavigate } from 'react-router-dom';

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
const Register = () => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      await axios.post('http://127.0.0.1:8000/api/v1/users/signup', data);
      showSnackbar('success', 'Register is successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error: any) {
      showSnackbar('error', error.response.data.message);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700">
        <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto  lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:my-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 ">
              <Typography
                variant="h5"
                fontWeight={600}
                align="center"
                sx={{ fontSize: '20px' }}
              >
                Create your account
              </Typography>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Box>
                  <Typography
                    variant="inherit"
                    fontWeight={500}
                    mb={1}
                    sx={{ fontSize: '15px' }}
                  >
                    Username
                  </Typography>

                  <TextField
                    fullWidth
                    id="fullWidth"
                    autoComplete="on"
                    {...register('username', {
                      required: 'Username is required!',
                    })}
                    error={!!errors?.username?.message}
                    helperText={errors?.username?.message}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="inherit"
                    fontWeight={500}
                    mb={1}
                    sx={{ fontSize: '15px' }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    autoComplete="off"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'invalid email address',
                      },
                    })}
                    error={!!errors?.email?.message}
                    helperText={errors?.email?.message}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="inherit"
                    fontWeight={500}
                    mb={1}
                    sx={{ fontSize: '15px' }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    autoComplete="off"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password is min length 6 characters',
                      },
                    })}
                    type="password"
                    error={!!errors?.password?.message}
                    helperText={errors?.password?.message}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="inherit"
                    fontWeight={500}
                    mb={1}
                    sx={{ fontSize: '15px' }}
                  >
                    Confirm password
                  </Typography>
                  <TextField
                    fullWidth
                    id="fullWidth"
                    autoComplete="off"
                    {...register('passwordConfirm', {
                      required: 'Password confirm is required',
                      minLength: {
                        value: 8,
                        message: 'Password confirm is min length 6 characters',
                      },
                    })}
                    type="password"
                    error={!!errors?.passwordConfirm?.message}
                    helperText={errors?.passwordConfirm?.message}
                  />
                </Box>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button title="Submit" symbol={undefined} />

                <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
