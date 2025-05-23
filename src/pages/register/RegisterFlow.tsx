import { useEffect, useState } from 'react';
import RegisterPage from './index';
import { RegisterStep2, RegisterStep3 } from './steps/RegisterSteps';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';

export default function RegisterFlow() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  // You can fetch user progress here and setStep accordingly
  // For now, always start at step 1

  useEffect(() => {
    // TODO: Fetch user progress from API or AsyncStorage
    // setStep(progressStep)
  }, []);

  const handleNext = () => setStep((s) => s + 1);

  if (step === 1) return <RegisterPage onNext={handleNext} />;
  if (step === 2) return <RegisterStep2 onNext={handleNext} />;
  if (step === 3)
    return <RegisterStep3 onNext={() => navigation.navigate(ROUTES.DASHBOARD as never)} />;
  return null;
}
