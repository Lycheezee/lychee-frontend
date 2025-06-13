import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<any>({
    defaultValues,
    resolver: yupResolver(bodyInfoSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: BodyInfoReq) => {
    setIsLoading(true);
    try {
      const response = await userService.updateUser({ bodyInfo: data }, { type: 'bodyInfo' });

      if (!response) return;
      onNext({
        ...data,
        dietPlan: response.dietPlan,
      });
    } catch (err) {
      console.error('Error updating body info:', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="Body Information" onBack={onBack}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
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
                    disabled={isLoading}
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
                    disabled={isLoading}
                  />
                </View>
              </View>
              <SelectField
                name="exerciseRate"
                label="Exercise Rate"
                options={exerciseRateOptions}
                placeholder="Select exercise frequency"
                disabled={isLoading}
              />
              <SelectField
                name="macro_preference"
                label="Macro Preference (optional)"
                options={macroPreferenceOptions}
                placeholder="Select macro preference"
                disabled={isLoading}
              />
              <Button onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                {isLoading ? 'Generating Meal...' : 'Next'}
              </Button>
            </View>
          </ScrollView>
        </RegisterLayout>
      </Provider>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
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
