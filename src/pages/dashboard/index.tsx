import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import moment from 'moment';
import authService from '~/services/auth.service';
import { BottomNav } from '../../components/BottomNav';
import { MealProgress } from './components/MealProgress';
import { NutrientCard } from './components/NutrientCard';
import { mockDailyProgress, mockUser } from '../../mocks/dashboardMockData';
import styles from './styles/dashboard.style';
import { MealPlan, Meal } from '~/types/meal';
import { Nutrition } from '~/types/nutritions';

const findTodayMealPlan = (dietPlan: any) => {
  if (!dietPlan || !dietPlan.plan || !Array.isArray(dietPlan.plan)) {
    return null;
  }

  const today = moment().format('YYYY-MM-DD');

  return (
    dietPlan.plan.find((plan: MealPlan) => {
      const planDate = moment(plan.date).format('YYYY-MM-DD');
      return planDate === today;
    }) || null
  );
};

const calculateTotalNutrition = (meals: Meal[]): Nutrition => {
  const initialNutrition: Nutrition = {
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    sugars: 0,
    fibers: 0,
    sodium: 0,
    cholesterol: 0,
    waterIntake: 0,
  };

  return meals.reduce((total, meal) => {
    if (!meal.nutrition) return total;

    return {
      calories: total.calories + (meal.nutrition.calories || 0),
      carbohydrates: total.carbohydrates + (meal.nutrition.carbohydrates || 0),
      proteins: total.proteins + (meal.nutrition.proteins || 0),
      fats: total.fats + (meal.nutrition.fats || 0),
      sugars: total.sugars + (meal.nutrition.sugars || 0),
      fibers: total.fibers + (meal.nutrition.fibers || 0),
      sodium: total.sodium + (meal.nutrition.sodium || 0),
      cholesterol: total.cholesterol + (meal.nutrition.cholesterol || 0),
      waterIntake: total.waterIntake + (meal.nutrition.waterIntake || 0),
    };
  }, initialNutrition);
};

export const Dashboard = () => {
  const methods = useForm();

  const [userInfo, setUserInfo] = useState(mockUser);
  const [todayPlan, setTodayPlan] = useState<MealPlan | null>(null);
  const [todayNutritions, setTodayNutritions] = useState<Nutrition | null>(null);

  // Default to mock data if no user data is available
  const dailyProgress = todayPlan || mockDailyProgress;

  // Handle meal status update
  const handleMealStatusUpdate = (updatedPlan: MealPlan) => {
    setTodayPlan(updatedPlan);

    // Recalculate nutrition totals with updated meal statuses
    if (updatedPlan.meals && updatedPlan.meals.length > 0) {
      const totalNutrition = calculateTotalNutrition(updatedPlan.meals);
      setTodayNutritions(totalNutrition);
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          setUserInfo(userData);

          // Find today's meal plan
          const userTodayPlan = findTodayMealPlan(userData.dietPlan);
          if (userTodayPlan) {
            setTodayPlan(userTodayPlan);

            // Calculate nutrition totals for today's meals
            if (userTodayPlan.meals && userTodayPlan.meals.length > 0) {
              const totalNutrition = calculateTotalNutrition(userTodayPlan.meals);
              setTodayNutritions(totalNutrition);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <FormProvider {...methods}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {/* Main content */}
        <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Home Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
          {/* Welcome Message */}
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>
              Welcome back, <Text style={styles.usernameText}>{userInfo.firstName}</Text>
            </Text>
          </View>
          {/* Daily Target Meals */}
          <MealProgress
            dailyProgress={dailyProgress}
            dietPlanId={userInfo?.dietPlan?._id || undefined}
            onMealStatusUpdate={handleMealStatusUpdate}
          />
          {/* Nutrition Statistics */}
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <NutrientCard
                label="Calories"
                value={todayNutritions ? todayNutritions.calories : 2000}
              />
              <NutrientCard
                label="Carbs"
                value={todayNutritions ? todayNutritions.carbohydrates : 20}
              />
            </View>

            <View style={styles.nutrientRow}>
              <NutrientCard label="Fats" value={todayNutritions ? todayNutritions.fats : 20} />
              <NutrientCard label="Sugars" value={todayNutritions ? todayNutritions.sugars : 5} />
            </View>

            <View style={styles.nutrientRow}>
              <NutrientCard
                label="Protein"
                value={todayNutritions ? todayNutritions.proteins : 200}
              />
              <NutrientCard
                label="Cholesterol"
                value={todayNutritions ? todayNutritions.cholesterol : 20}
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav active="Home" />
      </SafeAreaView>
    </FormProvider>
  );
};
