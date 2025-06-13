import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { BottomNav } from '../../components/BottomNav';
import styles from './styles/food.style';
import { useMealHistory } from '../../hooks/useMealHistory';
import { MealPlan } from '../../types/meal';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import { calculateDietPlanProgress } from '../../utils/dietPlanProgress';
import { useUser } from '~/hooks';

const FoodHistory = () => {
  // @ts-ignore - Allow navigation to the new screen
  const navigation = useNavigation();
  const { data: user } = useUser();
  const { data: dietPlan, isLoading, isError, error, refetch } = useMealHistory();

  const { remainingDays, completedDays, totalDays, progressPercentage } = calculateDietPlanProgress(
    dietPlan,
    user.mealPlanDays
  );

  const isGeneratingMeals = dietPlan.plan.length !== user.mealPlanDays;

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return styles.completionHigh.color;
    if (percentage >= 50) return styles.completionMedium.color;
    return styles.completionLow.color;
  };

  const renderDayItem = ({ item }: { item: MealPlan }) => (
    <TouchableOpacity
      style={styles.dayItem}
      onPress={() => {
        // @ts-ignore - Using any to bypass type checking for navigation
        navigation.navigate(ROUTES.FOOD_DAY_DETAILS as any, { date: item.date });
      }}>
      <Text style={styles.dayDate}>{moment(item.date).format('dddd, MMM D')}</Text>
      <Text
        style={[styles.dayCompletion, { color: getCompletionColor(item.percentageOfCompletions) }]}>
        {Math.round(item.percentageOfCompletions)}%
      </Text>
      <Icon name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
    </TouchableOpacity>
  );

  const renderProgressSection = () => (
    <View style={styles.progressSection}>
      <Text style={styles.progressTitle}>Diet Plan Progress</Text>
      <Text style={styles.progressSubtitle}>
        {completedDays} of {totalDays} days completed • {remainingDays} days remaining
      </Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
      </View>

      <Text style={styles.progressText}>{progressPercentage}% Complete</Text>
    </View>
  );

  const renderLoading = () => (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>Loading meal history...</Text>
    </View>
  );

  const generatingLoading = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.loadingText}>More meals are being generating at the moment...</Text>
    </View>
  );

  const renderError = () => (
    <View style={styles.centerContainer}>
      <Icon name="alert-circle-outline" size={50} color={COLORS.ERROR} />
      <Text style={styles.errorText}>Failed to load meal history</Text>
      <Text style={styles.errorSubtext}>{error?.message || 'Please try again'}</Text>
      <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
        <Text style={styles.retryText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.centerContainer}>
      <Icon name="calendar-outline" size={50} color={COLORS.TEXT_SECONDARY} />
      <Text style={styles.emptyText}>No meal history found</Text>
      <Text style={styles.emptySubtext}>Your meal plan will appear here once available</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meal History</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={() => refetch()}>
          <Icon name="refresh" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        renderLoading()
      ) : isError ? (
        renderError()
      ) : !dietPlan || !dietPlan.plan || dietPlan.plan.length === 0 ? (
        renderEmpty()
      ) : (
        <FlatList
          data={dietPlan.plan}
          keyExtractor={(item, index) => item.date || `day-${index}`}
          renderItem={renderDayItem}
          ListHeaderComponent={renderProgressSection}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      {isGeneratingMeals && generatingLoading()}

      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default FoodHistory;
