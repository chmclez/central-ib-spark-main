import { createContext } from 'react';

export interface ProfileMenuContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ProfileMenuContext = createContext<ProfileMenuContextProps | undefined>(
  undefined,
);