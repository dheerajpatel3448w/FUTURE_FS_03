// File: components/Navbar.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipLink from "../ui/text-effect-flipper"
import { Popover } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  // Detect scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock menu data


  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Menu item with mega menu
  const MenuItem = ({ name, children }) => (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 transition-all duration-300 ${
              open 
                ? 'text-emerald-800 bg-emerald-50 shadow-sm' 
                : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
            }`}
          >
            <span>{name}</span>
            <motion.svg
              className="ml-2 h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </motion.svg>
          </Popover.Button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0"
              >
                <div className="overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 ring-opacity-5 border border-white/20">
                  <div className="relative grid gap-6 bg-white/95 backdrop-blur-md px-5 py-6 sm:gap-8 sm:p-8 grid-cols-2">
                    {children}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </Popover>
  );

  return (
    <motion.header
      className="fixed top-0 w-full z-50 "
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(236, 253, 245, 0.95)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(8px)',
        boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-amber-50/30 to-emerald-100/40" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-200/50 to-transparent" />
      
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center group">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full group-hover:bg-emerald-400/30 blur-md transition-all duration-300" />
                <div className='  overflow-hidden w-10 h-10  '>
                     <Image
                          src="/images/logo.png"
                          alt="Artisan at work"
                          fill
                          className="   rounded-2xl shadow-2xl"
                        />
                        </div>
              </motion.div>
              <motion.span 
                className="ml-2 text-xl font-bold text-emerald-800 tracking-tight "
                initial={{ opacity: 1 }}
                
                whileHover={{ color: "#065f46" }}
                transition={{ duration: 0.2 }}
              >
                
                <FlipLink >Starbucks</FlipLink>
              </motion.span>
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
            Home
            </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
              Welcome
            </Link>
            <Link href="/menu" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
              Menu
            </Link>
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
              Login
            </Link>

      
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <motion.button
                className="p-2 rounded-full hover:bg-emerald-50 transition-all duration-300 group relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <motion.svg
                  className="h-6 w-6 text-emerald-700 relative"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  animate={{ rotate: searchOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={searchOpen ? "M6 18L18 6M6 6l12 12" : "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
                  />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="Search menu items..."
                          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white/50"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                      </div>
                    </div>
                    {searchQuery && (
                      <motion.div 
                        className="p-2 text-center text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        Type to see search results...
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button 
                className="p-2 rounded-full hover:bg-emerald-50 transition-all duration-300 group relative"
                aria-label="Cart"
                onClick={() => setCartCount(prev => prev + 1)}
              >
                <div className="absolute inset-0 bg-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
                <svg className="h-6 w-6 text-emerald-700 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-sm"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </motion.div>

            {/* User profile */}
            <motion.button
              className="hidden md:flex items-center justify-center h-9 w-9 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Account"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300 group relative"
              onClick={() => setMobileMenuOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Open menu"
            >
              <div className="absolute inset-0 bg-emerald-400/20 rounded-md opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
              <svg className="h-6 w-6 relative" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className=" lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="fixed inset-0 bg-black/20 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            <motion.div
              className="fixed  rounded-t-3xl bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="relative mx-auto max-w-sm px-4 pt-5 pb-8">
                {/* Close button */}
                <div className="absolute right-4 top-4">
                  <motion.button
                    type="button"
                    className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-all duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Navigation links */}
                <nav className="mt-8">
                  <div className="grid gap-6 px-4">
                          <Link href="/" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
            Home
            </Link>
              <Link href="/about" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
              Welcome
            </Link>
            <Link href="/menu" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:text-emerald-600 hover:bg-emerald-50/50 transition-all duration-300">
              Menu
            </Link>
                  </div>
                </nav>

                {/* Auth buttons for mobile */}
                <div className="mt-8 px-4 flex space-x-3">
                  <motion.a
                    href="/login"
                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-gray-700 rounded-md border border-gray-300 hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </motion.a>
                  <motion.a
                    href="/login"
                    className="flex-1 px-4 py-2 text-sm font-medium text-center text-white rounded-md bg-emerald-600 hover:bg-emerald-700 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Join now
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}