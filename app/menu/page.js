// File: components/ProductPage.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { Star, Heart, ShoppingCart, Search, X } from 'lucide-react';
import { db } from '../firebase.config';
import { getDocs ,collection} from 'firebase/firestore';

// Mock product data (replace with your actual data)


export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('all');
const [products, setproducts] = useState([{
    id: 11,
    title: 'Hazelnut Latte',
    description: 'Rich espresso with steamed milk and hazelnut syrup for a nutty, sweet flavor.',
    price: 4.45,
    image: '/images/products/hazelnut-latte.jpg',
    rating: 4.3,
    featured: false
  }])
  useEffect(()=>{
    const fetchData = async () => {
      const productsCollection = collection(db, "coffee");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setproducts(productList);
    };
    fetchData();
  }, []);
  const filteredProducts = filter === 'featured' 
    ? products.filter(product => product.featured)
    : products;


  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    
    // Show success animation
    const button = document.getElementById(`add-to-cart-${product.id}`);
    if (button) {
      button.classList.add('bg-green-600');
      setTimeout(() => {
        button.classList.remove('bg-green-600');
      }, 500);
    }
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Open quick view modal
  const openQuickView = (product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-20 pb-16">
      {/* Header */}
      <div className="sticky top-16 z-30 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-emerald-800">Our Menu</h1>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-white rounded-full border border-amber-200 p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'all' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-emerald-700'}`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setFilter('featured')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === 'featured' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:text-emerald-700'}`}
                >
                  Featured
                </button>
              </div>
              
              <div className="relative">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-emerald-600 text-white p-2 rounded-full relative"
                >
                  <ShoppingCart size={20} />
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </motion.span>
                  )}
                </motion.button>
                
                {/* Cart dropdown would go here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="h-full w-full bg-amber-100 bg-center bg-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${product.image})` }}
                ></div>
                
                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-rose-100 transition-colors"
                >
                  <Heart 
                    size={18} 
                    className={favorites.includes(product.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} 
                  />
                </button>
                
                {/* Quick View Button */}
                <button
                  onClick={() => openQuickView(product)}
                  className="absolute top-3 left-3 p-2 bg-white/80 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <Search size={18} className="text-gray-600" />
                </button>
                
                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center bg-white/90 px-2 py-1 rounded-full backdrop-blur-sm">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium ml-1">{product.rating}</span>
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-emerald-900 mb-1">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-amber-700">${product.price.toFixed(2)}</span>
                  
                  <motion.button
                    id={`add-to-cart-${product.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-full transition-colors flex items-center"
                  >
                    <ShoppingCart size={16} className="mr-1" />
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && selectedProduct && (
          <Dialog
            open={isQuickViewOpen}
            onClose={() => setIsQuickViewOpen(false)}
            className="relative z-50"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            
            {/* Full-screen container */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mx-auto max-w-4xl bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative">
                  {/* Close button */}
                  <button
                    onClick={() => setIsQuickViewOpen(false)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full backdrop-blur-sm hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Product Image */}
                    <div 
                      className="h-64 md:h-full bg-amber-100 bg-center bg-cover"
                      style={{ backgroundImage: `url(${selectedProduct.image})` }}
                    ></div>
                    
                    {/* Product Details */}
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-amber-200'}`}
                            />
                          ))}
                          <span className="text-xs font-medium ml-1">{selectedProduct.rating}</span>
                        </div>
                        
                        <button
                          onClick={() => toggleFavorite(selectedProduct.id)}
                          className="ml-auto p-2 bg-amber-100 rounded-full hover:bg-rose-100 transition-colors"
                        >
                          <Heart 
                            size={18} 
                            className={favorites.includes(selectedProduct.id) ? 'fill-rose-500 text-rose-500' : 'text-gray-400'} 
                          />
                        </button>
                      </div>
                      
                      <Dialog.Title className="text-2xl font-bold text-emerald-900 mb-2">
                        {selectedProduct.title}
                      </Dialog.Title>
                      
                      <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-2xl font-bold text-amber-700">${selectedProduct.price.toFixed(2)}</span>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addToCart(selectedProduct);
                            setIsQuickViewOpen(false);
                          }}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-full transition-colors flex items-center"
                        >
                          <ShoppingCart size={18} className="mr-2" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Shopping Cart Toast Notification */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg border border-amber-200 p-4 max-w-sm z-40"
          >
            <div className="flex items-center">
              <div className="bg-emerald-100 p-2 rounded-full">
                <ShoppingCart className="text-emerald-600" size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-emerald-900">
                  {cart.reduce((total, item) => total + item.quantity, 0)} items in cart
                </p>
                <p className="text-sm text-gray-600">Total: ${cartTotal.toFixed(2)}</p>
              </div>
              <button className="ml-4 text-emerald-600 font-medium" onClick={()=>alert('order confirm !')}>confirm order</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}