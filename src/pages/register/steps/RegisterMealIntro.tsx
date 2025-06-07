import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { RegisterLayout } from '../components/RegisterLayout';
import { Button } from '../../../components/Button';
import { Nutrition } from '../../../types/nutritions';
import { IUser, AuthUser } from '../../../types/user';
import { createNutritionLabel } from '../../../utils/nutritionFormatter';
import { DietPlan } from '~/types/meal';
import authService from '~/services/auth.service';

// Interface for registration data that includes API response fields
interface RegistrationData {
  // IUser fields
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  bodyInfo?: any;
  mealPreferences?: any;

  // Additional API response fields
  nutritionsPerDay?: Nutrition;
  dietPlan?: DietPlan; // Array from API response
}

interface MealItemProps {
  name: string;
}

const MealItem = ({ name }: MealItemProps) => (
  <View>
    <Text style={styles.mealItem}>{name}</Text>
  </View>
);

export function RegisterMealIntro({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data?: Partial<IUser>) => void;
  onBack: () => void;
  defaultValues?: RegistrationData;
}) {
  const [user, setUser] = useState<Omit<AuthUser, 'accessToken'> | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getUser();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Show loading state while fetching user data
  if (loading) {
    return (
      <Provider>
        <RegisterLayout title="Your First Meal" onBack={onBack}>
          <View style={styles.container}>
            <Text style={styles.subtitle}>Loading your meal plan...</Text>
          </View>
        </RegisterLayout>
      </Provider>
    );
  }

  // Get data from previous step (RegisterStep3) or from user's diet plan
  const firstMeals =
    defaultValues?.dietPlan?.plan?.[0]?.meals || user?.dietPlan?.plan?.[0]?.meals || [];
  const nutritionsPerDay =
    defaultValues?.dietPlan?.nutritionsPerDay || user?.dietPlan?.nutritionsPerDay;

  // Extract meal names from diet plan with better handling for different structures
  const mealNames = firstMeals
    ? firstMeals.map((meal) => {
        if (meal.name) return meal.name;
        return 'Unknown Meal';
      })
    : ['Eggs', 'Coconut', 'Water', 'Potatoes', 'Beef', 'Rice']; // Fallback data
  // Use real nutrition data if available, otherwise use sample data
  const nutritionData: Nutrition = nutritionsPerDay
    ? {
        calories: nutritionsPerDay.calories || 0,
        carbohydrates: nutritionsPerDay.carbohydrates || 0,
        fat: nutritionsPerDay.fat || 0,
        sugars: nutritionsPerDay.sugars || 0,
        protein: nutritionsPerDay.protein || 0,
        cholesterol: nutritionsPerDay.cholesterol || 0,
        fibers: nutritionsPerDay.fibers || 0,
        sodium: nutritionsPerDay.sodium || 0,
        waterIntake: nutritionsPerDay.waterIntake || 0,
      }
    : {
        // Fallback sample data
        calories: 2000,
        carbohydrates: 250,
        fat: 65,
        sugars: 50,
        protein: 150,
        cholesterol: 300,
        fibers: 25,
        sodium: 2300,
        waterIntake: 2000,
      };
  // Display only the main nutrients for the UI
  const displayNutrients: (keyof Nutrition)[] = [
    'calories',
    'carbohydrates',
    'fat',
    'protein',
    'sugars',
    'cholesterol',
  ];

  return (
    <Provider>
      <RegisterLayout title="Your First Meal" onBack={onBack}>
        <View style={styles.container}>
          <View style={styles.mealBox}>
            <Text style={styles.subtitle}>
              {firstMeals.length > 0
                ? 'Your personalized meal plan includes:'
                : 'Sample meals include:'}
            </Text>
            <View style={styles.mealsContainer}>
              {mealNames.map((meal, index) => (
                <MealItem key={index} name={meal} />
              ))}
            </View>
          </View>
          <Text style={styles.includesText}>
            {nutritionsPerDay ? 'Your daily nutrition targets:' : 'These meals include of:'}
          </Text>
          <View style={styles.nutritionGrid}>
            {displayNutrients.map((nutrientKey, index) => (
              <View key={index} style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>
                  {createNutritionLabel(nutrientKey, nutritionData[nutrientKey])}
                </Text>
              </View>
            ))}
          </View>
          <Button onPress={() => onNext()}>Next</Button>
        </View>
      </RegisterLayout>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  mealBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  mealsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealItem: {
    fontSize: 16,
    marginRight: 12,
    fontWeight: 'bold',
  },
  includesText: {
    fontSize: 16,
    marginBottom: 8,
  },
  nutritionGrid: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  nutritionItem: {
    backgroundColor: '#FFC0CB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  nutritionLabel: {
    fontSize: 16,
    // textAlign: 'center',
  },
});
