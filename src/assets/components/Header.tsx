import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="h-full w-auto bg-[url('../images/banner.png')] p-10 pb-16 text-center bg-cover">
      <img src="/Algolia-logo-white.svg" alt="...." className="w-32 h-32 items-center m-auto" />
      <h1 className="text-white text-4xl font-bold mb-10">Stop looking for an item — find it.</h1>
      <div className="m-auto my-8 items-center w-3/5">
      <div className="flex justify-normal items-center bg-white rounded-lg">
        <div className="m-0 p-6 pe-0 w-auto h-full">
          <img src="/search.svg" className=""/>
        </div>
        <input
          type="text"
          className="w-full max-w-2xl mx-0 h-16 px-8 text-sm rounded-lg focus:outline-none"
          placeholder="Product, brand, color..."
        />
        </div>
      </div>
    </div>
  );
};

export default Header;

