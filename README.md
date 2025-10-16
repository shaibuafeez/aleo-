# Move By Practice 🌊

> Learn Sui Move by building real projects - completely in your browser!

![Move By Practice](https://img.shields.io/badge/Sui-Move-4DA2FF?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🚀 Features

- ✨ **Zero Installation** - Everything runs in your browser
- 🎮 **Gamified Learning** - XP, levels, achievements, and streaks
- 💻 **Monaco Editor** - Full Move syntax highlighting and auto-completion
- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔗 **Sui Integration** - Deploy contracts directly to testnet

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations

### Editor & Compiler
- **Monaco Editor** - VS Code-like editing experience
- **Custom Move Language** - Full syntax highlighting
- **WASM Compiler** - Browser-based compilation (coming soon)

### State & Blockchain
- **Zustand** - Lightweight state management
- **@mysten/dapp-kit** - Sui wallet integration
- **IndexedDB** - Persistent local storage

## 🎯 Current Progress

### ✅ Completed (MVP Phase 1)
- [x] Next.js 15 setup with TypeScript
- [x] Monaco Editor with Move syntax highlighting
- [x] Zustand state management for XP/progress
- [x] Sui blockchain integration
- [x] Split-screen lesson layout
- [x] Gamification UI (XP bar, confetti, level-up)
- [x] First lesson: "Your First Sui Object"
- [x] Framer Motion animations
- [x] Beautiful homepage with gradient design

### 🔄 In Progress
- [ ] Move WASM compiler integration
- [ ] Additional lessons (2-14)
- [ ] Achievement system
- [ ] Leaderboard

### 📋 Upcoming
- [ ] Real-time multiplayer challenges
- [ ] NFT certificates on Sui
- [ ] Code playground with sharing
- [ ] AI debugging assistant

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 📚 Project Structure

```
move-by-practice/
├── app/
│   ├── components/
│   │   ├── editor/
│   │   │   └── MoveEditor.tsx          # Monaco editor with Move syntax
│   │   ├── lessons/
│   │   │   └── LessonView.tsx          # Split-screen lesson UI
│   │   ├── gamification/
│   │   │   ├── XPProgress.tsx          # XP bar with animations
│   │   │   └── Confetti.tsx            # Celebration effects
│   │   └── layout/
│   ├── lib/
│   │   ├── store/
│   │   │   └── gameStore.ts            # Zustand game state
│   │   ├── sui/
│   │   │   └── SuiProvider.tsx         # Sui wallet provider
│   │   ├── lessons/
│   │   │   └── lesson1.ts              # Lesson content
│   │   └── compiler/                    # (Coming soon)
│   ├── types/
│   │   └── lesson.ts                    # TypeScript types
│   ├── lessons/[id]/
│   │   └── page.tsx                     # Dynamic lesson routes
│   ├── layout.tsx                       # Root layout with providers
│   └── page.tsx                         # Homepage
├── public/
│   └── assets/
└── PLATFORM_BLUEPRINT.md                # Full platform vision
```

## 🎓 Lesson Structure

Each lesson includes:

- **Tutorial Content** - Explanation with examples
- **Code Editor** - Pre-filled starter code
- **Hints System** - Progressive help
- **Validation** - Instant feedback on solutions
- **XP Rewards** - Gamification incentives

### Lesson 1: Your First Sui Object
Learn to create a simple NFT with:
- Object fundamentals
- UID and ownership
- Abilities (key, store)
- Entry functions

## 🎨 Design System

### Colors
```css
--sui-cyan: #4DA2FF
--sui-blue: #1F4788
--success: #00D4AA
--xp-gold: #FFD700
--bg-dark: #0F1419
```

### Typography
- **Sans**: Geist Sans
- **Mono**: Geist Mono

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Lessons

1. Create lesson file in `app/lib/lessons/`:
```typescript
import { LessonContent } from '@/app/types/lesson';

export const lesson2: LessonContent = {
  id: 'lesson-2',
  title: 'Ownership & Transfer',
  // ... rest of content
};
```

2. Add to lesson map in `app/lessons/[id]/page.tsx`

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Other Platforms
```bash
npm run build
npm run start
```

## 🤝 Contributing

We welcome contributions!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License

## 🙏 Acknowledgments

- [Sui Foundation](https://sui.io) - For the amazing blockchain
- [CryptoZombies](https://cryptozombies.io) - Gamification inspiration
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Pontem Network](https://pontem.network) - Move WASM compiler reference

---

**Built with ❤️ for the Sui community**

🌊 Start learning Move today - no installation required!
