import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterPage from './index';
import { RegisterStep2 } from './steps/RegisterStep2';
import { RegisterStep3 } from './steps/RegisterStep3';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';

export const clearProgress = async () => {
  try {
    await AsyncStorage.removeItem('registration_step');
    await AsyncStorage.removeItem('registration_data');
  } catch (error) {
    console.error('Failed to clear registration progress:', error);
  }
};

export default function RegisterFlow() {
  const navigation = useNavigation();
  const route = useRoute();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const initializeFlow = async () => {
      const params = route.params as any;
      if (params?.step) {
        setStep(params.step);
      } else {
        // Try to restore progress from AsyncStorage
        try {
          const savedStep = await AsyncStorage.getItem('registration_step');
          const savedData = await AsyncStorage.getItem('registration_data');

          if (savedStep) {
            setStep(parseInt(savedStep, 10));
          }
          if (savedData) {
            setFormData(JSON.parse(savedData));
          }
        } catch {
          console.error('No saved registration progress found');
        }
      }
    };

    initializeFlow();
  }, [route.params]);

  const saveProgress = async (currentStep: number, data?: any) => {
    try {
      await AsyncStorage.setItem('registration_step', currentStep.toString());
      if (data) {
        const updatedData = { ...formData, ...data };
        setFormData(updatedData);
        await AsyncStorage.setItem('registration_data', JSON.stringify(updatedData));
      }
    } catch (error) {
      console.error('Failed to save registration progress:', error);
    }
  };

  const handleNext = async (data?: any) => {
    if (step === 3) {
      await clearProgress();
      navigation.navigate(ROUTES.DASHBOARD as never);
      return;
    }

    const nextStep = step + 1;
    await saveProgress(nextStep, data);
    setStep(nextStep);
  };

  if (step === 1) return <RegisterPage onNext={handleNext} />;
  if (step === 2) return <RegisterStep2 onNext={handleNext} defaultValues={formData} />;
  if (step === 3) return <RegisterStep3 onNext={handleNext} defaultValues={formData} />;

  return null;
}
