import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Provider } from 'react-native-paper';
import { RegisterLayout } from '../components/RegisterLayout';
import { Button } from '../../../components/Button';
import { Nutrition } from '../../../types/nutritions';
import { IUser } from '../../../types/user';
import { createNutritionLabel } from '../../../utils/nutritionFormatter';
import { COLORS } from '../../../constants/colors';
import { DietPlan } from '~/types/meal';
import { useUser } from '~/hooks/useAuth';

const displayNutrients: (keyof Nutrition)[] = [
  'calories',
  'carbohydrates',
  'fat',
  'protein',
  'sugars',
  'cholesterol',
];

interface RegistrationData {
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  bodyInfo?: any;
  mealPreferences?: any;

  nutritionsPerDay?: Nutrition;
  dietPlan?: DietPlan;
}

interface MealItemProps {
  name: string;
}

const MealItem = ({ name }: MealItemProps) => (
  <View>
    <Text style={styles.mealItem}>- {name}</Text>
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
  const { data: user, isLoading: loading } = useUser();

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

  const firstMeals =
    defaultValues?.dietPlan?.plan?.[0]?.meals || user?.dietPlan?.plan?.[0]?.meals || [];
  const nutritionsPerDay =
    defaultValues?.dietPlan?.nutritionsPerDay || user?.dietPlan?.nutritionsPerDay;

  const mealNames = firstMeals
    ? firstMeals.map((meal) => {
        if (meal.name) return meal.name;
        return 'Unknown Meal';
      })
    : ['Eggs', 'Coconut', 'Water', 'Potatoes', 'Beef', 'Rice'];

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

  return (
    <Provider>
      <RegisterLayout title="Your First Meal" onBack={onBack}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </RegisterLayout>
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    gap: 20,
  },
  mealBox: {
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  mealsContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  mealItem: {
    fontSize: 14,
    marginRight: 12,
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
    backgroundColor: COLORS.MINTY,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
  },
  nutritionLabel: {
    fontSize: 16,
  },
});
