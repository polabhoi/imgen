import React from 'react';
import Header from './components/Header';
import ImageGenerator from './components/ImageGenerator';

function App() {
  return (
    <div className="min-h-screen relative">
      {/* Background lighting effects */}
      <div className="corner-light"></div>
      <div className="corner-light-2"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12">
        <Header />
        <ImageGenerator />
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 text-center py-8 mt-16">
        <p className="text-gray-400 text-sm">
          Powered by Clipdrop AI • Transform your imagination into reality
        </p>
      </footer>
    </div>
  );
}

export default App;