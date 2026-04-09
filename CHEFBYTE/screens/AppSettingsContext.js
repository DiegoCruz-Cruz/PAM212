import React, { createContext, useState } from 'react';

export const AppSettingsContext = createContext();

export const AppSettingsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => setDarkMode((v) => !v);
  const increaseFontSize = () => setFontSize((s) => Math.min(s + 2, 24));
  const decreaseFontSize = () => setFontSize((s) => Math.max(s - 2, 12));

  return (
    <AppSettingsContext.Provider value={{
      darkMode, fontSize,
      toggleDarkMode, increaseFontSize, decreaseFontSize
    }}>
      {children}
    </AppSettingsContext.Provider>
  );
};
