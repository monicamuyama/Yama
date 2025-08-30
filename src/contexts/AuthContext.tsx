import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect, useBalance } from 'wagmi';
import { AuthState, User, WalletInfo } from '../types';

interface AuthContextType extends AuthState {
  connect: () => void;
  disconnect: () => void;
  updateUser: (user: Partial<User>) => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  // Mock user data for development - replace with actual API calls
  const mockUser: User = {
    id: '1',
    address: address || '',
    username: 'yamauser',
    displayName: 'Yama User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Event enthusiast and content creator',
    farcasterId: '12345',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  useEffect(() => {
    if (isConnected && address) {
      // In a real app, you'd fetch user data from your API here
      setUser({ ...mockUser, address });
      setIsLoading(false);
    } else {
      setUser(null);
      setIsLoading(false);
    }
  }, [isConnected, address]);

  const handleConnect = () => {
    if (connectors.length > 0) {
      connect({ connector: connectors[0] });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates, updatedAt: new Date() });
    }
  };

  const refreshUser = () => {
    // In a real app, this would refetch user data from the API
    if (user && address) {
      setUser({ ...user, address });
    }
  };

  const walletInfo: WalletInfo | null = address ? {
    address,
    chainId: chainId || 1,
    connector: 'injected',
  } : null;

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && isConnected,
    isLoading: isLoading || isPending,
    wallet: walletInfo,
    connect: handleConnect,
    disconnect: handleDisconnect,
    updateUser,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
