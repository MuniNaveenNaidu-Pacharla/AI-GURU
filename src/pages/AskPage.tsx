import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Volume2, Bot } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

const AskPage: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { dreamJob } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const answers = [
        `To become a ${dreamJob}, you should start by learning the fundamentals of the field. This includes understanding the key concepts, tools, and methodologies commonly used. Consider taking online courses or pursuing formal education in this area.`,
        `For a career in ${dreamJob}, networking is crucial. Attend industry events, join professional communities, and connect with experienced professionals. These connections can provide valuable insights and potential job opportunities.`,
        `Practical experience is essential for a ${dreamJob} role. Look for internships, volunteer opportunities, or create personal projects that demonstrate your skills. Employers value hands-on experience that shows you can apply your knowledge in real-world scenarios.`,
        `Continuous learning is important in the ${dreamJob} field as technologies and practices evolve. Follow industry blogs, subscribe to relevant newsletters, and participate in workshops to stay updated on the latest developments.`,
        `When preparing for ${dreamJob} interviews, focus on showcasing both your technical skills and soft skills like communication and problem-solving. Be ready to discuss your projects and how you've overcome challenges in your work.`
      ];
      
      // Pick a random answer
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(randomAnswer);
      setIsLoading(false);
    }, 1500);
  };

  const handleSpeakAnswer = () => {
    if (!answer) return;
    
    setIsSpeaking(true);
    
    // Simulate speech synthesis
    setTimeout(() => {
      setIsSpeaking(false);
    }, 3000);
    
    // In a real implementation, you would use the Web Speech API or connect to ElevenLabs
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(answer);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-3">
          Ask <span className="text-primary-600">AI</span><span className="text-accent-500">GURU</span>
        </h1>
        <p className="text-gray-600">
          Your personal AI mentor is here to answer all your career questions
        </p>
      </motion.div>

      <Card className="mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
              Ask me anything about your career path!
            </label>
            <textarea
              id="question"
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="E.g., What skills do I need to become a successful Data Scientist?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            icon={<Send size={18} />}
            disabled={!question.trim() || isLoading}
          >
            {isLoading ? 'Thinking...' : 'Get Answer'}
          </Button>
        </form>
      </Card>

      {answer && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <div className="flex items-start mb-4">
              <div className="bg-primary-100 p-2 rounded-full mr-3">
                <Bot size={24} className="text-primary-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">AIGURU's Answer:</h3>
                <p className="text-gray-700 mt-2 leading-relaxed">{answer}</p>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                icon={<Volume2 size={18} className={isSpeaking ? 'animate-pulse' : ''} />}
                onClick={handleSpeakAnswer}
                disabled={isSpeaking}
              >
                {isSpeaking ? 'Speaking...' : '🔊 Hear It'}
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AskPage;