import { View, Text, TouchableOpacity } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from './types/login.types';
import { styles } from './styles/login.style';
import { InputField } from '../../components/InputField';
import { Button } from '../../components/Button';
import { ROUTES } from '../../constants/routes';
import { loginSchema } from './schemas/login.schema';
import authService from '~/services/auth.service';

export default function LoginPage() {
  const navigation = useNavigation();
  const methods = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: LoginData) => {
    const user = authService.login(data);
    console.log(user);
    navigation.navigate(ROUTES.DASHBOARD as never);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <InputField name="email" label="Email" />
        <InputField name="password" label="Password" secureTextEntry />
        <Button onPress={handleSubmit(onSubmit)}>Login</Button>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER as never)}>
          <Text style={styles.switchText}>Don&apos;t have an account? Register</Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}
