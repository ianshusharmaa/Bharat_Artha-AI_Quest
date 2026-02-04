# 🛠️ Developer Reference - Financial Simulator

## Project Structure

```
src/
├── app/
│   ├── game/
│   │   ├── simulation/
│   │   │   └── page.tsx          ← MAIN GAME PAGE (React Component)
│   │   └── page.tsx              ← Game Mode Selection
│   └── page.tsx                  ← Home/Language Selection
├── components/
│   ├── OfflineAudioNarrator.tsx   ← Audio playback (Web Speech API)
│   ├── OfflineProgressTracker.tsx ← Progress storage (localStorage)
│   └── DecisionImpactVisualization.tsx ← Consequence display
├── data/
│   ├── financialThemes.ts         ← Game scenarios & data (10 scenarios)
│   └── financialEducation.ts      ← Educational content & glossary
└── assets/
    └── styles/                    ← Tailwind CSS (TailwindCSS 4)
```

---

## Key Data Structures

### SimulationScenario (Main Decision Unit)
```typescript
interface SimulationScenario {
  id: string;                      // Unique ID (e.g., 'savings_1')
  theme: 'savings' | 'insurance' | 'investment';
  scenario: string;                // The question/situation
  choices: DecisionChoice[];       // 3 decision options
  longTermConsequence?: {          // Optional timeline data
    months: number;
    description: string;
    impact: number;
  };
}
```

### DecisionChoice (Each Option)
```typescript
interface DecisionChoice {
  text: string;                    // Option text (emoji + description)
  shortTerm: {
    money: number;                 // ₹ gained/lost
    message: string;               // Immediate feedback
  };
  longTerm: {
    savings: number;               // Total accumulated
    risk: number;                  // 0-100 risk score
    wisdom: number;                // 0-100 wisdom points
    message: string;               // Long-term impact
  };
}
```

### PlayerStats (Game State)
```typescript
interface PlayerStats {
  money: number;                   // Virtual ₹ (starts at 10000)
  wisdom: number;                  // Knowledge (0-500+)
  safetyScore: number;             // Insurance knowledge
  wealthGrowth: number;            // Investment knowledge
}
```

---

## Component APIs

### OfflineAudioNarrator
```typescript
<OfflineAudioNarrator 
  text={scenarioText}              // What to read
  language="en"                     // 'en' or 'hi'
  autoPlay={false}                  // Auto-start on load
  theme="savings"                   // Color theme
/>
```
**Features:**
- Web Speech API (100% offline)
- Works in English & Hindi
- No external dependencies
- Single button UI

### OfflineProgressTracker
```typescript
<OfflineProgressTracker />
```
**Features:**
- Reads/writes from localStorage
- Shows 4 main stats
- Theme-wise progress bars
- Auto-refresh every 5 seconds
- Reset functionality

---

## Game Flow

### Phase 1: Theme Selection
```
User opens /game/simulation
  ↓
Sees 3 theme cards (Savings, Insurance, Investment)
  ↓
Clicks one theme
  ↓
State: currentThemeIdx = 0/1/2
  ↓
Progress bar shows 0/3 scenarios
```

### Phase 2: Scenario Loop (Per Theme)
```
Show Scenario (currentScenarioIdx)
  ↓
User reads/listens to situation
  ↓
3 clickable choice buttons appear
  ↓
User clicks choice → handleChoice(idx)
  ↓
- Calculate new stats
- Update playerStats state
- Save to decisions array
- showResult = true
  ↓
Show impacts + next/menu buttons
  ↓
User clicks "Next" → nextScenario()
  ↓
If more scenarios: increment currentScenarioIdx
If done: alert + reset theme
```

### Phase 3: Stats Updates
```
Each Decision:
- money ± choice.shortTerm.money
- wisdom += choice.longTerm.wisdom
- If insurance theme: safetyScore += wisdom
- If investment theme: wealthGrowth += wisdom
```

---

## Adding New Scenarios

### Step 1: Add to financialThemes.ts
```typescript
const myNewScenario: SimulationScenario = {
  id: 'savings_4',  // Unique ID
  theme: 'savings', // Which theme
  scenario: 'Your situation text here',
  choices: [
    {
      text: '✓ Good Choice Text',
      shortTerm: { 
        money: 0,                    // Money impact
        message: 'Immediate feedback' 
      },
      longTerm: {
        savings: 1000,               // Long-term money
        risk: 10,                    // Risk %
        wisdom: 90,                  // Wisdom gain
        message: 'Future impact...'
      }
    },
    // ... 2 more choices
  ]
};

// Then add to array:
export const savingsScenarios = [
  // ... existing
  myNewScenario  // ← Add here
];
```

### Step 2: Test
```bash
npm run dev
# Open http://localhost:3001/game/simulation
# Select Savings theme
# Your new scenario appears
```

---

## Styling Guide

### Color Themes (Tailwind)
- **Savings**: Green (`from-green-500`)
- **Insurance**: Blue (`from-blue-500`)
- **Investment**: Purple (`from-purple-500`)

### Component States
- **Good Decision** (wisdom >= 80): Green border + bg
- **Medium Decision** (40-79 wisdom): Yellow border + bg
- **Bad Decision** (wisdom < 40): Red border + bg

### Responsive Classes
```
sm:   // Small screens (640px+)
md:   // Medium screens (768px+)
lg:   // Large screens (1024px+)
```

---

## Performance Optimizations

✅ **Already Implemented:**
- No external APIs (Web Speech API is built-in)
- Minimal re-renders (useState optimization)
- localStorage for offline storage
- CSS Grid for responsive layout
- Emoji instead of images

📊 **Current Bundle Size:**
- Main JS: ~150KB
- CSS: ~50KB
- Total: ~200KB (with compression)

---

## Testing Checklist

### Offline Testing
- [ ] Load page online
- [ ] Disconnect internet
- [ ] Game still works fully
- [ ] Progress saves locally

### Audio Testing
- [ ] Click 🔉 button
- [ ] Hear text read aloud
- [ ] Works in English
- [ ] Works in Hindi (if set)
- [ ] Works on mobile

### Decision Testing
- [ ] Click each choice option
- [ ] See immediate impact
- [ ] See long-term consequence
- [ ] Stats update correctly
- [ ] Move to next scenario
- [ ] Complete full theme

### Mobile Testing
- [ ] Buttons are touch-friendly
- [ ] Text is readable
- [ ] No horizontal scroll
- [ ] Audio works on phone
- [ ] Progress saves

---

## localStorage Keys

### Progress Data
```javascript
localStorage.getItem('financialGameProgress')
// Returns JSON:
{
  username: "Player",
  totalScenarios: 10,
  completedScenarios: 3,
  totalWisdom: 150,
  totalMoney: 8500,
  savingsProgress: 100,
  insuranceProgress: 50,
  investmentProgress: 0,
  lastUpdated: "2024-02-04 10:30:45"
}
```

### Language Preference
```javascript
localStorage.getItem('lang')  // 'en' or 'hi'
```

---

## Common Modifications

### Change Starting Money
```typescript
// In simulation/page.tsx
const [playerStats, setPlayerStats] = useState<PlayerStats>({
  money: 10000,  // ← Change this
  // ... rest
});
```

### Add New Theme
1. Create array in `financialThemes.ts`
2. Add to `allFinancialScenarios` array
3. Add to theme selection in `simulation/page.tsx`

### Change Audio Language
```typescript
<OfflineAudioNarrator 
  language="hi"  // ← Change to 'hi' for Hindi
/>
```

---

## Debugging Tips

### Check Browser Console
```javascript
// See current game state
localStorage.getItem('financialGameProgress')

// Clear all progress
localStorage.clear()

// Check Web Speech API support
console.log(window.speechSynthesis)
```

### React DevTools
- Check component state
- See prop values
- Watch re-renders
- Trace updates

### Network Tab
- Should see NO requests during gameplay (offline works!)
- Only initial page load requests
- All data from localStorage

---

## Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome | ✅ Full | Best support |
| Firefox | ✅ Full | Works great |
| Safari | ✅ Full | iOS 14.5+ |
| Edge | ✅ Full | Chromium-based |
| IE 11 | ❌ No | Not supported |
| Opera | ✅ Full | Chromium-based |

---

## Deployment Checklist

- [ ] Test offline functionality
- [ ] Test on mobile devices
- [ ] Check audio on multiple devices
- [ ] Verify localStorage works
- [ ] Test all 3 themes completely
- [ ] Check progress saving
- [ ] Test on slow internet (DevTools throttle)
- [ ] Verify no console errors
- [ ] Check responsive design
- [ ] Test accessibility (keyboard nav)

---

## Future Enhancements

💡 **Possible Additions:**
- Leaderboard (localStorage-based)
- Multiple player profiles
- More scenarios (20+)
- Interactive graphs
- Certification/certificate
- Achievement badges
- Dark mode
- More languages (Tamil, Telugu, etc.)

---

**Happy Coding!** 🚀

For questions, refer to source code comments or raise an issue.
