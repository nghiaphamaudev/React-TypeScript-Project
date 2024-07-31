// Login.tsx
import { Box, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MyButton from 'src/components/client/buttons/MyButton';

import useAuth from 'src/hooks/useAuth';

const Login = () => {
  const { login, loginForm } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = loginForm;

  return (
    <div>
      <section className="bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400">
        <div className="flex flex-col items-center justify-center px-6 py-10 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
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
                onSubmit={handleSubmit(login)}
              >
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
                <MyButton title="Submit" symbol={undefined} />

                <p className="text-sm font-light text-gray-600 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <Link
                    to="/register"
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

export default Login;
