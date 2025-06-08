import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomNav } from '../../components/BottomNav';
import { ROUTES } from '../../constants/routes';
import styles from './styles/food.style';
import { COLORS } from '../../constants/colors';

const Food = () => {
  const navigation = useNavigation();

  const navigateToHistory = () => {
    navigation.navigate(ROUTES.FOOD_HISTORY as never);
  };

  const navigateToCollection = () => {
    navigation.navigate(ROUTES.FOOD_COLLECTION as never);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Foods</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Discover</Text>
        {/* Meals History Card */}
        <TouchableOpacity style={[styles.card, styles.historyCard]} onPress={navigateToHistory}>
          <View style={styles.cardContent}>
            <Icon name="time-outline" size={40} color={COLORS.FRESH_LEAF} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Meals History</Text>
            <Text style={styles.cardDescription}>
              View your previous meals and track your eating habits
            </Text>
          </View>
        </TouchableOpacity>
        {/* Food Collection Card */}
        <TouchableOpacity
          style={[styles.card, styles.collectionCard]}
          onPress={navigateToCollection}>
          <View style={styles.cardContent}>
            <Icon
              name="restaurant-outline"
              size={40}
              color={COLORS.PASSATA}
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Food Collection</Text>
            <Text style={styles.cardDescription}>
              Browse through our collection of healthy meal options
            </Text>
          </View>
        </TouchableOpacity>
        {/* Coming Soon - Meal Planner */}
        {/* <TouchableOpacity
          style={[styles.card, styles.plannerCard]}>
          <View style={styles.cardContent}>
            <Icon name="calendar-outline" size={40} color={COLORS.SECONDARY} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Meal Planner</Text>
            <Text style={styles.cardDescription}>
              Plan your meals ahead and stay on track (Coming Soon)
            </Text>
            <View style={styles.comingSoonBadge}>
              <Text style={styles.comingSoonText}>Coming Soon</Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default Food;
