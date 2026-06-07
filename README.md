# CryptoGPT - AI-Powered Cryptocurrency Trading Platform

Advanced AI-powered cryptocurrency trading platform. Leverage cutting-edge algorithms and machine learning for optimal trading strategies.

## 📋 Requirements

### Node.js
- **Node.js**: `20.14.0` (required)
- **Package Manager**: Yarn (recommended) or npm

> ⚠️ **Note**: This project requires Node.js version 20.14.0. Make sure you have the correct version installed before proceeding.

### Check your Node version
```bash
node --version
```

If you need to install or switch Node versions, consider using:
- [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager)
- [fnm](https://github.com/Schniz/fnm) (Fast Node Manager)

## 🚀 Getting Started

### Installation

#### Using Yarn (Recommended)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8083`

#### Using NPM

```bash
# Install dependencies
npm install
# OR if you encounter peer dependency issues:
npm install --legacy-peer-deps

# Start development server
npm run dev
```

## 📜 Available Scripts

- `npm run dev` - Start development server on port 8083
- `npm run start` - Start production server on port 8083
- `npm run build` - Build the application for production
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Automatically fix ESLint issues
- `npm run prettier` - Format code using Prettier
- `npm run ts` - Run TypeScript type checking
- `npm run ts:watch` - Run TypeScript type checking in watch mode
- `npm run rm:all` - Remove all build artifacts and node_modules
- `npm run re:start` - Clean install and start development server
- `npm run re:build` - Clean install and build for production

## 🛠️ Tech Stack

### Core
- **Next.js** 14.0.4 - React framework
- **React** 18.2.0 - UI library
- **TypeScript** 5.3.3 - Type safety

### UI & Styling
- **Material-UI (MUI)** 5.14.20 - Component library
- **Tailwind CSS** 3.4.1 - Utility-first CSS
- **Emotion** - CSS-in-JS
- **Framer Motion** - Animation library

### Backend & Database
- **Supabase** - Backend as a Service (BaaS)
- **Trigger.dev** - Background jobs and cron tasks

### Blockchain & Web3
- **wagmi** 2.12.7 - React Hooks for Ethereum
- **viem** 2.x - TypeScript Ethereum library
- **ethers** 6.13.0 - Ethereum library
- **@metamask/sdk-react** - MetaMask integration
- **@web3modal/wagmi** - Web3Modal integration

### AI & Machine Learning
- **OpenAI** 4.53.2 - AI capabilities

### Payment Processing
- **Stripe** 16.2.0 - Payment processing

### Additional Libraries
- **Axios** - HTTP client
- **React Query** - Data fetching
- **Zustand** - State management
- **React Hook Form** - Form management
- **i18next** - Internationalization
- **ApexCharts** - Charting library
- **Recharts** - Charting library
- And many more...

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_JWT_SECRET=your_supabase_jwt_secret

# UI review
NEXT_PUBLIC_ENABLE_DEMO_USER=true

# Add other environment variables as needed
```

> ⚠️ **Important**: Never commit `.env.local` or any environment files to version control. They are already included in `.gitignore`.

## 📁 Project Structure

```
root/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   └── home/         # Home page
│   ├── components/       # Reusable UI components
│   ├── sections/         # Page sections
│   ├── layouts/          # Layout components
│   ├── theme/            # Theme configuration
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   ├── routes/           # Route configuration
│   ├── store/            # State management
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── trigger/          # Trigger.dev jobs
├── public/               # Static assets
├── .next/                # Next.js build output (generated)
└── node_modules/         # Dependencies (generated)
```

## 🔧 Configuration

### Next.js Configuration
- Port: `8083`
- Trailing slash: Enabled
- Image domains: Configured in `next.config.js`

### TypeScript Configuration
- Strict mode: Enabled
- Target: ES5
- Module: ESNext

### ESLint Configuration
- Airbnb configuration
- TypeScript support
- Prettier integration

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

## 📝 Development Guidelines

1. **Code Style**: Follow the ESLint and Prettier configurations
2. **Type Safety**: Always use TypeScript types
3. **Components**: Use functional components with hooks
4. **State Management**: Use Zustand for global state
5. **API Routes**: Use Next.js API routes in `src/app/api/`
6. **Styling**: Prefer Material-UI components with custom styling when needed

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run ts` to check for errors
4. Commit your changes
5. Push to the branch
6. Create a Pull Request

## 📄 License

This project is private and proprietary.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Material-UI Documentation](https://mui.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Trigger.dev Documentation](https://trigger.dev/docs)

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ using Next.js, React, and TypeScript**
