// File: components/HomePage.jsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import Image from 'next/image';
import { CardCarousel } from '@/components/ui/card-carousel';

import ImageCursorTrail from '@/components/ui/image-cursortrail';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

export default function Home() {
const images2 = [
  "https://images.unsplash.com/photo-1621135177072-57c9b6242e7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9ybmluZyUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670333242751-0c517a2ce0d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9ybmluZyUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
  "https://images.unsplash.com/photo-1724080419322-477a3fa697d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1vcm5pbmclMjBjb2ZmZWV8ZW58MHx8MHx8fDA%3D",
  "https://media.istockphoto.com/id/493685876/photo/hot-coffee-from-a-french-press.webp?a=1&b=1&s=612x612&w=0&k=20&c=GW45v5TB7az0mQ8v3steBoIKK8Fyy556hRn6K2rXss0=",
  "https://media.istockphoto.com/id/1137365972/photo/close-up-of-steaming-cup-of-coffee-or-tea-on-vintage-table-early-morning-breakfast-on-rustic.webp?a=1&b=1&s=612x612&w=0&k=20&c=Hxt9SnqeSABEWGSdYfO1pPNUWFULuTLhlRDGiUqC1nY=",
  "https://media.istockphoto.com/id/1199467344/photo/cup-of-coffee-with-heart-shape-smoke-and-coffee-beans-on-burlap-sack-on-old-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=AxDV2sk2BqGlqlsjRgaEe6O1kBOn3qiFckgGuWKk3l0=",
  "https://plus.unsplash.com/premium_photo-1739142431087-f8768ff66b57?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2FuZHdpc2h8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1700677185785-344e8ccdb99a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNhbmR3aXNofGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1730312382531-b3bbc0a46cda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNhbmR3aXNofGVufDB8fDB8fHww",
  "https://media.istockphoto.com/id/1250442490/photo/cheese-sandwich.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ev4nzBzyYMTXWU5gMPypNz9YSljzIWwf9FDZG9PhDuA=",
  "https://images.unsplash.com/photo-1626372105962-be7b737697d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2FuZHdpc2h8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1673188979255-e08a5791d193?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHNhbmR3aXNofGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fHNhbmR3aXNofGVufDB8fDB8fHww"
]


  const images = [
    { src: '/images/cup1.jpg', alt: 'Cup 1' },
  
   
    { src: '/images/cup4.jpg', alt: 'Cup 4' },
    { src: '/images/cup5.jpg', alt: 'Cup 5' },
    { src: '/images/cup6.jpg', alt: 'Cup 6' },
    { src: '/images/cup7.jpg', alt: 'Cup 7' },
    { src: '/images/cup8.jpg', alt: 'Cup 8' },
    { src: '/images/cup9.jpg', alt: 'Cup 9' },
    { src: '/images/cup10.jpg', alt: 'Cup 10' },
    { src: '/images/cup11.jpg', alt: 'Cup 11' },
    { src: '/images/cup12.jpg', alt: 'Cup 12' },
  ];

  const [featuredProducts] = useState([
    {
      id: 1,
      name: 'Artisan Ceramic Mug',
      price: '$24.99',
      image: '/images/cup1.jpg',
      description: 'Handcrafted with care for your daily brew'
    },
    {
      id: 2,
      name: 'Double Wall Glass Cup',
      price: '$19.99',
      image: '/images/cup6.jpg',
      description: 'Keeps your drink at the perfect temperature'
    },
    {
      id: 3,
      name: 'Limited Edition Collector Mug',
      price: '$39.99',
      image: '/images/cup5.jpg',
      description: 'A special edition for true coffee enthusiasts'
    },
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white pt-16 ">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden " style={{
        backgroundImage: `url('/images/cup12.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/20 to-amber-900/10 z-10" />
        
        <motion.div 
          className="relative z-20 text-center px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Your Perfect <span className="text-amber-700">Brew</span>
          </h1>
          <p className="text-xl md:text-2xl text-white mb-10 max-w-2xl mx-auto">
            Explore our collection of premium cups and mugs designed for coffee enthusiasts
          </p>
      
        </motion.div>

        {/* Cup Carousel */}
       
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 ">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">Featured Collection</h2>
          <p className="text-lg text-emerald-700 max-w-2xl mx-auto">
            Handpicked selections for the discerning coffee lover
          </p>
        </motion.div>
         <div className="w-full py-10 bg-pink-200 rounded-4xl overflow-hidden ">
          <CardCarousel 
            images={images} 
            autoplayDelay={500} 
            showPagination={false} 
            showNavigation={false} 
          
          />
        </div>
        <div className='w-full py-5 mb-5 bg-green-200 rounded-4xl h-150 overflow-hidden'>
             <ImageCursorTrail
        items={images2}
        maxNumberOfImages={5}
        distance={25}
        imgClass="sm:w-40 w-50 sm:h-60 h-60 "
        className="  rounded-3xl "
        >
          
    </ImageCursorTrail>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredProducts.map((product, index) => (
            <motion.div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-64 relative bg-amber-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  New
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-emerald-900 mb-2">{product.name}</h3>
                <p className="text-emerald-700 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-amber-700">{product.price}</span>
                  <motion.button 
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-full transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl font-bold mb-6">Craftsmanship in Every Sip</h2>
            <p className="text-lg mb-6">
              Each cup in our collection is meticulously designed to enhance your coffee experience. 
              From the ergonomic handle to the perfect lip fit, we&lsquo;ve considered every detail.
            </p>
            <p className="text-lg mb-8">
              Our artisans combine traditional techniques with modern aesthetics to create pieces 
              that are both functional and beautiful.
            </p>
            <motion.button 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Story
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="relative h-96"
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Image
              src="/images/cup2.jpg"
              alt="Artisan at work"
              fill
              className="object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-100 to-amber-50">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-emerald-900 mb-4">Join the Brew Club</h2>
            <p className="text-lg text-emerald-700 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals, and brewing tips
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-full border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <motion.button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}