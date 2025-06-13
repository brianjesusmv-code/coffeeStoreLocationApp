import {PermissionsAndroid, Platform, Permission} from 'react-native';

const permissionMap: Record<string, Permission> = {
  location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
};

export async function requestPermissionByTag(
  permissionName: string,
): Promise<boolean> {
  if (Platform.OS !== 'android') {
    return false;
  }

  const permission = permissionMap[permissionName.toLowerCase()];
  if (!permission) {
    return false;
  }

  try {
    const result = await PermissionsAndroid.request(permission);
    return result === PermissionsAndroid.RESULTS.GRANTED;
  } catch {
    return false;
  }
}
