import React, { useState } from 'react';
import { ProfileMenuContext } from './profile-menu-context';

export const ProfileMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <ProfileMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </ProfileMenuContext.Provider>
  );
};