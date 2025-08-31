import React, { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './wagmi';
import { AuthProvider } from './contexts/AuthContext';
import WalletConnect from './components/auth/WalletConnect';
import EventsGrid from './components/events/EventsGrid';
import { mockEvents } from './data/mockData';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

function App() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const handleViewEvent = (eventId: string) => {
    setSelectedEventId(eventId);
    console.log('Viewing event:', eventId);
    // In a real app, this would navigate to the event details page
  };

  const handlePurchaseTicket = (eventId: string) => {
    console.log('Purchasing ticket for event:', eventId);
    // In a real app, this would open the ticket purchase flow
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              {/* Enhanced Header */}
              <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                          Y
                        </div>
                        <div className="ml-3">
                          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-purple-800">
                            Yama
                          </div>
                          <div className="text-xs text-gray-500 -mt-1">Event Ecosystem</div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                      <a href="#" className="text-gray-900 hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 border-purple-600">
                        Discover
                      </a>
                      <a href="#" className="text-gray-500 hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-colors">
                        Create Event
                      </a>
                      <a href="#" className="text-gray-500 hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-colors">
                        My Events
                      </a>
                      <a href="#" className="text-gray-500 hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-colors">
                        Rewards
                      </a>
                      <a href="#" className="text-gray-500 hover:text-purple-600 px-3 py-2 text-sm font-medium border-b-2 border-transparent hover:border-purple-300 transition-colors">
                        Support
                      </a>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center space-x-4">
                      <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5l-5-5h5z" />
                        </svg>
                      </button>
                      <WalletConnect />
                    </div>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Hero Section */}
                <div className="text-center mb-8 sm:mb-12">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                    Discover Amazing Events
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                    Join the world's first Web3 event ecosystem where every interaction is valuable, 
                    every memory is owned, and every connection is meaningful.
                  </p>
                </div>
              </section>

              {/* Main Content */}
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <EventsGrid
                  events={mockEvents}
                  onViewEvent={handleViewEvent}
                  onPurchaseTicket={handlePurchaseTicket}
                />
              </main>

              {/* Enhanced Footer */}
              <footer className="bg-gray-900 text-white mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="md:col-span-1">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white font-bold">
                          Y
                        </div>
                        <span className="ml-2 text-xl font-bold">Yama</span>
                      </div>
                      <p className="text-gray-400 mb-4">
                        Building the future of events on Web3. Every interaction is valuable, every memory is owned.
                      </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                      <h3 className="font-semibold mb-4">Platform</h3>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Discover Events</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Create Event</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">NFT Tickets</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Rewards Program</a></li>
                      </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                      <h3 className="font-semibold mb-4">Support</h3>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Community</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Bug Reports</a></li>
                      </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                      <h3 className="font-semibold mb-4">Legal</h3>
                      <ul className="space-y-2 text-gray-400">
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Policy</a></li>
                        <li><a href="#" className="hover:text-purple-400 transition-colors">GDPR</a></li>
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                      &copy; 2024 Yama. All rights reserved. Building the future of events on Web3.
                    </p>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <span className="text-gray-400 text-sm">Powered by</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400 font-semibold">Ethereum</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-purple-400 font-semibold">IPFS</span>
                      </div>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
