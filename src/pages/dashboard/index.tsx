import { View, Text, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { FormProvider, useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import authService from '~/services/auth.service';
import { BottomNav } from '../../components/BottomNav';
import { MealProgress } from './components/MealProgress';
import { NutrientCard } from './components/NutrientCard';
import { mockDailyProgress, mockUser } from '../../mocks/dashboardMockData';
import styles from './styles/dashboard.style';

export const Dashboard = () => {
  const methods = useForm();
  const [userInfo, setUserInfo] = useState(mockUser);
  const dailyProgress = mockDailyProgress;

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authService.getUser();
        if (userData) {
          setUserInfo(userData);
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
          <MealProgress dailyProgress={dailyProgress} />

          {/* Nutrition Statistics */}
          <View style={styles.nutrientsContainer}>
            <View style={styles.nutrientRow}>
              <NutrientCard
                label="Calories"
                value={2000} // Using value from mockup
              />
              <NutrientCard
                label="Carbs"
                value={20} // Using value from mockup
              />
            </View>

            <View style={styles.nutrientRow}>
              <NutrientCard
                label="Fats"
                value={20} // Using value from mockup
              />
              <NutrientCard
                label="Sugars"
                value={5} // Using value from mockup
              />
            </View>

            <View style={styles.nutrientRow}>
              <NutrientCard
                label="Protein"
                value={200} // Using value from mockup
              />
              <NutrientCard
                label="Cholesterol"
                value={20} // Using value from mockup
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
