import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import GlobalStyle from './style/GlobalStyle';

function App() {
  const element = useRoutes(routes);
  return (
    <>
      <GlobalStyle />
      {element}
    </>
  );
}

export default App;
