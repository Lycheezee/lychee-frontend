import { useState } from 'react';
import { View, SafeAreaView, StatusBar, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomNav } from '../../components/BottomNav';
import { useUser, useLogout } from '../../hooks/useAuth';
import { useRegenerateDietPlan } from '../../hooks/useDietPlan';
import { ROUTES } from '../../constants/routes';
import { COLORS } from '../../constants/colors';
import styles from './styles/userProfile.style';

// Import custom components
import ProfileHeader from './components/ProfileHeader';
import ProfileButton from './components/ProfileButton';
import LogoutModal from './components/LogoutModal';
import SettingsModal from './components/SettingsModal';

const UserProfile = () => {
  const navigation = useNavigation();
  const { data: userData } = useUser();
  const logoutMutation = useLogout();
  const regenerateDietPlan = useRegenerateDietPlan();
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigation.navigate(ROUTES.LOGIN as never);
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'There was a problem logging out. Please try again.');
    }
    setLogoutModalVisible(false);
  };

  const handleAISelection = async (aiModel: 'gemma' | 'gemini' | 'lychee') => {
    if (!userData?.dietPlan?._id) {
      Alert.alert('Error', 'No diet plan found. Please try again.');
      setSettingsModalVisible(false);
      return;
    }
    try {
      await regenerateDietPlan.mutateAsync({
        planId: userData.dietPlan._id,
        aiModel,
      });
      setSettingsModalVisible(false);
    } catch {
      // Error handling is done in the hook
      setSettingsModalVisible(false);
    }
  };

  const showComingSoonAlert = () => {
    Alert.alert('Coming Soon', 'This feature is under development.');
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.BACKGROUND} barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollContentContainer}>
          <ProfileHeader
            firstName={userData?.firstName || ''}
            lastName={userData?.lastName || ''}
          />
          <View style={styles.buttonContainer}>
            <ProfileButton
              label="Update Profile"
              iconName="person-outline"
              onPress={showComingSoonAlert}
            />
            <ProfileButton
              label="Settings"
              iconName="settings-outline"
              onPress={() => setSettingsModalVisible(true)}
            />
            <ProfileButton
              label="Logout"
              iconName="log-out-outline"
              onPress={() => setLogoutModalVisible(true)}
              isDanger
            />
          </View>
        </ScrollView>
      </View>
      <LogoutModal
        visible={logoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
      <SettingsModal
        visible={settingsModalVisible}
        onClose={() => setSettingsModalVisible(false)}
        onSelectAI={handleAISelection}
        isLoading={regenerateDietPlan.isPending}
      />
      <View style={styles.bottomNavContainer}>
        <BottomNav active="UserProfile" />
      </View>
    </SafeAreaView>
  );
};

export default UserProfile;
