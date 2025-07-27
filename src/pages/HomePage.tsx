import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';
import { generateRoadmap } from '../utils/roadmapGenerator';

const HomePage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { setDreamJob, setRoadmap } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputValue.trim()) {
      setDreamJob(inputValue);
      
      // Generate roadmap based on input
      const newRoadmap = generateRoadmap(inputValue);
      setRoadmap(newRoadmap);
      
      // Navigate to roadmap page
      navigate('/roadmap');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-poppins font-bold text-gray-900 mb-4">
          <span className="text-primary-600">AI</span>
          <span className="text-accent-500">GURU</span>
        </h1>
        <motion.p 
          className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Your Dream Career Mentor
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="dreamJob" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your dream job
              </label>
              <div className={`relative rounded-md shadow-sm transition-all duration-200 ${
                isInputFocused ? 'ring-2 ring-primary-500 ring-opacity-50' : ''
              }`}>
                <input
                  type="text"
                  id="dreamJob"
                  className="block w-full rounded-md border-gray-300 bg-white py-3 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm"
                  placeholder="e.g., Data Scientist, Full Stack Developer, UI/UX Designer"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
              </div>
            </div>
            <Button 
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              icon={<Rocket size={20} />}
              disabled={!inputValue.trim()}
            >
              Get My Roadmap
            </Button>
          </form>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FeatureCard
            emoji="🎯"
            title="Personalized Roadmaps"
            description="Get step-by-step guidance tailored to your dream career"
          />
          <FeatureCard
            emoji="🤖"
            title="AI Career Mentor"
            description="Ask questions and get expert advice anytime"
          />
          <FeatureCard
            emoji="📈"
            title="Track Your Progress"
            description="Monitor your journey and celebrate milestones"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 text-center"
      >
        <p className="text-gray-600 mb-4">Already have skills? See what careers match your profile</p>
        <Button
          variant="outline"
          icon={<ArrowRight size={16} />}
          onClick={() => navigate('/skill-matcher')}
        >
          Explore Career Options
        </Button>
      </motion.div>
    </div>
  );
};

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ emoji, title, description }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md p-5 border border-gray-100"
    >
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </motion.div>
  );
};

export default HomePage;