import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  timestamp: Date;
  txHash?: string;
}

interface RewardItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'course' | 'review' | 'interview' | 'mentorship';
  available: boolean;
}

interface CareerCoinContextType {
  balance: number;
  totalEarned: number;
  transactions: Transaction[];
  rewardItems: RewardItem[];
  earnCoins: (amount: number, description: string) => void;
  redeemCoins: (itemId: string) => boolean;
  getTransactionHistory: () => Transaction[];
  connectWallet: () => Promise<boolean>;
  isWalletConnected: boolean;
  walletAddress: string | null;
}

const CareerCoinContext = createContext<CareerCoinContextType | undefined>(undefined);

export const CareerCoinProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);
  const [totalEarned, setTotalEarned] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  // Mock reward items (in production, these would come from an API)
  const rewardItems: RewardItem[] = [
    {
      id: '1',
      title: 'Premium Web Development Course',
      description: 'Advanced React and Node.js course with certification',
      cost: 500,
      category: 'course',
      available: true,
    },
    {
      id: '2',
      title: 'Professional Resume Review',
      description: 'Expert review and optimization of your resume',
      cost: 150,
      category: 'review',
      available: true,
    },
    {
      id: '3',
      title: 'Mock Technical Interview',
      description: '1-hour mock interview with industry professional',
      cost: 300,
      category: 'interview',
      available: true,
    },
    {
      id: '4',
      title: '1-on-1 Career Mentorship',
      description: '30-minute session with senior industry mentor',
      cost: 400,
      category: 'mentorship',
      available: true,
    },
    {
      id: '5',
      title: 'Data Science Bootcamp',
      description: 'Comprehensive Python and ML course',
      cost: 750,
      category: 'course',
      available: true,
    },
    {
      id: '6',
      title: 'LinkedIn Profile Optimization',
      description: 'Professional LinkedIn profile makeover',
      cost: 200,
      category: 'review',
      available: true,
    },
  ];

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('careerCoinBalance');
    const savedTotalEarned = localStorage.getItem('careerCoinTotalEarned');
    const savedTransactions = localStorage.getItem('careerCoinTransactions');
    const savedWalletAddress = localStorage.getItem('careerCoinWalletAddress');

    if (savedBalance) setBalance(parseInt(savedBalance));
    if (savedTotalEarned) setTotalEarned(parseInt(savedTotalEarned));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
      setIsWalletConnected(true);
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('careerCoinBalance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('careerCoinTotalEarned', totalEarned.toString());
  }, [totalEarned]);

  useEffect(() => {
    localStorage.setItem('careerCoinTransactions', JSON.stringify(transactions));
  }, [transactions]);

  const connectWallet = async (): Promise<boolean> => {
    try {
      // Simulate Algorand wallet connection
      // In production, this would use AlgoSigner or MyAlgo Connect
      const mockAddress = 'ALGO' + Math.random().toString(36).substring(2, 15).toUpperCase();
      setWalletAddress(mockAddress);
      setIsWalletConnected(true);
      localStorage.setItem('careerCoinWalletAddress', mockAddress);
      return true;
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      return false;
    }
  };

  const earnCoins = (amount: number, description: string) => {
    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      description,
      timestamp: new Date(),
      txHash: 'ALGO' + Math.random().toString(36).substring(2, 15).toUpperCase(),
    };

    setBalance(prev => prev + amount);
    setTotalEarned(prev => prev + amount);
    setTransactions(prev => [transaction, ...prev]);
  };

  const redeemCoins = (itemId: string): boolean => {
    const item = rewardItems.find(r => r.id === itemId);
    if (!item || balance < item.cost) {
      return false;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: 'redeemed',
      amount: item.cost,
      description: `Redeemed: ${item.title}`,
      timestamp: new Date(),
      txHash: 'ALGO' + Math.random().toString(36).substring(2, 15).toUpperCase(),
    };

    setBalance(prev => prev - item.cost);
    setTransactions(prev => [transaction, ...prev]);
    return true;
  };

  const getTransactionHistory = (): Transaction[] => {
    return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  return (
    <CareerCoinContext.Provider
      value={{
        balance,
        totalEarned,
        transactions,
        rewardItems,
        earnCoins,
        redeemCoins,
        getTransactionHistory,
        connectWallet,
        isWalletConnected,
        walletAddress,
      }}
    >
      {children}
    </CareerCoinContext.Provider>
  );
};

export const useCareerCoin = (): CareerCoinContextType => {
  const context = useContext(CareerCoinContext);
  if (context === undefined) {
    throw new Error('useCareerCoin must be used within a CareerCoinProvider');
  }
  return context;
};