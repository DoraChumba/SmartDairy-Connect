# SmartDairy Connect 

A comprehensive digital platform connecting dairy farmers with cooperatives for better milk management, transparent payments, and seamless communication.

## 🌟 Features

### Core Functionality

- **Milk & Payment Dashboard** - Real-time tracking of deliveries and payments
- **AI Chatbot Support** - Multi-language assistance for common queries
- **Service Request Management** - Veterinary visits, feed supplies, and support
- **Communication Hub** - Two-way messaging and announcements
- **Mobile-First Design** - Responsive interface for all devices

### User Management

- Secure authentication with JWT tokens
- Role-based access control (Farmer, Cooperative Staff, Admin)
- User profiles and cooperative associations

### Data Management

- Milk delivery records with quality metrics
- Payment tracking and history
- Service request workflows
- Announcement and notification systems

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd smartdairy-connect
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/smartdairy_connect"

   # JWT
   JWT_SECRET="your-super-secret-jwt-key-here-change-in-production"
   JWT_EXPIRES_IN="7d"

   # API Keys (add these as you integrate services)
   OPENAI_API_KEY="your-openai-api-key"
   WHATSAPP_API_KEY="your-whatsapp-business-api-key"
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"

   # App Configuration
   NEXTAUTH_SECRET="your-nextauth-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # Environment
   NODE_ENV="development"
   ```

4. **Database Setup**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev

   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start Development Server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
smartdairy-connect/
├── src/
│   ├── app/                    # Next.js 13+ app directory
│   │   ├── api/               # API routes
│   │   │   └── auth/          # Authentication endpoints
│   │   ├── dashboard/         # Dashboard page
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/             # Reusable UI components
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx    # Authentication context
│   ├── lib/                    # Utility libraries
│   │   ├── auth.ts            # Authentication utilities
│   │   ├── db.ts              # Database client
│   │   └── api.ts             # API utilities
│   ├── types/                  # TypeScript type definitions
│   │   └── index.ts           # Core types and interfaces
│   ├── hooks/                  # Custom React hooks
│   └── utils/                  # Helper functions
├── prisma/                     # Database schema and migrations
│   └── schema.prisma          # Prisma database schema
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Technology Stack

### Frontend

- **Next.js 13+** - React framework with app directory
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Context** - State management

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📱 Current Implementation Status

### ✅ Completed

- [x] Project setup and configuration
- [x] Database schema design
- [x] Authentication system (JWT)
- [x] User registration and login
- [x] Landing page with features showcase
- [x] Dashboard with basic metrics
- [x] Responsive design and mobile optimization
- [x] TypeScript types and interfaces
- [x] API route structure

### 🚧 In Progress

- [ ] Database integration and testing
- [ ] Milk delivery recording system
- [ ] Payment tracking implementation
- [ ] Service request workflows

### 📋 Next Steps

- [ ] Set up PostgreSQL database
- [ ] Implement milk delivery API endpoints
- [ ] Create payment processing system
- [ ] Build AI chatbot integration
- [ ] Add WhatsApp Business API integration
- [ ] Implement real-time notifications
- [ ] Add data visualization charts
- [ ] Create mobile PWA capabilities

## 🔐 Authentication

The application uses JWT-based authentication with the following flow:

1. **Registration**: Users create accounts with email, phone, and password
2. **Login**: Users authenticate and receive JWT tokens
3. **Authorization**: Protected routes check JWT tokens
4. **Role-based Access**: Different user roles have different permissions

## 🗄️ Database Schema

The database includes the following main entities:

- **Users** - Farmer and staff accounts
- **Cooperatives** - Dairy cooperative organizations
- **MilkRecords** - Daily milk delivery data
- **Payments** - Payment transactions and history
- **ServiceRequests** - Veterinary and support requests
- **Announcements** - Cooperative communications
- **Messages** - Communication records

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

Make sure to set all required environment variables in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Roadmap

### Phase 1: Foundation ✅

- Basic authentication and user management
- Landing page and dashboard
- Database schema and API structure

### Phase 2: Core Features 🚧

- Milk delivery recording
- Payment tracking
- Service request management
- Basic reporting

### Phase 3: Advanced Features 📋

- AI chatbot integration
- WhatsApp Business API
- Real-time notifications
- Advanced analytics

### Phase 4: Scale & Optimize 📋

- Performance optimization
- Mobile PWA
- Multi-language support
- Advanced security features

---

**SmartDairy Connect** - Empowering Dairy Farmers Through Digital Access. 
