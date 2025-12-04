import React, { useState } from 'react';
import { MOCK_USER } from '../constants';
import { Order, OrderStatus } from '../types';
import { Package, RefreshCw, DollarSign, Settings, ChevronRight } from 'lucide-react';

const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_123',
    wigId: 'w2',
    buyerId: 'user_1',
    sellerId: 'user_3',
    price: 4500,
    commission: 900,
    status: OrderStatus.SHIPPED,
    date: '2023-10-15',
    wigDetails: { title: 'Cute Bob Cut', images: ['https://picsum.photos/400/500?random=3'] } as any
  },
  {
    id: 'ord_124',
    wigId: 'w5',
    buyerId: 'user_1',
    sellerId: 'user_6',
    price: 12000,
    commission: 2400,
    status: OrderStatus.DELIVERED,
    date: '2023-09-28',
    wigDetails: { title: 'Auburn Loose Wave', images: ['https://picsum.photos/400/500?random=7'] } as any
  }
];

export const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BUYING' | 'SELLING'>('BUYING');
  
  return (
    <div className="pb-24 pt-8 px-6 min-h-screen bg-white md:max-w-4xl md:mx-auto md:bg-transparent md:pt-12">
      {/* Header Profile */}
      <div className="flex items-center space-x-4 mb-8">
        <img src={MOCK_USER.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-primary-50 shadow-md" />
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-secondary-900">{MOCK_USER.name}</h2>
          <div className="flex items-center text-xs text-yellow-500 mt-1">
             ★★★★★ <span className="text-gray-400 ml-1">(12 reviews)</span>
          </div>
        </div>
        <button className="ml-auto p-2 text-gray-400 hover:text-secondary-900 transition-colors bg-white rounded-full border border-gray-100 shadow-sm"><Settings size={20} /></button>
      </div>

      {/* Stats Card */}
      {MOCK_USER.isSeller && (
        <div className="bg-secondary-900 text-white p-6 md:p-8 rounded-2xl mb-8 shadow-lg shadow-secondary-200 relative overflow-hidden">
           <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-secondary-400 text-sm font-medium">Total Earnings</span>
                    <DollarSign size={20} className="text-green-400"/>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold">{MOCK_USER.earnings.toFixed(2)} EGP</h3>
                <p className="text-xs text-secondary-400 mt-2">After 20% commission deduction</p>
           </div>
           {/* Decorative circles */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-800 rounded-full opacity-50"></div>
           <div className="absolute top-10 right-20 w-10 h-10 bg-primary-500 rounded-full opacity-20"></div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-gray-100 mb-6 md:mb-8">
        <button 
          onClick={() => setActiveTab('BUYING')}
          className={`pb-3 pr-6 font-medium text-sm md:text-base transition-colors ${activeTab === 'BUYING' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400 hover:text-secondary-600'}`}
        >
          My Orders
        </button>
        <button 
           onClick={() => setActiveTab('SELLING')}
           className={`pb-3 px-6 font-medium text-sm md:text-base transition-colors ${activeTab === 'SELLING' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-gray-400 hover:text-secondary-600'}`}
        >
          My Listings
        </button>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {activeTab === 'BUYING' ? (
          <>
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="bg-white border border-gray-100 p-4 md:p-6 rounded-xl flex space-x-4 hover:shadow-md transition-shadow">
                 <img src={order.wigDetails.images[0]} className="w-16 h-16 md:w-24 md:h-24 rounded-lg object-cover bg-gray-50" />
                 <div className="flex-1">
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-secondary-900 text-sm md:text-base">{order.wigDetails.title}</h4>
                     <span className={`text-[10px] md:text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                     `}>{order.status}</span>
                   </div>
                   <p className="text-xs text-gray-500 mb-3 md:mb-4">Ordered on {order.date}</p>
                   
                   <div className="flex space-x-2 md:max-w-xs">
                     <button className="flex-1 py-1.5 md:py-2 text-xs border border-gray-200 rounded-lg font-medium text-secondary-600 hover:bg-gray-50 transition-colors">Track Order</button>
                     {order.status === 'Delivered' && (
                       <button className="flex-1 py-1.5 md:py-2 text-xs bg-gray-50 rounded-lg font-medium text-secondary-600 flex items-center justify-center hover:bg-gray-100 transition-colors">
                         <RefreshCw size={12} className="mr-1"/> Return
                       </button>
                     )}
                   </div>
                 </div>
              </div>
            ))}
          </>
        ) : (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-2xl border-dashed">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
               <Package />
            </div>
            <p className="text-secondary-900 font-medium text-lg">No active listings</p>
            <p className="text-sm text-gray-500 mt-1 mb-6">You haven't listed any wigs yet.</p>
            <button className="text-primary-600 font-bold hover:underline">Create your first listing</button>
          </div>
        )}
      </div>
    </div>
  );
};