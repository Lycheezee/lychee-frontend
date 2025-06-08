import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { registerSchema } from './schemas/steps.schema';
import { useRegister } from '~/hooks/useAuth';
import { Provider } from 'react-native-paper';
import { RegisterLayout } from './components/RegisterLayout';
import { IUser } from '~/types/user';
import { COLORS } from '../../constants/colors';

export interface RegisterReq {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage({ onNext }: { onNext: (data?: Partial<IUser>) => void }) {
  const [error, setError] = useState<string | null>(null);
  const registerMutation = useRegister();
  const methods = useForm<RegisterReq>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: 'linh080605@gmail.com',
      password: 'linhlinh',
      confirmPassword: 'linhlinh',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: RegisterReq) => {
    try {
      setError(null);
      await registerMutation.mutateAsync({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      onNext(data);
    } catch (err: any) {
      console.error('Error during registration:', err);
      setError(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <FormProvider {...methods}>
      <Provider>
        <RegisterLayout title="Create Account">
          <View style={styles.form}>
            <InputField
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <InputField
              name="password"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
            />
            <InputField
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Confirm your password"
              secureTextEntry
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <Button onPress={handleSubmit(onSubmit)} disabled={registerMutation.isPending}>
              {registerMutation.isPending ? 'Creating Account...' : 'Register'}
            </Button>
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
  errorText: {
    color: COLORS.ERROR,
    fontSize: 14,
    textAlign: 'center',
  },
});
