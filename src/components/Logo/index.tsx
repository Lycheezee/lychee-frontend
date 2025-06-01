import { Image, ImageStyle, StyleSheet, View } from 'react-native';

interface LogoProps {
  size?: number;
  style?: ImageStyle;
}

export function Logo({ size = 100, style }: LogoProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/lychee_logo.png')}
        style={[{ width: size, height: size }, style]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
});
