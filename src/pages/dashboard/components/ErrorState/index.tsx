import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/dashboard.style';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Error state component for the dashboard
 * Shows an error message with optional retry functionality
 */
export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.errorText}>⚠️</Text>
      <Text style={styles.errorMessage}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
