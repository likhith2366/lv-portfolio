const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config();

const projects = [
  {
    title: 'Hire-Link',
    subtitle: 'Full-Stack Job Portal Platform',
    role: 'Full-Stack Developer',
    category: ['fullstack'],
    description: 'Enterprise-grade job portal with role-based access control, premium membership system, and real-time social feed.',
    detailedDescription: `Architected enterprise-grade job portal with role-based access control implementing Clerk v7 authentication, server-side authorization middleware, and secure server actions for 15+ API endpoints handling recruiter job postings, candidate applications, and profile management across MongoDB collections.

Engineered premium membership system integrating Stripe subscription payments with dynamic pricing API, checkout sessions, and webhook handling for seamless payment processing, coupled with Supabase cloud storage for resume uploads and profile media management.

Built real-time social feed platform with post creation, like/unlike functionality, and interactive UI components using shadcn/ui library, featuring dark mode support, responsive design with Tailwind CSS, and optimized server-side rendering for sub-2-second page loads.`,
    techStack: ['Next.js 16', 'React 19', 'MongoDB', 'Mongoose', 'Clerk v7', 'Stripe', 'Supabase', 'Tailwind CSS', 'shadcn/ui'],
    achievements: [
      'Architected role-based access control with Clerk v7 authentication',
      'Integrated Stripe subscription payments with dynamic pricing API',
      'Built real-time social feed with post creation and like functionality',
      'Implemented Supabase cloud storage for resume uploads',
      'Achieved sub-2-second page loads with server-side rendering'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea',
    order: 1
  },
  {
    title: 'Domain-Aware RAG System',
    subtitle: 'Multi-Domain AI Retrieval System',
    role: 'AI/ML Engineer',
    category: ['ml', 'backend'],
    description: 'Intelligent multi-domain RAG system with automatic routing, vector similarity scoring, and semantic fallback mechanisms.',
    detailedDescription: `Engineered an intelligent multi-domain RAG system using Python, LangChain, and Qdrant Cloud that automatically routes user queries across three specialized knowledge bases (Products, Support, Finance) using vector similarity scoring with 0.5 confidence threshold—achieving 40% faster query resolution compared to single-database approaches.

Architected a dual-layer routing mechanism leveraging OpenAI embeddings for primary vector similarity search and GPT-4-powered Agno agents for semantic fallback routing, implementing graceful degradation to web search via LangGraph ReAct agents when document retrieval fails—ensuring 99% query success rate.

Developed a scalable document ingestion pipeline with PyPDF processing, RecursiveCharacterTextSplitter (1000-char chunks, 200 overlap), and cloud-based Qdrant vector storage supporting concurrent multi-file uploads, dynamic collection management, and session state persistence for enterprise-grade document retrieval.`,
    techStack: ['Python', 'LangChain', 'LangGraph', 'Qdrant Cloud', 'OpenAI GPT-4', 'OpenAI Embeddings', 'Streamlit', 'PyPDF'],
    achievements: [
      'Achieved 40% faster query resolution with multi-domain routing',
      'Implemented 99% query success rate with fallback mechanisms',
      'Built scalable document ingestion pipeline with cloud storage',
      'Developed dual-layer routing with vector and semantic search',
      'Created enterprise-grade retrieval system with session persistence'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb',
    order: 2
  },
  {
    title: 'GitHub MCP Agent',
    subtitle: 'AI-Powered Repository Analytics Platform',
    role: 'AI/DevOps Engineer',
    category: ['ml', 'devops'],
    description: 'AI-powered GitHub analytics platform enabling natural language querying of repositories with Docker-based microservices.',
    detailedDescription: `Developed an AI-powered GitHub analytics platform using Python, Streamlit, and the Model Context Protocol (MCP) that enables natural language querying of repositories, automating workflow analysis, code search, and branch management—reducing manual GitHub UI navigation by 80%.

Architected an asynchronous agent system leveraging OpenAI GPT-4 and the Agno framework to orchestrate multi-step repository analysis including CI/CD pipeline monitoring, security vulnerability detection, and stale branch identification with intelligent result formatting and actionable insights.

Engineered a Docker-based microservices integration with GitHub's official MCP server to provide real-time access to 8+ GitHub API toolsets (repos, issues, PRs, workflows, commits, releases, branches, code search), implementing robust error handling, input validation, and session state management for enterprise-grade reliability.`,
    techStack: ['Python', 'Streamlit', 'OpenAI GPT-4', 'MCP', 'Docker', 'GitHub API', 'PyGithub', 'Agno Framework'],
    achievements: [
      'Reduced manual GitHub navigation by 80% with NL queries',
      'Orchestrated multi-step analysis with GPT-4 and Agno',
      'Integrated 8+ GitHub API toolsets via MCP server',
      'Implemented enterprise-grade error handling and validation',
      'Built asynchronous agent system for repository insights'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe',
    order: 3
  },
  {
    title: 'Graph Neural Network',
    subtitle: 'Node Classification with GNN',
    role: 'ML Researcher',
    category: ['ml'],
    description: 'Dual GNN architectures implementing GCN and GAT for semi-supervised node classification on citation networks.',
    detailedDescription: `Developed dual GNN architectures implementing Graph Convolutional Networks (GCN) and Graph Attention Networks (GAT) with multi-head attention mechanism for node classification on citation networks, achieving modular, production-ready code structure.

Engineered interactive 3D visualization system using Plotly and NetworkX to render graph structures, node embeddings, and attention weights with real-time training animations, enabling deep insights into model learning dynamics and prediction accuracy.

Built end-to-end training pipeline with dimensionality reduction (t-SNE/PCA), train-validation-test splits, and comprehensive evaluation metrics on Cora dataset, demonstrating practical implementation of message-passing neural networks.`,
    techStack: ['PyTorch', 'PyTorch Geometric', 'NetworkX', 'Plotly', 'Scikit-learn', 'Python', 't-SNE', 'PCA'],
    achievements: [
      'Implemented GCN and GAT architectures with multi-head attention',
      'Built interactive 3D visualization with Plotly and NetworkX',
      'Created end-to-end training pipeline with evaluation metrics',
      'Demonstrated practical message-passing neural networks',
      'Achieved production-ready modular code structure'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    color: '#fa709a',
    order: 4
  },
  {
    title: 'NewsHub WordPress Theme',
    subtitle: 'Custom WordPress Theme',
    role: 'Full-Stack Developer',
    category: ['fullstack'],
    description: 'Modern, responsive WordPress theme with Advanced Custom Fields integration and custom post types.',
    detailedDescription: `Developed a custom WordPress theme with Advanced Custom Fields (ACF) integration, implementing custom post types (Featured Articles, Author Profiles) and taxonomies for dynamic content management, enhancing content organization and user experience.

Built a fully responsive, modern blog platform using PHP, HTML5, and CSS3 custom properties, featuring mobile-first navigation, contact form with server-side validation, smooth scrolling, and SEO-optimized semantic markup.

Implemented WordPress security best practices and performance optimizations, including nonce verification, input sanitization, output escaping, custom widget areas, breadcrumb navigation, and programmatic ACF field registration for scalable theme architecture.`,
    techStack: ['WordPress', 'PHP', 'Advanced Custom Fields', 'HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    achievements: [
      'Implemented custom post types and taxonomies for content management',
      'Built fully responsive blog platform with mobile-first design',
      'Integrated security best practices with nonce verification',
      'Created custom widget areas and breadcrumb navigation',
      'Developed programmatic ACF field registration architecture'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    color: '#a8edea',
    order: 5
  },
  {
    title: 'Coca-Cola Sales Forecasting',
    subtitle: 'Time Series Analysis & Prediction',
    role: 'Data Scientist',
    category: ['ml'],
    description: 'Comprehensive sales forecasting system implementing 9+ statistical models for quarterly sales prediction.',
    detailedDescription: `Built a time series forecasting model to predict Coca-Cola quarterly sales using Python, implementing and comparing 9+ statistical models including ARIMA, Holt-Winters Exponential Smoothing, and regression-based approaches, evaluated using RMSE and MAPE metrics to identify the best-performing model.

Performed comprehensive time series analysis including seasonal decomposition (additive/multiplicative), autocorrelation analysis, feature engineering (time indices, log transformations, quarterly dummy variables), and moving average calculations to extract trend and seasonal patterns from 42 quarters of historical data.

Deployed production-ready forecasting solution by training the optimal Additive Seasonality Linear Trend model on complete dataset after rigorous train-test validation, generating future sales predictions for business planning and inventory management decisions.`,
    techStack: ['Python', 'Pandas', 'NumPy', 'Statsmodels', 'Matplotlib', 'Seaborn', 'ARIMA', 'Holt-Winters'],
    achievements: [
      'Implemented and compared 9+ statistical forecasting models',
      'Performed comprehensive seasonal decomposition analysis',
      'Engineered time-based features with dummy variables',
      'Deployed production-ready forecasting solution',
      'Generated actionable predictions for business planning'
    ],
    github: 'https://github.com/likhith2366',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    color: '#ffecd2',
    order: 6
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    const result = await Project.insertMany(projects);
    console.log(`✅ Successfully inserted ${result.length} projects`);

    // Display inserted projects
    console.log('\n📊 Inserted Projects:');
    result.forEach((project, index) => {
      console.log(`  ${index + 1}. ${project.title} (${project.category.join(', ')})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
