import React, { useState } from 'react';
import { Tag, Search, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMenuOpen(false); // Close mobile menu if open
    
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={(e) => scrollToSection(e as any, 'top')}>
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-lg text-white">
            <Tag size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-600">
            PromoHunter
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-600 font-medium">
          <a 
            href="#" 
            onClick={(e) => scrollToSection(e, 'top')} 
            className="hover:text-purple-600 transition-colors"
          >
            Главная
          </a>
          <a 
            href="#features" 
            onClick={(e) => scrollToSection(e, 'features')} 
            className="hover:text-purple-600 transition-colors"
          >
            Как это работает
          </a>
          <a 
            href="#popular" 
            onClick={(e) => scrollToSection(e, 'popular')} 
            className="hover:text-purple-600 transition-colors"
          >
            Популярное
          </a>
        </nav>

        <div className="flex items-center gap-4">
          {/* Search Icon (Visual) */}
          <button className="hidden md:block p-2 text-gray-500 hover:text-purple-600 transition-colors">
            <Search size={20} />
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-500 hover:text-purple-600 md:hidden transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col p-4 space-y-4 text-gray-600 font-medium">
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, 'top')} 
              className="block py-2 hover:text-purple-600 hover:bg-gray-50 px-2 rounded-lg transition-colors"
            >
              Главная
            </a>
            <a 
              href="#features" 
              onClick={(e) => scrollToSection(e, 'features')} 
              className="block py-2 hover:text-purple-600 hover:bg-gray-50 px-2 rounded-lg transition-colors"
            >
              Как это работает
            </a>
            <a 
              href="#popular" 
              onClick={(e) => scrollToSection(e, 'popular')} 
              className="block py-2 hover:text-purple-600 hover:bg-gray-50 px-2 rounded-lg transition-colors"
            >
              Популярное
            </a>
          </div>
        </div>
      )}
    </header>
  );
};