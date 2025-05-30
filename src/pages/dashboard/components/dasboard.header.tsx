import { View, StyleSheet, Text } from 'react-native';
import { getGreeting } from '../helpers/getGreeting';

interface DashboardHeaderProps {
  userName: string;
}

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  const greeting = getGreeting();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>
          {greeting}, {userName}!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
});
