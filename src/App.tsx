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
              {/* Header */}
              <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Yama
                      </div>
                      <span className="ml-2 text-sm text-gray-500 hidden sm:block">Event Ecosystem</span>
                    </div>

                    {/* Navigation - Hidden on mobile, visible on larger screens */}
                    <nav className="hidden md:flex space-x-6 lg:space-x-8">
                      <a href="#" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Discover
                      </a>
                      <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Create Event
                      </a>
                      <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        My Events
                      </a>
                      <a href="#" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                        Rewards
                      </a>
                    </nav>

                    {/* Wallet Connect */}
                    <WalletConnect />
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

                {/* Events Grid */}
                <EventsGrid
                  events={mockEvents}
                  onViewEvent={handleViewEvent}
                  onPurchaseTicket={handlePurchaseTicket}
                />
              </main>

              {/* Footer */}
              <footer className="bg-white border-t border-gray-200 mt-12 sm:mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                  <div className="text-center text-gray-500 text-sm">
                    <p>&copy; 2024 Yama. Building the future of events on Web3.</p>
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
