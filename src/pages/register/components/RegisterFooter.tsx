import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../../constants/routes';
import { COLORS } from '../../../constants/colors';

export function RegisterFooter() {
  const navigation = useNavigation();

  const handleNavigateToLogin = () => {
    navigation.navigate(ROUTES.LOGIN as never);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigateToLogin}>
      <Text style={styles.text}>
        Already have an account?{' '}
        <Text style={{ fontWeight: 'bold', textDecorationLine: 'underline' }}>Login</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    alignItems: 'center',
  },
  text: {
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
});
