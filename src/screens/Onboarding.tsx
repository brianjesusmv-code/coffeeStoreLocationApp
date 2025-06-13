import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import Feather from '../assets/icons/feather';
import {requestPermissionByTag} from '../utils/permissions';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  ShopDetails: {latitude: number; longitude: number; name: string};
};

const OnboardingScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDone = async () => {
    const granted = await requestPermissionByTag('location');
    if (granted) {
      console.log('Permiso de ubicación concedido');
      navigation.navigate('Home');
    } else {
      console.log('Permiso de ubicación denegado');
    }
  };

  return (
    <Onboarding
      showNext={false}
      showDone={false}
      showSkip={false}
      pages={[
        {
          backgroundColor: '#344055',
          image: (
            <View style={styles.imageContainer}>
              <Feather name="map" size={50} color={'#344055'} />
            </View>
          ),
          title: 'Bienvenido',
          subtitle: (
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>
                Encuentra cafeterías cercanas en tu ciudad
              </Text>
              <View style={styles.buttonPlaceholder} />
            </View>
          ),
        },
        {
          backgroundColor: '#44526b',
          image: (
            <View style={styles.imageContainer}>
              <Feather name="map-pin" size={50} color={'#44526b'} />
            </View>
          ),
          title: 'Para empezar, necesitamos tu ubicación',
          subtitle: (
            <View style={styles.subtitleContainer}>
              <Text style={styles.subtitleText}>
                Activa el permiso para mostrar cafeterías cercanas
              </Text>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={handleDone}>
                <Text style={styles.permissionButtonText}>Permitir acceso</Text>
              </TouchableOpacity>
            </View>
          ),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  subtitleContainer: {
    alignItems: 'center',
    gap: 10,
    height: 100,
    justifyContent: 'flex-start',
  },
  buttonPlaceholder: {
    height: 42,
  },
  imageContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionButton: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#44526b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitleText: {
    fontSize: 15,
    color: '#e1e1e1',
    textAlign: 'center',
  },
});

export default OnboardingScreen;
