
import React, { useState } from 'react';
import { Wig } from '../types';
import { Button } from '../components/Button';
import { ArrowLeft, Trash2, CheckCircle, Loader, MapPin, Phone, User, Banknote } from 'lucide-react';
import { storeService } from '../services/integration';

interface CartProps {
  cart: Wig[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  onBack: () => void;
}

export const Cart: React.FC<CartProps> = ({ cart, onRemove, onCheckout, onBack }) => {
  const [step, setStep] = useState<'CART' | 'ADDRESS' | 'PROCESSING' | 'CONFIRM'>('CART');
  
  // User Details State
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shipping = 150; // Fixed shipping EGP
  const total = subtotal + shipping;

  const handleProceedToAddress = () => {
    setStep('ADDRESS');
    window.scrollTo(0,0);
  };

  const handleBuyNow = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('PROCESSING');
    
    try {
        // Simulate creating a checkout/account with Shopify/Backend
        await storeService.checkout(cart);
        
        // Simulate sending the WhatsApp message
        // In a real app, the backend sends this. Here we open it to show the demo.
        const message = `Hello 👋 (This is TAJ App Customer Service)

We’ve received your orders. Perfect 👌, your order(s) will be delivered within few days

You're allowed to open the package and try the wig on before receiving it — the courier will wait for you outside while you do so.

once you accept the wig and pay for it, there won’t be any refund or exchange — so make sure you’re 100% happy with your purchase! ❤️

Also, there's a ${shipping} EGP shipping fee, even if the order is refused.`;

        const whatsappUrl = `https://wa.me/${formData.mobile}?text=${encodeURIComponent(message)}`;
        
        // We open this in a new tab to simulate the message being "sent/received"
        // In a real automated system, this happens in the background.
        window.open(whatsappUrl, '_blank');

        setStep('CONFIRM');
        setTimeout(() => {
            onCheckout(); // Clears cart and navigates home
        }, 5000); // Increased timeout so they can read the success screen
    } catch (e) {
        console.error("Checkout error", e);
        setStep('CART');
    }
  };

  if (step === 'PROCESSING') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <Loader className="animate-spin text-primary-500 mb-6" size={40} />
        <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">Processing Order...</h2>
        <p className="text-secondary-500">Creating your account and sending confirmation.</p>
      </div>
    );
  }

  if (step === 'CONFIRM') {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={40} className="text-green-600" />
        </div>
        <h2 className="text-2xl font-display font-bold text-secondary-900 mb-2">Order Received!</h2>
        <p className="text-secondary-500 mb-6">
            We have sent a confirmation message to your WhatsApp ({formData.mobile}).
        </p>
        <div className="bg-gray-50 p-4 rounded-xl text-left text-sm text-gray-600 max-w-sm mx-auto mb-8 border border-gray-100">
            <p className="font-bold mb-2">Note:</p>
            <p>You can try the wig while the courier waits! 🚚</p>
        </div>
        <p className="text-sm text-gray-400">Redirecting to Home...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:max-w-6xl md:mx-auto md:p-8 md:bg-transparent">
       <div className="bg-white p-4 sticky top-0 z-10 shadow-sm flex items-center md:bg-transparent md:shadow-none md:static md:p-0 md:mb-6">
         <button onClick={step === 'ADDRESS' ? () => setStep('CART') : onBack} className="mr-4 text-secondary-600 md:hidden">
            <ArrowLeft />
         </button>
         <h1 className="text-lg md:text-3xl font-display font-bold text-secondary-900">
            {step === 'ADDRESS' ? 'Shipping Details' : `My Cart (${cart.length})`}
         </h1>
       </div>

       {step === 'CART' && (
           <div className="flex-1 p-4 md:p-0 space-y-4 md:space-y-0 md:flex md:gap-8">
             {/* Cart Items Column */}
             <div className="md:w-2/3 space-y-4">
                
                {/* Try Before You Pay Banner */}
                {cart.length > 0 && (
                    <div className="bg-yellow-50 border-2 border-yellow-400 border-dashed p-6 rounded-2xl text-center shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-yellow-200 rounded-full opacity-50 blur-xl"></div>
                        <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary-900 mb-2 relative z-10">
                            TRY Before you PAY
                        </h3>
                        <p className="font-medium text-secondary-600 text-sm md:text-base relative z-10">
                            try while the courier waits, if you love it.. Pay it😉
                        </p>
                    </div>
                )}

                {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-2xl border border-gray-100">
                    <p>Your cart is empty.</p>
                    <Button variant="ghost" onClick={onBack} className="mt-4">Start Shopping</Button>
                </div>
                ) : (
                cart.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl flex items-center space-x-4 shadow-sm border border-gray-100">
                    <img src={item.images[0]} alt={item.title} className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover bg-gray-100" />
                    <div className="flex-1">
                        <h3 className="font-bold text-sm md:text-lg text-secondary-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-secondary-500 mb-1">{item.condition} • {item.length}</p>
                        <p className="font-bold text-primary-600 text-base md:text-lg">{item.price} EGP</p>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                    </button>
                    </div>
                ))
                )}
             </div>

             {/* Summary Column */}
             {cart.length > 0 && (
                <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-t-3xl md:rounded-2xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:shadow-lg md:border border-gray-100 md:sticky md:top-24">
                        <h2 className="font-bold text-secondary-900 mb-4 hidden md:block">Order Summary</h2>
                        <div className="space-y-3 mb-6 text-sm">
                            <div className="flex justify-between text-secondary-600">
                              <span>Subtotal</span>
                              <span>{subtotal.toFixed(2)} EGP</span>
                            </div>
                            <div className="flex justify-between text-secondary-600">
                              <span>Shipping (Standard)</span>
                              <span>{shipping.toFixed(2)} EGP</span>
                            </div>
                            <div className="flex justify-between text-secondary-600">
                              <span>Payment Method</span>
                              <span className="font-bold text-secondary-900">Cash on Delivery</span>
                            </div>
                            
                            <div className="flex justify-between font-bold text-lg text-secondary-900 pt-4 border-t border-gray-100">
                              <span>Total</span>
                              <span>{total.toFixed(2)} EGP</span>
                            </div>
                        </div>
                        <Button onClick={handleProceedToAddress} fullWidth size="lg">
                            Proceed to Checkout
                        </Button>
                        <p className="text-[10px] text-gray-400 text-center mt-3 md:mt-4">
                            Next: Shipping Details
                        </p>
                    </div>
                </div>
             )}
           </div>
       )}

       {step === 'ADDRESS' && (
           <div className="flex-1 p-4 md:p-0 md:flex md:justify-center">
             <form onSubmit={handleBuyNow} className="md:w-1/2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-6">
                
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-full mb-3 text-primary-500">
                        <MapPin size={24} />
                    </div>
                    <h2 className="font-bold text-xl text-secondary-900">Where should we send it?</h2>
                    <p className="text-sm text-gray-500">Enter your details for delivery.</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-secondary-900 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Jane Doe"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-secondary-900 mb-2">Mobile Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                            <input 
                                type="tel"
                                required
                                value={formData.mobile}
                                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                placeholder="01xxxxxxxxx"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">We will send order confirmation to this WhatsApp number.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-secondary-900 mb-2">Address</label>
                        <textarea 
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            placeholder="Street, Building, Apt..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500 h-24 resize-none"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-6">
                     <div className="flex justify-between items-center mb-4">
                         <span className="text-sm text-gray-500">Total to Pay (COD)</span>
                         <span className="text-xl font-bold text-primary-600">{total.toFixed(2)} EGP</span>
                     </div>
                     <Button type="submit" fullWidth size="lg">
                        Buy Now
                     </Button>
                     <p className="text-center text-xs text-gray-400 mt-3">
                         By clicking Buy Now, you agree to our shipping policy.
                     </p>
                </div>

             </form>
           </div>
       )}
    </div>
  );
};
