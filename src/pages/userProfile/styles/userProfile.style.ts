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
    borderColor: COLORS.ERROR,
    borderWidth: 1,
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
    backgroundColor: COLORS.BACKGROUND,
    borderWidth: 2,
    borderColor: COLORS.BORDER_LIGHT,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
  confirmButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: COLORS.ERROR,
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
  cancelButtonText: {
    color: COLORS.TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: COLORS.TEXT_LIGHT,
    fontSize: 16,
    fontWeight: '600',
  },
  // Settings Modal Styles
  settingsModalContent: {
    width: '90%',
    backgroundColor: COLORS.CREAM,
    borderRadius: 15,
    padding: 24,
    maxHeight: '90%',
  },
  settingsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingsModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.TEXT_PRIMARY,
    flex: 1,
  },
  settingsModalSubtitle: {
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    marginBottom: 24,
    lineHeight: 22,
  },
  aiOptionsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  aiOptionButton: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  aiOptionButtonDisabled: {
    backgroundColor: withAlpha(COLORS.BACKGROUND, 0.6),
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.7,
  },
  aiOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  aiOptionText: {
    marginLeft: 16,
    flex: 1,
  },
  aiOptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 4,
  },
  aiOptionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  inUseText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.PRIMARY,
    backgroundColor: withAlpha(COLORS.PRIMARY, 0.1),
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  aiOptionDescription: {
    fontSize: 14,
    color: COLORS.TEXT_SECONDARY,
    lineHeight: 18,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: withAlpha(COLORS.WARNING, 0.1),
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.WARNING,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.WARNING,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});

export default userProfileStyles;
