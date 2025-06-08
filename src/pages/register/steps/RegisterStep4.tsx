import { View, Text, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { mealPreferencesSchema } from '../schemas/steps.schema';
import { useUpdateUser } from '~/hooks/useUser';
import { Provider } from 'react-native-paper';
import { NumberInputField } from '~/components/NumberInputField';
import { RegisterLayout } from '../components/RegisterLayout';
import { IUser } from '~/types/user';
import authService from '~/services/auth.service';

export interface MealPreferencesReq {
  mealPlanDays?: number;
}

export function RegisterStep4({
  onNext,
  onBack,
  defaultValues,
}: {
  onNext: (data?: Partial<IUser>) => void;
  onBack: () => void;
  defaultValues?: any; // Keep as any to handle both IUser and custom data
}) {
  const updateUserMutation = useUpdateUser();
  const methods = useForm<any>({
    defaultValues: {
      mealPlanDays: defaultValues?.mealPlanDays || defaultValues?.mealPlanDays || 7, // Default to one week
      ...defaultValues,
    },
    resolver: yupResolver(mealPreferencesSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: any) => {
    try {
      const user = await updateUserMutation.mutateAsync({
        payload: { mealPlanDays: data.mealPlanDays },
        params: { type: 'mealLength' },
      });
      if (!user) return;
      authService.storeAuthInCookie(defaultValues);
      onNext();
    } catch (err) {
      console.error('Error updating meal plan preferences:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="Your Goals" onBack={onBack}>
          <View style={styles.container}>
            <Text style={styles.description}>
              How many days would you like your meal plan to cover? Choose between 1 and 30 days.
            </Text>

            <View style={styles.daysSelector}>
              <Text style={styles.label}>Meal plan durations</Text>
              <NumberInputField
                name="mealPlanDays"
                label="Number of Days"
                placeholder="Number of days for your meal plan"
                min={1}
                max={30}
                allowDecimals={false}
              />
            </View>

            <Button onPress={handleSubmit(onSubmit)} disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? 'Saving...' : 'Finish'}
            </Button>
          </View>
        </RegisterLayout>
      </Provider>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  daysSelector: {
    marginVertical: 16,
  },
});
