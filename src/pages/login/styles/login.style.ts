import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: COLORS.TEXT_PRIMARY,
  },
  formContainer: {
    width: '100%',
    gap: 16,
  },
  errorText: {
    color: COLORS.ERROR,
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'center',
  },
  switchText: {
    color: COLORS.PRIMARY,
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
  },
});
