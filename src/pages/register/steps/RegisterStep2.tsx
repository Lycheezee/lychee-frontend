import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../../../components/InputField';
import { SelectField } from '../../../components/SelectField';
import { DateField } from '../../../components/DateField';
import { Button } from '../../../components/Button';
import { userInfoSchema } from '../schemas/steps.schema';
import userService, { UserUpdatePayload } from '~/services/user.service';
import { genderOptions } from '~/constants/user.constants';
import { Provider } from 'react-native-paper';
import { RegisterLayout } from '../components/RegisterLayout';

export type UserInfoReq = Pick<
  UserUpdatePayload,
  'firstName' | 'middleName' | 'lastName' | 'gender' | 'dob'
>;

export function RegisterStep2({
  onNext,
  defaultValues,
}: {
  onNext: (data?: any) => void;
  defaultValues?: any;
}) {
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(userInfoSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit = async (data: UserInfoReq) => {
    try {
      const user = await userService.updateUser(data);
      if (!user) return;
      onNext(data);
    } catch (err) {
      console.error('Error updating user info:', err);
      onNext(data);
    }
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="User Information">
          <View style={styles.form}>
            <InputField name="firstName" label="First Name" placeholder="Enter your first name" />
            <InputField
              name="middleName"
              label="Middle Name"
              placeholder="Enter your middle name (optional)"
            />
            <InputField name="lastName" label="Last Name" placeholder="Enter your last name" />
            <View style={styles.row}>
              <View style={styles.genderField}>
                <SelectField
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  placeholder="Select gender"
                />
              </View>
              <View style={styles.dateField}>
                <DateField name="dob" label="Date of Birth" placeholder="Select your birth date" />
              </View>
            </View>
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
  genderField: {
    flex: 1,
  },
  dateField: {
    flex: 2,
  },
});
