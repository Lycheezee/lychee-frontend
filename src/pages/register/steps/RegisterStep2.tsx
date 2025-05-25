import { View, Text } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../../../components/InputField';
import { SelectField } from '../../../components/SelectField';
import { DateField } from '../../../components/DateField';
import { Button } from '../../../components/Button';
import { userInfoSchema } from '../schemas/steps.schema';
import userService from '~/services/user.service';
import { genderOptions } from '~/constants/user.constants';
import { Provider } from 'react-native-paper';

export interface UserInfoReq {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  dob?: string;
}

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
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            User Information
          </Text>
          <InputField name="firstName" label="First Name" />
          <InputField name="middleName" label="Middle Name (optional)" />
          <InputField name="lastName" label="Last Name" />
          <SelectField
            name="gender"
            label="Gender"
            options={genderOptions}
            placeholder="Select gender"
          />
          <DateField name="dob" label="Date of Birth" placeholder="Select your birth date" />
          <Button onPress={handleSubmit(onSubmit)}>Next</Button>
        </View>
      </Provider>
    </FormProvider>
  );
}
