import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { formatAddress } from '../../utils';

const WalletConnect: React.FC = () => {
  const { user, isAuthenticated, isLoading, connect, disconnect, wallet } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
        <span className="text-sm text-gray-600">Connecting...</span>
      </div>
    );
  }

  if (isAuthenticated && user && wallet) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-sm font-medium text-blue-600">
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
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={connect}
      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
