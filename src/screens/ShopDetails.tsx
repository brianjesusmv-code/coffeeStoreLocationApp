import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Feather from '../assets/icons/feather';

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  ShopDetails: {latitude: number; longitude: number; name: string};
};

type Props = NativeStackScreenProps<RootStackParamList, 'ShopDetails'>;

type ReverseGeocodeResponse = {
  name?: string;
  address?: {
    road?: string;
    house_number?: string;
    city?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
};

const randomString = () => Math.random().toString(36).substring(2, 10);

const ShopDetails = ({navigation, route}: Props) => {
  const {latitude, longitude, name: initialName} = route.params;
  const [data, setData] = useState<ReverseGeocodeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
        {
          headers: {
            'User-Agent': `CoffeeWhere/1.0 (${randomString()})`,
          },
        },
      );
      if (!response.ok) throw new Error(`HTTP status ${response.status}`);
      const json = await response.json();
      setData({
        name: json.name || json.address?.amenity || initialName,
        address: json.address,
      });
    } catch (err) {
      setError('Error al obtener la dirección.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2150ff" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {error || 'No se encontraron datos.'}
        </Text>
      </View>
    );
  }

  const {
    name,
    address: {
      road,
      house_number,
      city,
      state_district,
      state,
      postcode,
      country,
    } = {},
  } = data;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#2150ff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de la Tienda</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{name || initialName}</Text>

        <View style={styles.inputLikeBox}>
          <Text style={styles.label}>Dirección</Text>
          <Text style={styles.inputText}>
            {(road ? road : '') +
              (road && house_number ? ' ' : '') +
              (house_number ? house_number : '')}
          </Text>
        </View>

        {city ? (
          <View style={styles.inputLikeBox}>
            <Text style={styles.label}>Ciudad</Text>
            <Text style={styles.inputText}>{city}</Text>
          </View>
        ) : null}

        {state_district ? (
          <View style={styles.inputLikeBox}>
            <Text style={styles.label}>Distrito</Text>
            <Text style={styles.inputText}>{state_district}</Text>
          </View>
        ) : null}

        {state ? (
          <View style={styles.inputLikeBox}>
            <Text style={styles.label}>Provincia</Text>
            <Text style={styles.inputText}>{state}</Text>
          </View>
        ) : null}

        {postcode ? (
          <View style={styles.inputLikeBox}>
            <Text style={styles.label}>Código Postal</Text>
            <Text style={styles.inputText}>{postcode}</Text>
          </View>
        ) : null}

        {country ? (
          <View style={styles.inputLikeBox}>
            <Text style={styles.label}>País</Text>
            <Text style={styles.inputText}>{country}</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f9faff'},
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(33, 80, 255, 0.12)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2150ff',
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#223344',
    marginBottom: 20,
  },
  inputLikeBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#d5d9e0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },
  inputText: {
    fontSize: 18,
    color: '#374151',
  },
  center: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  errorText: {color: 'red', fontSize: 18},
});

export default ShopDetails;
