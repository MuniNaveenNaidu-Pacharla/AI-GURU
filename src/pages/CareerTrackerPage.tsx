import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ChevronRight, Star, Clock, BookOpen, Target, Trophy, Coins } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import { useCareerCoin } from '../context/CareerCoinContext';
import { useNavigate } from 'react-router-dom';

const CareerTrackerPage: React.FC = () => {
  const { 
    dreamJob, 
    roadmap, 
    progress, 
    dailyStreak, 
    skills,
    incrementDailyStreak 
  } = useAppContext();
  const { balance, earnCoins } = useCareerCoin();
  const navigate = useNavigate();
  const [showAllSteps, setShowAllSteps] = useState(false);

  // Mock learning history (in a real app, this would come from the backend)
  const learningHistory = [
    { date: '2025-04-15', activity: 'Completed Introduction to Web Development', duration: 45 },
    { date: '2025-04-13', activity: 'Studied JavaScript Fundamentals', duration: 60 },
    { date: '2025-04-10', activity: 'Reviewed HTML & CSS Basics', duration: 30 },
  ];

  // Helper function to get motivational message based on streak
  const getStreakMessage = (streak: number): string => {
    if (streak === 0) return "Start your learning streak today!";
    if (streak === 1) return "Great start! Keep going tomorrow!";
    if (streak < 5) return `You're on a ${streak}-day roll! Keep it up!`;
    if (streak < 10) return `Impressive ${streak}-day streak! You're building momentum!`;
    return `Incredible ${streak}-day streak! You're unstoppable!`;
  };

  // Helper function to determine badge level
  const getBadgeLevel = (progress: number): string => {
    if (progress < 25) return 'Beginner';
    if (progress < 50) return 'Apprentice';
    if (progress < 75) return 'Professional';
    if (progress < 100) return 'Expert';
    return 'Master';
  };

  // Helper function to get color based on progress
  const getBadgeColor = (progress: number): string => {
    if (progress < 25) return 'bg-gray-100 text-gray-800';
    if (progress < 50) return 'bg-primary-100 text-primary-800';
    if (progress < 75) return 'bg-secondary-100 text-secondary-800';
    if (progress < 100) return 'bg-accent-100 text-accent-800';
    return 'bg-success-100 text-success-800';
  };

  // Display check-in button only if not already checked in today
  const hasCheckedInToday = false; // In a real app, this would be determined by the user's activity

  // Calculate total learning time from history
  const totalLearningMinutes = learningHistory.reduce((total, item) => total + item.duration, 0);
  const formatLearningTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const handleCheckIn = () => {
    incrementDailyStreak();
    // CareerCoins are automatically awarded in the incrementDailyStreak function
  };

  const handleAttendLearningSession = () => {
    const coinsEarned = Math.floor(Math.random() * 51) + 25; // 25-75 coins
    earnCoins(coinsEarned, 'Attended learning session');
    alert(`Great! You earned ${coinsEarned} CareerCoins for attending a learning session!`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-3">
          Your Career <span className="text-accent-500">Tracker</span>
        </h1>
        <p className="text-gray-600">
          Monitor your progress, maintain your streak, and celebrate your achievements
        </p>
      </motion.div>

      {/* Progress Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <Trophy size={20} className="mr-2 text-primary-600" />
              {dreamJob ? `${dreamJob} Journey` : 'Career Journey'}
            </h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(progress)}`}>
              {getBadgeLevel(progress)}
            </span>
          </div>
          <ProgressBar value={progress} showValue={true} color="primary" className="mb-4" />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Beginner</span>
            <span>Apprentice</span>
            <span>Professional</span>
            <span>Expert</span>
            <span>Master</span>
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center mb-4">
            <Calendar size={20} className="mr-2 text-accent-500" />
            <h2 className="text-lg font-semibold text-gray-800">Daily Streak</h2>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div 
              className="text-4xl font-bold text-accent-500 mb-2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {dailyStreak}
            </motion.div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              {getStreakMessage(dailyStreak)}
            </p>
            {!hasCheckedInToday && (
              <Button 
                variant="accent" 
                size="sm" 
                onClick={handleCheckIn}
              >
                Check In Today
              </Button>
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <div className="flex items-center mb-4">
            <Coins size={20} className="mr-2 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-800">CareerCoins</h2>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div 
              className="text-4xl font-bold text-yellow-500 mb-2"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {balance}
            </motion.div>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Your blockchain rewards
            </p>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={() => navigate('/careercoin')}
            >
              View Rewards
            </Button>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Roadmap Checklist */}
          <Card>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <Target size={20} className="mr-2 text-primary-600" />
                Roadmap Checklist
              </h2>
              {roadmap && roadmap.steps.length > 3 && (
                <button 
                  className="text-sm text-primary-600 hover:text-primary-800 flex items-center"
                  onClick={() => setShowAllSteps(!showAllSteps)}
                >
                  {showAllSteps ? 'Show Less' : 'Show All'}
                  <ChevronRight size={16} className={`ml-1 transform transition-transform ${showAllSteps ? 'rotate-90' : ''}`} />
                </button>
              )}
            </div>
            
            {roadmap ? (
              <div className="space-y-3">
                {(showAllSteps ? roadmap.steps : roadmap.steps.slice(0, 3)).map((step) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: step.id * 0.1 }}
                    className={`flex items-center p-3 rounded-lg border ${
                      step.completed 
                        ? 'border-success-500 bg-success-50' 
                        : 'border-gray-200 hover:border-primary-300 hover:bg-primary-50'
                    } transition-colors duration-200`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                      step.completed ? 'bg-success-500 text-white' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {step.completed ? (
                        <Award size={16} />
                      ) : (
                        <span className="text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="mr-2">{step.emoji}</span>
                        <h3 className={`font-medium ${step.completed ? 'text-success-700' : 'text-gray-800'}`}>
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    <div className="ml-2">
                      {step.completed ? (
                        <span className="text-xs bg-success-100 text-success-800 px-2 py-1 rounded-full">Completed</span>
                      ) : (
                        <button 
                          className="text-xs bg-primary-100 text-primary-800 px-2 py-1 rounded-full hover:bg-primary-200 transition-colors duration-200"
                          onClick={() => navigate('/roadmap')}
                        >
                          In Progress
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {!roadmap.steps.length && (
                  <div className="text-center py-6 text-gray-500">
                    <p>No roadmap steps yet. Define your dream career to get started.</p>
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="mt-4"
                      onClick={() => navigate('/')}
                    >
                      Define Dream Career
                    </Button>
                  </div>
                )}
                
                {roadmap.steps.length > 0 && (
                  <div className="mt-4 flex justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/roadmap')}
                    >
                      View Full Roadmap
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No roadmap defined yet. Create one to track your progress.</p>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="mt-4"
                  onClick={() => navigate('/')}
                >
                  Create Roadmap
                </Button>
              </div>
            )}
          </Card>
          
          {/* Learning History */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <BookOpen size={20} className="mr-2 text-secondary-600" />
                <h2 className="text-lg font-semibold text-gray-800">Learning History</h2>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAttendLearningSession}
              >
                + Attend Session
              </Button>
            </div>
            {learningHistory.length > 0 ? (
              <>
                <div className="space-y-3 mb-4">
                  {learningHistory.map((item, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-secondary-300 hover:bg-secondary-50 transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                        <Clock size={16} className="text-secondary-600" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">{item.activity}</h3>
                        <p className="text-xs text-gray-500">
                          {new Date(item.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="text-sm text-secondary-700 font-medium">
                        {item.duration} min
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-3">
                  <span className="text-gray-600">Total Learning Time:</span>
                  <span className="font-medium text-secondary-700">{formatLearningTime(totalLearningMinutes)}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500">
                <p>No learning activities recorded yet.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl text-white font-bold">
                  {dreamJob ? dreamJob.charAt(0).toUpperCase() : 'A'}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {dreamJob || 'Career Aspirant'}
              </h2>
              <p className="text-sm text-gray-500 mb-4">Level: {getBadgeLevel(progress)}</p>
              
              <div className="w-full space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-primary-600">{progress}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Streak</span>
                  <span className="font-medium text-accent-500">{dailyStreak} days</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">CareerCoins</span>
                  <span className="font-medium text-yellow-500">{balance}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Learning Time</span>
                  <span className="font-medium text-secondary-600">{formatLearningTime(totalLearningMinutes)}</span>
                </div>
              </div>
              
              <div className="w-full">
                <Button 
                  variant="primary"
                  size="sm"
                  fullWidth
                  onClick={() => navigate('/ask')}
                >
                  Ask AIGURU for Advice
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Skills Card */}
          <Card>
            <div className="flex items-center mb-4">
              <Star size={20} className="mr-2 text-accent-500" />
              <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            </div>
            
            {skills.length > 0 ? (
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{skill}</span>
                        <span className="text-xs text-gray-500">In Progress</span>
                      </div>
                      <ProgressBar
                        value={Math.floor(Math.random() * 80) + 20} // Random progress for demo
                        color={index % 2 === 0 ? "primary" : "accent"}
                        showValue={false}
                      />
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={() => navigate('/skill-matcher')}
                  >
                    Add More Skills
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <p className="mb-4">No skills added yet.</p>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/skill-matcher')}
                >
                  Add Skills
                </Button>
              </div>
            )}
          </Card>
          
          {/* Achievements */}
          <Card>
            <div className="flex items-center mb-4">
              <Award size={20} className="mr-2 text-primary-600" />
              <h2 className="text-lg font-semibold text-gray-800">Achievements</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <AchievementBadge 
                emoji="🔥" 
                title="3-Day Streak" 
                isUnlocked={dailyStreak >= 3} 
              />
              <AchievementBadge 
                emoji="📚" 
                title="First Step" 
                isUnlocked={progress > 0} 
              />
              <AchievementBadge 
                emoji="🚀" 
                title="25% Complete" 
                isUnlocked={progress >= 25} 
              />
              <AchievementBadge 
                emoji="⭐" 
                title="Half Way" 
                isUnlocked={progress >= 50} 
              />
              <AchievementBadge 
                emoji="🏆" 
                title="Almost There" 
                isUnlocked={progress >= 75} 
              />
              <AchievementBadge 
                emoji="👑" 
                title="Master" 
                isUnlocked={progress >= 100} 
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface AchievementBadgeProps {
  emoji: string;
  title: string;
  isUnlocked: boolean;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ emoji, title, isUnlocked }) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { y: -5 } : {}}
      className={`flex flex-col items-center justify-center p-3 rounded-lg ${
        isUnlocked 
          ? 'bg-gradient-to-b from-primary-50 to-primary-100 border border-primary-200' 
          : 'bg-gray-100 border border-gray-200 opacity-60'
      }`}
    >
      <div className={`text-2xl mb-1 ${isUnlocked ? '' : 'grayscale'}`}>
        {emoji}
      </div>
      <p className="text-xs text-center font-medium truncate w-full">
        {title}
      </p>
    </motion.div>
  );
};

export default CareerTrackerPage;