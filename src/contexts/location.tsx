import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

type PermissionsContextType = {
  hasLocationPermission: boolean | null;
  checkPermissions: () => Promise<void>;
};

export const PermissionsContext = createContext<PermissionsContextType>({
  hasLocationPermission: null,
  checkPermissions: async () => {},
});

export const PermissionsProvider = ({children}: {children: ReactNode}) => {
  const [hasLocationPermission, setHasLocationPermission] = useState<
    boolean | null
  >(null);

  const checkPermissions = async () => {
    if (Platform.OS !== 'android') {
      setHasLocationPermission(false);
      return;
    }
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    setHasLocationPermission(granted);
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return (
    <PermissionsContext.Provider
      value={{hasLocationPermission, checkPermissions}}>
      {children}
    </PermissionsContext.Provider>
  );
};
