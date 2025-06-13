import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '../screens/Onboarding';
import HomeScreen from '../screens/HomeScreen';
import ShopDetails from '../screens/ShopDetails';
import {PermissionsContext, PermissionsProvider} from '../contexts/location';

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  ShopDetails: {latitude: number; longitude: number; name: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {hasLocationPermission} = useContext(PermissionsContext);

  if (hasLocationPermission === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={hasLocationPermission ? 'Home' : 'Onboarding'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShopDetails"
          component={ShopDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Root = () => (
  <PermissionsProvider>
    <RootNavigator />
  </PermissionsProvider>
);

export default Root;
