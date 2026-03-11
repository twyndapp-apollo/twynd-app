# Twynd - Relationship Connection App

A comprehensive relationship connection platform with real-time messaging, gamified activities, and AI-powered insights.

## 📋 Project Overview

**Twynd** is a mobile-first web application that helps couples (or any two people in a relationship) connect deeper through:

- **Social Login**: SignUp via TikTok, Google, Facebook, or Email
- **Profile Setup**: Customize your profile with avatar, nickname, optional personal details
- **Room-based Connection**: Create or join rooms via QR codes or room codes
- **Games & Activities**: Interactive games to explore compatibility and connection
- **Real-time Messaging**: Chat sessions with reactions and multimedia support
- **AI-Powered Insights**: On-device and cloud AI to track relationship metrics
- **Dashboard**: Vibes, milestones, and personalized insights

## 🏗️ Architecture

### Monorepo Structure

```
twynd-app/
├── apps/
│   └── mobile/              # React Native / Expo app
│       ├── src/
│       │   ├── screens/     # Screen components
│       │   ├── context/     # Global state (UserContext)
│       │   └── App.tsx      # Entry point
│       └── package.json
├── packages/
│   └── shared/              # Shared types, constants, API clients
│       ├── src/
│       │   ├── constants.ts # App-wide constants & external links
│       │   ├── types.ts     # TypeScript types
│       │   ├── api.ts       # API client utilities
│       │   ├── utils.ts     # Helper functions
│       │   └── index.ts     # Export all
│       └── package.json
├── server/                  # Fastify backend
│   ├── src/
│   │   ├── index.ts        # Main server entry
│   │   ├── routes/         # API route files
│   │   ├── handlers/       # Route handlers
│   │   ├── middleware/     # Auth, validation
│   │   └── utils/          # Server utilities
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── package.json
└── package.json
```

## 🔄 User Flow

### 1. Authentication
```
SignUp Screen → Email/Social Auth → Generate User Account
```

### 2. Profile Setup
```
Required: Avatar + Nickname
Optional: Birth Date, Language, Country, Description
Privacy Controls: Who sees age, zodiac, birthday, location
```

### 3. Room Connection
```
Create Room (QR Code + Room Code) → OR → Join Room (Scan/Enter Code)
```

### 4. Main App
```
Home → Games/Chat → Real-time Messaging → Insights Dashboard
```

## 🛠️ Tech Stack

### Mobile
- **Framework**: React Native / Expo
- **State Management**: React Context API
- **Async Storage**: @react-native-async-storage
- **Language**: TypeScript

### Server
- **Runtime**: Node.js
- **Framework**: Fastify
- **Authentication**: JWT
- **Database**: PostgreSQL
- **ORM**: Prisma
- **WebSocket**: Fastify WebSocket

### Shared
- **Types**: TypeScript
- **Constants**: Centralized configuration
- **Utilities**: Helper functions, date/time, validation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   cd apps/mobile && npm install && cd ../..
   cd server && npm install && cd ../..
   ```

2. **Setup database**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   npm run db:migrate
   cd ..
   ```

3. **Setup environment variables**
   - Server: `server/.env` (auth keys, API keys, database)
   - Mobile: `.env` or hardcoded (can use shared constants)

4. **Start development**
   ```bash
   # Terminal 1: Start server
   cd server
   npm run dev

   # Terminal 2: Start mobile
   cd apps/mobile
   npm start
   ```

## 📱 Mobile App Screens

- **SignUpScreen**: Email or social login
- **ProfileSetupScreen**: Complete profile information
- **RoomSelectionScreen**: Create or join room via QR/code
- **HomeScreen**: Main app with games, chat, menu
- Content modules (not yet implemented):
  - ChatScreen: Real-time messaging
  - GamesScreen: Game selection and play
  - VibesScreen: Insights dashboard
  - UsScreen: Partner profiles and compatibility
  - SettingsScreen: Account & subscription

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/signin` - Login user
- `POST /auth/verify` - Verify JWT token

### Users
- `GET /users/profile` - Get user profile
- `PATCH /users/profile` - Update profile
- `PATCH /users/status` - Update status emoji/message

### Rooms
- `POST /rooms` - Create new room
- `GET /rooms/:roomId` - Get room details
- `POST /rooms/join` - Join existing room
- `GET /rooms/:roomId/qrcode` - Get QR code
- `POST /rooms/accept-connection` - Accept connection

### Chat
- `GET /chat/sessions` - List chat sessions
- `POST /chat/sessions` - Create new session (with optional game)
- `GET /chat/sessions/:id/messages` - Get messages
- `POST /chat/sessions/:id/messages` - Send message
- `PATCH /chat/messages/:id/read` - Mark as read

### Games
- `GET /games/:gameType/questions` - Get game questions
- `POST /chat/sessions/:id/game-result` - Submit game result

## 📦 Shared Package Contents

### Constants (`constants.ts`)
- Auth providers
- External API links (OAuth, Affiliate services, Gemini API)
- Games configuration
- Zodiac signs, reactions
- Milestones
- Validation rules
- AI configuration

### Types (`types.ts`)
- `UserProfile`
- `ChatSession`, `Message`
- `Room`, `RoomRole`
- `Subscription`
- `AIInsight`
- All TypeScript interfaces

### API Client (`api.ts`)
Pre-configured clients for:
- Authentication
- Users
- Rooms
- Chat
- Games
- Subscriptions
- Insights

### Utilities (`utils.ts`)
- Date/time helpers (zodiac, age calculation, formatting)
- Validation (email, nickname, birth date)
- QR code generation
- Relationship duration
- Avatar utilities

## 🎮 Games Architecture

Games are pluggable with minimal code changes:

```typescript
// Add new game → Update GAME_CONFIG in constants.ts
// Create questions → Add to server game routes
// UI → Automatically renders in HomeScreen
```

## 🔐 Security Features

- **JWT Authentication**: Token-based auth with expiry
- **Protected Routes**: preHandler middleware on all sensitive endpoints
- **CORS**: Configured to frontend domain
- **Helmet**: Security headers
- Input validation (email, nickname length, etc.)

## 🧠 AI Integration (Placeholder)

**On-Device AI**:
- Tracks: communication, intimacy, conflict resolution, spark metrics
- Runs daily when lead's phone is charging
- Analyzes game answers and messages

**Cloud AI (Gemini 2.5 Flash)**:
- Generates milestone poems
- Costs $0 on free tier quota
- Called when milestones are achieved

(Currently architecture only - integrate with on-device ML and Gemini API when ready)

## 🚧 Not Yet Implemented

- [ ] Real-time WebSocket chat relay
- [ ] QR code scanning
- [ ] Cloud backup sync
- [ ] Subscription management
- [ ] Milestone tracking
- [ ] AI insights generation
- [ ] Affiliate store integration
- [ ] Widget support
- [ ] Push notifications
- [ ] File uploads (avatars, photos)

## 📝 Database Schema Highlights

- **Users**: Profiles, authentication, privacy settings
- **Rooms**: One room = one couple connection
- **RoomMembers**: Track lead/follower roles
- **ChatSessions**: Conversations, optionally tied to games
- **Messages**: Real-time chat with read tracking
- **Subscriptions**: Trial, active, cancelled states
- **Milestones**: Achievements with AI-generated content

## 🔗 External Integration Placeholders

Place actual keys in `server/.env`:

```env
GOOGLE_CLIENT_ID=
FACEBOOK_APP_ID=
TIKTOK_CLIENT_ID=
GEMINI_API_KEY=
```

## 🎯 Next Steps

1. **Database Setup**: Run Prisma migrations
2. **API Testing**: Use Postman/curl to test endpoints
3. **Mobile Integration**: Connect mobile app to running server
4. **Game Implementation**: Add full game logic and results processing
5. **WebSocket Setup**: Implement real-time message relay
6. **AI Integration**: Connect Gemini API for insights

## 📚 Key Files

- **App Entry**: `apps/mobile/App.tsx`
- **Navigation Flow**: See AppContent() in App.tsx
- **User State**: `apps/mobile/src/context/UserContext.tsx`
- **Shared Constants**: `packages/shared/src/constants.ts`
- **Server Routes**: `server/src/routes/`
- **Database Schema**: `server/prisma/schema.prisma`

## 💡 Design Philosophy

- **Modular**: Each feature is loosely coupled
- **Scalable**: Games and features can be added without breaking existing code
- **User-Centric**: All data is organized around the relationship room
- **Privacy-First**: Users control what information is shared
- **Flexible**: On-device AI can be swapped, external APIs are in shared constants

---

**Built with ❤️ for deeper connections**
