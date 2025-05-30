import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/userProfile.style';

interface ProfileHeaderProps {
  firstName: string;
  lastName: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ firstName, lastName }) => {
  // Generate avatar initials from user's name
  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    } else if (firstName) {
      return firstName.charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <View style={styles.profileSection}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getInitials()}</Text>
      </View>
      <Text style={styles.username}>
        {firstName} {lastName}
      </Text>
    </View>
  );
};

export default ProfileHeader;
