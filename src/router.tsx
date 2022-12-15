import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages';
import Cart from './pages/cart';
import ProductListByCategory from './pages/product';
import ProductDetail from './pages/product/[id]';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/products/:categoryId', element: <ProductListByCategory /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);

export default router;
