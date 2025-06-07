# Food Components

## 1. Meal History Component

### Overview

The Meal History component displays a list of the user's past meals organized by date. This component shows the progression of the meal plan over time, displaying completion percentages and allowing users to see their historical eating patterns.

### Data Flow

- Data is fetched using React Query's `useMealHistory` hook
- Diet plan is retrieved from the backend API using a dedicated service
- Each day shows meal completion percentage with a clickable interface
- Top progress bar shows overall diet plan completion

### Features

- Real-time data fetching with React Query
- Interactive list with day selection
- Progress tracking with visual indicators
- Comprehensive loading, error, and empty states
- Pull-to-refresh functionality

### Component Architecture

```
FoodHistory
├── Header
│   ├── Back Button
│   ├── Title
│   └── Refresh Button
├── Diet Plan Progress
│   ├── Progress Bar
│   ├── Completion Stats
│   └── Days Remaining
├── Daily Meal List
│   └── Day Items (clickable)
│       ├── Date Display
│       ├── Completion Percentage
│       └── Navigation Chevron
```

## 2. Food Day Details Component

### Overview

The Food Day Details component displays detailed information about a specific day's meals, nutrition summary, and completion status. Users navigate to this screen by tapping on a day item in the Meal History list.

### Data Flow

- Day-specific data is retrieved from the meal history using the date parameter
- Detailed meal information is presented with completion status
- Nutritional summary provides insights into the day's intake

### Features

- Detailed meal breakdown
- Nutritional summary with key metrics (calories, macros)
- Visual completion indicators
- Progress bar showing day's completion percentage

### Component Architecture

```
FoodDayDetails
├── Header
│   ├── Back Button
│   ├── Title
│   └── Refresh Button
├── Day Progress
│   ├── Date Display
│   ├── Progress Bar
│   └── Completion Percentage
├── Nutrition Summary
│   ├── Calories
│   ├── Carbs
│   ├── Protein
│   └── Fat
├── Meal List
    └── Meal Items
        ├── Name
        ├── Calories
        └── Completion Status
└── Bottom Navigation
```

## React Query Implementation

The component uses the `useMealHistory` hook which:

1. Fetches the user data with `useUser()`
2. Transforms the diet plan into the meal history format
3. Provides loading, error, and retry capabilities
4. Caches data for improved performance
