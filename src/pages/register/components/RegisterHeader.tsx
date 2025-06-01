import { View, Text, StyleSheet } from 'react-native';
import { Logo } from '../../../components/Logo';

interface RegisterHeaderProps {
  title: string;
}

export function RegisterHeader({ title }: RegisterHeaderProps) {
  return (
    <View style={styles.container}>
      <Logo size={60} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
