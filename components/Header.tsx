
import React from 'react';
import { ViewState } from '../types';
import { ShoppingBag, User, PlusCircle, Download } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  cartCount: number;
  onInstallApp?: () => void;
  canInstall?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onChangeView, cartCount, onInstallApp, canInstall }) => {
  return (
    <nav className="hidden md:flex sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 justify-between items-center transition-all">
      {/* Logo Component - Comic Style for Brand Identity */}
      <div onClick={() => onChangeView('HOME')}>
        <Logo variant="comic" className="cursor-pointer hover:scale-105 transition-transform scale-75 origin-left" />
      </div>

      {/* Nav Links */}
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => onChangeView('HOME')}
          className={`text-sm font-medium hover:text-primary-600 transition-colors ${currentView === 'HOME' ? 'text-primary-600' : 'text-secondary-600'}`}
        >
          Home
        </button>
        <button 
          onClick={() => onChangeView('SEARCH')}
          className={`text-sm font-medium hover:text-primary-600 transition-colors ${currentView === 'SEARCH' ? 'text-primary-600' : 'text-secondary-600'}`}
        >
          Search
        </button>
         <button 
          onClick={() => onChangeView('PROFILE')}
          className={`text-sm font-medium hover:text-primary-600 transition-colors ${currentView === 'PROFILE' ? 'text-primary-600' : 'text-secondary-600'}`}
        >
          Orders
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {canInstall && (
          <button 
            onClick={onInstallApp}
            className="flex items-center px-4 py-2 bg-secondary-900 text-white rounded-full text-sm font-medium hover:bg-black transition-all shadow-md mr-2"
          >
            <Download size={16} className="mr-2" /> Download App
          </button>
        )}

        <button 
          onClick={() => onChangeView('SELL')}
          className="flex items-center px-4 py-2 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
        >
          <PlusCircle size={16} className="mr-2" /> Sell Wig
        </button>

        <div className="h-6 w-px bg-gray-200 mx-2"></div>

        <button 
          onClick={() => onChangeView('CART')}
          className="relative p-2 text-secondary-600 hover:text-primary-500 transition-colors"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-primary-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => onChangeView('PROFILE')}
          className="p-2 text-secondary-600 hover:text-primary-500 transition-colors"
        >
          <User size={20} />
        </button>
      </div>
    </nav>
  );
};
