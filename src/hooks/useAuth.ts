import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import authService from '../services/auth.service';
import { UserLoginReq, UserRegisterReq, IUser } from '../types/user';

// Query keys
export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

/**
 * Hook to get current user data
 */
export const useUser = () => {
  return useQuery<IUser>({
    queryKey: authKeys.user(),
    queryFn: () => authService.getUser(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: false, // Don't retry if user is not authenticated
  });
};

/**
 * Hook to login user
 */
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserLoginReq) => authService.login(payload),
    onSuccess: (userData) => {
      queryClient.setQueryData(authKeys.user(), userData);
    },
    onError: (error) => {
      console.error('Login failed:', error);
      queryClient.removeQueries({ queryKey: authKeys.user() });
    },
  });
};

/**
 * Hook to register user
 */
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserRegisterReq) => authService.register(payload),
    onSuccess: (userData) => {
      // Update user query cache with new data
      queryClient.setQueryData(authKeys.user(), userData);
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });
};

/**
 * Hook to logout user
 */
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logoutUser(),
    onSuccess: () => {
      queryClient.clear();
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });
};
