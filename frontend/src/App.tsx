import './App.css';

import { Navigate, useRoutes, useLocation } from 'react-router-dom';

import ClientLayout from './layouts/ClientLayout';
import HomePage from './pages/client/HomePage';
import DetailProduct from './pages/client/DetailProduct';
import AllProduct from './pages/client/AllProduct';
import PageNotFound from './pages/client/PageNotFound';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import SummaryOrder from './components/client/SummaryOrder';

import ShoppingLayout from './layouts/ShoppingLayout';
import AdminLayout from './layouts/AdminLayout';
import ListProduct from './components/admin/ListProduct';
import ShoppingCart from './components/client/ShoppingCart';

import { AuthProvider } from './contexts/AuthContext';
import { SnackbarProvider } from './contexts/Snackbar';
import { LinearLoadingProvider } from './contexts/Progress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ErrorBoundary from './contexts/ErroBoundary';
import { useEffect, useRef } from 'react';
import CompleteOrder from './components/client/CompleteOrder';

import HistoryOrder from './components/client/HistoryOrder';
import Checkout from './components/client/Checkout';
import Invoice from './components/client/Invoice';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
const ScrollToTop = () => {
  const location = useLocation();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // cuộn lên đầu trang khi location thay đổi
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  return <div ref={topRef} />;
};

const routerConfig = [
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: 'home', element: <HomePage /> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'products', element: <AllProduct /> },
      { path: 'my-orders', element: <HistoryOrder /> },

      {
        path: 'shopping-cart',
        element: <ShoppingLayout />,
        children: [
          { path: '', element: <Navigate to="/shopping-cart/cart" /> },
          { path: 'cart', element: <ShoppingCart /> },
          { path: 'order', element: <SummaryOrder /> },
          { path: 'complete', element: <CompleteOrder /> },
          { path: 'check-out', element: <Checkout /> },
        ],
      },
      { path: 'product/:id', element: <DetailProduct /> },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [{ path: 'products', element: <ListProduct /> }],
  },
];

const App = () => {
  const routes = useRoutes(routerConfig);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollToTop />
      <ErrorBoundary>
        <AuthProvider>
          <SnackbarProvider>
            <LinearLoadingProvider>
              {/* <AnimatePresence>
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {routes}
              </motion.div>
            </AnimatePresence> */}
              {routes}
            </LinearLoadingProvider>
          </SnackbarProvider>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
