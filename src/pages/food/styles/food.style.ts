import { StyleSheet, Platform } from 'react-native';
import { COLORS, withAlpha } from '../../../constants/colors';

const foodStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: COLORS.CREAM,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  refreshButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.TEXT_PRIMARY,
  },
  card: {
    marginBottom: 24,
    borderRadius: 15,
    overflow: 'hidden',
    height: 180,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXT_PRIMARY,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardContent: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  cardIcon: {
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 22,
  },
  historyCard: {
    backgroundColor: withAlpha(COLORS.MINTY, 0.5),
    borderWidth: 1,
    borderColor: COLORS.MINTY,
  },
  collectionCard: {
    backgroundColor: withAlpha(COLORS.CREAM, 0.8),
    borderWidth: 1,
    borderColor: withAlpha(COLORS.LEMON, 0.5),
  },
  plannerCard: {
    backgroundColor: withAlpha(COLORS.MINTY, 0.3),
    borderWidth: 1,
    borderColor: COLORS.FRESH_LEAF,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: COLORS.SECONDARY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  comingSoonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // New styles for meal history loading/error states
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
  },
  errorText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.ERROR,
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: COLORS.TEXT_LIGHT,
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  }, // Progress section styles
  progressSection: {
    backgroundColor: COLORS.CREAM,
    margin: 16,
    padding: 20,
    borderRadius: 15,
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
        elevation: 3,
      },
    }),
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: withAlpha(COLORS.BORDER_LIGHT, 0.3),
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  }, // Simplified day item styles
  dayItem: {
    backgroundColor: COLORS.CREAM,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXT_PRIMARY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  dayDate: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  dayCompletion: {
    fontSize: 16,
    fontWeight: '700',
    marginRight: 10, // Add space between percentage and icon
  },
  completionHigh: {
    color: COLORS.PROGRESS_HIGH,
  },
  completionMedium: {
    color: COLORS.PROGRESS_MEDIUM,
  },
  completionLow: {
    color: COLORS.PROGRESS_LOW,
  }, // Food Day Details screen styles
  mealItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.CREAM,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: withAlpha(COLORS.BORDER_LIGHT, 0.5),
  },
  mealItemContent: {
    flex: 1,
  },
  mealItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  mealItemCalories: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  mealItemStatus: {
    paddingLeft: 16,
  },
  dayProgressContainer: {
    backgroundColor: COLORS.CREAM,
    padding: 16,
    marginBottom: 12,
  },
  dayProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayProgressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 8,
  },
  dayProgressPercentage: {
    fontSize: 16,
    fontWeight: '700',
  },
  nutritionSummaryContainer: {
    backgroundColor: COLORS.CREAM,
    padding: 16,
    marginBottom: 12,
  },
  nutritionSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 16,
  },
  nutritionSummaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  nutritionSummaryItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 16,
  },
  nutritionSummaryValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.PRIMARY,
    marginBottom: 4,
  },
  nutritionSummaryLabel: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
  },
  mealListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    padding: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.CREAM,
  },
  mealListContainer: {
    paddingBottom: 20,
  },
});

export default foodStyles;
