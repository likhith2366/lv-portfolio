const mongoose = require('mongoose');
require('dotenv').config();
const Project = require('../models/Project');

const projects = [
  {
    title: 'HireLink',
    subtitle: 'Full-Stack Job Portal',
    role: 'Team Lead',
    category: ['fullstack', 'backend'],
    description: 'Developed a full-stack job portal using Next.js and React.js, building REST and GraphQL APIs with Node.js, MongoDB, and PostgreSQL.',
    detailedDescription: `Developed a full-stack job portal using Next.js and React.js, building REST and GraphQL APIs with Node.js, MongoDB, and PostgreSQL, and integrating semantic search for improved job matching.

Used GitHub Actions for CI/CD to automate testing and validation of backend code, including changes involving Redis caching, reducing manual errors.

Implemented JWT-based authentication and authorization, securing user sessions and APIs while reducing repeated login checks and session overhead.

Integrated WebSockets to deliver real-time notifications, cutting redundant API polling by 40% and lowering backend request load.

Used AWS Redis to cache frequently requested data, reducing repeated database queries by around 30% and making responses faster.`,
    techStack: ['Next.js', 'React.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'Redis', 'WebSockets', 'JWT', 'AWS', 'GitHub Actions'],
    achievements: [
      'Automated testing and validation with GitHub Actions CI/CD',
      'JWT-based authentication securing user sessions',
      'Real-time notifications with WebSockets reducing API polling by 40%',
      'Redis caching reducing database queries by 30%',
      'Semantic search for improved job matching'
    ],
    github: 'https://github.com/likhith2366/Hire-Link',
    liveUrl: null,
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: '#6366f1',
    order: 1
  },
  {
    title: 'School Management System',
    subtitle: 'MERN Stack with GraphQL',
    role: 'Team Lead',
    category: ['fullstack', 'backend', 'devops'],
    description: 'Built and delivered a full stack School Management System using the MERN stack with GraphQL APIs, reducing over-fetching and improving frontend data efficiency by 30%.',
    detailedDescription: `Built and delivered a full stack School Management System using the MERN stack with GraphQL APIs, reducing over-fetching and improving frontend data efficiency by 30%, leading to a 30% increase in user engagement.

Engineered backend services using Node.js, MongoDB, and PostgreSQL, deployed on AWS EC2 with S3 for storage, and integrated Apache Kafka to handle asynchronous workflows such as notifications and activity events.

Improved code quality and release reliability by 30% through Git-based workflows, code reviews, unit testing, and CI/CD pipelines, reducing deployment failures and regression bugs.

Enhanced system stability and availability by optimizing database queries, introducing Kafka based decoupling, and improving observability, achieving 99.9% uptime and reducing incident resolution time by 20%.`,
    techStack: ['MongoDB', 'Express', 'React', 'Node.js', 'GraphQL', 'AWS EC2', 'S3', 'Apache Kafka', 'PostgreSQL', 'Git', 'CI/CD'],
    achievements: [
      'Reduced over-fetching by 30% with GraphQL',
      'Increased user engagement by 30%',
      'Achieved 99.9% uptime',
      'Reduced incident resolution time by 20%',
      'Improved code quality and release reliability by 30%'
    ],
    github: 'https://github.com/likhith2366',
    liveUrl: 'https://sms-frontend-five.vercel.app/',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    color: '#8b5cf6',
    order: 2
  },
  {
    title: 'GRAGFlow Framework',
    subtitle: 'ML Research: Multi-hop Reasoning',
    role: 'Team Lead',
    category: ['ml'],
    description: 'Increased summary accuracy for large, multilingual texts by 18% by leading the integration of LSTM and reinforcement learning for multi-hop reasoning.',
    detailedDescription: `Increased summary accuracy for large, multilingual texts by 18% by leading the integration of LSTM and reinforcement learning for multi-hop reasoning and path detection in the GRAGFlow framework, applying agile methodologies and code review to ensure code quality and maintainability.

Reduced hallucinations in text summarization outputs by 25% by implementing Leiden community detection and embedding-based hallucination reduction, utilizing software testing, debugging, and unit testing to validate and optimize reliability.

Accelerated development cycles by 30% by managing project timelines and deliverables with agile project management, coordinating code reviews, and leveraging Git for version control and collaboration.

Enhanced team productivity and code quality by applying agile methodologies, conducting regular code reviews, and providing technical support for efficient development and issue resolution.`,
    techStack: ['Python', 'PyTorch', 'LSTM', 'Reinforcement Learning', 'Leiden Algorithm', 'NLP', 'Machine Learning', 'Git', 'Agile'],
    achievements: [
      'Increased summary accuracy by 18%',
      'Reduced hallucinations by 25%',
      'Accelerated development cycles by 30%',
      'Multi-hop reasoning with LSTM and RL',
      'Leiden community detection for embeddings'
    ],
    github: 'https://github.com/likhith2366',
    liveUrl: null,
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
    color: '#ec4899',
    order: 3
  },
  {
    title: 'Divy',
    subtitle: 'Fractional Real Estate Investment Platform',
    role: 'Software Engineer / Team Member',
    category: ['fullstack', 'backend', 'devops'],
    description: 'Architected and developed Divy, a fractional real estate investment platform enabling users to purchase partial ownership shares in properties.',
    detailedDescription: `Architected and developed Divy, a fractional real estate investment platform enabling users to purchase partial ownership shares in properties, increasing accessibility to real estate investing.

Built a React.js frontend and Django + FastAPI backend, implementing JWT-based authentication and role-based access control for secure user and transaction management.

Implemented WebSocket-based real-time communication to support live updates for investment status, property availability, and user activity events, improving user responsiveness and engagement.

Containerized services using Docker and established CI/CD pipelines with GitHub Actions, enabling automated testing and deployments and reducing release errors.

Deployed backend services on AWS EC2, static assets on AWS S3, and configured Cloudflare for DNS, CDN, and HTTPS, improving application performance and reliability.

Followed Agile development practices, leveraging Jira dashboards for sprint planning, backlog management, and progress tracking, improving delivery velocity and team coordination.`,
    techStack: ['React', 'Django', 'FastAPI', 'WebSockets', 'SQLite', 'Docker', 'GitHub Actions', 'AWS EC2', 'S3', 'Cloudflare', 'JWT', 'Jira'],
    achievements: [
      'JWT authentication with role-based access control',
      'Real-time WebSocket communication',
      'Docker containerization with CI/CD',
      'AWS EC2 and S3 deployment',
      'Cloudflare CDN and HTTPS configuration',
      'Agile development with Jira'
    ],
    github: 'https://github.com/likhith2366/Hire-Link',
    liveUrl: null,
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#10b981',
    order: 4
  }
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
