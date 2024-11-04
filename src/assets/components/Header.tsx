import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="h-full w-auto bg-[url('../images/banner.png')] p-10 pb-16 text-center bg-cover mb-12">
      <div className="flex flex-row items-center gap-5">
        <div
          onClick={() => changeLanguage('vi')}
          className={`flex items-center gap-1 cursor-pointer ${
            i18n.language === 'vi' ? 'text-green-500' : 'hover:text-green-500'
          }`}
        >
          <img src="/vn.png" alt="Vietnam Flag" className="w-5 h-5" />
          <span className="hover:text-green-500">VI</span>
        </div>
        <div
          onClick={() => changeLanguage('en')}
          className={`flex items-center gap-1 cursor-pointer ${
            i18n.language === 'en' ? 'text-green-500' : 'hover:text-green-500'
          }`}
        >
          <img src="/uk.png" alt="English Flag" className="w-5 h-5" />
          <span className="hover:text-green-500">EN</span>
        </div>
      </div>
      <img src="/Algolia-logo-white.svg" alt="...." className="w-32 h-32 items-center m-auto" />
      <h1 className="text-white text-4xl font-bold mb-10">{t('title')}</h1>
      <div className="m-auto my-8 items-center w-3/5">
        <div className="flex justify-normal items-center bg-white rounded-lg">
          <div className="m-0 p-6 pe-0 w-auto h-full">
            <img src="/search.svg" alt="..." />
          </div>
          <input
            type="text"
            onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật search query
            className="w-full max-w-2xl mx-0 h-16 px-8 text-sm rounded-lg focus:outline-none"
            placeholder={t('placeholder')}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
