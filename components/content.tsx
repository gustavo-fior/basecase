"use client"

import { Navigation } from './nav';
import Main from './main';
import Footer from './footer';

const HomePage = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <Main />
      <Footer />  
    </div>
  );
};

export default HomePage;