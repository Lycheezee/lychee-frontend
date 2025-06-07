import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../../styles/dashboard.style';

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
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};
