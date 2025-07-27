import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import TimelineStep from '../components/TimelineStep';
import ProgressBar from '../components/ProgressBar';
import Button from '../components/Button';
import Card from '../components/Card';

const RoadmapPage: React.FC = () => {
  const { dreamJob, roadmap, progress, toggleStepCompleted } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // If no roadmap is available, redirect to home
    if (!roadmap) {
      navigate('/');
    }
  }, [roadmap, navigate]);

  if (!roadmap) {
    return null;
  }

  const getBadgeLevel = (progress: number): string => {
    if (progress < 25) return 'Beginner';
    if (progress < 50) return 'Apprentice';
    if (progress < 75) return 'Practitioner';
    if (progress < 100) return 'Expert';
    return 'Master';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-6">
          Your Career Roadmap to <span className="text-primary-600">{dreamJob}</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Your Progress</h2>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${progress < 25 ? 'bg-gray-100 text-gray-800' : 
                progress < 50 ? 'bg-primary-100 text-primary-800' :
                progress < 75 ? 'bg-secondary-100 text-secondary-800' :
                'bg-success-100 text-success-800'}`}
            >
              Level: {getBadgeLevel(progress)}
            </span>
          </div>
          <ProgressBar value={progress} showValue={true} color="primary" />
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <Button
            variant="accent"
            fullWidth
            icon={<MessageSquare size={18} />}
            onClick={() => navigate('/ask')}
          >
            Ask AIGURU
          </Button>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Roadmap Steps</h2>
        <div className="space-y-0">
          {roadmap.steps.map((step) => (
            <TimelineStep
              key={step.id}
              number={step.id}
              emoji={step.emoji}
              title={step.title}
              description={step.description}
              resources={step.resources}
              isCompleted={step.completed}
              onToggleComplete={() => toggleStepCompleted(step.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;