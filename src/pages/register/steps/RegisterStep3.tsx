import { View, Text } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../../../components/InputField';
import { SelectField } from '../../../components/SelectField';
import { Button } from '../../../components/Button';
import { bodyInfoSchema } from '../schemas/steps.schema';
import userService from '~/services/user.service';
import { exerciseRateOptions, macroPreferenceOptions } from '~/constants/user.constants';

export interface BodyInfoReq {
  weight?: number;
  height?: number;
  exerciseRate?: string;
  macro_preference?: string;
}

export function RegisterStep3({
  onNext,
  defaultValues,
}: {
  onNext: (data?: any) => void;
  defaultValues?: any;
}) {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(bodyInfoSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = async (data: BodyInfoReq) => {
    try {
      const user = await userService.updateUser(data);
      if (!user) return;
      onNext(data);
    } catch (err) {
      console.error('Error updating body info:', err);
      onNext(data);
    }
  };

  return (
    <FormProvider {...methods}>
      {' '}
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Body Information</Text>
        <InputField
          name="weight"
          label="Weight (kg)"
          keyboardType="numeric"
          placeholder="Enter your weight in kg"
        />
        <InputField
          name="height"
          label="Height (cm)"
          keyboardType="numeric"
          placeholder="Enter your height in cm"
        />
        <SelectField
          name="exerciseRate"
          label="Exercise Rate"
          options={exerciseRateOptions}
          placeholder="Select exercise frequency"
        />
        <SelectField
          name="macro_preference"
          label="Macro Preference (optional)"
          options={macroPreferenceOptions}
          placeholder="Select macro preference"
        />
        <Button onPress={handleSubmit(onSubmit)}>Finish</Button>
      </View>
    </FormProvider>
  );
}
