import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomNav } from '../../components/BottomNav';
import styles from './styles/food.style';
import { Meal, EMealStatus } from '../../types/meal';
import { useMealHistory } from '../../hooks/useMealHistory';
import { COLORS } from '../../constants/colors';

/**
 * Food Day Details Screen
 * Shows details of a specific day's meals and nutrition information
 */
const FoodDayDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date } = route.params as { date: string };
  const { data: dietPlan, isLoading, isError, error, refetch } = useMealHistory();

  // Find the specific day's meal plan
  const dayPlan = dietPlan?.plan?.find(
    (day) =>
      new Date(day.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
  );
  // Render meal item with status indicator
  const renderMealItem = ({ item }: { item: Meal }) => (
    <View style={styles.mealItemContainer}>
      <View style={styles.mealItemContent}>
        <Text style={styles.mealItemName}>{item.name}</Text>
        {item.nutrition && (
          <Text style={styles.mealItemCalories}>{item.nutrition.calories} calories</Text>
        )}
      </View>
      <View style={styles.mealItemStatus}>
        <Icon
          name={item.status === EMealStatus.COMPLETED ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={item.status === EMealStatus.COMPLETED ? COLORS.SUCCESS : COLORS.BORDER_LIGHT}
        />
      </View>
    </View>
  );

  // Render loading state
  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>Loading meal details...</Text>
    </View>
  );

  // Render error state
  const renderError = () => (
    <View style={styles.centerContainer}>
      <Icon name="alert-circle-outline" size={50} color={COLORS.ERROR} />
      <Text style={styles.errorText}>Failed to load meal details</Text>
      <Text style={styles.errorSubtext}>{error?.message || 'Please try again'}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  // Render day progress bar
  const renderDayProgress = () => {
    if (!dayPlan) return null;

    return (
      <View style={styles.dayProgressContainer}>
        <View style={styles.dayProgressHeader}>
          <Text style={styles.dayProgressTitle}>
            {new Date(dayPlan.date).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
          <Text
            style={[
              styles.dayProgressPercentage,
              {
                color:
                  dayPlan.percentageOfCompletions >= 80
                    ? styles.completionHigh.color
                    : dayPlan.percentageOfCompletions >= 50
                      ? styles.completionMedium.color
                      : styles.completionLow.color,
              },
            ]}>
            {Math.round(dayPlan.percentageOfCompletions)}% Complete
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${dayPlan.percentageOfCompletions}%` }]} />
        </View>
      </View>
    );
  };
  // Render nutrition summary section
  const renderNutritionSummary = () => {
    if (!dayPlan?.nutritionSummary) return null;

    const { calories, carbohydrates, cholesterol, fibers } = dayPlan.nutritionSummary;

    return (
      <View style={styles.nutritionSummaryContainer}>
        <Text style={styles.nutritionSummaryTitle}>Nutrition Summary</Text>
        <View style={styles.nutritionSummaryGrid}>
          <View style={styles.nutritionSummaryItem}>
            <Text style={styles.nutritionSummaryValue}>{calories || 0}</Text>
            <Text style={styles.nutritionSummaryLabel}>Calories</Text>
          </View>
          <View style={styles.nutritionSummaryItem}>
            <Text style={styles.nutritionSummaryValue}>{carbohydrates || 0}g</Text>
            <Text style={styles.nutritionSummaryLabel}>Carbs</Text>
          </View>
          <View style={styles.nutritionSummaryItem}>
            <Text style={styles.nutritionSummaryValue}>{cholesterol || 0}mg</Text>
            <Text style={styles.nutritionSummaryLabel}>Cholesterol</Text>
          </View>
          <View style={styles.nutritionSummaryItem}>
            <Text style={styles.nutritionSummaryValue}>{fibers || 0}g</Text>
            <Text style={styles.nutritionSummaryLabel}>Fibers</Text>
          </View>
        </View>
      </View>
    );
  };
  // Render empty state when no meals are found
  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <Icon name="restaurant-outline" size={50} color={COLORS.TEXT_SECONDARY} />
      <Text style={styles.emptyText}>No meals found for this day</Text>
      <Text style={styles.emptySubtext}>This day might not have any planned meals</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Meals</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={() => refetch()}>
          <Icon name="refresh" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {isLoading ? (
        renderLoading()
      ) : isError ? (
        renderError()
      ) : !dayPlan ? (
        renderEmpty()
      ) : (
        <FlatList
          data={dayPlan.meals}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          renderItem={renderMealItem}
          ListHeaderComponent={
            <>
              {renderDayProgress()}
              {renderNutritionSummary()}
              <Text style={styles.mealListTitle}>Meals</Text>
            </>
          }
          contentContainerStyle={styles.mealListContainer}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default FoodDayDetails;
