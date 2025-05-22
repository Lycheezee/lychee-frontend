import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../constants/routes';

interface ProtectedRootProps {
  children: React.ReactNode;
}

export const ProtectedRoot = ({ children }: ProtectedRootProps) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthToken = async () => {
      try {
        const authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuthToken();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigation.navigate(ROUTES.LOGIN as never);
    }
  }, [loading, isAuthenticated, navigation]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
};
