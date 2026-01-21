# Leo By Practice 🦁

> Learn Aleo's Leo language by building real projects - completely in your browser!

![Leo By Practice](https://img.shields.io/badge/Aleo-Leo-0E1525?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)

## 🚀 Features

- ✨ **Zero Installation** - Everything runs in your browser
- 🎮 **Gamified Learning** - XP, levels, achievements, and streaks
- 💻 **Monaco Editor** - Full Leo syntax highlighting and auto-completion
- 🎨 **Beautiful UI** - Glassmorphism design with smooth animations
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🔗 **Aleo Integration** - Deploy contracts directly to testnet (Coming Soon)

### Editor & Compiler
- **Monaco Editor** - VS Code-like editing experience
- **Custom Leo Language** - Full syntax highlighting
- **Leo Compiler** - Browser-based compilation (simulated)

### State & Blockchain
- **Zustand** - Lightweight state management
- **IndexedDB** - Persistent local storage

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
leo-by-practice/
├── app/
│   ├── components/
│   │   ├── editor/
│   │   │   └── LeoEditor.tsx           # Monaco editor with Leo syntax
│   │   ├── lessons/
│   │   │   └── LessonView.tsx          # Split-screen lesson UI
│   │   ├── gamification/
│   │   │   ├── XPProgress.tsx          # XP bar with animations
│   │   │   └── Confetti.tsx            # Celebration effects
│   │   └── layout/
│   ├── lib/
│   │   ├── store/
│   │   │   └── gameStore.ts            # Zustand game state
│   │   ├── lessons/
│   │   │   └── leo-lesson1.ts          # Lesson content
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

### Lesson 1: Hello Leo!
Learn the fundamentals of Leo programming:
- Programs in Leo
- Types & Variables
- Transitions & Functions

## 🎨 Design System

### Colors
```css
--aleo-green: #00FFB3
--aleo-navy: #0E1525
--success: #00D4AA
--xp-gold: #FFD700
--bg-white: #FFFFFF
```

### Typography
- **Sans**: Inter
- **Mono**: Fira Code

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
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

- [Aleo](https://aleo.org) - For the privacy-first blockchain
- [Leo Language](https://leo-lang.org) - The programming language of ZK
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor

---

**Built with ❤️ for the Aleo community**

🦁 Start learning Leo today - no installation required!
