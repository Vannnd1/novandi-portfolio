import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { NovandiPortfolio } from './components/NovandiPortfolio';

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <NovandiPortfolio />
    </LanguageProvider>
  );
};

export default App;
