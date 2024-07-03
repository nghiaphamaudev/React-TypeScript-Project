import './App.css';

import { useRoutes } from 'react-router-dom';
import ClientLayout from './layouts/ClientLayout';
import HomePage from './pages/client/HomePage';
import DetailProduct from './pages/client/DetailProduct';
import ShoppingCart from './pages/client/ShoppingCart';
import AllProduct from './pages/client/AllProduct';
import PageNotFound from './pages/client/PageNotFound';
import Login from './pages/client/Login';
import Register from './pages/client/Register';
import SummaryOrder from './components/client/SummaryOrder';
import Checkout from './components/client/Checkout';
import Payment from './components/client/Payment';
import ShoppingLayout from './layouts/ShoppingLayout';

const routerConfig = [
  {
    path: '/',
    element: (
      <ClientLayout>
        <HomePage />
      </ClientLayout>
    ),
  },
  {
    path: 'product/:id',
    element: (
      <ClientLayout>
        <DetailProduct />
      </ClientLayout>
    ),
  },
  {
    path: 'products',
    element: (
      <ClientLayout>
        <AllProduct />
      </ClientLayout>
    ),
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/login',
    element: (
      <ClientLayout>
        <Login />
      </ClientLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <ClientLayout>
        <Register />
      </ClientLayout>
    ),
  },
  {
    path: 'shopping-cart',
    element: (
      <ClientLayout>
        {' '}
        <ShoppingLayout>
          <ShoppingCart />
        </ShoppingLayout>
      </ClientLayout>
    ),
  },
  {
    path: '/check-out',
    element: (
      <ClientLayout>
        {' '}
        <ShoppingLayout>
          <Checkout />
        </ShoppingLayout>
      </ClientLayout>
    ),
  },
  {
    path: '/summary-order',
    element: (
      <ClientLayout>
        <ShoppingLayout>
          <SummaryOrder />
        </ShoppingLayout>
      </ClientLayout>
    ),
  },
  {
    path: '/payment',
    element: (
      <ClientLayout>
        <ShoppingLayout>
          <Payment />
        </ShoppingLayout>
      </ClientLayout>
    ),
  },
];

function App() {
  const routes = useRoutes(routerConfig);
  return <main>{routes}</main>;
}

export default App;
