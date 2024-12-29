
"use client";

import { useRouter } from 'next/navigation';
import { useUserStore } from '../../store/useUserStore';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { signOut } from 'next-auth/react';

export default function HelloPage() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        router.replace('/login');
      }
    };
    
    checkAuth();
  }, []); 

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      clearUser();
      toast.success('Successfully logged out!');
      router.replace('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="flex items-center"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  wadhah naggui
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.fullName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 px-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user?.fullName?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <span className="text-gray-700 font-medium">
                    {user?.fullName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome, {user?.fullName || 'Guest'}!
            </h1>
            <p className="text-gray-600">
              You're successfully logged in. Feel free to explore our platform!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}