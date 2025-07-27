import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, FileText, Award, ExternalLink } from 'lucide-react';
import Card from '../components/Card';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('learning');

  const tabs = [
    { id: 'learning', label: 'Learning Platforms', icon: <BookOpen size={18} /> },
    { id: 'tools', label: 'Tools', icon: <Code size={18} /> },
    { id: 'resume', label: 'Resume Templates', icon: <FileText size={18} /> },
    { id: 'certificates', label: 'Free Certifications', icon: <Award size={18} /> },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-poppins font-bold text-gray-900 mb-3">
          <span className="text-primary-600">Learn</span> & <span className="text-accent-500">Grow</span> Resources
        </h1>
        <p className="text-gray-600">
          Discover the best resources to accelerate your career growth
        </p>
      </motion.div>

      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex items-center whitespace-nowrap px-4 py-2 border-b-2 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === 'learning' && <LearningPlatforms />}
        {activeTab === 'tools' && <Tools />}
        {activeTab === 'resume' && <ResumeTemplates />}
        {activeTab === 'certificates' && <Certifications />}
      </div>
    </div>
  );
};

const ResourceCard: React.FC<{
  title: string;
  description: string;
  url: string;
  image?: string;
}> = ({ title, description, url, image }) => {
  return (
    <Card className="h-full" hoverEffect>
      <div className="flex flex-col h-full">
        <div className="mb-4">
          {image ? (
            <img src={image} alt={title} className="w-full h-32 object-cover rounded-md" />
          ) : (
            <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
              <BookOpen size={32} className="text-gray-400" />
            </div>
          )}
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-primary-600 hover:text-primary-800"
        >
          Visit Resource <ExternalLink size={14} className="ml-1" />
        </a>
      </div>
    </Card>
  );
};

const LearningPlatforms: React.FC = () => {
  const platforms = [
    {
      title: 'Coursera',
      description: 'Access courses from top universities and organizations worldwide.',
      url: 'https://www.coursera.org',
      image: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'NPTEL',
      description: 'Free online courses from IITs and IISc in engineering, sciences, and humanities.',
      url: 'https://nptel.ac.in',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Udemy',
      description: 'Vast library of courses on programming, design, business, and more.',
      url: 'https://www.udemy.com',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'freeCodeCamp',
      description: 'Free coding tutorials and certification in web development, data science, and more.',
      url: 'https://www.freecodecamp.org',
      image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {platforms.map((platform, index) => (
        <ResourceCard key={index} {...platform} />
      ))}
    </div>
  );
};

const Tools: React.FC = () => {
  const tools = [
    {
      title: 'GitHub',
      description: 'Version control and collaboration platform for developers.',
      url: 'https://github.com',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'VS Code',
      description: 'Powerful, lightweight code editor with extensions for all languages.',
      url: 'https://code.visualstudio.com',
      image: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Docker',
      description: 'Containerization platform for building, shipping, and running applications.',
      url: 'https://www.docker.com',
      image: 'https://images.pexels.com/photos/4709285/pexels-photo-4709285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Figma',
      description: 'Collaborative interface design tool for UX/UI designers.',
      url: 'https://www.figma.com',
      image: 'https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool, index) => (
        <ResourceCard key={index} {...tool} />
      ))}
    </div>
  );
};

const ResumeTemplates: React.FC = () => {
  const templates = [
    {
      title: 'Professional Template',
      description: 'Clean, professional template suitable for most industries.',
      url: 'https://www.resume.com/templates/professional',
      image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Creative Template',
      description: 'Eye-catching design for creative professionals.',
      url: 'https://www.resume.com/templates/creative',
      image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Technical Template',
      description: 'Optimized for showcasing technical skills and projects.',
      url: 'https://www.resume.com/templates/technical',
      image: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {templates.map((template, index) => (
        <ResourceCard key={index} {...template} />
      ))}
    </div>
  );
};

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: 'Google Digital Marketing',
      description: 'Free certification on digital marketing fundamentals from Google.',
      url: 'https://learndigital.withgoogle.com/digitalgarage',
      image: 'https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'AWS Cloud Practitioner',
      description: 'Entry-level certification for cloud concepts and AWS services.',
      url: 'https://aws.amazon.com/certification/certified-cloud-practitioner',
      image: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'IBM Data Science',
      description: 'Professional certification covering data science tools and methodologies.',
      url: 'https://www.ibm.com/training/badge/data-science-professional-certificate',
      image: 'https://images.pexels.com/photos/7689845/pexels-photo-7689845.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
    {
      title: 'Microsoft Learn',
      description: 'Free certifications on Microsoft technologies and tools.',
      url: 'https://learn.microsoft.com',
      image: 'https://images.pexels.com/photos/4709286/pexels-photo-4709286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {certifications.map((cert, index) => (
        <ResourceCard key={index} {...cert} />
      ))}
    </div>
  );
};

export default ResourcesPage;