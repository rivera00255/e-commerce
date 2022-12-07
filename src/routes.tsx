import Main from './pages/Main';
import GlobalStyle from './style/GlobalStyle';

export const routes = [
  {
    path: '/',
    element: <Main />,
    // children: [{ path: '/', element: <Main /> }],
  },
];
