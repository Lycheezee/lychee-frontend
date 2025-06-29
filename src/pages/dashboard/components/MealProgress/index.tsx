import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealPlan, EMealStatus } from '../../../../types/meal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useMealStatusUpdate } from '../../../../hooks/useMeal';
import { COLORS, withAlpha } from '../../../../constants/colors';
import { useDashboardData } from '../../hooks/useDashboardData';
import { useState } from 'react';
import capitalize from 'lodash/capitalize';

interface MealProgressProps {
  dailyProgress: MealPlan;
  dietPlanId?: string;
  onMealStatusUpdate?: (updatedPlan: MealPlan) => void;
}

export const mealNameFormat = (name: string) => {
  // Format the meal name if needed, e.g., truncate or capitalize
  const formatedName = name.split(',').join(' ').trim();
  return capitalize(formatedName);
};

export const MealProgress = ({
  dailyProgress,
  dietPlanId,
  onMealStatusUpdate,
}: MealProgressProps) => {
  const { refetch } = useDashboardData();

  const [meals, setMeals] = useState(dailyProgress.meals || []);
  const [percentageOfCompletions, setPercentageOfCompletions] = useState(
    dailyProgress.percentageOfCompletions || 0
  );
  // calculateTotalNutrition
  const updateMealStatus = useMealStatusUpdate();

  const handleMealToggle = async (mealId: string, currentStatus: EMealStatus) => {
    if (!dietPlanId) {
      console.warn('Diet plan ID not provided, cannot update meal status');
      return;
    }

    const originalPlan = { ...dailyProgress };

    try {
      const newStatus =
        currentStatus === EMealStatus.COMPLETED ? EMealStatus.NOT_COMPLETED : EMealStatus.COMPLETED;

      const date = moment(dailyProgress.date).format('YYYY-MM-DD');

      const updatedMeals = meals.map((meal) =>
        meal._id === mealId ? { ...meal, status: newStatus } : meal
      );

      const completedMeals = updatedMeals.filter(
        (meal) => meal.status === EMealStatus.COMPLETED
      ).length;
      const newPercentage = Math.round((completedMeals / updatedMeals.length) * 100);

      const optimisticPlan: MealPlan = {
        ...dailyProgress,
        meals: updatedMeals,
        percentageOfCompletions: newPercentage,
      };

      setMeals(updatedMeals);
      setPercentageOfCompletions(newPercentage);
      if (onMealStatusUpdate) onMealStatusUpdate(optimisticPlan);

      await updateMealStatus.mutateAsync({
        dietPlanId,
        payload: {
          date,
          foodId: mealId,
          status: newStatus,
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
      setMeals(originalPlan.meals);
      setPercentageOfCompletions(originalPlan.percentageOfCompletions);
      if (onMealStatusUpdate) onMealStatusUpdate(originalPlan);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is your daily target meals:</Text>
      <View style={styles.mealsList}>
        {meals.map((meal, index) => (
          <TouchableOpacity
            key={`${meal._id}-${index}`}
            style={styles.mealRow}
            onPress={() => handleMealToggle(meal._id, meal.status)}
            activeOpacity={0.7}>
            <Text style={styles.mealName}>{mealNameFormat(meal.name)}</Text>
            <View style={styles.checkbox}>
              {meal.status === EMealStatus.COMPLETED ? (
                <View style={styles.checkedBox}>
                  <Icon name="check" size={16} color={COLORS.TEXT_PRIMARY} />
                </View>
              ) : (
                <View style={styles.emptyCheckbox} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBackground}>
          <View style={[styles.progressFill, { width: `${percentageOfCompletions}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: COLORS.CREAM,
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
    elevation: 2,
    shadowColor: COLORS.TEXT_PRIMARY,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  mealsList: {
    marginBottom: 12,
  },
  mealRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealName: {
    fontSize: 14,
    maxWidth: '80%',
    color: COLORS.TEXT_PRIMARY,
  },
  checkbox: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    width: 18,
    height: 18,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.BORDER_DARK,
    backgroundColor: withAlpha(COLORS.MINTY, 0.3),
    borderRadius: 3,
  },
  progressBarContainer: {
    marginVertical: 10,
  },
  progressBackground: {
    height: 15,
    backgroundColor: withAlpha(COLORS.MINTY, 0.3),
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
});
