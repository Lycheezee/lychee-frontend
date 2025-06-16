import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { mealPreferencesSchema } from '../schemas/steps.schema';
import { useUpdateUser } from '~/hooks/useUser';
import { Provider } from 'react-native-paper';
import { NumberInputField } from '~/components/NumberInputField';
import { RegisterLayout } from '../components/RegisterLayout';
import { IUser } from '~/types/user';
import cookiesService from '~/services/cookie.service';

const MEAL_LENGTH = {
  MIN: 7,
  MAX: 30,
};

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
      updateUserMutation.mutateAsync({
        payload: { mealPlanDays: data.mealPlanDays },
        params: { type: 'mealLength' },
      });
      cookiesService.setItem('userAuth', { ...data, mealPlanDays: data.mealPlanDays });
      onNext();
    } catch (err) {
      console.error('Error updating meal plan preferences:', err);
    }
  };
  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="Your Goals" onBack={onBack}>
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
              <Text style={styles.description}>
                How many days would you like your meal plan to cover? Choose between{' '}
                {MEAL_LENGTH.MIN} and {MEAL_LENGTH.MAX} days.
              </Text>

              <View style={styles.daysSelector}>
                <Text style={styles.label}>Meal plan durations</Text>
                <NumberInputField
                  name="mealPlanDays"
                  label="Number of Days"
                  placeholder="Number of days for your meal plan"
                  min={MEAL_LENGTH.MIN}
                  max={MEAL_LENGTH.MAX}
                  allowDecimals={false}
                  disabled={updateUserMutation.isPending}
                />
              </View>

              <Button onPress={handleSubmit(onSubmit)} disabled={updateUserMutation.isPending}>
                {updateUserMutation.isPending ? 'Saving...' : 'Finish'}
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
  container: {
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
