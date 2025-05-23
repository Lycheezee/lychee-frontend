import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { styles } from '../../login/styles/login.style';
import { InputField } from '../../../components/InputField';
import { ROUTES } from '../../../constants/routes';
import { UserRegisterReq } from '../../../types/user';
import authService from '~/services/auth.service';
import userService from '~/services/user.service';
import { registerSchema } from '../schemas';
import { Button } from '~/components/Button';

export interface UserInfoReq {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: string;
  dob: string;
}

export interface UserInfoRes {
  success: boolean;
  user: any;
}

export interface BodyInfoReq {
  weight: number;
  height: number;
  exerciseRate: string;
  macro_preference?: string;
}

export interface BodyInfoRes {
  success: boolean;
  bodyInfo: any;
}

export function RegisterStep1({ onNext }: { onNext: () => void }) {
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);
  const methods = useForm<UserRegisterReq>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: UserRegisterReq) => {
    setError(null);
    try {
      await authService.register(data);
      onNext();
    } catch (e: any) {
      setError(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <InputField name="email" label="Email" />
        <InputField name="password" label="Password" secureTextEntry />
        <InputField name="confirmPassword" label="Confirm Password" secureTextEntry />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <Button onPress={handleSubmit(onSubmit)}>Register</Button>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.LOGIN as never)}>
          <Text style={styles.switchText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}

export function RegisterStep2({
  onNext,
  defaultValues,
}: {
  onNext: () => void;
  defaultValues?: any;
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = async (data: UserInfoReq) => {
    try {
      await userService.updateUser(data);
      onNext();
    } catch {
      // handle error if needed
      onNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>User Information</Text>
        <InputField name="firstName" label="First Name" />
        <InputField name="middleName" label="Middle Name (optional)" />
        <InputField name="lastName" label="Last Name" />
        <InputField name="gender" label="Gender" />
        <InputField name="dob" label="Date of Birth" />
        <Button onPress={handleSubmit(onSubmit)}>Next</Button>
      </View>
    </FormProvider>
  );
}

export function RegisterStep3({
  onNext,
  defaultValues,
}: {
  onNext: () => void;
  defaultValues?: any;
}) {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = async (data: BodyInfoReq) => {
    try {
      await userService.updateUser(data);
      onNext();
    } catch {
      // handle error if needed
      onNext();
    }
  };

  return (
    <FormProvider {...methods}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>Body Information</Text>
        <InputField name="weight" label="Weight (kg)" />
        <InputField name="height" label="Height (cm)" />
        <InputField name="exerciseRate" label="Exercise Rate" />
        <InputField name="macro_preference" label="Macro Preference (optional)" />
        <Button onPress={handleSubmit(onSubmit)}>Finish</Button>
      </View>
    </FormProvider>
  );
}
