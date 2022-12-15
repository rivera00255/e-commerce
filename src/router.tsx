import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Main from './pages';
import Cart from './pages/cart';
import ProductDetail from './pages/product/[id]';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Main /> },
      { path: '/product/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
    ],
  },
]);

export default router;
