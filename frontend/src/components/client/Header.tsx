// src/components/Header.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountMenu from '../admin/avatar/Avatar';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useStateCart } from 'src/contexts/StateCart';
import { useUser } from 'src/contexts/AuthContext';
import axiosInstance from 'src/config/axiosConfig';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Header = () => {
  const [activate, setActivate] = useState('home');
  const { cart, setCart } = useStateCart();

  const { user, setUser } = useUser();

  const getCart = async () => {
    try {
      const data = await axiosInstance.get('/carts');
      setCart(data.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const getUser = async () => {
    const id = JSON.parse(localStorage.getItem('user') ?? 'null') || null;
    try {
      const data = await axiosInstance.get(`users/get-me/${id}`);

      setUser(data.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const itemCount = cart ? cart.orderItems?.length : 0;
  function handleClick(title: string) {
    setActivate(() => title);
  }
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className={
                      activate === 'home'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => handleClick('home')}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className={
                      activate === 'about'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => handleClick('about')}
                  >
                    About
                  </Link>

                  <Link
                    to="/products"
                    className={
                      activate === 'product'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => handleClick('product')}
                  >
                    Product
                  </Link>

                  <Link
                    to="/contact"
                    className={
                      activate === 'contact'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => handleClick('contact')}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Link
                to="/shopping-cart"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-5"
                onClick={() => handleClick('shopping-cart')}
              >
                <span className="absolute -inset-1.5" />
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={itemCount} color="secondary">
                    <ShoppingCartIcon
                      fontSize="large"
                      sx={{ color: '#cbd5e1' }}
                    />
                  </StyledBadge>
                </IconButton>
              </Link>
              <div className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-5">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <IconButton aria-label="cart">
                  <StyledBadge badgeContent={itemCount} color="secondary">
                    <FavoriteIcon fontSize="large" sx={{ color: '#cbd5e1' }} />
                  </StyledBadge>
                </IconButton>
              </div>

              <div className="relative ml-3">
                {user ? (
                  <AccountMenu
                    username={user.username}
                    photo={user.photo}
                    role={user.role}
                  />
                ) : (
                  <Link to={'/login'}>
                    <IconButton aria-label="cart">
                      <LoginIcon fontSize="large" sx={{ color: '#cbd5e1' }} />
                    </IconButton>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </a>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              About
            </a>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Product
            </a>
            <a className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
