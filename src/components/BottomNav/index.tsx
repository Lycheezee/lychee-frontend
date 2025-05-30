import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export type BottomNavRoute = 'Home' | 'Food' | 'UserProfile';

interface BottomNavProps {
  active: BottomNavRoute;
}

const navItems: { route: BottomNavRoute; icon: string }[] = [
  { route: 'Home', icon: 'home' },
  { route: 'Food', icon: 'fast-food' },
  { route: 'UserProfile', icon: 'person' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ active }) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={styles.button}
          onPress={() => navigation.navigate(item.route)}>
          {' '}
          <Icon
            name={
              item.route === 'Home'
                ? active === 'Home'
                  ? 'home'
                  : 'home-outline'
                : item.route === 'Food'
                  ? active === 'Food'
                    ? 'fast-food'
                    : 'fast-food-outline'
                  : active === 'UserProfile'
                    ? 'person'
                    : 'person-outline'
            }
            size={28}
            color={active === item.route ? '#00cba9' : '#aaa'}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
