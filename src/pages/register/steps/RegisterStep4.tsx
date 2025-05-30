import { View, Text } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../../components/Button';
import { mealPreferencesSchema } from '../schemas/steps.schema';
import userService from '~/services/user.service';
import { Provider } from 'react-native-paper';
import { NumberInputField } from '~/components/NumberInputField';

export interface MealPreferencesReq {
  mealPlanDays?: number;
}

export function RegisterStep4({
  onNext,
  defaultValues,
}: {
  onNext: (data?: any) => void;
  defaultValues?: any;
}) {
  const methods = useForm({
    defaultValues: {
      mealPlanDays: defaultValues?.mealPlanDays || 7, // Default to one week
      ...defaultValues,
    },
    resolver: yupResolver(mealPreferencesSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: MealPreferencesReq) => {
    try {
      const user = await userService.updateUser(
        { mealPreferences: { mealPlanDays: data.mealPlanDays } },
        { isFirstTimeSetup: true }
      );
      if (!user) return;
      onNext(data);
    } catch (err) {
      console.error('Error updating meal plan preferences:', err);
      onNext(data); // Continue anyway to avoid blocking the user
    }
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            Meal Plan Duration
          </Text>
          <Text style={{ marginBottom: 16 }}>
            How many days would you like your meal plan to cover? Choose between 1 and 30 days.
          </Text>

          <NumberInputField
            name="mealPlanDays"
            label="Number of Days"
            placeholder="Number of days for your meal plan"
            min={1}
            max={30}
            allowDecimals={false}
          />

          <Button onPress={handleSubmit(onSubmit)}>Finish</Button>
        </View>
      </Provider>
    </FormProvider>
  );
}
