import { useMutation,  useQueryClient } from '@tanstack/react-query';
import userService, { UserUpdatePayload, UserUpdateParams } from '../services/user.service';
import { authKeys } from './useAuth';

// Query keys
export const userKeys = {
  all: ['user'] as const,
  updates: () => [...userKeys.all, 'updates'] as const,
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, params }: { payload: UserUpdatePayload; params?: UserUpdateParams }) =>
      userService.updateUser(payload, params),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(authKeys.user(), updatedUser);
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
    onError: (error) => {
      console.error('Failed to update user:', error);
    },
  });
};
