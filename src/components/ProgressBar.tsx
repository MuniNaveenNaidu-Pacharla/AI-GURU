import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  label?: string;
  showValue?: boolean;
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'success';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = true,
  className = '',
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-500',
    success: 'bg-success-500',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && <span className="text-sm font-medium text-gray-500">{value}%</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className={`h-2.5 rounded-full ${colorClasses[color]}`}
          style={{ width: `${value}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;