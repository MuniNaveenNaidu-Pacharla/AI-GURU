import React from 'react';
import { motion } from 'framer-motion';
import { Check, Link as LinkIcon } from 'lucide-react';

interface Resource {
  name: string;
  url: string;
}

interface TimelineStepProps {
  number: number;
  emoji: string;
  title: string;
  description: string;
  resources: Resource[];
  isCompleted: boolean;
  onToggleComplete: () => void;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  number,
  emoji,
  title,
  description,
  resources,
  isCompleted,
  onToggleComplete,
}) => {
  return (
    <div className="relative pl-10 pb-8 border-l-2 border-primary-200 last:border-l-0">
      {/* Circle indicator */}
      <motion.div
        className={`absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center
          ${isCompleted ? 'bg-success-500' : 'bg-primary-500'}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {isCompleted ? (
          <Check size={14} className="text-white" />
        ) : (
          <span className="text-xs text-white font-bold">{number}</span>
        )}
      </motion.div>

      {/* Content */}
      <motion.div
        className="bg-white rounded-lg shadow-md p-5 ml-4"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: number * 0.1 }}
      >
        <div className="flex items-start mb-3">
          <span className="text-2xl mr-2">{emoji}</span>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        {resources.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Resources:</h4>
            <ul className="space-y-1">
              {resources.map((resource, index) => (
                <li key={index} className="flex items-center">
                  <LinkIcon size={14} className="text-primary-500 mr-2" />
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:text-primary-800 hover:underline"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <button
          onClick={onToggleComplete}
          className={`flex items-center text-sm font-medium px-3 py-1 rounded-md transition-colors duration-200
            ${isCompleted
              ? 'bg-success-50 text-success-700 hover:bg-success-100'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          <span className="mr-1">{isCompleted ? 'Completed' : 'Mark as completed'}</span>
          {isCompleted && <Check size={14} />}
        </button>
      </motion.div>
    </div>
  );
};

export default TimelineStep;