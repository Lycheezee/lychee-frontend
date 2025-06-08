import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomNav } from '../../components/BottomNav';
import styles from './styles/food.style';
import { COLORS, withAlpha } from '../../constants/colors';
import { formatNutritionValue } from '../../utils/nutritionFormatter';
import { useAllFood } from '../../hooks';

const FoodCollection = () => {
  const navigation = useNavigation();
  const { data: foods, isLoading, error } = useAllFood();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter foods based on search query
  const filteredFoods = useMemo(() => {
    if (!foods) return [];
    if (!searchQuery.trim()) return foods;

    return foods.filter((food) => food.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [foods, searchQuery]);

  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: COLORS.CREAM,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
        padding: 12,
      }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.TEXT_PRIMARY }}>
          {item.name}
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' }}>
          <Text style={{ marginRight: 10, color: COLORS.TEXT_PRIMARY }}>
            Calories: {formatNutritionValue(item.nutrition.calories, 'calories', 0)}
          </Text>
          <Text style={{ marginRight: 10, color: COLORS.TEXT_PRIMARY }}>
            Protein: {formatNutritionValue(item.nutrition.protein, 'protein')}
          </Text>
          <Text style={{ marginRight: 10, color: COLORS.TEXT_PRIMARY }}>
            Carbs: {formatNutritionValue(item.nutrition.carbohydrates, 'carbohydrates')}
          </Text>
          <Text style={{ color: COLORS.TEXT_PRIMARY }}>
            Fat: {formatNutritionValue(item.nutrition.fat, 'fat')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Food Collection</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={COLORS.PRIMARY} />
          <Text style={{ marginTop: 16, color: COLORS.TEXT_SECONDARY }}>Loading foods...</Text>
        </View>
        <BottomNav active="Food" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Food Collection</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
          <Icon name="alert-circle-outline" size={48} color={COLORS.ERROR} />
          <Text style={{ marginTop: 16, color: COLORS.ERROR, textAlign: 'center' }}>
            Failed to load foods
          </Text>
          <Text style={{ marginTop: 8, color: COLORS.TEXT_SECONDARY, textAlign: 'center' }}>
            {error.message}
          </Text>
        </View>
        <BottomNav active="Food" />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.CREAM} barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.TEXT_PRIMARY} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Collection</Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: COLORS.CREAM,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            backgroundColor: COLORS.CREAM,
            borderRadius: 10,
            paddingHorizontal: 12,
            marginTop: 16,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.3),
          }}>
          <Icon name="search" size={20} color={COLORS.TEXT_SECONDARY} style={{ marginRight: 10 }} />
          <TextInput
            style={{
              flex: 1,
              fontSize: 16,
              color: COLORS.TEXT_PRIMARY,
            }}
            placeholder="Search foods..."
            placeholderTextColor={COLORS.TEXT_SECONDARY}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="close-circle" size={20} color={COLORS.TEXT_SECONDARY} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item._id}
        renderItem={renderFoodItem}
        contentContainerStyle={{ padding: 16, paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 40,
            }}>
            <Icon name="restaurant-outline" size={48} color={COLORS.TEXT_SECONDARY} />
            <Text style={{ marginTop: 16, color: COLORS.TEXT_SECONDARY, textAlign: 'center' }}>
              {searchQuery ? 'No foods found matching your search' : 'No foods available'}
            </Text>
            {searchQuery && (
              <Text style={{ marginTop: 8, color: COLORS.TEXT_SECONDARY, textAlign: 'center' }}>
                Try a different search term
              </Text>
            )}
          </View>
        )}
      />
      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default FoodCollection;
