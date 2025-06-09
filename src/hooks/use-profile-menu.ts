import { useContext } from 'react';
import {
  ProfileMenuContext,
  type ProfileMenuContextProps,
} from '@/context/profile-menu-context';

export const useProfileMenu = (): ProfileMenuContextProps => {
  const ctx = useContext(ProfileMenuContext);
  if (!ctx) {
    throw new Error('useProfileMenu must be used within a ProfileMenuProvider');
  }
  return ctx;
};