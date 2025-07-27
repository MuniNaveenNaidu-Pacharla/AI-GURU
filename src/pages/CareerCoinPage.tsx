import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Wallet, 
  Gift, 
  History, 
  ExternalLink, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Users,
  TrendingUp,
  Shield,
  Zap
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCareerCoin } from '../context/CareerCoinContext';
import { useTheme } from '../context/ThemeContext';

const CareerCoinPage: React.FC = () => {
  const { 
    balance, 
    totalEarned, 
    transactions, 
    rewardItems, 
    redeemCoins, 
    connectWallet, 
    isWalletConnected, 
    walletAddress 
  } = useCareerCoin();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'rewards' | 'history' | 'about'>('rewards');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleRedeem = (itemId: string) => {
    const success = redeemCoins(itemId);
    if (success) {
      alert('Reward redeemed successfully!');
    } else {
      alert('Insufficient CareerCoins or item unavailable.');
    }
  };

  const handleConnectWallet = async () => {
    const success = await connectWallet();
    if (success) {
      alert('Wallet connected successfully!');
    } else {
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'course': return <BookOpen size={16} />;
      case 'review': return <Award size={16} />;
      case 'interview': return <MessageSquare size={16} />;
      case 'mentorship': return <Users size={16} />;
      default: return <Gift size={16} />;
    }
  };

  const filteredRewards = selectedCategory === 'all' 
    ? rewardItems 
    : rewardItems.filter(item => item.category === selectedCategory);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-full mr-3">
            <Coins size={32} className="text-white" />
          </div>
          <h1 className={`text-3xl font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Career<span className="text-yellow-500">Coin</span>
          </h1>
        </div>
        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          Blockchain-powered rewards for your career journey
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <div className="flex items-center">
            <Shield size={16} className="text-green-500 mr-1" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Secured by Algorand</span>
          </div>
          <div className="flex items-center">
            <Zap size={16} className="text-blue-500 mr-1" />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>Instant Transactions</span>
          </div>
        </div>
      </motion.div>

      {/* Balance and Wallet Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`${isDarkMode ? 'bg-gray-800' : ''} bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200`}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Coins size={24} className="text-yellow-600 mr-2" />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Current Balance
              </h2>
            </div>
            <div className="text-3xl font-bold text-yellow-600 mb-2">{balance}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>CareerCoins</p>
          </div>
        </Card>

        <Card className={isDarkMode ? 'bg-gray-800' : ''}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <TrendingUp size={24} className="text-green-600 mr-2" />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Total Earned
              </h2>
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">{totalEarned}</div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>All Time</p>
          </div>
        </Card>

        <Card className={isDarkMode ? 'bg-gray-800' : ''}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Wallet size={24} className="text-blue-600 mr-2" />
              <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Wallet Status
              </h2>
            </div>
            {isWalletConnected ? (
              <div>
                <div className="text-sm font-medium text-green-600 mb-2">Connected</div>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} truncate`}>
                  {walletAddress}
                </p>
              </div>
            ) : (
              <div>
                <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-3`}>
                  Not Connected
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleConnectWallet}
                  icon={<Wallet size={16} />}
                >
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* How to Earn Section */}
      <Card className={`${isDarkMode ? 'bg-gray-800' : ''} mb-8`}>
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          How to Earn CareerCoins
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
            <div className="bg-blue-500 p-2 rounded-full mr-3">
              <Award size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Complete Roadmap Steps</h3>
              <p className="text-sm text-gray-600">Earn 50-100 coins per step</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
            <div className="bg-green-500 p-2 rounded-full mr-3">
              <BookOpen size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Attend Learning Sessions</h3>
              <p className="text-sm text-gray-600">Earn 25-75 coins per session</p>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
            <div className="bg-purple-500 p-2 rounded-full mr-3">
              <Users size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Refer Friends</h3>
              <p className="text-sm text-gray-600">Earn 200 coins per referral</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'rewards', label: 'Rewards Store', icon: <Gift size={18} /> },
            { id: 'history', label: 'Transaction History', icon: <History size={18} /> },
            { id: 'about', label: 'About CareerCoin', icon: <Coins size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'rewards' && (
        <div>
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Rewards' },
                { id: 'course', label: 'Courses' },
                { id: 'review', label: 'Reviews' },
                { id: 'interview', label: 'Interviews' },
                { id: 'mentorship', label: 'Mentorship' },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`${isDarkMode ? 'bg-gray-800' : ''} h-full flex flex-col`} hoverEffect>
                  <div className="flex items-center mb-3">
                    <div className="bg-primary-100 p-2 rounded-full mr-3">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-grow">
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                      <div className="flex items-center">
                        <Coins size={16} className="text-yellow-500 mr-1" />
                        <span className="text-yellow-600 font-semibold">{item.cost}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-4 flex-grow`}>
                    {item.description}
                  </p>
                  
                  <Button
                    variant={balance >= item.cost ? 'primary' : 'outline'}
                    size="sm"
                    fullWidth
                    onClick={() => handleRedeem(item.id)}
                    disabled={balance < item.cost}
                  >
                    {balance >= item.cost ? 'Redeem' : 'Insufficient Coins'}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <Card className={isDarkMode ? 'bg-gray-800' : ''}>
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            Transaction History
          </h2>
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${
                      transaction.type === 'earned' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : '-'}
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        {transaction.description}
                      </p>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {transaction.timestamp.toLocaleDateString()} at {transaction.timestamp.toLocaleTimeString()}
                      </p>
                      {transaction.txHash && (
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          TX: {transaction.txHash}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    transaction.type === 'earned' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <History size={48} className={`mx-auto mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                No transactions yet. Start earning CareerCoins by completing roadmap steps!
              </p>
            </div>
          )}
        </Card>
      )}

      {activeTab === 'about' && (
        <div className="space-y-6">
          <Card className={isDarkMode ? 'bg-gray-800' : ''}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              About CareerCoin
            </h2>
            <div className="space-y-4">
              <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                CareerCoin is a blockchain-based reward system built on the Algorand network that motivates 
                and empowers students on their career journey. Every action you take towards your career goals 
                is rewarded with CareerCoins that have real-world value.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">🔒 Secure & Transparent</h3>
                  <p className="text-blue-700 text-sm">
                    Built on Algorand blockchain ensuring security, transparency, and true ownership of your tokens.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">⚡ Fast & Scalable</h3>
                  <p className="text-green-700 text-sm">
                    Instant transactions with minimal fees thanks to Algorand's advanced technology.
                  </p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">🎮 Gamified Learning</h3>
                  <p className="text-purple-700 text-sm">
                    Transform your career development into an engaging, rewarding experience.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">💰 Real Value</h3>
                  <p className="text-orange-700 text-sm">
                    Redeem coins for premium courses, mentorship, and career services.
                  </p>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className={isDarkMode ? 'bg-gray-800' : ''}>
            <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Technical Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Blockchain:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Algorand</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Token Standard:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>ASA (Algorand Standard Asset)</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Transaction Speed:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>~4.5 seconds</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Transaction Fee:</span>
                <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>0.001 ALGO</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <a
                href="https://algorand.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-800"
              >
                Learn more about Algorand <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CareerCoinPage;