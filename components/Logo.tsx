
import React from 'react';

interface LogoProps {
  variant?: 'comic' | 'elegant' | 'urban';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'comic', className = '' }) => {
  
  if (variant === 'elegant') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {/* Abstract Line Art Face/Hair */}
        <div className="relative w-10 h-10 border border-secondary-900 rounded-full flex items-center justify-center overflow-hidden bg-primary-50">
           <svg viewBox="0 0 100 100" className="w-full h-full p-2 text-secondary-900 fill-none stroke-current stroke-[3]">
             <path d="M30,30 Q50,10 70,30 T80,70" />
             <path d="M30,30 Q10,50 30,80" />
             <path d="M50,80 Q70,80 80,70" />
           </svg>
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-2xl tracking-widest text-secondary-900 leading-none">TAJ</span>
          <span className="text-[8px] uppercase tracking-[0.2em] text-secondary-500">Human Hair Crown</span>
        </div>
      </div>
    );
  }

  if (variant === 'urban') {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="bg-black text-white font-bold px-3 py-1 text-xl tracking-tighter skew-x-[-10deg]">
          TAJ
        </div>
        <div className="h-8 w-8 ml-1 border-2 border-black rounded-full flex items-center justify-center">
           <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Default: Comic / Feminist Pop-Art
  return (
    <div className={`cursor-pointer flex items-center group relative pl-2 ${className}`}>
        {/* Yellow Burst Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-yellow-300 z-0 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-xl"></div>
        
        {/* Letter T */}
        <span className="font-comic text-5xl text-primary-500 tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform z-10 -rotate-3 inline-block">
            T
        </span>
        
        {/* Letter A with Crown */}
        <div className="relative inline-block z-10 mx-0.5 group">
             {/* Crown Icon */}
             <div className="absolute -top-5 left-1/2 -translate-x-1/2 -rotate-12 animate-bounce">
                <svg width="24" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" className="text-yellow-400 fill-current drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                   <path d="M2 18h20v-2l-3-10-4 7-3-5-3 5-4-7-3 10v2z" strokeLinejoin="round"/>
                </svg>
             </div>
            <span className="font-comic text-5xl text-primary-500 tracking-tighter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform inline-block rotate-2">
                A
            </span>
        </div>

        {/* Letter J / Hair Curl */}
        <div className="relative h-12 w-10 -ml-1 mt-1 rotate-2 z-10">
             <svg viewBox="0 0 80 140" className="w-full h-full drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:scale-110 transition-transform origin-top">
                {/* Thick Comic Outline/Base */}
                <path d="M20,10 L50,10 C50,10 50,60 50,80 C50,110 20,120 10,100 C0,80 30,80 30,80" 
                      fill="none" 
                      stroke="#f43f5e" 
                      strokeWidth="28" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                />
                {/* Inner Highlight */}
                <path d="M20,10 L50,10 C50,10 50,60 50,80 C50,110 20,120 10,100" 
                      fill="none" 
                      stroke="#fb7185" 
                      strokeWidth="10" 
                      strokeLinecap="round"
                />
             </svg>
        </div>
    </div>
  );
};
