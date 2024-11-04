import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './assets/components/Header';
import ProductList from './assets/components/ProductList';
import './App.css';
import './assets/i18n/i18n.ts';

function App() {
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu search query

  return (
    <BrowserRouter>
      <div>
        <header>
          <Header setSearchQuery={setSearchQuery} /> {/* Truyền setSearchQuery vào Header */}
        </header>
        <main>
          <ProductList searchQuery={searchQuery} /> {/* Truyền searchQuery vào ProductList */}
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
