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
});

export default foodStyles;
