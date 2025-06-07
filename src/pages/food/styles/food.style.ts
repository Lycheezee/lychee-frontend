import { StyleSheet, Platform } from 'react-native';

const foodStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
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
    color: '#333',
  },
  card: {
    marginBottom: 24,
    borderRadius: 15,
    overflow: 'hidden',
    height: 180,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  historyCard: {
    backgroundColor: '#E8F5E9', // Light green
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  collectionCard: {
    backgroundColor: '#E3F2FD', // Light blue
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  plannerCard: {
    backgroundColor: '#F3E5F5', // Light purple
    borderWidth: 1,
    borderColor: '#E1BEE7',
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#6A1B9A',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  comingSoonText: {
    color: 'white',
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
    color: '#555',
  },
  errorText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
  },
  errorSubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  // Progress section styles
  progressSection: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#eee',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#333',
    marginBottom: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  progressBarContainer: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  // Simplified day item styles
  dayItem: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
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
    color: '#333',
    flex: 1,
  },
  dayCompletion: {
    fontSize: 16,
    fontWeight: '700',
  },
  completionHigh: {
    color: '#4CAF50',
  },
  completionMedium: {
    color: '#FF9800',
  },
  completionLow: {
    color: '#f44336',
  },
});

export default foodStyles;
