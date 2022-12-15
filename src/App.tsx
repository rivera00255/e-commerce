import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import GlobalStyle from './style/GlobalStyle';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
}

export default App;
