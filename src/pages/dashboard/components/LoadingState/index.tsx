import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../../styles/dashboard.style';
import { COLORS } from '../../../../constants/colors';

interface LoadingStateProps {
  message?: string;
}

/**
 * Loading state component for the dashboard
 * Shows a spinner with an optional message
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading your dashboard...',
}) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.PRIMARY} />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};
