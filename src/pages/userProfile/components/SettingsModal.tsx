import React from 'react';
import { View, Text, TouchableOpacity, Modal, ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../../constants/colors';
import styles from '../styles/userProfile.style';
import { useUser } from '~/hooks';
import cookiesService from '~/services/cookie.service';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectAI: (aiModel: 'gemma' | 'gemini' | 'lychee') => void;
  isLoading?: boolean;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  onSelectAI,
  isLoading = false,
}) => {
  const { data } = useUser();
  const currentModel = data?.dietPlan?.type || 'lychee';

  const handleAISelection = (model: 'gemma' | 'gemini' | 'lychee') => {
    onSelectAI(model);
    cookiesService.setItem('userAuth', { ...data, dietPlan: { ...data?.dietPlan, type: model } });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.settingsModalContent}>
          <View style={styles.settingsModalHeader}>
            <Text style={styles.settingsModalTitle}>AI Diet Plan Regeneration</Text>
            <TouchableOpacity onPress={onClose} disabled={isLoading}>
              <Icon name="close" size={24} color={COLORS.TEXT_PRIMARY} />
            </TouchableOpacity>
          </View>
          <Text style={styles.settingsModalSubtitle}>
            Choose an AI model to regenerate your personalized diet plan:
          </Text>
          {currentModel !== 'lychee' && (
            <View style={styles.warningContainer}>
              <Icon name="warning" size={20} color={COLORS.WARNING} />
              <Text style={styles.warningText}>
                If you change to Lychee model, you will lose your current progress
              </Text>
            </View>
          )}
          <View style={styles.aiOptionsContainer}>
            <TouchableOpacity
              style={
                currentModel === 'gemini' ? styles.aiOptionButtonDisabled : styles.aiOptionButton
              }
              onPress={() => handleAISelection('gemini')}
              disabled={isLoading || currentModel === 'gemini'}>
              <View style={styles.aiOptionContent}>
                <Icon name="sparkles" size={32} color={COLORS.PRIMARY} />
                <View style={styles.aiOptionText}>
                  <View style={styles.aiOptionTitleContainer}>
                    <Text style={styles.aiOptionTitle}>Gemini</Text>
                    {currentModel === 'gemini' && <Text style={styles.inUseText}>in use</Text>}
                  </View>
                  <Text style={styles.aiOptionDescription}>
                    Advanced AI model with comprehensive nutrition analysis
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                currentModel === 'gemma' ? styles.aiOptionButtonDisabled : styles.aiOptionButton
              }
              onPress={() => handleAISelection('gemma')}
              disabled={isLoading || currentModel === 'gemma'}>
              <View style={styles.aiOptionContent}>
                <Icon name="flash" size={32} color={COLORS.SECONDARY} />
                <View style={styles.aiOptionText}>
                  <View style={styles.aiOptionTitleContainer}>
                    <Text style={styles.aiOptionTitle}>Gemma</Text>
                    {currentModel === 'gemma' && <Text style={styles.inUseText}>in use</Text>}
                  </View>
                  <Text style={styles.aiOptionDescription}>
                    Fast and efficient AI model for quick meal planning
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
            </TouchableOpacity>
            <TouchableOpacity
              style={
                currentModel === 'lychee' ? styles.aiOptionButtonDisabled : styles.aiOptionButton
              }
              onPress={() => handleAISelection('lychee')}
              disabled={isLoading || currentModel === 'lychee'}>
              <View style={styles.aiOptionContent}>
                <Image
                  source={require('../../../../assets/lychee_logo.png')}
                  style={{ width: 32, height: 32 }}
                  resizeMode="contain"
                />
                <View style={styles.aiOptionText}>
                  <View style={styles.aiOptionTitleContainer}>
                    <Text style={styles.aiOptionTitle}>Lychee Model</Text>
                    {currentModel === 'lychee' && <Text style={styles.inUseText}>in use</Text>}
                  </View>
                  <Text style={styles.aiOptionDescription}>
                    Our proprietary nutrition-focused AI for personalized meal planning
                  </Text>
                </View>
              </View>
              <Icon name="chevron-forward" size={20} color={COLORS.TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.PRIMARY} />
              <Text style={styles.loadingText}>Regenerating your diet plan...</Text>
            </View>
          )}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose} disabled={isLoading}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Icon
                name="close-outline"
                size={20}
                color={COLORS.TEXT_PRIMARY}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SettingsModal;
