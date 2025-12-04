
import React, { useState, useRef, useEffect } from 'react';
import { Wig } from '../types';
import { storeService } from '../services/integration';
import { Filter, ChevronLeft, ChevronRight, ArrowUpDown, Download, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { Logo } from '../components/Logo';

interface HomeProps {
  onProductClick: (wig: Wig) => void;
  onInstallApp?: () => void;
  canInstall?: boolean;
}

type LengthCategory = 'all' | 'short' | 'medium' | 'long';
type SortOption = 'newest' | 'price_low' | 'price_high';

export const Home: React.FC<HomeProps> = ({ onProductClick, onInstallApp, canInstall }) => {
  const [activeCategory, setActiveCategory] = useState<LengthCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [wigs, setWigs] = useState<Wig[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await storeService.getAllProducts();
        setWigs(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const filteredWigs = wigs.filter(wig => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'short') return wig.length === 'Short';
    if (activeCategory === 'medium') return wig.length === 'Medium Length';
    if (activeCategory === 'long') return wig.length === 'Long';
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    return b.createdAt - a.createdAt; // newest by default
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.clientWidth * 0.8;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="pb-24 md:pb-12 bg-white min-h-screen font-sans">
      {/* Header / Logo Section */}
      <header className="pt-8 pb-6 px-6 text-center border-b border-gray-50 bg-white overflow-hidden relative">
        {/* Decorative background - Subtle Grid instead of Dots */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffe4e6 1px, transparent 1px), linear-gradient(90deg, #ffe4e6 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        {/* Mobile Logo */}
        <div className="md:hidden mb-4 relative flex items-center justify-center">
            <Logo variant="comic" className="scale-125" />
        </div>
        
        {/* Slogan Update: Bigger, Clear, Catchy, Crowns */}
        <div className="relative z-10 my-8">
            <h1 className="font-black text-3xl md:text-5xl text-secondary-900 leading-snug drop-shadow-sm tracking-wide" dir="rtl">
              <span className="text-primary-500 inline-block transform hover:scale-110 transition-transform duration-300">باروكة</span> تروح 
              <span className="mx-3 inline-block animate-bounce text-4xl align-middle">👑</span>
              و <span className="text-primary-500 inline-block transform hover:scale-110 transition-transform duration-300">باروكة</span> تيجى 
              <span className="mx-3 inline-block animate-bounce text-4xl align-middle" style={{ animationDelay: '0.5s' }}>👑</span>
            </h1>
        </div>

        <h1 className="text-xl md:text-3xl font-display font-bold text-secondary-400 mt-2 relative z-10 opacity-80">
          Find Your Human Hair Crown
        </h1>
      </header>

      {/* Promotions Slider */}
      <div className="py-6 relative group bg-white">
         <div className="px-6 flex justify-between items-center mb-4">
           <div className="flex space-x-2">
             <button onClick={() => scroll('left')} className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-secondary-600 transition-colors">
               <ChevronLeft size={16} />
             </button>
             <button onClick={() => scroll('right')} className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-50 text-secondary-600 transition-colors">
               <ChevronRight size={16} />
             </button>
           </div>
           <h2 className="font-bold text-secondary-900 text-base md:text-lg tracking-wide text-right" dir="rtl">
             باروكتك موجوده هنا…هاتلاقيها😉
           </h2>
         </div>
         
         <div ref={scrollRef} className="flex space-x-4 overflow-x-auto px-6 no-scrollbar snap-x scroll-smooth pb-4">
            
            {/* Slide 1: Occasion/Wedding */}
            <div className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[30%] relative rounded-2xl overflow-hidden aspect-[21/9] shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Wedding Hair" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-center items-end text-right">
                <span className="bg-primary-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 self-end">GLOW UP</span>
                <p className="text-white font-bold text-xl md:text-2xl leading-tight" dir="rtl">
                  عندك فرح او مناسبه و نفسك تشترى باروكة؟
                </p>
              </div>
            </div>

            {/* Slide 2: Damaged Hair/Rest */}
            <div className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[30%] relative rounded-2xl overflow-hidden aspect-[21/9] shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hair Care" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-center items-end text-right">
                <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 self-end">PROTECT</span>
                <p className="text-white font-bold text-xl md:text-2xl leading-tight" dir="rtl">
                  شعرك هلك من الصبغه و الحراره و نفسك تريحيه ؟
                </p>
              </div>
            </div>

            {/* Slide 3: Quality & Trial */}
            <div className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[30%] relative rounded-2xl overflow-hidden aspect-[21/9] shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1595476104010-b44560a5d784?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Quality Wig" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/50 p-6 flex flex-col justify-center items-center text-center">
                <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-1 rounded w-fit mb-2">PREMIUM</span>
                <p className="text-white font-display font-bold text-2xl uppercase">Only Human Hair</p>
                <p className="text-white/90 text-sm mt-1 font-medium">Try before you buy</p>
              </div>
            </div>

            {/* Slide 4: Selling / Curly Look */}
            <div className="snap-center shrink-0 w-[90%] md:w-[45%] lg:w-[30%] relative rounded-2xl overflow-hidden aspect-[21/9] shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
              <img src="https://images.unsplash.com/photo-1605497788044-5a90406410d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Curly Hair" className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent p-6 flex flex-col justify-center items-end text-right">
                <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded w-fit mb-2 self-end">SELL IT</span>
                <p className="text-white font-bold text-xl leading-tight" dir="rtl">
                  بيعى باروكتك لو مش لايقه عليكى
                </p>
                <p className="text-white/80 text-xs mt-1">Get that curly beach look instead!</p>
              </div>
            </div>

         </div>
      </div>

      {/* 3 Big Clickable Photos - WOMEN HAIR ONLY */}
      <div className="px-6 py-4 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
        {/* Short */}
        <button 
          onClick={() => setActiveCategory('short')}
          className={`relative w-full h-48 md:h-64 rounded-2xl overflow-hidden group shadow-lg transition-all transform ${activeCategory === 'short' ? 'ring-4 ring-primary-300 scale-[1.02]' : 'hover:scale-[1.02]'}`}
        >
          <img src="https://images.unsplash.com/photo-1521119989659-a83eee488058?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Short Wig" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
             <h3 className="text-white font-display font-bold text-3xl tracking-wide drop-shadow-md">Short Wigs</h3>
             <span className="text-white/90 text-sm font-medium mt-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
               Chic & Bold
             </span>
          </div>
        </button>

        {/* Medium */}
        <button 
          onClick={() => setActiveCategory('medium')}
          className={`relative w-full h-48 md:h-64 rounded-2xl overflow-hidden group shadow-lg transition-all transform ${activeCategory === 'medium' ? 'ring-4 ring-primary-300 scale-[1.02]' : 'hover:scale-[1.02]'}`}
        >
          <img src="https://images.unsplash.com/photo-1605497788044-5a90406410d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Medium Wig" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
             <h3 className="text-white font-display font-bold text-3xl tracking-wide drop-shadow-md">Medium Length</h3>
             <span className="text-white/90 text-sm font-medium mt-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
               Versatile & Classy
             </span>
          </div>
        </button>

        {/* Long */}
        <button 
          onClick={() => setActiveCategory('long')}
          className={`relative w-full h-48 md:h-64 rounded-2xl overflow-hidden group shadow-lg transition-all transform ${activeCategory === 'long' ? 'ring-4 ring-primary-300 scale-[1.02]' : 'hover:scale-[1.02]'}`}
        >
          <img src="https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Long Wig" />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex flex-col items-center justify-center p-4">
             <h3 className="text-white font-display font-bold text-3xl tracking-wide drop-shadow-md">Long Wigs</h3>
             <span className="text-white/90 text-sm font-medium mt-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
               Glamorous & Flowy
             </span>
          </div>
        </button>
      </div>

      {activeCategory !== 'all' && (
        <div className="px-6 flex justify-center pb-2">
          <button 
            onClick={() => setActiveCategory('all')} 
            className="flex items-center px-4 py-2 bg-secondary-900 text-white rounded-full text-sm font-medium hover:bg-secondary-800 transition-colors shadow-md"
          >
            <Filter size={14} className="mr-2" /> View All Styles
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="px-6 py-6 bg-gray-50 md:bg-white rounded-t-3xl md:rounded-none mt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="font-display font-bold text-secondary-900 text-xl mb-2 md:mb-0">
            {activeCategory === 'all' ? 'Latest Collections' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`}
          </h2>
          
          <div className="flex items-center space-x-2 self-end md:self-auto">
            <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-gray-200 text-secondary-600 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:border-primary-500 shadow-sm cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
                <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        {loading ? (
          /* Loading Skeleton */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
             {[1, 2, 3, 4].map(n => (
               <div key={n} className="bg-white rounded-2xl p-2 pb-4 shadow-sm border border-gray-100">
                  <div className="aspect-[4/5] bg-gray-100 rounded-xl mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/4 animate-pulse"></div>
               </div>
             ))}
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {filteredWigs.map(wig => (
              <ProductCard key={wig.id} wig={wig} onClick={onProductClick} />
            ))}
          </div>
        )}
        
        {!loading && filteredWigs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center mb-4 text-3xl shadow-sm">
               💇‍♀️
            </div>
            <p className="text-secondary-900 font-bold text-lg">No styles found</p>
            <p className="text-secondary-500 text-sm mt-1 mb-4">We couldn't find any {activeCategory} wigs right now.</p>
            <button onClick={() => setActiveCategory('all')} className="text-sm text-primary-600 font-bold hover:underline">
              Clear Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Mobile Install App Banner */}
      {canInstall && showInstallBanner && (
        <div className="md:hidden fixed bottom-20 left-4 right-4 bg-secondary-900 text-white p-4 rounded-xl shadow-2xl flex items-center justify-between z-50 animate-bounce-in">
           <div className="flex items-center">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center mr-3 font-comic text-lg shadow-inner">T</div>
              <div>
                <p className="font-bold text-sm">Download TAJ App</p>
                <p className="text-xs text-secondary-400">Better experience, faster checkout</p>
              </div>
           </div>
           <div className="flex items-center">
             <button 
               onClick={onInstallApp}
               className="bg-white text-secondary-900 px-3 py-1.5 rounded-full text-xs font-bold mr-2"
             >
               Install
             </button>
             <button onClick={() => setShowInstallBanner(false)} className="text-secondary-400">
               <X size={16} />
             </button>
           </div>
        </div>
      )}

    </div>
  );
};
