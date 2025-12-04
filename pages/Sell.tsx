
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { WigCondition, WigType, WigLength } from '../types';
import { Camera, Sparkles, X, Info, UploadCloud } from 'lucide-react';
import { generateWigDescription } from '../services/geminiService';
import { adminService } from '../services/integration';

interface SellProps {
  onSuccess: () => void;
}

export const Sell: React.FC<SellProps> = ({ onSuccess }) => {
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState<WigType>(WigType.FULL_WIG);
  const [condition, setCondition] = useState<WigCondition>(WigCondition.LIKE_NEW);
  const [length, setLength] = useState<WigLength>('Medium Length');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImages([...images, url]);
    }
  };

  const handleGenerateDescription = async () => {
    setIsGenerating(true);
    const derivedTitle = `${length} ${type}`; 
    const desc = await generateWigDescription(
        derivedTitle, 
        condition, 
        type, 
        length, 
        "Natural", 
        "Soft texture, no smell"
    );
    setDescription(desc);
    setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length < 3) {
      alert("Please upload at least 3 photos to help buyers see your item clearly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        type,
        condition,
        length,
        description,
        price,
        images,
        timestamp: new Date().toISOString()
      };

      // Send to Admin service
      await adminService.submitListing(submissionData);
      
      // Success feedback
      setIsSubmitting(false);
      onSuccess();
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  const commission = Number(price) * 0.20;
  const earnings = Number(price) - commission;

  if (isSubmitting) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
           <UploadCloud size={40} className="text-primary-500" />
        </div>
        <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">Sending to TAJ Team...</h2>
        <p className="text-secondary-500 mb-8 max-w-xs mx-auto">
          We are reviewing your photos and details. You will receive an email once your listing is live on Shopify!
        </p>
      </div>
    );
  }

  return (
    <div className="pb-24 pt-4 px-6 md:py-12 bg-white min-h-screen md:max-w-3xl md:mx-auto md:border-x border-gray-50">
       <div className="mb-8">
           <h1 className="text-2xl md:text-3xl font-display font-bold text-secondary-900 mb-2">Sell Your Wig</h1>
           <p className="text-secondary-500">List your item in seconds and reach thousands of buyers.</p>
       </div>
       
       <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
         {/* Image Upload */}
         <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 border-dashed">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-bold text-secondary-900">Photos & Videos</label>
              <span className={`text-xs ${images.length < 3 ? 'text-red-500 font-medium' : 'text-green-600'}`}>
                {images.length}/3 photos minimum
              </span>
            </div>
            <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
              <label className="flex flex-col items-center justify-center w-28 h-36 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-white hover:border-primary-400 flex-shrink-0 transition-all group">
                <Camera className="text-gray-400 group-hover:text-primary-500 mb-2" />
                <span className="text-xs text-gray-500 group-hover:text-primary-500 font-medium">Add Photo</span>
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
              {images.map((img, idx) => (
                <div key={idx} className="relative w-28 h-36 flex-shrink-0 animate-fade-in group">
                  <img src={img} alt="Upload" className="w-full h-full object-cover rounded-xl shadow-sm" />
                  <button 
                    type="button"
                    onClick={() => setImages(images.filter((_, i) => i !== idx))}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100 hover:bg-red-50 text-secondary-400 hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
         </div>

         {/* Basic Info */}
         <div className="space-y-6">
           
           <div>
             <label className="block text-sm font-bold text-secondary-900 mb-2">Type (Human Hair Only)</label>
             <div className="relative">
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value as WigType)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none appearance-none focus:border-primary-500 transition-all hover:border-gray-300"
                >
                  {Object.values(WigType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                   <span className="text-xs">▼</span>
                </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-secondary-900 mb-2">Condition</label>
                <div className="relative">
                  <select 
                    value={condition}
                    onChange={(e) => setCondition(e.target.value as WigCondition)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none appearance-none focus:border-primary-500 transition-all hover:border-gray-300"
                  >
                    {Object.values(WigCondition).map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                     <span className="text-xs">▼</span>
                  </div>
                </div>
              </div>
              <div>
                 <label className="block text-sm font-bold text-secondary-900 mb-2">Length</label>
                 <div className="relative">
                    <select 
                      value={length}
                      onChange={(e) => setLength(e.target.value as WigLength)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white outline-none appearance-none focus:border-primary-500 transition-all hover:border-gray-300"
                    >
                      <option value="Short">Short</option>
                      <option value="Medium Length">Medium Length</option>
                      <option value="Long">Long</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                       <span className="text-xs">▼</span>
                    </div>
                 </div>
              </div>
           </div>

           <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-secondary-900">Describe your wig</label>
                <button 
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="text-xs flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors bg-primary-50 px-2 py-1 rounded-md"
                >
                  <Sparkles size={14} className="mr-1" />
                  {isGenerating ? 'Writing...' : 'AI Magic Write'}
                </button>
              </div>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your wig freely... (texture, density, styling, reason for selling)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 h-32 resize-none outline-none focus:border-primary-500 transition-all text-sm leading-relaxed hover:border-gray-300"
              />
           </div>

           <div>
             <label className="block text-sm font-bold text-secondary-900 mb-2">Price (EGP)</label>
             <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none text-lg font-medium focus:border-primary-500 transition-all hover:border-gray-300"
                required
             />
             {price && (
               <div className="mt-4 bg-secondary-50 p-5 rounded-xl text-sm border border-secondary-100">
                  <div className="flex justify-between mb-2 text-gray-500">
                    <span>Listing Price</span>
                    <span>{Number(price).toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between mb-2 text-gray-500">
                    <span>TAJ Commission (20%)</span>
                    <span>-{commission.toFixed(2)} EGP</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 font-bold text-secondary-900 text-base">
                    <span>Your Earnings</span>
                    <span className="text-green-600">{earnings.toFixed(2)} EGP</span>
                  </div>
               </div>
             )}
           </div>
         </div>

         <div className="pt-4 pb-8">
           <Button type="submit" fullWidth size="lg" disabled={isSubmitting} className="md:w-auto md:px-12 md:float-right">
             {isSubmitting ? 'Sending...' : 'List Item'}
           </Button>
           <p className="text-center md:text-left text-xs text-gray-400 mt-4 md:mt-6 flex items-center md:clear-both">
             <Info size={12} className="mr-1"/>
             By listing, you agree to our Seller Terms.
           </p>
         </div>
       </form>
    </div>
  );
};
