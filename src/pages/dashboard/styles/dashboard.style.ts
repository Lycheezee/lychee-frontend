import { StyleSheet, Platform } from 'react-native';
import { COLORS, withAlpha } from '../../../constants/colors';

const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: COLORS.BACKGROUND,
  },
  scrollContent: {
    flex: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: COLORS.CREAM,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  welcomeContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 18,
    color: COLORS.TEXT_PRIMARY,
  },
  usernameText: {
    fontWeight: 'bold',
  },
  mealProgressContainer: {
    marginHorizontal: 20,
    backgroundColor: COLORS.CREAM,
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXT_PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  mealProgressTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  nutrientsContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
  },
  nutrientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  bottomNav: {
    borderTopWidth: 1,
    borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
    backgroundColor: COLORS.CREAM,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 48,
    marginBottom: 16,
    color: COLORS.ERROR,
  },
  errorMessage: {
    fontSize: 16,
    color: COLORS.ERROR,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
  },
  retryButtonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default dashboardStyles;
