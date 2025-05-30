import * as Yup from 'yup';

export const mealPreferencesSchema = Yup.object({
  mealPlanDays: Yup.number()
    .min(1, 'Your meal plan must cover at least 1 day')
    .max(30, 'Maximum meal plan duration allowed is 30 days')
    .required('Number of days for your meal plan is required')
    .integer('Number of days must be a whole number'),
});

export const userInfoSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .required('First name is required'),
  middleName: Yup.string().max(50, 'Middle name must be less than 50 characters').optional(),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .required('Last name is required'),
  gender: Yup.string()
    .oneOf(['male', 'female', 'other', 'prefer_not_to_say'], 'Please select a valid gender')
    .required('Gender is required'),
  dob: Yup.string()
    .required('Date of birth is required')
    .test('age', 'You must be at least 13 years old', function (value) {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1 >= 13;
      }
      return age >= 13;
    }),
});

export const bodyInfoSchema = Yup.object({
  weight: Yup.number()
    .min(20, 'Weight must be at least 20 kg')
    .max(500, 'Weight must be less than 500 kg')
    .required('Weight is required'),
  height: Yup.number()
    .min(50, 'Height must be at least 50 cm')
    .max(300, 'Height must be less than 300 cm')
    .required('Height is required'),
  exerciseRate: Yup.string()
    .oneOf(
      ['sedentary', 'light', 'moderate', 'active', 'very_active'],
      'Please select a valid exercise rate'
    )
    .required('Exercise rate is required'),
  macro_preference: Yup.string()
    .oneOf(
      ['balanced', 'high_protein', 'low_carb', 'high_carb', 'ketogenic'],
      'Please select a valid macro preference'
    )
    .optional(),
});
