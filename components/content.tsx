"use client"

import { Navigation } from './nav';
import Main from './main';

const HomePage = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <Main />
    </div>
  );
};

export default HomePage;