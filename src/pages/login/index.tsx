import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { yupResolver } from "@hookform/resolvers/yup";
import { LoginData } from "./types/login.types";
import { styles } from "./styles/login.style";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { ROUTES } from "../../constants/routes";
import { loginSchema } from "./schemas/login.schema";

export default function LoginPage() {
  const navigation = useNavigation();
  const [isRegister, setIsRegister] = useState(false);
  const methods = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com"
    }
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: LoginData) => {
    if(data.email === "admin@gmail.com" && !!data.password) {
      console.log(isRegister ? "Registering" : "Logging in", data);
      navigation.navigate(ROUTES.DASHBOARD as never);
    }
    console.log(isRegister ? "Registering" : "Logging in", data);
  };

  return (
    <FormProvider {...methods}>
      <View style={styles.container}>
        <Text style={styles.title}>{isRegister ? "Register" : "Login"}</Text>
        <InputField name="email" label="Email" />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}
        <InputField name="password" label="Password" />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        {isRegister && (
          <>
            <InputField name="confirmPassword" label="Confirm Password" />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </>
        )}
        <Button onPress={handleSubmit(onSubmit)}>
          {isRegister ? "Register" : "Login"}
        </Button>
        <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
          <Text style={styles.switchText}>
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </FormProvider>
  );
}
