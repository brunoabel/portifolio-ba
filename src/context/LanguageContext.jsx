import React, { createContext, useContext, useState } from 'react';
import rawData from '../data/portfolioData.json';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('PT');

  const toggleLang = () => {
    setLang((prev) => (prev === 'PT' ? 'EN' : 'PT'));
  };

  const currentKey = lang.toLowerCase();
  const currentData = rawData[currentKey] || rawData.pt;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, setLang, data: currentData, ui: currentData.ui }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
