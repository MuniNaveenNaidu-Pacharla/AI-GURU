// This file contains utility functions for generating career roadmaps

interface Resource {
  name: string;
  url: string;
}

interface RoadmapStep {
  id: number;
  emoji: string;
  title: string;
  description: string;
  resources: Resource[];
  completed: boolean;
}

interface Roadmap {
  job: string;
  steps: RoadmapStep[];
}

// Function to generate a roadmap based on the user's dream job
export const generateRoadmap = (jobTitle: string): Roadmap => {
  // Default steps that can be adapted for most careers
  const defaultSteps: RoadmapStep[] = [
    {
      id: 1,
      emoji: '📚',
      title: 'Learn the Fundamentals',
      description: `Start with the foundational knowledge for a career in ${jobTitle}. Focus on understanding key concepts, terminology, and basic skills.`,
      resources: [
        {
          name: 'Coursera Free Courses',
          url: 'https://www.coursera.org/courses?query=free',
        },
        {
          name: 'Khan Academy',
          url: 'https://www.khanacademy.org/',
        },
      ],
      completed: false,
    },
    {
      id: 2,
      emoji: '🛠️',
      title: 'Build Technical Skills',
      description: `Develop the specific technical skills required for ${jobTitle}. Practice with real-world examples and small projects.`,
      resources: [
        {
          name: 'YouTube Tutorials',
          url: 'https://www.youtube.com/results?search_query=learn+' + encodeURIComponent(jobTitle),
        },
        {
          name: 'GitHub Learning Lab',
          url: 'https://lab.github.com/',
        },
      ],
      completed: false,
    },
    {
      id: 3,
      emoji: '🔍',
      title: 'Research the Industry',
      description: `Understand the current trends, challenges, and opportunities in the ${jobTitle} field. Follow industry leaders and publications.`,
      resources: [
        {
          name: 'Medium Articles',
          url: 'https://medium.com/search?q=' + encodeURIComponent(jobTitle),
        },
        {
          name: 'LinkedIn Learning',
          url: 'https://www.linkedin.com/learning/',
        },
      ],
      completed: false,
    },
    {
      id: 4,
      emoji: '📝',
      title: 'Create Portfolio Projects',
      description: `Build real-world projects that showcase your ${jobTitle} skills. Focus on quality and solving actual problems in the field.`,
      resources: [
        {
          name: 'GitHub',
          url: 'https://github.com/',
        },
        {
          name: 'Behance',
          url: 'https://www.behance.net/',
        },
      ],
      completed: false,
    },
    {
      id: 5,
      emoji: '🤝',
      title: 'Network with Professionals',
      description: `Connect with experienced ${jobTitle} professionals. Attend industry events, join online communities, and participate in discussions.`,
      resources: [
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/',
        },
        {
          name: 'Meetup',
          url: 'https://www.meetup.com/',
        },
      ],
      completed: false,
    },
    {
      id: 6,
      emoji: '📄',
      title: 'Prepare Resume & Portfolio',
      description: `Create a professional resume and portfolio tailored for ${jobTitle} positions. Highlight your skills, projects, and experiences.`,
      resources: [
        {
          name: 'Resume.io',
          url: 'https://resume.io/',
        },
        {
          name: 'Canva Resume Templates',
          url: 'https://www.canva.com/resumes/templates/',
        },
      ],
      completed: false,
    },
    {
      id: 7,
      emoji: '💼',
      title: 'Apply for Jobs or Internships',
      description: `Start applying for entry-level ${jobTitle} positions or internships. Focus on companies that align with your career goals.`,
      resources: [
        {
          name: 'LinkedIn Jobs',
          url: 'https://www.linkedin.com/jobs/',
        },
        {
          name: 'Indeed',
          url: 'https://www.indeed.com/',
        },
      ],
      completed: false,
    },
    {
      id: 8,
      emoji: '🚀',
      title: 'Continuous Learning',
      description: `Never stop learning! Stay updated with the latest trends and advancements in the ${jobTitle} field. Pursue additional certifications if relevant.`,
      resources: [
        {
          name: 'Coursera Certifications',
          url: 'https://www.coursera.org/professional-certificates',
        },
        {
          name: 'edX Courses',
          url: 'https://www.edx.org/',
        },
      ],
      completed: false,
    },
  ];

  // This is where you would customize the roadmap based on specific job titles
  // For now, we'll return the default roadmap with the job title
  return {
    job: jobTitle,
    steps: defaultSteps,
  };
};

// Function to get skill suggestions based on a job title
export const getSkillSuggestions = (jobTitle: string): string[] => {
  // Map of common job titles to skills
  const skillMap: Record<string, string[]> = {
    'web developer': ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git'],
    'data scientist': ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'Data Visualization'],
    'ux designer': ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Adobe XD', 'UI Design'],
    'product manager': ['Agile Methodology', 'User Stories', 'Roadmapping', 'Analytics', 'A/B Testing'],
    'software engineer': ['Java', 'Python', 'C++', 'Data Structures', 'Algorithms', 'System Design'],
  };

  // Normalize job title for comparison
  const normalizedTitle = jobTitle.toLowerCase();
  
  // Look for exact matches first
  if (skillMap[normalizedTitle]) {
    return skillMap[normalizedTitle];
  }

  // Look for partial matches
  for (const title in skillMap) {
    if (normalizedTitle.includes(title) || title.includes(normalizedTitle)) {
      return skillMap[title];
    }
  }

  // Return a default set of general professional skills if no match found
  return [
    'Communication', 
    'Problem Solving', 
    'Critical Thinking', 
    'Time Management', 
    'Project Management', 
    'Microsoft Office Suite'
  ];
};

// Function to suggest careers based on skills
export const getCareerSuggestions = (skills: string[]): string[] => {
  // This is a simplified function that could be expanded with more sophisticated matching
  if (skills.length === 0) return [];

  const careerMap: Record<string, string[]> = {
    'HTML': ['Web Developer', 'Frontend Developer', 'UI Developer'],
    'CSS': ['Web Developer', 'Frontend Developer', 'UI Developer'],
    'JavaScript': ['Web Developer', 'Frontend Developer', 'Full Stack Developer'],
    'React': ['Frontend Developer', 'React Developer', 'UI Engineer'],
    'Node.js': ['Backend Developer', 'Full Stack Developer', 'API Developer'],
    'Python': ['Data Scientist', 'Backend Developer', 'Machine Learning Engineer'],
    'R': ['Data Scientist', 'Data Analyst', 'Quantitative Analyst'],
    'SQL': ['Data Analyst', 'Database Administrator', 'Business Intelligence Analyst'],
    'Machine Learning': ['Machine Learning Engineer', 'AI Researcher', 'Data Scientist'],
    'Statistics': ['Data Scientist', 'Statistician', 'Research Analyst'],
    'User Research': ['UX Researcher', 'UX Designer', 'Product Designer'],
    'Wireframing': ['UX Designer', 'UI Designer', 'Product Designer'],
    'Figma': ['UI Designer', 'Product Designer', 'UX Designer'],
    'Java': ['Software Engineer', 'Backend Developer', 'Android Developer'],
    'Communication': ['Project Manager', 'Product Manager', 'Customer Success Manager'],
    'Problem Solving': ['Software Engineer', 'Data Scientist', 'Business Analyst'],
  };

  // Count career occurrences based on user's skills
  const careerCounts: Record<string, number> = {};
  
  skills.forEach(skill => {
    const normalizedSkill = Object.keys(careerMap).find(
      s => s.toLowerCase() === skill.toLowerCase()
    );
    
    if (normalizedSkill && careerMap[normalizedSkill]) {
      careerMap[normalizedSkill].forEach(career => {
        careerCounts[career] = (careerCounts[career] || 0) + 1;
      });
    }
  });

  // Sort careers by count (number of matching skills)
  const sortedCareers = Object.entries(careerCounts)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);

  // Return top 5 careers or fewer if not enough matches
  return sortedCareers.slice(0, 5);
};