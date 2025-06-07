import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaWrapper } from '../../../components/SafeAreaWrapper';
import { RegisterHeader } from './RegisterHeader';
import { RegisterFooter } from './RegisterFooter';

interface RegisterLayoutProps {
  title: string;
  children: React.ReactNode;
  showFooter?: boolean;
  onBack?: () => void;
  showBackButton?: boolean;
}

export function RegisterLayout({
  title,
  children,
  showFooter = true,
  onBack,
  showBackButton = true,
}: RegisterLayoutProps) {
  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        {showBackButton && (
          <IconButton icon="arrow-left" size={24} style={styles.backButton} onPress={onBack} />
        )}
        <RegisterHeader title={title} />
        <View style={styles.content}>{children}</View>
        {showFooter && <RegisterFooter />}
      </View>
    </SafeAreaWrapper>
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
  backButton: {
    position: 'absolute',
    left: 10,
    top: 25,
    zIndex: 1,
  },
});
