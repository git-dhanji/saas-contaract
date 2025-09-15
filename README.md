# 📋 ContractHub - Professional Contract Management Platform

> A modern, AI-powered SaaS platform for managing legal contracts with intelligent insights and comprehensive analytics.

![ContractHub Dashboard](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=for-the-badge&logo=tailwindcss)

## 🌟 What is ContractHub?

ContractHub is a comprehensive contract management platform designed for businesses of all sizes. Whether you're a legal team managing hundreds of contracts or a small business tracking vendor agreements, ContractHub provides the tools you need to stay organized, compliant, and informed.

### 🎯 For Business Users
- **Centralized Contract Storage**: All your contracts in one secure, searchable location
- **Risk Monitoring**: Automated alerts for high-risk contracts and upcoming renewals
- **AI-Powered Insights**: Get intelligent analysis of contract terms and potential issues
- **Performance Analytics**: Track contract performance and vendor relationships
- **Compliance Tracking**: Never miss important deadlines or renewal dates

### 👨‍💻 For Developers
- **Modern Tech Stack**: Built with Next.js 14, React 19, and TypeScript
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Architecture**: Reusable UI components with Radix UI primitives
- **Type Safety**: Full TypeScript implementation for better development experience

## ✨ Key Features

### 🔐 **Secure Authentication**
- User authentication with session management
- Protected routes and role-based access
- Secure logout with token cleanup

### 📊 **Comprehensive Dashboard**
- **Portfolio Overview**: Real-time statistics and key metrics
- **Contract Table**: Advanced search, filtering, and pagination
- **Risk Assessment**: Visual indicators for contract risk levels
- **Status Tracking**: Monitor active, expired, and renewal-due contracts

### 🔍 **Contract Details & Analysis**
- **Detailed Contract View**: Complete contract metadata and information
- **AI-Powered Analysis**: Automated contract analysis with confidence scores
- **Clause Identification**: Smart detection of important contract clauses
- **Evidence Panel**: Supporting evidence with relevance scoring
- **Risk Insights**: Automated risk assessment and recommendations

### 📈 **Analytics & Insights**
- **Portfolio Analytics**: Visual charts and performance metrics
- **Risk Distribution**: Analyze risk across your contract portfolio
- **Trend Analysis**: Track contract performance over time
- **Vendor Relationships**: Identify top partners and contract parties
- **AI Recommendations**: Actionable insights for contract optimization

### 🎨 **Modern User Experience**
- **Dark/Light Theme**: Automatic theme switching based on user preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading experiences with skeleton placeholders
- **Error Handling**: Graceful error recovery with user-friendly messages

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed on your system
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd contracthub
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### 🔑 Demo Login
- **Username**: Any username (e.g., "admin", "user", "demo")
- **Password**: `test123`

## 📱 How to Use ContractHub

### Getting Started
1. **Login**: Use the demo credentials to access the platform
2. **Dashboard**: View your contract portfolio overview and key metrics
3. **Browse Contracts**: Use the contracts table to search and filter contracts
4. **View Details**: Click on any contract to see detailed analysis and insights
5. **Analytics**: Visit the Insights page for comprehensive portfolio analytics

### Navigation Guide
- **Dashboard**: Main overview with statistics and contract table
- **Insights**: Analytics and performance metrics
- **Contract Details**: Detailed view of individual contracts (click any contract row)
- **Profile Menu**: Access user settings and logout (top-right corner)

### Key Actions
- **Search Contracts**: Use the search bar to find specific contracts
- **Filter by Status**: Filter contracts by Active, Expired, or Renewal Due
- **Filter by Risk**: View contracts by High, Medium, or Low risk levels
- **Sort Columns**: Click column headers to sort data
- **Pagination**: Navigate through large contract lists
- **View Analytics**: Access the Insights page for detailed analytics

## 🛠️ Technical Architecture

### Tech Stack
- **Frontend Framework**: Next.js 14 with App Router
- **UI Library**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 with custom design system
- **Components**: Radix UI primitives with shadcn/ui
- **State Management**: React Context API
- **Typography**: Geist Sans & Mono fonts
- **Analytics**: Vercel Analytics integration

### Project Structure
\`\`\`
contracthub/
├── app/                          # Next.js App Router pages
│   ├── api/                      # API routes
│   ├── dashboard/                # Dashboard pages
│   ├── login/                    # Authentication pages
│   └── layout.tsx                # Root layout
├── components/                   # Reusable UI components
│   ├── ui/                       # Base UI components
│   └── [feature-components]      # Feature-specific components
├── contexts/                     # React Context providers
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
└── public/                       # Static assets and data
\`\`\`

### Key Components
- **AuthContext**: Global authentication state management
- **DashboardLayout**: Main application layout with sidebar
- **ContractsTable**: Advanced data table with filtering and pagination
- **ProtectedRoute**: Route protection wrapper
- **UI Components**: Reusable components (Button, Card, Modal, etc.)

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
\`\`\`

### Environment Setup
The application uses mock data and doesn't require external services for development. All contract data is served from static JSON files and API routes.

### Customization
- **Themes**: Modify `app/globals.css` for custom color schemes
- **Components**: Extend or customize components in `components/ui/`
- **Data**: Update contract data in `public/contracts.json`
- **API**: Modify API routes in `app/api/` for different data sources

## 📊 Features Deep Dive

### Contract Management
- **Portfolio Overview**: Track total contracts, risk distribution, and expiration dates
- **Advanced Search**: Find contracts by name, parties, or any text content
- **Smart Filtering**: Filter by status (Active/Expired/Renewal Due) and risk level
- **Bulk Operations**: Manage multiple contracts efficiently

### AI-Powered Analysis
- **Automated Risk Assessment**: AI analyzes contracts for potential risks
- **Clause Detection**: Identifies important clauses with confidence scores
- **Evidence-Based Insights**: Provides supporting evidence for analysis
- **Trend Prediction**: Forecasts contract performance and risks

### Analytics Dashboard
- **Visual Charts**: Interactive charts for data visualization
- **Performance Metrics**: Track contract success rates and vendor performance
- **Time-Based Analysis**: View trends over different time periods
- **Export Capabilities**: Generate reports for stakeholders

## 🎨 Design System

### Color Palette
- **Primary**: Cyan-700 (#0e7490) - Modern SaaS brand color
- **Secondary**: Indigo-600 (#4f46e5) - Strong accent color
- **Success**: Green-600 (#16a34a) - Positive actions
- **Warning**: Amber-500 (#f59e0b) - Caution states
- **Danger**: Red-600 (#dc2626) - Error states

### Typography
- **Headings**: Geist Sans (clean, modern)
- **Body Text**: Geist Sans (readable, professional)
- **Code**: Geist Mono (technical content)

### Layout Principles
- **Mobile-First**: Responsive design starting from mobile
- **Flexbox Priority**: Use flexbox for most layouts
- **Consistent Spacing**: Tailwind spacing scale for uniformity
- **Semantic Colors**: Use design tokens for maintainable theming

## 🤝 Contributing

We welcome contributions to ContractHub! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests if applicable
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### For Business Users
- **Getting Started**: Follow the Quick Start guide above
- **Feature Questions**: Check the Features Deep Dive section
- **Demo Access**: Use username: "demo" and password: "test123"

### Contact
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: [Your contact email here]

---

**Built with ❤️ Dhanji Kumar**

*ContractHub - Making contract management simple, intelligent, and efficient.*
