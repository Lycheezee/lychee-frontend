import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '../../constants/routes';
import cookieService from '~/services/cookie.service';

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
        const accessToken = await cookieService.getItem('accessToken');
        setIsAuthenticated(!!accessToken);
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
