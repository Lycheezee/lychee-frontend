import { View, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-native-paper';
import { RegisterLayout } from '../components/RegisterLayout';
import { Button } from '../../../components/Button';
import { Nutrition } from '../../../types/nutritions';
import { IUser } from '../../../types/user';
import { createNutritionLabel } from '../../../utils/nutritionFormatter';

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
  dietPlan?: any[]; // Array from API response
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
  // Get data from previous step (RegisterStep3)
  const dietPlan = defaultValues?.dietPlan || [];
  const nutritionsPerDay = defaultValues?.nutritionsPerDay;

  // Extract meal names from diet plan with better handling for different structures
  const mealNames =
    dietPlan.length > 0
      ? dietPlan.map((meal: any) => {
          // Handle different possible meal object structures
          if (typeof meal === 'string') return meal;
          if (meal.name) return meal.name;
          if (meal.title) return meal.title;
          if (meal.food_name) return meal.food_name;
          return 'Unknown Meal';
        })
      : ['Eggs', 'Coconut', 'Water', 'Potatoes', 'Beef', 'Rice']; // Fallback data

  // Use real nutrition data if available, otherwise use sample data
  const nutritionData: Nutrition = nutritionsPerDay
    ? {
        calories: nutritionsPerDay.calories || 0,
        carbohydrates: nutritionsPerDay.carbohydrates || 0,
        fats: nutritionsPerDay.fats || 0,
        sugars: nutritionsPerDay.sugars || 0,
        proteins: nutritionsPerDay.proteins || 0,
        cholesterol: nutritionsPerDay.cholesterol || 0,
        fibers: nutritionsPerDay.fibers || 0,
        sodium: nutritionsPerDay.sodium || 0,
        waterIntake: nutritionsPerDay.waterIntake || 0,
      }
    : {
        // Fallback sample data
        calories: 2000,
        carbohydrates: 250,
        fats: 65,
        sugars: 50,
        proteins: 150,
        cholesterol: 300,
        fibers: 25,
        sodium: 2300,
        waterIntake: 2000,
      };

  // Display only the main nutrients for the UI
  const displayNutrients: (keyof Nutrition)[] = [
    'calories',
    'carbohydrates',
    'fats',
    'proteins',
    'sugars',
    'cholesterol',
  ];

  return (
    <Provider>
      <RegisterLayout title="Your First Meal" onBack={onBack}>
        <View style={styles.container}>
          <View style={styles.mealBox}>
            <Text style={styles.subtitle}>
              {dietPlan.length > 0
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
  },
  includesText: {
    fontSize: 16,
    marginBottom: 8,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  nutritionItem: {
    backgroundColor: '#FFC0CB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
  },
  nutritionLabel: {
    fontSize: 16,
    textAlign: 'center',
  },
});
