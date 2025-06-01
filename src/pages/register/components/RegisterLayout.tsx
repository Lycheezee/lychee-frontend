import { View, StyleSheet } from 'react-native';
import { RegisterHeader } from './RegisterHeader';
import { RegisterFooter } from './RegisterFooter';

interface RegisterLayoutProps {
  title: string;
  children: React.ReactNode;
  showFooter?: boolean;
}

export function RegisterLayout({ title, children, showFooter = true }: RegisterLayoutProps) {
  return (
    <View style={styles.container}>
      <RegisterHeader title={title} />
      <View style={styles.content}>{children}</View>
      {showFooter && <RegisterFooter />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});
