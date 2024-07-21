import { useState } from 'react';
import { Link } from 'react-router-dom';

import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import AccountMenu from '../admin/avatar/Avatar';

import { useCart } from 'src/contexts/StateCart';
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
  const { cart } = useCart();

  const itemCount = cart ? cart.orderItems.length : 0;
  function hanleClick(title: string) {
    setActivate(() => title);
  }
  return (
    <div>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {/*
      Icon when menu is closed.

      Menu open: "hidden", Menu closed: "block"
    */}
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
                {/*
      Icon when menu is open.

      Menu open: "block", Menu closed: "hidden"
    */}
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
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Link
                    to="/"
                    className={
                      activate === 'home'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => hanleClick('home')}
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
                    onClick={() => hanleClick('about')}
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
                    onClick={() => hanleClick('product')}
                  >
                    Product
                  </Link>

                  <Link
                    to=""
                    className={
                      activate === 'contact'
                        ? 'bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium'
                    }
                    onClick={() => hanleClick('contact')}
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
                onClick={() => hanleClick('shopping-cart')}
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
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 mr-5"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <NotificationsNoneIcon sx={{ fontSize: 26 }} />
              </button>
              {/* Profile dropdown */}
              <div className="relative ml-3">
                <AccountMenu
                  explain="Pham Nghia Jr"
                  source="https://img.freepik.com/free-photo/pretty-young-woman-happy-surprised-expression-city-background_1194-588814.jpg?t=st=1720433764~exp=1720437364~hmac=896edbc5b2bd08bb1ae8bc94eafcdce02a540aed5d59201d964a58a9971f3dd1&w=1380"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu, show/hide based on menu state. */}
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
