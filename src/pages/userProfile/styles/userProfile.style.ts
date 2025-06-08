import { StyleSheet, Platform } from 'react-native';
import { COLORS, withAlpha } from '../../../constants/colors';

const userProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    position: 'relative',
  },
  contentContainer: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 80, // Add enough padding for the bottom navigation
  },
  bottomNavContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.CREAM,
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER_LIGHT,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXT_PRIMARY,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  profileSection: {
    backgroundColor: COLORS.CREAM,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER_LIGHT,
    marginBottom: 16,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: COLORS.MINTY,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    marginTop: 8,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: COLORS.CREAM,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.TEXT_PRIMARY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  dangerButton: {
    backgroundColor: withAlpha(COLORS.ERROR, 0.1),
    borderColor: withAlpha(COLORS.ERROR, 0.3),
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
    color: COLORS.TEXT_PRIMARY,
  },
  dangerButtonText: {
    color: COLORS.ERROR,
  },
  iconContainer: {
    width: 30,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: withAlpha(COLORS.TEXT_PRIMARY, 0.5),
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.CREAM,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.TEXT_PRIMARY,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.MINTY,
  },
  confirmButton: {
    backgroundColor: COLORS.ERROR,
  },
  cancelButtonText: {
    color: COLORS.TEXT_PRIMARY,
  },
  confirmButtonText: {
    color: COLORS.TEXT_LIGHT,
  },
});

export default userProfileStyles;
