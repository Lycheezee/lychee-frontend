# Dashboard Component Architecture

This document outlines the refactored dashboard structure, organized for better maintainability and separation of concerns.

## 📁 File Structure

```
src/pages/dashboard/
├── index.tsx                    # Main Dashboard component (orchestrator)
├── components/
│   ├── WelcomeSection/         # Header and welcome message
│   ├── NutritionGrid/          # 2x3 grid of nutrition cards
│   ├── LoadingState/           # Loading spinner component
│   ├── ErrorState/             # Error state with retry
│   ├── MealProgress/           # Existing meal progress component
│   └── NutrientCard/           # Existing nutrient card component
├── hooks/
│   └── useDashboardData.ts     # Custom hook for data management
└── styles/
    └── dashboard.style.ts      # Updated styles with new components

src/utils/
├── mealPlanUtils.ts            # Meal plan utility functions
└── nutritionCalculations.ts   # Nutrition calculation utilities

src/constants/
└── dashboard.constants.ts      # Dashboard configuration constants
```

## 🎯 Key Improvements

### 1. **Separation of Concerns**

- **Main Component**: Only handles layout orchestration
- **Custom Hook**: Manages all data fetching and state
- **Utility Functions**: Handle business logic
- **Constants**: Centralize configuration

### 2. **Component Breakdown**

- **WelcomeSection**: Reusable header component
- **NutritionGrid**: Configurable nutrition display
- **LoadingState**: Consistent loading UI
- **ErrorState**: User-friendly error handling

### 3. **Enhanced Data Management**

- **useDashboardData**: Custom hook integrating meal history service for real-time data
- **Meal History Integration**: Uses dedicated dietPlan service for today's plan
- **React Query Caching**: Automatic caching and synchronization of meal data
- **Optimistic Updates**: Immediate UI feedback for meal status changes
- **Proper error handling**: Graceful degradation with retry functionality
- **Performance Optimization**: useMemo for today's plan calculation

### 4. **Utility Functions**

- **Nutrition calculations**: Centralized rounding logic
- **Meal plan utilities**: Date handling and completion tracking
- **Type-safe constants**: Configuration management

## 📊 Meal History Integration

### Data Flow

The dashboard now uses the meal history service for real-time diet plan data:

1. **useDashboardData Hook**: Combines user data and meal history
2. **Meal History Service**: Fetches diet plan from backend API endpoint
3. **Today's Plan Calculation**: Uses memoized utility to find current day's meals
4. **Nutrition Calculation**: Automatically updates based on meal completions

### Benefits

- **Real-time Data**: Always shows current meal plan status
- **Caching**: React Query handles data caching and synchronization
- **Error Handling**: Graceful fallbacks with user feedback
- **Performance**: Optimized calculations with useMemo
- **Consistency**: Same data source as Food History page

### Implementation

```tsx
// useDashboardData now integrates meal history
const { data: dietPlan, isLoading: isDietLoading, error: dietError } = useMealHistory();

// Find today's plan with memoization for performance
const todayPlan = useMemo(() => {
  if (!dietPlan?.plan) return null;
  return findTodayMealPlan(dietPlan);
}, [dietPlan]);
```

## 🔧 Usage

### Main Dashboard Component

```tsx
export const Dashboard = () => {
  const methods = useForm();
  const {
    userInfo,
    todayPlan,
    todayNutritions,
    isLoading,
    error,
    handleMealStatusUpdate,
    refetch,
  } = useDashboardData();

  // Handles loading, error, and success states automatically
  // Clean, readable component structure
};
```

### Custom Hook Usage

```tsx
const {
  userInfo, // User data
  todayPlan, // Today's meal plan
  todayNutritions, // Calculated nutrition totals
  isLoading, // Loading state
  error, // Error message (if any)
  handleMealStatusUpdate, // Update meal status callback
  refetch, // Retry function
} = useDashboardData();
```

### Nutrition Grid Configuration

```tsx
// Easy to modify nutrition cards via constants
export const NUTRITION_CARDS_CONFIG = [
  { id: 'calories', label: 'Calories', key: 'calories', fallback: 2000 },
  { id: 'carbs', label: 'Carbs', key: 'carbohydrates', fallback: 20 },
  // ... more cards
];
```

## 📊 Benefits

1. **Maintainability**: Clear separation makes updates easier
2. **Testability**: Isolated functions are easier to test
3. **Reusability**: Components can be reused elsewhere
4. **Type Safety**: Better TypeScript support
5. **Performance**: Optimized re-renders and calculations
6. **User Experience**: Loading states and error handling

## 🔄 Migration Notes

- All existing functionality preserved
- Nutrition values automatically rounded to 1 decimal place
- Enhanced error handling with retry capability
- Improved loading states for better UX
- Maintains existing prop interfaces for compatibility

## 🎨 Styling

All styles are consolidated in `dashboard.style.ts` with new additions for:

- Loading states
- Error states
- Retry buttons
- Improved accessibility

The refactored code maintains the same visual appearance while providing a much cleaner and more maintainable architecture.
