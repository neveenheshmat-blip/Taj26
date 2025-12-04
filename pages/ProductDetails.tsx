
import React, { useState } from 'react';
import { Wig } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Share2, ShieldCheck, Truck, Sparkles, Send, Banknote } from 'lucide-react';
import { askStylist } from '../services/geminiService';

interface ProductDetailsProps {
  wig: Wig;
  onBack: () => void;
  onAddToCart: (wig: Wig) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ wig, onBack, onAddToCart }) => {
  const [question, setQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);

  const handleAskStylist = async () => {
    if (!question.trim()) return;
    setIsAsking(true);
    const answer = await askStylist(wig.title, question);
    setAiAnswer(answer);
    setIsAsking(false);
    setQuestion('');
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-0 md:flex md:gap-8 md:p-8">
      {/* Back Button (Desktop) */}
      <button onClick={onBack} className="hidden md:flex items-center absolute top-24 left-8 text-secondary-500 hover:text-primary-600 z-10">
         <ArrowLeft size={20} className="mr-2"/> Back to Shop
      </button>

      {/* Left Column: Image */}
      <div className="md:w-1/2 relative">
        <div className="md:sticky md:top-24">
            <div className="relative h-[50vh] md:h-[600px] bg-gray-100 md:rounded-2xl overflow-hidden shadow-sm">
                <img src={wig.images[0]} alt={wig.title} className="w-full h-full object-cover" />
                
                {/* Mobile Floating Buttons */}
                <div className="absolute top-0 left-0 right-0 p-4 pt-4 flex justify-between items-center bg-gradient-to-b from-black/30 to-transparent md:hidden">
                    <button onClick={onBack} className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30">
                        <ArrowLeft size={24} />
                    </button>
                    <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30">
                        <Share2 size={24} />
                    </button>
                </div>
            </div>
            
            {/* Desktop thumbnails could go here */}
            {wig.images.length > 1 && (
                <div className="hidden md:flex mt-4 space-x-4">
                    {wig.images.map((img, idx) => (
                        <div key={idx} className="w-20 h-20 rounded-lg overflow-hidden border-2 border-transparent hover:border-primary-500 cursor-pointer">
                            <img src={img} className="w-full h-full object-cover" />
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Right Column: Content */}
      <div className="relative -mt-6 bg-white rounded-t-3xl px-6 pt-8 pb-6 md:mt-0 md:rounded-none md:w-1/2 md:p-0 md:pt-10">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl md:text-4xl font-display font-bold text-secondary-900 leading-tight w-3/4">{wig.title}</h1>
          <div className="text-right hidden md:block">
              <button className="p-2 text-secondary-400 hover:text-primary-500 bg-gray-50 rounded-full">
                  <Share2 size={20} />
              </button>
          </div>
        </div>
        
        <div className="mb-6">
            <span className="block text-3xl font-bold text-primary-600 mb-1">{wig.price} EGP</span>
             {wig.originalPrice && <span className="block text-sm text-gray-400 line-through">{wig.originalPrice} EGP</span>}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm text-secondary-500">
          <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">{wig.condition}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">{wig.length}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">{wig.type}</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full border border-gray-200">{wig.texture}</span>
        </div>

        <div className="mb-8">
          <h3 className="font-bold text-secondary-900 mb-2">Description</h3>
          <p className="text-secondary-600 leading-relaxed text-sm md:text-base">
            {wig.description}
          </p>
        </div>

        {/* Desktop Add to Cart */}
        <div className="hidden md:block mb-8">
             <Button onClick={() => onAddToCart(wig)} fullWidth size="lg">
                Add to Cart - {wig.price} EGP
            </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
           <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
             <ShieldCheck className="text-green-600" size={20} />
             <div>
               <p className="font-bold text-xs text-secondary-900">Buyer Protection</p>
               <p className="text-[10px] text-secondary-500">Money back guarantee</p>
             </div>
           </div>
           <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
             <Truck className="text-blue-600" size={20} />
             <div>
               <p className="font-bold text-xs text-secondary-900">Fast Shipping</p>
               <p className="text-[10px] text-secondary-500">Tracked delivery</p>
             </div>
           </div>
           {/* Cash On Delivery Badge */}
           <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl col-span-2 md:col-span-2">
             <div className="p-1.5 bg-yellow-100 rounded-full">
                <Banknote className="text-yellow-600" size={20} />
             </div>
             <div>
               <p className="font-bold text-sm text-secondary-900">Cash on Delivery Available</p>
               <p className="text-xs text-secondary-500">Pay securely when you receive your order</p>
             </div>
           </div>
        </div>

        {/* AI Stylist */}
        <div className="bg-gradient-to-br from-primary-50 to-white border border-primary-100 p-5 rounded-2xl mb-8">
          <div className="flex items-center mb-3">
             <div className="p-2 bg-white rounded-full shadow-sm mr-3">
               <Sparkles size={18} className="text-primary-500" />
             </div>
             <div>
               <h4 className="font-bold text-sm text-secondary-900">Ask TAJ Stylist</h4>
               <p className="text-[10px] text-secondary-500">Powered by AI</p>
             </div>
          </div>
          
          {aiAnswer ? (
            <div className="mb-4 bg-white p-3 rounded-lg text-sm text-secondary-700 shadow-sm animate-fade-in">
              <p>{aiAnswer}</p>
              <button onClick={() => setAiAnswer('')} className="text-xs text-primary-500 mt-2 font-medium">Ask another question</button>
            </div>
          ) : (
            <div className="relative">
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Can I dye this wig?"
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-primary-200 focus:border-primary-500 outline-none text-sm bg-white/80"
              />
              <button 
                onClick={handleAskStylist}
                disabled={isAsking}
                className="absolute right-2 top-2 p-1.5 bg-primary-500 text-white rounded-lg disabled:bg-gray-300"
              >
                <Send size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 pb-safe z-40">
        <Button onClick={() => onAddToCart(wig)} fullWidth size="lg">
          Add to Cart - {wig.price} EGP
        </Button>
      </div>
    </div>
  );
};
