import React from 'react';
import { Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12 animate-fade-in-up">
      <div className="flex items-center justify-center mb-4">
        <Sparkles className="w-8 h-8 text-neon-blue mr-3" />
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neon-blue to-neon-purple bg-clip-text text-transparent">
          AI Image Generator
        </h1>
        <Sparkles className="w-8 h-8 text-neon-purple ml-3" />
      </div>
      <p className="text-gray-300 text-lg font-light max-w-2xl mx-auto">
        Transform your imagination into stunning visuals with the power of AI. 
        Simply describe what you want to see, and watch as your words become art.
      </p>
    </header>
  );
};

export default Header;