import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ThumbsUp, ThumbsDown, Volume2, Play, Brain, Star, Sun } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

interface Quote {
  text: string;
  author: string;
}

interface SuccessStory {
  name: string;
  title: string;
  content: string;
  image: string;
}

interface VideoResource {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

const MindsetPage: React.FC = () => {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [likedQuote, setLikedQuote] = useState<boolean | null>(null);

  // Pre-defined quotes
  const quotes: Quote[] = [
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
    { text: "Your career is a marathon, not a sprint. Pace yourself and enjoy the journey.", author: "Anonymous" },
    { text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.", author: "Joshua J. Marine" },
    { text: "It's not about being the best. It's about being better than you were yesterday.", author: "Anonymous" },
    { text: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  ];

  // Success stories
  const successStories: SuccessStory[] = [
    {
      name: "Priya Sharma",
      title: "From Beginner to Senior Developer in 3 Years",
      content: "I started with zero coding knowledge after switching careers from marketing. By following a structured learning path and building projects consistently, I landed my first developer job in 8 months. Three years later, I'm now a senior developer at a tech startup, mentoring junior devs and leading projects.",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Alex Chen",
      title: "Self-taught Data Scientist Success Story",
      content: "After graduating with a business degree, I discovered my passion for data. I spent 6 months learning Python, statistics, and machine learning through online courses while working full-time. My portfolio projects on GitHub caught the attention of recruiters, and I now work as a data scientist analyzing customer behavior patterns.",
      image: "https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      name: "Maya Johnson",
      title: "Career Pivot to UX Design at 35",
      content: "After 10 years in accounting, I decided to follow my creative passion. I took online UX design courses and created a portfolio by redesigning existing products. The transition wasn't easy, but after 20+ applications, I landed a junior UX role. Two years later, I'm a senior designer leading user research initiatives at a major tech company.",
      image: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // Video resources
  const videoResources: VideoResource[] = [
    {
      title: "Growth Mindset vs. Fixed Mindset",
      description: "Learn the difference between growth and fixed mindsets and how they impact your career success.",
      url: "https://www.youtube.com/watch?v=M1CHPnZfFmU",
      thumbnail: "https://images.pexels.com/photos/4064835/pexels-photo-4064835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Overcoming Imposter Syndrome",
      description: "Practical strategies to recognize and overcome imposter syndrome in your professional life.",
      url: "https://www.youtube.com/watch?v=ZQUxL4Jm1Lo",
      thumbnail: "https://images.pexels.com/photos/4098232/pexels-photo-4098232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Building Resilience in Your Career",
      description: "How to develop resilience to bounce back from setbacks and thrive in challenging situations.",
      url: "https://www.youtube.com/watch?v=1FDyiUEn8Vw",
      thumbnail: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "The Power of Positive Self-Talk",
      description: "Transform your inner dialogue to boost confidence and motivation in your career journey.",
      url: "https://www.youtube.com/watch?v=R6MasOctLkY",
      thumbnail: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  // Daily affirmations
  const affirmations = [
    "I am constantly growing and improving my skills.",
    "I have the power to create positive change in my career.",
    "I embrace challenges as opportunities to learn and grow.",
    "I am worthy of success and recognition for my work.",
    "My potential is limitless when I believe in myself.",
    "I am resilient and can overcome any obstacle in my path.",
    "Each day, I am getting closer to my career goals.",
    "I have valuable skills and insights to contribute.",
    "I trust in my ability to figure things out and succeed.",
    "I am building my future with each small step I take today."
  ];

  // Generate a random quote on mount and when new quote button is clicked
  useEffect(() => {
    getRandomQuote();
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
    setLikedQuote(null);
  };

  const handleSpeakQuote = () => {
    if (!quote.text) return;
    
    setIsSpeaking(true);
    
    // In a real implementation, you would connect to a voice API like ElevenLabs
    // For now, we'll use the browser's built-in speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(quote.text);
      window.speechSynthesis.speak(utterance);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      // Fallback for browsers without speech synthesis
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }
  };

  const handleSpeakAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    const affirmation = affirmations[randomIndex];
    
    setIsSpeaking(true);
    
    // Similar to quote speaking, in a real app you'd use a proper voice API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(affirmation);
      window.speechSynthesis.speak(utterance);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      setTimeout(() => {
        setIsSpeaking(false);
      }, 3000);
    }
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
          <span className="text-primary-600">Mindset</span> & <span className="text-accent-500">Motivation</span>
        </h1>
        <p className="text-gray-600">
          Cultivate the right mindset for career success and stay motivated on your journey
        </p>
      </motion.div>

      {/* Daily Quote Section */}
      <Card className="mb-8 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/3 p-6">
            <div className="flex items-center mb-4">
              <Sun size={22} className="mr-2 text-accent-500" />
              <h2 className="text-xl font-semibold text-gray-800">Daily Inspiration</h2>
            </div>
            
            <div className="mb-6">
              {quote.text ? (
                <motion.div
                  key={quote.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-xl text-gray-700 italic mb-3">"{quote.text}"</p>
                  <p className="text-gray-600 font-medium">— {quote.author}</p>
                </motion.div>
              ) : (
                <p className="text-gray-500">Loading your daily quote...</p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={<Volume2 size={16} className={isSpeaking ? 'animate-pulse' : ''} />}
                onClick={handleSpeakQuote}
                disabled={isSpeaking || !quote.text}
              >
                {isSpeaking ? 'Speaking...' : 'Listen'}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={getRandomQuote}
              >
                New Quote
              </Button>
              
              <div className="flex">
                <button
                  onClick={() => setLikedQuote(true)}
                  className={`flex items-center justify-center p-2 rounded-l-md border ${
                    likedQuote === true 
                      ? 'bg-success-50 border-success-500 text-success-700' 
                      : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp size={16} />
                </button>
                <button
                  onClick={() => setLikedQuote(false)}
                  className={`flex items-center justify-center p-2 rounded-r-md border-t border-r border-b ${
                    likedQuote === false 
                      ? 'bg-error-50 border-error-500 text-error-700' 
                      : 'border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsDown size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/3 bg-gradient-to-br from-accent-100 to-primary-50 flex flex-col items-center justify-center p-6">
            <Brain size={32} className="text-primary-600 mb-3" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Daily Affirmation</h3>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Start your day with a positive mindset using voice affirmations
            </p>
            <Button
              variant="primary"
              size="sm"
              icon={<Volume2 size={16} className={isSpeaking ? 'animate-pulse' : ''} />}
              onClick={handleSpeakAffirmation}
              disabled={isSpeaking}
            >
              {isSpeaking ? 'Speaking...' : 'Play Affirmation'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Success Stories Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Star size={20} className="mr-2 text-accent-500" />
        Success Stories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {successStories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col" hoverEffect>
              <div className="h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{story.name}</h3>
              <p className="text-accent-600 text-sm font-medium mb-3">{story.title}</p>
              <p className="text-gray-600 text-sm mb-4 flex-grow">{story.content}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Video Resources Section */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Play size={20} className="mr-2 text-primary-600" />
        Mindset Videos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {videoResources.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col" hoverEffect>
              <a 
                href={video.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative h-48 mb-4 overflow-hidden rounded-lg group"
              >
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-3">
                    <Play size={24} className="text-primary-600" />
                  </div>
                </div>
              </a>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{video.title}</h3>
              <p className="text-gray-600 text-sm mb-3 flex-grow">{video.description}</p>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
              >
                Watch Video <ExternalLink size={14} className="ml-1" />
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Growth Mindset Tips */}
      <Card className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <Brain size={20} className="mr-2 text-secondary-600" />
          Growth Mindset Tips
        </h2>
        
        <div className="space-y-4">
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-secondary-700 font-medium">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Embrace Challenges</h3>
              <p className="text-gray-600 text-sm">See difficulties as opportunities to grow rather than obstacles. Each challenge helps you develop new skills.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-secondary-700 font-medium">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Learn from Criticism</h3>
              <p className="text-gray-600 text-sm">View feedback as valuable information to improve, not as personal judgment. Ask: "What can I learn from this?"</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-secondary-700 font-medium">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Celebrate Others' Success</h3>
              <p className="text-gray-600 text-sm">Find inspiration rather than threat in others' achievements. Their success proves what's possible.</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-secondary-700 font-medium">4</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Focus on the Process</h3>
              <p className="text-gray-600 text-sm">Value effort, strategies, and progress over innate talent. Remember: "not yet" is different from "can't."</p>
            </div>
          </div>
          
          <div className="flex">
            <div className="flex-shrink-0 w-10 h-10 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
              <span className="text-secondary-700 font-medium">5</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Persist Through Setbacks</h3>
              <p className="text-gray-600 text-sm">Develop resilience by viewing setbacks as temporary and specific, not permanent or personal.</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MindsetPage;