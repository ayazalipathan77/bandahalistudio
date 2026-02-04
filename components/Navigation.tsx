import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Portfolio', id: 'portfolio' },
    { label: 'Collections', id: 'collections' },
    { label: 'Exhibitions', id: 'exhibitions' },
    { label: 'Client Diaries', id: 'client-diaries' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-retro-cream border-b border-retro-black flex items-stretch h-16 md:h-20">
        <div className="container mx-auto flex h-full max-w-none">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center px-4 md:px-12 border-r border-retro-black hover:bg-retro-accent hover:text-white transition-colors duration-0"
          >
            <span className="font-display font-bold text-xl md:text-3xl tracking-tighter uppercase whitespace-nowrap">BANDAH ALI©</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex flex-1 justify-end">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-8 border-l border-retro-black font-mono text-sm uppercase tracking-tight hover:bg-retro-black hover:text-white transition-colors duration-0 flex items-center ${
                  currentPage === item.id ? 'bg-retro-black text-white' : 'text-retro-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-auto px-6 border-l border-retro-black hover:bg-retro-black hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-retro-cream z-40 pt-20 px-6 overflow-y-auto">
          <div className="flex flex-col border-t border-retro-black">
            {navItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="py-6 border-b border-retro-black text-left font-display text-3xl md:text-4xl font-bold uppercase hover:text-retro-accent transition-colors flex justify-between items-center group"
              >
                {item.label}
                <span className="font-mono text-sm opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;