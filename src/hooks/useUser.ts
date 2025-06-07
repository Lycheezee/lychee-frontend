import { useMutation, useQueryClient } from '@tanstack/react-query';
import userService, { UserUpdatePayload, UserUpdateParams } from '../services/user.service';
import { authKeys } from './useAuth';

// Query keys
export const userKeys = {
  all: ['user'] as const,
  updates: () => [...userKeys.all, 'updates'] as const,
};

/**
 * Hook to update user information
 */
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, params }: { payload: UserUpdatePayload; params?: UserUpdateParams }) =>
      userService.updateUser(payload, params),
    onSuccess: (updatedUser) => {
      // Update user query cache with new data
      queryClient.setQueryData(authKeys.user(), updatedUser);
      // Invalidate to ensure fresh data
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};
