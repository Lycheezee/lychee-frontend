import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { BottomNav } from '../../components/BottomNav';
import styles from './styles/food.style';
import { mockMealHistory } from '../../mocks/foodMockData';

const FoodHistory = () => {
  const navigation = useNavigation();
  const renderMealItem = ({ item }) => (
    <View
      style={{
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Image
        source={{ uri: item.image }}
        style={{ width: 60, height: 60, borderRadius: 8, marginRight: 12 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.name}</Text>
        <Text style={{ color: '#666' }}>{item.description}</Text>
        <Text style={{ color: '#888', marginTop: 4 }}>{item.calories} calories</Text>
      </View>
      <Icon
        name={item.status === 'completed' ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={item.status === 'completed' ? '#4CAF50' : '#ccc'}
      />
    </View>
  );

  const renderDayItem = ({ item }) => (
    <View
      style={{
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#eee',
      }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        {new Date(item.date).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <FlatList
        data={item.meals}
        keyExtractor={(meal) => meal.id}
        renderItem={renderMealItem}
        scrollEnabled={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meals History</Text>
      </View>

      {/* Content */}
      <FlatList
        data={mockMealHistory}
        keyExtractor={(item) => item.id}
        renderItem={renderDayItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Bottom Navigation */}
      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default FoodHistory;
