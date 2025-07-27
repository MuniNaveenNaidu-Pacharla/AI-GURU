import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useCareerCoin } from './CareerCoinContext';

interface UserProfile {
  name: string;
  institution: string;
  interests: string[];
  avatar: string | null;
}

interface Roadmap {
  job: string;
  steps: {
    id: number;
    emoji: string;
    title: string;
    description: string;
    resources: { name: string; url: string }[];
    completed: boolean;
  }[];
}

interface AppContextType {
  dreamJob: string;
  setDreamJob: (job: string) => void;
  roadmap: Roadmap | null;
  setRoadmap: (roadmap: Roadmap) => void;
  progress: number;
  updateProgress: () => void;
  toggleStepCompleted: (stepId: number) => void;
  skills: string[];
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  dailyStreak: number;
  incrementDailyStreak: () => void;
  userProfile: UserProfile;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dreamJob, setDreamJob] = useState<string>('');
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [skills, setSkills] = useState<string[]>([]);
  const [dailyStreak, setDailyStreak] = useState<number>(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    institution: '',
    interests: [],
    avatar: null,
  });

  const updateProgress = () => {
    if (roadmap) {
      const completedSteps = roadmap.steps.filter(step => step.completed).length;
      const totalSteps = roadmap.steps.length;
      setProgress(Math.round((completedSteps / totalSteps) * 100));
    }
  };

  const toggleStepCompleted = (stepId: number) => {
    if (roadmap) {
      const step = roadmap.steps.find(s => s.id === stepId);
      const wasCompleted = step?.completed || false;
      
      const updatedSteps = roadmap.steps.map(step => 
        step.id === stepId ? { ...step, completed: !step.completed } : step
      );
      setRoadmap({ ...roadmap, steps: updatedSteps });
      
      const completedSteps = updatedSteps.filter(step => step.completed).length;
      const totalSteps = updatedSteps.length;
      setProgress(Math.round((completedSteps / totalSteps) * 100));
      
      // Award CareerCoins when completing a step (not when uncompleting)
      if (!wasCompleted && step) {
        // Import and use CareerCoin context
        try {
          const { earnCoins } = require('./CareerCoinContext').useCareerCoin();
          const coinsEarned = Math.floor(Math.random() * 51) + 50; // 50-100 coins
          earnCoins(coinsEarned, `Completed: ${step.title}`);
        } catch (error) {
          // Fallback if context is not available
          console.log('CareerCoin context not available');
        }
      }
    }
  };

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const incrementDailyStreak = () => {
    setDailyStreak(dailyStreak + 1);
    
    // Award CareerCoins for daily check-in
    try {
      const { earnCoins } = require('./CareerCoinContext').useCareerCoin();
      earnCoins(25, 'Daily check-in bonus');
    } catch (error) {
      console.log('CareerCoin context not available');
    }
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        dreamJob,
        setDreamJob,
        roadmap,
        setRoadmap,
        progress,
        updateProgress,
        toggleStepCompleted,
        skills,
        addSkill,
        removeSkill,
        dailyStreak,
        incrementDailyStreak,
        userProfile,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};