---
name: Memory Phone Numbers Game
overview: Build a mobile-first memory game for phone numbers with splash screen, contact management (add/edit/delete), and play mode with shuffle, check, and next functionality. All data persisted in localStorage.
todos:
  - id: setup-types
    content: Create TypeScript types for Contact interface in src/types/contact.ts
    status: pending
  - id: setup-storage
    content: Create contactStorage service for localStorage CRUD operations in src/services/contactStorage.ts
    status: pending
  - id: setup-hook
    content: Create useContacts hook in src/hooks/useContacts.ts for React state management
    status: pending
  - id: navigation
    content: Update App.tsx to handle screen navigation (splash, contact list, play)
    status: pending
  - id: splash-screen
    content: Create SplashScreen component with navigation buttons
    status: pending
  - id: contact-list
    content: Create ContactList component to display all contacts
    status: pending
  - id: contact-item
    content: Create ContactItem component with edit/delete actions
    status: pending
  - id: contact-form
    content: Create ContactForm component for add/edit functionality
    status: pending
  - id: play-screen
    content: Create PlayScreen component with shuffle, check, and next functionality
    status: pending
  - id: phone-keypad
    content: Create optional PhoneKeypad component for mobile UX
    status: pending
  - id: pwa-setup
    content: Install and configure vite-plugin-pwa in vite.config.ts for offline support
    status: pending
  - id: styling
    content: Apply mobile-first styling with Tailwind CSS for phone-like interface
    status: pending
---

# Memory Phone Numbers Game Implementation Plan

## Architecture Overview

The app will have three main screens with simple state-based navigation:

1. **Splash Screen** - Welcome screen with navigation buttons
2. **Contact List** - Manage contacts (add/edit/delete)
3. **Play Screen** - Memory game with shuffle, check, and next functionality

Data will be persisted in `localStorage` using a simple JSON structure. The app will use React hooks for state management and Tailwind CSS for mobile-first styling.

## Data Structure

Contacts will be stored in `localStorage` under the key `"memory-phonenumbers-contacts"` as a JSON array:

```typescript
interface Contact {
  id: string;
  name: string;
  number: string;
}
```

## Implementation Steps

### 1. Core Data Layer

- Create `src/services/contactStorage.ts` - Service for localStorage operations (CRUD)
- Create `src/hooks/useContacts.ts` - React hook wrapping contact storage with state management
- Create `src/types/contact.ts` - TypeScript interfaces for Contact

### 2. Navigation System

- Create `src/components/Navigation.tsx` - Simple navigation component or context
- Update `src/App.tsx` - Main router component managing screen state

### 3. Splash Screen

- Create `src/components/SplashScreen.tsx` - Welcome screen with buttons to navigate to Contact List and Play screen

### 4. Contact List Screen

- Create `src/components/ContactList.tsx` - Display list of contacts
- Create `src/components/ContactItem.tsx` - Individual contact row with edit/delete actions
- Create `src/components/ContactForm.tsx` - Form for adding/editing contacts (modal or inline)
- Add floating action button (FAB) with plus icon for adding new contacts

### 5. Play Screen

- Create `src/components/PlayScreen.tsx` - Main game screen
- Create `src/components/PhoneKeypad.tsx` - Visual keypad component (optional, for mobile UX)
- Implement shuffle logic to randomize contact order
- Display current contact name
- Number input field (supports keyboard input)
- Check button to validate answer
- Next button to proceed to next contact
- Feedback display (correct/incorrect message)

### 6. Offline-First / PWA Setup

- Install `vite-plugin-pwa` as a dev dependency (requires user approval)
- Update `vite.config.ts` - Configure VitePWA plugin with:
  - `registerType: 'autoUpdate'` - Service worker auto-updates
  - Manifest configuration (name, icons, theme color)
  - Workbox strategies for caching static assets
- The plugin will automatically generate a service worker that caches all static assets
- Optionally create `public/offline.html` - Custom offline fallback page
- Update `index.html` - Add manifest link and meta tags for PWA

### 7. Styling & Mobile Optimization

- Update `src/index.css` - Base styles for mobile-first design
- Ensure all components are touch-friendly (minimum 44x44px touch targets)
- Implement responsive layout for phone-like interface

## File Structure

```
src/
├── App.tsx (updated - main router)
├── components/
│   ├── SplashScreen.tsx
│   ├── ContactList.tsx
│   ├── ContactItem.tsx
│   ├── ContactForm.tsx
│   ├── PlayScreen.tsx
│   └── PhoneKeypad.tsx (optional)
├── hooks/
│   └── useContacts.ts
├── services/
│   └── contactStorage.ts
└── types/
    └── contact.ts
```

## Key Features

- **Offline-first**: 
  - Service worker caches all static assets (HTML, CSS, JS, images)
  - All app data in localStorage (works offline)
  - App functions completely offline after first load
- **Mobile-first**: Touch-friendly UI, phone-like interface
- **PWA-ready**: Can be installed as a Progressive Web App
- **Keyboard support**: Number input works with physical keyboard
- **Contact management**: Full CRUD operations
- **Game flow**: Shuffle → Display name → Enter number → Check → Next

## Technical Decisions

### Offline-First Strategy

- **Service Worker**: Use `vite-plugin-pwa` to automatically generate and register a service worker
  - Caches all static assets (HTML, CSS, JS, images) on first load
  - Uses Workbox under the hood for reliable caching strategies
  - Auto-updates when new version is available
- **Data Persistence**: Use `localStorage` (simpler than IndexedDB for this use case)
  - Contacts stored in `localStorage` persist across sessions
  - Works completely offline after initial app load
- **PWA Manifest**: Configured via `vite-plugin-pwa` for installability
  - Uses existing favicon assets for PWA icons
  - Enables "Add to Home Screen" on mobile devices

### Other Decisions

- Simple state-based navigation (no React Router needed for 3 screens)
- Generate contact IDs using `crypto.randomUUID()` or timestamp-based IDs
- Phone number validation: Accept any string (flexible for "number-like data")
- Shuffle algorithm: Fisher-Yates shuffle for randomizing contact order
