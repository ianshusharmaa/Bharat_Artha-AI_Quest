# Bharat Arth-AI Quest 🎓💰

![Project Status](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38b2ac)

**Master Financial Literacy Through AI-Powered Games**

> "Financial Education Reimagined with AI"

Bharat Arth-AI Quest is an interactive educational platform designed to teach essential financial concepts to students through gamification. By combining storytelling, simulations, and quizzes, the application makes learning about savings, insurance, and investments engaging and accessible.

---

## 📸 Screenshots

| Dashboard | Profile & Achievements |
|:---:|:---:|
| <img src="public/screenshots/dashboard.png" alt="Game Modes" width="400"/> *Note: Add your dashboard screenshot here* | <img src="public/screenshots/profile.png" alt="Profile" width="400"/> *Note: Add your profile screenshot here* |

---

## 📖 Table of Contents

- [About the Project](#about-the-project)
- [Key Features](#key-features)
- [Game Modes](#game-modes)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Authors](#authors)

---

## 🌟 About the Project

Financial literacy is a critical life skill often overlooked in traditional curriculums. **Bharat Arth-AI Quest** bridges this gap by providing a safe, simulated environment where user decisions have real-time feedback but no real-world risk. The platform is designed to be accessible to a wide audience with bilingual support and offline capabilities.

---

## ✨ Key Features

- **🗣️ Bilingual Guidance**: Full support for **English** and **Hindi**, making financial education accessible to a broader audience.
- **🤖 AI-Powered Learning**: Adaptive content that evolves with the user's progress.
- **📴 Offline-Friendly**: Audio narrators and progress trackers work seamlessly even with intermittent internet connectivity.
- **🏆 Gamification**: Earn badges, maintain streaks, and climb the leaderboard.
- **📊 Real-time Analytics**: Visualize the impact of financial decisions on savings and happiness.

---

## 🎮 Game Modes

### 1. 📖 Story Mode
Interactive narratives where users navigate real-life financial scenarios. Make choices that affect the protagonist's financial well-being.

### 2. 📝 Quiz Mode
Test your knowledge with varying difficulty levels. Earn "Financial Guru" and "Quiz Master" badges for perfect scores.

### 3. 💳 Financial Simulator
A sandbox environment to practice the three pillars of finance:
- **Savings & Budgeting** (e.g., The 50-30-20 Rule)
- **Insurance & Protection** (Managing risk)
- **Investments & Growth** (Understanding ROI)

### 4. 🗺️ Map Journey (Snake & Ladder)
A board-game style experience where good financial habits move you up, and poor decisions slide you down.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context API
- **Audio**: Custom hooks for Text-to-Speech (`useTextToSpeech`)

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- **Node.js**: Version 18.17 or later (Required for Next.js 14+)
- **npm**: Package manager (comes with Node.js)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/your-username/student-financial-study-game.git
    cd student-financial-study-game
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Open the application**
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```bash
c:\student-financial-study-game
├── public/                 # Static assets (images, sounds, icons)
│   └── sounds/             # Audio files for narrations/effects
├── src/
│   ├── app/                # Next.js App Router (Pages & Routes)
│   │   ├── game/           # Game Logic (Quiz, Simulation, Story)
│   │   │   ├── quiz/           # Quiz Mode Implementation
│   │   │   ├── simulation/     # Financial Simulator Logic
│   │   │   ├── snake-ladder/   # Map Journey Game
│   │   │   └── story/          # Interactive Story Mode
│   │   ├── profile/        # User Profile & Stats Page
│   │   ├── layout.tsx      # Root Layout (wraps all pages)
│   │   └── page.tsx        # Home/Landing Page
│   ├── components/         # Reusable UI Components
│   │   ├── Achievements.tsx # Displays user badges and rewards
│   │   ├── Leaderboard.tsx  # Ranking system display
│   │   ├── Navbar.tsx       # Top navigation bar
│   │   ├── OfflineAudioNarrator.tsx # Audio feedback system
│   │   └── ...
│   ├── context/            # Global State Management
│   │   └── LanguageContext.tsx # Handles English/Hindi switching
│   ├── data/               # Static Data & Game Content
│   │   ├── financialEducation.ts # Core educational content
│   │   ├── questions.ts    # Quiz questions database
│   │   └── story.ts        # Interactive story scenarios
│   └── hooks/              # Custom React Hooks
│       └── useTextToSpeech.ts # Hook for audio narration
├── package.json            # Dependencies & Scripts
├── next.config.ts          # Next.js Configuration
└── tsconfig.json           # TypeScript Configuration
```

---

## 🤝 Contributing

We welcome contributions to make financial literacy accessible to everyone!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 👥 Authors

- **Team Bharat Arth** - *Initial Work & Development*

For any queries, please check the [USER_GUIDE.md](USER_GUIDE.md) or contact the development team.

---

*Built with ❤️ for Financial Literacy in India*
