import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MealPlan, EMealStatus } from '../../../../types/meal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useMealStatusUpdate } from '../../../../hooks/useMeal';

interface MealProgressProps {
  dailyProgress: MealPlan;
  dietPlanId?: string;
  onMealStatusUpdate?: (updatedPlan: MealPlan) => void;
}

export const MealProgress = ({
  dailyProgress,
  dietPlanId,
  onMealStatusUpdate,
}: MealProgressProps) => {
  const { meals, percentageOfCompletions } = dailyProgress;
  const updateMealStatus = useMealStatusUpdate();

  const handleMealToggle = async (mealId: string, currentStatus: EMealStatus) => {
    if (!dietPlanId) {
      console.warn('Diet plan ID not provided, cannot update meal status');
      return;
    }

    try {
      const newStatus =
        currentStatus === EMealStatus.COMPLETED ? EMealStatus.NOT_COMPLETED : EMealStatus.COMPLETED;

      const date = moment(dailyProgress.date).format('YYYY-MM-DD');

      // Update local state optimistically first
      const updatedMeals = meals.map((meal) =>
        meal._id === mealId ? { ...meal, status: newStatus } : meal
      );

      const completedMeals = updatedMeals.filter(
        (meal) => meal.status === EMealStatus.COMPLETED
      ).length;
      const newPercentage = Math.round((completedMeals / updatedMeals.length) * 100);

      const updatedPlan: MealPlan = {
        ...dailyProgress,
        meals: updatedMeals,
        percentageOfCompletions: newPercentage,
      };

      // Call callback to update parent component immediately
      if (onMealStatusUpdate) {
        onMealStatusUpdate(updatedPlan);
      }

      // Then make the API call
      await updateMealStatus.mutateAsync({
        dietPlanId,
        payload: {
          date,
          foodId: mealId,
          status: newStatus,
        },
      });
    } catch (error) {
      console.error('Failed to update meal status:', error);
      // Revert optimistic update on error
      if (onMealStatusUpdate) {
        onMealStatusUpdate(dailyProgress);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is your daily target meals:</Text>
      <View style={styles.mealsList}>
        {meals.map((meal) => (
          <TouchableOpacity
            key={meal._id}
            style={styles.mealRow}
            onPress={() => handleMealToggle(meal._id, meal.status)}
            activeOpacity={0.7}>
            <Text style={styles.mealName}>{meal.name}</Text>
            <View style={styles.checkbox}>
              {meal.status === EMealStatus.COMPLETED ? (
                <View style={styles.checkedBox}>
                  <Icon name="check" size={16} color="#000" />
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
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: '#333',
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
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
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
    backgroundColor: '#FFD700',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCheckbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#FFD700',
    backgroundColor: '#FFFFE0',
    borderRadius: 3,
  },
  progressBarContainer: {
    marginVertical: 10,
  },
  progressBackground: {
    height: 15,
    backgroundColor: '#FFFFE0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ADD8E6',
    borderRadius: 10,
  },
});
