"use client"

import { Navigation } from './nav';
import Main from './main';
import Footer from './footer';
import AsciiAnimation from './animation';

const HomePage = () => {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />
      <Main />
      <Footer />  
      <AsciiAnimation />
    </div>
  );
};

export default HomePage;