import { View, Text } from 'react-native';
import styles from '../../styles/dashboard.style';

interface WelcomeSectionProps {
  firstName: string;
}

/**
 * Welcome section component for the dashboard
 * Displays the page header and welcome message
 */
export const WelcomeSection: React.FC<WelcomeSectionProps> = ({ firstName }) => {
  return (
    <>
      {/* Home Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      {/* Welcome Message */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome back, <Text style={styles.usernameText}>{firstName}</Text>
        </Text>
      </View>
    </>
  );
};
