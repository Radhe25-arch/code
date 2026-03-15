import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Backpack, Shield, Zap, Sparkles, ShoppingBag, 
  Trash2, ShieldCheck, Flame, Star, Hammer
} from 'lucide-react';
import DashboardShell from '../components/DashboardShell';
import api from '../api/axios';

const InventoryPage = () => {
  const [inventory, setInventory] = useState([]);
  const [shopItems, setShopItems] = useState([]);
  const [activeTab, setActiveTab] = useState('inventory');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [invRes, shopRes] = await Promise.all([
          api.get('/inventory/inventory'),
          api.get('/inventory/shop')
        ]);
        setInventory(invRes.data);
        setShopItems(shopRes.data);
      } catch (error) {
        console.error('Failed to fetch items', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEquip = async (itemId) => {
    try {
      await api.post(`/inventory/equip/${itemId}`);
      // Refresh inventory
      const res = await api.get('/inventory/inventory');
      setInventory(res.data);
    } catch (error) {
       console.error('Equip failed', error);
    }
  };

  const rarities = {
    COMMON: 'text-gray-400 border-gray-400/20',
    RARE: 'text-blue-400 border-blue-400/20',
    EPIC: 'text-purple-400 border-purple-400/20',
    LEGENDARY: 'text-yellow-500 border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.3)]',
  };

  return (
    <DashboardShell>
      <div className="max-w-6xl mx-auto pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Warrior <span className="text-primary">Stash</span></h1>
            <p className="text-gray-400 font-medium italic">Equip legendary gear to boost your learning potential.</p>
          </div>
          
          <div className="flex bg-[#1a0b2e] p-1.5 rounded-2xl border border-white/5">
             <button 
               onClick={() => setActiveTab('inventory')}
               className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'inventory' ? 'bg-primary text-white' : 'text-gray-500'}`}
             >
               <Backpack className="w-4 h-4" /> Inventory
             </button>
             <button 
               onClick={() => setActiveTab('shop')}
               className={`px-8 py-2.5 rounded-xl text-sm font-black transition-all flex items-center gap-2 ${activeTab === 'shop' ? 'bg-primary text-white' : 'text-gray-500'}`}
             >
               <ShoppingBag className="w-4 h-4" /> Market
             </button>
          </div>
        </div>

        {loading ? (
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[1,2,3,4,5].map(i => <div key={i} className="h-64 bg-[#1a0b2e] rounded-3xl animate-pulse border border-white/5"></div>)}
           </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {activeTab === 'inventory' && inventory.length === 0 && (
               <div className="col-span-full py-20 text-center bg-[#1a0b2e] rounded-3xl border border-dashed border-white/10">
                  <Shield className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 italic">No artifacts found. Complete quests to earn loot!</p>
               </div>
            )}

            {(activeTab === 'inventory' ? inventory : shopItems).map((invItem, i) => {
              const item = activeTab === 'inventory' ? invItem.item : invItem;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  className={`bg-[#1a0b2e] p-6 rounded-3xl border flex flex-col items-center text-center group cursor-pointer transition-all ${rarities[item.rarity]}`}
                >
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-black/40 rounded-2xl flex items-center justify-center text-4xl border border-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all">
                       {item.icon}
                    </div>
                    {activeTab === 'inventory' && invItem.isEquipped && (
                       <div className="absolute -top-2 -right-2 bg-accent text-black p-1 rounded-lg border-2 border-[#1a0b2e]">
                          <ShieldCheck className="w-4 h-4" />
                       </div>
                    )}
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-widest mb-1 opacity-50">{item.rarity}</div>
                  <h4 className="text-sm font-bold text-white mb-2 line-clamp-1">{item.name}</h4>
                  <p className="text-[10px] text-gray-500 mb-6 italic leading-relaxed line-clamp-2 h-8">{item.description}</p>
                  
                  <div className="bg-black/40 w-full p-2 rounded-xl border border-white/5 flex items-center justify-center gap-2 mb-6">
                     <Zap className="w-3 h-3 text-primary fill-primary" />
                     <span className="text-[10px] font-black text-primary uppercase">+{Math.round((item.buffValue - 1) * 100)}% Boost</span>
                  </div>

                  {activeTab === 'inventory' ? (
                    <button 
                      onClick={() => handleEquip(item.id)}
                      className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        invItem.isEquipped 
                          ? 'bg-accent/10 text-accent border border-accent/20' 
                          : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {invItem.isEquipped ? 'Equipped' : 'Equip'}
                    </button>
                  ) : (
                    <button className="w-full bg-primary py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 shadow-lg shadow-primary/20">
                       Buy Item
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="mt-20 grid md:grid-cols-2 gap-8">
           <div className="bg-gradient-to-br from-[#1a0b2e] to-black p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black italic mb-4 uppercase flex items-center gap-2">
                    <Hammer className="w-6 h-6 text-primary" /> Artifact Forge
                 </h3>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">Combine lower-tier items to forge higher-tier legendary artifacts with massive passive bonuses.</p>
                 <button className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 grayscale cursor-not-allowed">
                    Coming Soon in v2.0
                 </button>
              </div>
              <Sparkles className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-primary opacity-5 group-hover:rotate-12 transition-transform" />
           </div>

           <div className="bg-gradient-to-br from-[#1a0b2e] to-black p-10 rounded-[40px] border border-white/5 relative overflow-hidden group">
              <div className="relative z-10">
                 <h3 className="text-2xl font-black italic mb-4 uppercase flex items-center gap-2">
                    <Flame className="w-6 h-6 text-accent" /> Streak Freeze
                 </h3>
                 <p className="text-gray-400 text-sm mb-8 leading-relaxed">Forgot to code today? Our Streak Freeze artifacts protect your warrior streak automatically.</p>
                 <div className="flex items-center gap-4">
                    <div className="bg-accent/20 px-4 py-2 rounded-xl text-xs font-black text-accent border border-accent/20">Active: 0 Artifacts</div>
                 </div>
              </div>
              <Shield Check className="absolute right-[-20px] bottom-[-20px] w-48 h-48 text-accent opacity-5 group-hover:-rotate-12 transition-transform" />
           </div>
        </div>
      </div>
    </DashboardShell>
  );
};

export default InventoryPage;
