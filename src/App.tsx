import React from 'react';
import logo from './logo.svg';
import Header from './assets/components/Header';
import './App.css';
import ProductList from './assets/components/ProductList';

function App() {
  return (
    <div className="">
      <header>
        <Header />
        <ProductList />
      </header>
    </div>
  );
}

export default App;
