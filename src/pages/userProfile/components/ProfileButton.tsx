import React from 'react';
import { TouchableOpacity, Text, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/userProfile.style';
import { COLORS } from '../../../constants/colors';

interface ProfileButtonProps {
  label: string;
  iconName: string;
  onPress: () => void;
  isDanger?: boolean;
  iconColor?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  label,
  iconName,
  onPress,
  isDanger = false,
  iconColor,
}) => {
  const buttonStyles: StyleProp<ViewStyle>[] = [styles.button];
  const textStyles: StyleProp<TextStyle>[] = [styles.buttonText];

  if (isDanger) {
    buttonStyles.push(styles.dangerButton);
    textStyles.push(styles.dangerButtonText);
  }

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon
          name={iconName}
          size={24}
          color={iconColor || (isDanger ? COLORS.ERROR : COLORS.TEXT_PRIMARY)}
        />
      </View>
      <Text style={textStyles}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;
