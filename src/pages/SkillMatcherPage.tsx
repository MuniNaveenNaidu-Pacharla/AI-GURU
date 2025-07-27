import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, ChevronRight, CheckCircle, Target, Users } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAppContext } from '../context/AppContext';
import { useCareerCoin } from '../context/CareerCoinContext';
import { useNavigate } from 'react-router-dom';
import { getCareerSuggestions, getSkillSuggestions } from '../utils/roadmapGenerator';

const SkillMatcherPage: React.FC = () => {
  const { skills, addSkill, removeSkill, setDreamJob, setRoadmap, dreamJob } = useAppContext();
  const { earnCoins } = useCareerCoin();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [careerMatches, setCareerMatches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  // Common skills for suggestions
  const commonSkills = [
    'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL',
    'Data Analysis', 'Machine Learning', 'UI Design', 'UX Research', 'Project Management',
    'Agile', 'Communication', 'Problem Solving', 'Teamwork', 'Leadership',
    'Microsoft Office', 'Adobe Photoshop', 'Figma', 'Git', 'AWS', 'Docker'
  ];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      // Filter suggestions based on input
      const filtered = commonSkills.filter(skill => 
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Add skill from input
  const handleAddSkill = () => {
    if (input.trim() && !skills.includes(input.trim())) {
      addSkill(input.trim());
      setInput('');
      setSuggestions([]);
      
      // Award CareerCoins for adding a skill
      earnCoins(10, `Added skill: ${input.trim()}`);
      
      // Update career matches whenever skills change
      updateCareerMatches([...skills, input.trim()]);
    }
  };

  // Add skill from suggestion
  const handleSelectSuggestion = (skill: string) => {
    if (!skills.includes(skill)) {
      addSkill(skill);
      setInput('');
      setSuggestions([]);
      setShowSuggestions(false);
      
      // Award CareerCoins for adding a skill
      earnCoins(10, `Added skill: ${skill}`);
      
      // Update career matches whenever skills change
      updateCareerMatches([...skills, skill]);
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skill: string) => {
    removeSkill(skill);
    
    // Update career matches whenever skills change
    const updatedSkills = skills.filter(s => s !== skill);
    updateCareerMatches(updatedSkills);
  };

  // Update career matches based on skills
  const updateCareerMatches = (currentSkills: string[]) => {
    if (currentSkills.length > 0) {
      const matches = getCareerSuggestions(currentSkills);
      setCareerMatches(matches);
    } else {
      setCareerMatches([]);
    }
  };

  // Select a career and generate its roadmap
  const handleSelectCareer = (career: string) => {
    setDreamJob(career);
    
    // Award CareerCoins for selecting a career path
    earnCoins(50, `Selected career path: ${career}`);
    
    // Import and use the roadmap generator
    import('../utils/roadmapGenerator').then(module => {
      const roadmap = module.generateRoadmap(career);
      setRoadmap(roadmap);
      navigate('/roadmap');
    });
  };

  // Get suggestions based on current dream job
  const handleGetSuggestions = () => {
    if (dreamJob) {
      const suggestedSkills = getSkillSuggestions(dreamJob);
      
      // Filter out skills already added
      const newSuggestions = suggestedSkills.filter(skill => !skills.includes(skill));
      
      setSuggestions(newSuggestions);
      setShowSuggestions(true);
    }
  };

  // Handle refer friend action
  const handleReferFriend = () => {
    // Award CareerCoins for referring a friend
    earnCoins(200, 'Referred a friend to AIGURU');
    alert('Thank you for referring a friend! You earned 200 CareerCoins! 🎉');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-3">
          <span className="text-secondary-600">Skill</span> <span className="text-accent-500">Matcher</span>
        </h1>
        <p className="text-gray-600">
          Add your skills to discover matching career paths or find skills to develop for your dream job
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Skills Input */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Target size={20} className="mr-2 text-secondary-600" />
              What skills do you already have?
            </h2>
            
            <div className="relative mb-4">
              <div className="flex">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddSkill();
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                    placeholder="e.g., JavaScript, Project Management, Communication"
                    onFocus={() => {
                      if (input.trim()) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay hiding suggestions to allow for clicks
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                  </div>
                  
                  {/* Suggestions dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 hover:bg-secondary-50 cursor-pointer text-gray-700"
                          onClick={() => handleSelectSuggestion(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Button
                  variant="secondary"
                  onClick={handleAddSkill}
                  className="rounded-l-none"
                  disabled={!input.trim()}
                >
                  Add
                </Button>
              </div>
              
              {dreamJob && (
                <div className="mt-2 text-right">
                  <button
                    onClick={handleGetSuggestions}
                    className="text-sm text-secondary-600 hover:text-secondary-800 flex items-center ml-auto"
                  >
                    Get suggestions for {dreamJob}
                    <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Your Skills:</h3>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full flex items-center"
                    >
                      {skill}
                      <button
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 text-secondary-600 hover:text-secondary-800 focus:outline-none"
                      >
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">No skills added yet. Add some skills to see matching careers.</p>
              )}
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-600 mb-2">Popular Skills:</h3>
              <div className="flex flex-wrap gap-2">
                {['JavaScript', 'Python', 'Communication', 'Leadership', 'Data Analysis'].map((skill, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSelectSuggestion(skill)}
                    disabled={skills.includes(skill)}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Career Matches */}
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CheckCircle size={20} className="mr-2 text-accent-500" />
              Matching Careers
            </h2>
            
            {careerMatches.length > 0 ? (
              <div className="space-y-3">
                {careerMatches.map((career, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-accent-300 hover:bg-accent-50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-800">{career}</h3>
                        <p className="text-sm text-gray-500">Based on your skills</p>
                      </div>
                      <Button
                        variant="accent"
                        size="sm"
                        onClick={() => handleSelectCareer(career)}
                      >
                        View Roadmap
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg">
                <p className="text-gray-500 mb-4">Add more skills to see matching career paths</p>
                {skills.length > 0 && (
                  <p className="text-sm text-gray-400">
                    Try adding more technical or specialized skills for better matches
                  </p>
                )}
              </div>
            )}
          </Card>
        </div>
        
        {/* Right Column - Information */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">How It Works</h2>
            <ul className="space-y-4">
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-secondary-700 font-medium">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Add Your Skills</h3>
                  <p className="text-sm text-gray-600">Enter skills you already possess or are learning</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-secondary-700 font-medium">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Discover Careers</h3>
                  <p className="text-sm text-gray-600">See careers that match your skill set</p>
                </div>
              </li>
              <li className="flex">
                <div className="flex-shrink-0 w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-secondary-700 font-medium">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">Get Your Roadmap</h3>
                  <p className="text-sm text-gray-600">Choose a career to see your personalized roadmap</p>
                </div>
              </li>
            </ul>
          </Card>
          
          <Card>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tips</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>• Be specific with your skills (e.g., "JavaScript" instead of just "Programming")</p>
              <p>• Include both technical and soft skills</p>
              <p>• Add skills at different levels - you don't need to be an expert</p>
              <p>• The more skills you add, the better the career matches</p>
            </div>
          </Card>
          
          {/* Refer Friends Card */}
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Users size={24} className="text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Refer Friends</h2>
              </div>
              <p className="text-gray-600 mb-4 text-sm">
                Invite friends to join AIGURU and earn 200 CareerCoins for each successful referral!
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleReferFriend}
                icon={<Users size={16} />}
              >
                Refer a Friend
              </Button>
            </div>
          </Card>
          
          {dreamJob && (
            <Card className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Your Dream Job</h2>
              <p className="text-gray-600 mb-4">
                You've selected <span className="font-medium text-primary-700">{dreamJob}</span> as your dream job.
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/roadmap')}
              >
                View Your Roadmap
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillMatcherPage;