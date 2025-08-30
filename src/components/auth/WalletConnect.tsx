import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { formatAddress } from '../../utils';

const WalletConnect: React.FC = () => {
  const { user, isAuthenticated, isLoading, connect, disconnect, wallet } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-blue-600"></div>
        <span className="text-xs sm:text-sm text-gray-600">Connecting...</span>
      </div>
    );
  }

  if (isAuthenticated && user && wallet) {
    return (
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xs sm:text-sm font-medium text-blue-600">
              {user.displayName?.charAt(0) || user.username?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user.displayName || user.username}</p>
            <p className="text-xs text-gray-500">{formatAddress(wallet.address)}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={disconnect}
          className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm px-3 sm:px-4 py-2"
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
