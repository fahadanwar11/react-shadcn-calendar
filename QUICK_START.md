# Quick Reference Guide

## 📦 What's Been Set Up

Your calendar component is now ready to be published as an npm package!

### ✅ Package Structure
```
calendar-npm/
├── src/
│   ├── components/           # All React components
│   │   ├── ui/              # shadcn UI component wrappers
│   │   ├── YearCalendar.tsx
│   │   ├── MonthGrid.tsx
│   │   ├── EventDialog.tsx
│   │   ├── EventLegend.tsx
│   │   └── calendar.css
│   ├── types/               # TypeScript type definitions
│   │   └── CalendarEvent.ts
│   └── index.ts            # Main entry point (exports)
├── package.json            # Package configuration
├── tsconfig.json          # TypeScript configuration
├── tsup.config.ts         # Build configuration
├── .gitignore             # Git ignore rules
├── .npmignore             # npm publish ignore rules
├── README.md              # Package documentation
├── LICENSE                # MIT License
└── PUBLISHING.md          # Publishing guide
```

## 🚀 Next Steps

### 1. Install Dependencies
```bash
cd c:\Users\Dell\Desktop\calendar-npm
npm install
```

### 2. Build the Package
```bash
npm run build
```
This creates a `dist/` folder with:
- `index.js` (CommonJS)
- `index.mjs` (ES Module)
- `index.d.ts` (TypeScript declarations)
- `index.css` (Bundled styles)

### 3. Test Locally
```bash
npm pack
```
This creates a `.tgz` file you can install in another project to test.

### 4. Customize Before Publishing
Update these in `package.json`:
- `name`: Change `@fahadanwar11/react-shadcn-calendar` to your actual npm username
- `author`: Add your name
- `repository`: Add your GitHub repo URL

### 5. Publish to npm
```bash
npm login
npm publish --access public
```

## 📝 Important Notes

### Dependencies
Users of your package will need:
- React 18+
- shadcn/ui components (dialog, button, input, label, select)
- Tailwind CSS
- sonner (for toast notifications)

### Usage Example
After publishing, users can install it:
```bash
npm install @fahadanwar11/react-shadcn-calendar
```

And use it:
```tsx
import { YearCalendar } from '@fahadanwar11/react-shadcn-calendar';
import '@fahadanwar11/react-shadcn-calendar/styles.css';

<YearCalendar year={2026} events={[]} />
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Build and watch for changes
npm run dev

# Create package archive (for testing)
npm pack

# Publish to npm
npm publish
```

## 📚 Additional Resources

- See [README.md](README.md) for full documentation
- See [PUBLISHING.md](PUBLISHING.md) for detailed publishing guide
- shadcn/ui docs: https://ui.shadcn.com
- npm publishing docs: https://docs.npmjs.com/cli/v8/commands/npm-publish

## 🎨 Customization Ideas

Before publishing, you might want to:
1. Add more event types beyond HOLIDAY and SALARY_DAY
2. Add dark mode support
3. Make colors customizable via props
4. Add month-only view component
5. Add week view component
6. Add date range selection
7. Add recurring events support

## ⚠️ Before First Publish

- [ ] Update package name in package.json
- [ ] Update author information
- [ ] Add your GitHub repository URL
- [ ] Test build: `npm run build`
- [ ] Test locally with `npm pack`
- [ ] Review README.md
- [ ] Add your name to LICENSE
- [ ] Create GitHub repository
- [ ] Test in a real project
- [ ] Login to npm: `npm login`
- [ ] Publish: `npm publish --access public`

Good luck with your npm package! 🎉
