import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NovandiPortfolio } from './components/NovandiPortfolio';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NovandiPortfolio />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
