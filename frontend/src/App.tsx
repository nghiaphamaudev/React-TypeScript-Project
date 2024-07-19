import './App.css';

import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import HomePage from './pages/client/HomePage';
import DetailProduct from './pages/client/DetailProduct';

import AllProduct from './pages/client/AllProduct';
import PageNotFound from './pages/client/PageNotFound';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import SummaryOrder from './components/client/SummaryOrder';
import Checkout from './components/client/Checkout';
import Payment from './components/client/Payment';
import ShoppingLayout from './layouts/ShoppingLayout';
import AdminLayout from './layouts/AdminLayout';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from './contexts/Snackbar';
import { LinearLoadingProvider } from './contexts/Progress';
import ListProduct from './components/admin/ListProduct';
import ShoppingCart from './components/client/ShoppingCart';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

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
      {
        path: 'shopping-cart',
        element: <ShoppingLayout />,
        children: [
          { path: '', element: <Navigate to="/shopping-cart/cart" /> },
          { path: 'cart', element: <ShoppingCart /> },
          { path: 'check-out', element: <Checkout /> },
          { path: 'order', element: <SummaryOrder /> },
          { path: 'payment', element: <Payment /> },
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

function App() {
  const routes = useRoutes(routerConfig);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <LinearLoadingProvider>
          <main>{routes}</main>
        </LinearLoadingProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
