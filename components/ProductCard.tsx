import React from 'react';
import { Wig, WigCondition } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  wig: Wig;
  onClick: (wig: Wig) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ wig, onClick }) => {
  return (
    <div 
      onClick={() => onClick(wig)}
      className="group bg-white rounded-2xl p-2 pb-4 shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100"
    >
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-3 bg-gray-100">
        <img 
          src={wig.images[0]} 
          alt={wig.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <button className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full text-secondary-400 hover:text-primary-500 transition-colors shadow-sm opacity-100 md:opacity-0 md:group-hover:opacity-100">
          <Heart size={16} fill={wig.likes > 50 ? "currentColor" : "none"} />
        </button>
        {wig.condition === WigCondition.LIKE_NEW && (
           <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">LIKE NEW</span>
        )}
      </div>
      <div className="px-1">
        <h3 className="font-medium text-secondary-900 line-clamp-2 text-sm leading-tight h-9 mb-2 group-hover:text-primary-600 transition-colors">
          {wig.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg text-primary-600">{wig.price} EGP</span>
          {wig.originalPrice && (
            <span className="text-xs text-gray-400 line-through">{wig.originalPrice} EGP</span>
          )}
        </div>
        <div className="flex items-center mt-2 text-[10px] text-secondary-500 space-x-2">
           <span className="bg-gray-100 px-1.5 py-0.5 rounded">{wig.length}</span>
           <span className="bg-gray-100 px-1.5 py-0.5 rounded line-clamp-1">{wig.texture}</span>
        </div>
      </div>
    </div>
  );
};