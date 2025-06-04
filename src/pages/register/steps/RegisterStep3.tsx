import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { NumberInputField } from '../../../components/NumberInputField';
import { SelectField } from '../../../components/SelectField';
import { Button } from '../../../components/Button';
import { bodyInfoSchema } from '../schemas/steps.schema';
import userService from '~/services/user.service';
import { exerciseRateOptions, macroPreferenceOptions } from '~/constants/user.constants';
import { Provider } from 'react-native-paper';
import { RegisterLayout } from '../components/RegisterLayout';
import { IUser } from '~/types/user';

export interface BodyInfoReq {
  weight?: number;
  height?: number;
  exerciseRate?: string;
  macro_preference?: string;
}

export function RegisterStep3({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data?: Partial<IUser>) => void;
  onBack: () => void;
  defaultValues?: any; // Keep as any to avoid form schema conflicts
}) {
  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(bodyInfoSchema),
  });
  const { handleSubmit } = methods;
  const onSubmit = async (data: BodyInfoReq) => {
    try {
      const response = await userService.updateUser({ bodyInfo: data }, { type: 'bodyInfo' });

      if (!response) return;
      console.log();
      onNext({
        ...data,
        dietPlan: response.dietPlan,
      });
    } catch (err) {
      console.error('Error updating body info:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="Body Information" onBack={onBack}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.field}>
                <NumberInputField
                  name="weight"
                  label="Weight (kg)"
                  placeholder="Enter weight"
                  min={20}
                  max={200}
                  allowDecimals={false}
                />
              </View>
              <View style={styles.field}>
                <NumberInputField
                  name="height"
                  label="Height (cm)"
                  placeholder="Enter height"
                  min={50}
                  max={250}
                  allowDecimals={false}
                />
              </View>
            </View>
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
            <Button onPress={handleSubmit(onSubmit)}>Next</Button>
          </View>
        </RegisterLayout>
      </Provider>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    flex: 1,
  },
});
