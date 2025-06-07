# Meal History Component

## Overview

The Meal History component displays a list of the user's past meals organized by date. This component shows the progression of the meal plan over time, displaying completion percentages and allowing users to see their historical eating patterns.

## Data Flow

- Data is fetched using React Query's `useMealHistory` hook
- Meals are retrieved from the user's diet plan data
- Each day shows meals completed with their details

## Features

- Real-time data fetching with React Query
- Optimistic UI updates
- Loading, error, and empty states
- Pull-to-refresh functionality

## Component Architecture

```
FoodHistory
├── Header
│   ├── Back Button
│   ├── Title
│   └── Refresh Button
├── Content
│   └── Daily Meal Lists
│       └── Individual Meals
│           └── Status Indicators
└── Bottom Navigation
```

## React Query Implementation

The component uses the `useMealHistory` hook which:

1. Fetches the user data with `useUser()`
2. Transforms the diet plan into the meal history format
3. Provides loading, error, and retry capabilities
4. Caches data for improved performance
