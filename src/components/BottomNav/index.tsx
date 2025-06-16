import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { COLORS, withAlpha } from '../../constants/colors';
import { useDashboardData } from '~/pages/dashboard/hooks/useDashboardData';

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
  // const { refetch } = useDashboardData();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.route}
          style={styles.button}
          onPress={() => {
            navigation.navigate(item.route);
            // refetch();
          }}>
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
            color={active === item.route ? COLORS.PRIMARY : COLORS.TEXT_SECONDARY}
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
    backgroundColor: COLORS.CREAM,
    borderTopWidth: 1,
    borderTopColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
