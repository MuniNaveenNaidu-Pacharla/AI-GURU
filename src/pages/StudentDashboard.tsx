import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, School, Tag, Briefcase, Upload, Edit2, Check, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

const StudentDashboard: React.FC = () => {
  const { userProfile, updateUserProfile, dreamJob, progress } = useAppContext();
  const { isDarkMode } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);
  const [interestInput, setInterestInput] = useState('');

  const getBadgeLevel = (progress: number): string => {
    if (progress < 25) return 'Beginner';
    if (progress < 50) return 'Intermediate';
    if (progress < 75) return 'Advanced';
    return 'Expert';
  };

  const handleSaveProfile = () => {
    updateUserProfile(tempProfile);
    setIsEditing(false);
  };

  const handleAddInterest = () => {
    if (interestInput.trim() && !tempProfile.interests.includes(interestInput.trim())) {
      setTempProfile(prev => ({
        ...prev,
        interests: [...prev.interests, interestInput.trim()]
      }));
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setTempProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile(prev => ({
          ...prev,
          avatar: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className={`text-3xl font-poppins font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
          Student Dashboard
        </h1>
        {userProfile.name && (
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Hi {userProfile.name}! You're {progress}% on your roadmap to {dreamJob}
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-2">
          <Card className={isDarkMode ? 'bg-gray-800' : ''}>
            <div className="flex justify-between items-start mb-6">
              <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Student Profile
              </h2>
              <Button
                variant={isEditing ? 'primary' : 'outline'}
                size="sm"
                icon={isEditing ? <Check size={16} /> : <Edit2 size={16} />}
                onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              >
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-4">
                  <div className={`w-full h-full rounded-full overflow-hidden border-2 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  }`}>
                    {tempProfile.avatar ? (
                      <img
                        src={tempProfile.avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}>
                        <User size={48} className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 p-2 rounded-full bg-primary-600 text-white cursor-pointer hover:bg-primary-700 transition-colors">
                      <Upload size={16} />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  )}
                </div>
                <div className={`text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p className="font-medium">{getBadgeLevel(progress)}</p>
                  <ProgressBar value={progress} color="primary" className="mt-2" />
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-grow space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, name: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md ${
                        isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  ) : (
                    <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                      {userProfile.name || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    College/University
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempProfile.institution}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, institution: e.target.value }))}
                      className={`w-full px-3 py-2 rounded-md ${
                        isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600'
                          : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                    />
                  ) : (
                    <p className={isDarkMode ? 'text-white' : 'text-gray-800'}>
                      {userProfile.institution || 'Not set'}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  } mb-1`}>
                    Interests
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={interestInput}
                          onChange={(e) => setInterestInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddInterest();
                            }
                          }}
                          placeholder="Add an interest"
                          className={`flex-grow px-3 py-2 rounded-md ${
                            isDarkMode
                              ? 'bg-gray-700 text-white border-gray-600'
                              : 'bg-white border-gray-300'
                          } focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={handleAddInterest}
                        >
                          Add
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tempProfile.interests.map((interest, index) => (
                          <span
                            key={index}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                              isDarkMode
                                ? 'bg-gray-700 text-white'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {interest}
                            <button
                              onClick={() => handleRemoveInterest(interest)}
                              className="ml-2 text-gray-500 hover:text-gray-700"
                            >
                              <X size={14} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {userProfile.interests.map((interest, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                            isDarkMode
                              ? 'bg-gray-700 text-white'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {interest}
                        </span>
                      ))}
                      {userProfile.interests.length === 0 && (
                        <p className="text-gray-500 italic">No interests added</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Stats and Quick Actions */}
        <div className="space-y-6">
          <Card className={isDarkMode ? 'bg-gray-800' : ''}>
            <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Briefcase className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Dream Job</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {dreamJob || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <School className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Institution</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userProfile.institution || 'Not set'}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <Tag className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mr-3`} />
                <div>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Interests</p>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                    {userProfile.interests.length} added
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;