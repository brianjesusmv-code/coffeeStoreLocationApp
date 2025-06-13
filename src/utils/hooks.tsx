import {useContext, useState} from 'react';
import {PermissionsContext} from '../contexts/location';
import {requestPermissionByTag} from './permissions';

export function useLocationPermission() {
  const {hasLocationPermission, checkPermissions} =
    useContext(PermissionsContext);
  return {hasLocationPermission, checkPermissions};
}

export function useRequestPermission() {
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState<boolean | null>(null);

  async function request(tag: string) {
    setLoading(true);
    const result = await requestPermissionByTag(tag);
    setGranted(result);
    setLoading(false);
    return result;
  }

  return {loading, granted, request};
}
