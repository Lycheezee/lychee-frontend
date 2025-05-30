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
import { mockFoodCollection } from '../../mocks/foodMockData';

const FoodCollection = () => {
  const navigation = useNavigation();
  const renderFoodItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#eee',
      }}
      onPress={() => console.log(`Selected food: ${item.name}`)}>
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
      <View style={{ flex: 1, padding: 12, justifyContent: 'center' }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
        <Text style={{ color: '#666', marginTop: 4 }}>{item.category}</Text>
        <View style={{ flexDirection: 'row', marginTop: 6, flexWrap: 'wrap' }}>
          <Text style={{ marginRight: 10, color: '#333' }}>{item.calories} Cal</Text>
          <Text style={{ marginRight: 10, color: '#333' }}>{item.protein}g Protein</Text>
          <Text style={{ marginRight: 10, color: '#333' }}>{item.carbs}g Carbs</Text>
          <Text style={{ color: '#333' }}>{item.fat}g Fat</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 12,
          justifyContent: 'center',
        }}
        onPress={() => console.log(`Add ${item.name} to favorites`)}>
        <Icon name="heart-outline" size={24} color="#FF5252" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Collection</Text>
      </View>

      {/* Content */}
      <FlatList
        data={mockFoodCollection}
        keyExtractor={(item) => item.id}
        renderItem={renderFoodItem}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Bottom Navigation */}
      <BottomNav active="Food" />
    </SafeAreaView>
  );
};

export default FoodCollection;
