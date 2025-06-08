import { SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { BottomNav } from '../../components/BottomNav';
import {
  MealProgress,
  WelcomeSection,
  NutritionGrid,
  LoadingState,
  ErrorState,
} from './components';
import { mockDailyProgress } from '../../mocks/dashboardMockData';
import { useDashboardData } from './hooks/useDashboardData';
import styles from './styles/dashboard.style';
import { COLORS } from '../../constants/colors';

/**
 * Main Dashboard component
 * Orchestrates the dashboard layout and manages data flow between components
 * Now uses the meal history service for real-time diet plan data
 */
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

  const dailyProgress = todayPlan || mockDailyProgress;
  
  if (isLoading) {
    return (
      <FormProvider {...methods}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
          <LoadingState />
          <BottomNav active="Home" />
        </SafeAreaView>
      </FormProvider>
    );
  }

  if (error) {
    return (
      <FormProvider {...methods}>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
          <ErrorState message={error} onRetry={refetch} />
          <BottomNav active="Home" />
        </SafeAreaView>
      </FormProvider>
    );
  }

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <WelcomeSection firstName={userInfo.firstName} />
          <MealProgress
            dailyProgress={dailyProgress}
            dietPlanId={userInfo?.dietPlan?._id || undefined}
            onMealStatusUpdate={handleMealStatusUpdate}
          />
          <NutritionGrid nutrition={todayNutritions} />
        </ScrollView>
        <BottomNav active="Home" />
      </SafeAreaView>
    </FormProvider>
  );
};
