import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CookieManager from "@react-native-cookies/cookies";
import { ROUTES } from "../../constants/routes";

interface ProtectedRootProps {
  children: React.ReactNode;
}

export const ProtectedRoot: React.FC<ProtectedRootProps> = ({ children }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Adjust the URL to match your backend domain if different.
    CookieManager.get("http://localhost:8081")
      .then((cookies) => {
        if (cookies && cookies.authToken && cookies.authToken.value) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.navigate(ROUTES.LOGIN as never);
    }
  }, [loading, isAuthenticated, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};
