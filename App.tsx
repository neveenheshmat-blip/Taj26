
import React, { useState, useEffect } from 'react';
import { ViewState, Wig } from './types';
import { MOCK_WIGS } from './constants';
import { BottomNav } from './components/BottomNav';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Sell } from './pages/Sell';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';
import { Search, ArrowUpDown } from 'lucide-react';
import { ProductCard } from './components/ProductCard';

type SortOption = 'newest' | 'price_low' | 'price_high';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedWig, setSelectedWig] = useState<Wig | null>(null);
  const [cart, setCart] = useState<Wig[]>([]);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSortBy, setSearchSortBy] = useState<SortOption>('newest');

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
      });
    }
  };

  // Simple Router
  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleProductClick = (wig: Wig) => {
    setSelectedWig(wig);
    navigateTo('PRODUCT_DETAILS');
  };

  const handleAddToCart = (wig: Wig) => {
    setCart([...cart, wig]);
    // Optional: Show toast
    navigateTo('CART');
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setTimeout(() => {
        navigateTo('HOME');
    }, 500);
  };

  const getSearchResults = () => {
    return MOCK_WIGS.filter(w => 
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.color.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => {
      if (searchSortBy === 'price_low') return a.price - b.price;
      if (searchSortBy === 'price_high') return b.price - a.price;
      return b.createdAt - a.createdAt;
    });
  };

  const renderView = () => {
    switch (currentView) {
      case 'HOME':
        return <Home onProductClick={handleProductClick} onInstallApp={handleInstallClick} canInstall={!!deferredPrompt} />;
      case 'SEARCH':
        const searchResults = getSearchResults();
        return (
            <div className="pt-8 px-6 max-w-6xl mx-auto w-full min-h-screen">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-display font-bold">Search</h1>
                </div>
                
                <div className="relative mb-6">
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for wigs, brands, or styles..." 
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-primary-500 shadow-sm transition-all"
                        autoFocus
                    />
                    <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                </div>

                <div className="flex justify-between items-center mb-4">
                   <p className="text-sm text-secondary-500 font-medium">
                     {searchQuery ? `${searchResults.length} results found` : 'Popular items'}
                   </p>
                   
                   <div className="relative">
                      <select 
                        value={searchSortBy}
                        onChange={(e) => setSearchSortBy(e.target.value as SortOption)}
                        className="appearance-none bg-white border border-gray-200 text-secondary-600 text-xs md:text-sm rounded-full pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-500 cursor-pointer"
                      >
                        <option value="newest">Newest</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
                      </select>
                      <ArrowUpDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {searchQuery === '' && (
                  <div className="mb-8 text-center text-gray-400 text-sm p-8 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
                    <p>Try searching for "Short", "Blonde", or "Wavy"</p>
                  </div>
                )}

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 pb-24">
                    {searchResults.map(wig => (
                       <ProductCard key={wig.id} wig={wig} onClick={handleProductClick} />
                    ))}
                  </div>
                ) : (
                  searchQuery !== '' && (
                    <div className="text-center py-12">
                      <p className="text-secondary-500">No matches found for "{searchQuery}"</p>
                    </div>
                  )
                )}
            </div>
        );
      case 'SELL':
        return <Sell onSuccess={() => navigateTo('PROFILE')} />;
      case 'PRODUCT_DETAILS':
        if (!selectedWig) return <Home onProductClick={handleProductClick} />;
        return <ProductDetails wig={selectedWig} onBack={() => navigateTo('HOME')} onAddToCart={handleAddToCart} />;
      case 'CART':
        return <Cart cart={cart} onRemove={handleRemoveFromCart} onBack={() => navigateTo('HOME')} onCheckout={handleCheckoutSuccess} />;
      case 'PROFILE':
        return <Profile />;
      default:
        return <Home onProductClick={handleProductClick} />;
    }
  };

  const showBottomNav = currentView !== 'PRODUCT_DETAILS' && currentView !== 'CART';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-secondary-900">
      <Header 
        currentView={currentView} 
        onChangeView={navigateTo} 
        cartCount={cart.length} 
        onInstallApp={handleInstallClick}
        canInstall={!!deferredPrompt}
      />
      
      <main className="flex-1 w-full max-w-7xl mx-auto shadow-none md:shadow-xl bg-white md:my-6 md:rounded-3xl overflow-hidden min-h-[calc(100vh-100px)]">
        {renderView()}
      </main>

      {showBottomNav && (
        <BottomNav 
          currentView={currentView} 
          onChangeView={navigateTo} 
          cartCount={cart.length} 
        />
      )}
    </div>
  );
};

export default App;
