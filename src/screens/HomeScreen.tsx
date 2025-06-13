import React, {useLayoutEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
  Dimensions,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import OpenStreetMapView from '../components/HomeScreen/Map';
import MapSkeleton from '../components/HomeScreen/MapSkeleton';
import ListSkeleton from '../components/HomeScreen/ListSkeleton';
import CoffeeList from '../components/HomeScreen/List';
import {fetchCoffeeShops} from '../utils/api';

const {width} = Dimensions.get('window');

type CoffeeShop = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

const HomeScreen = () => {
  const [location, setLocation] = useState<{lat: number; lon: number} | null>(
    null,
  );
  const [shops, setShops] = useState<CoffeeShop[] | null>(null);
  const [selectedShop, setSelectedShop] = useState<CoffeeShop | null>(null);

  useLayoutEffect(() => {
    let intervalId: number | null = null;
    let locationSet = false;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const start = Date.now();
        intervalId = setInterval(() => {
          if (!locationSet && Date.now() - start >= 1000) {
            setLocation({lat: latitude, lon: longitude});
            locationSet = true;
            if (intervalId !== null) {
              clearInterval(intervalId);
            }
          }
        }, 100);
      },
      error => {
        console.warn(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    return () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useLayoutEffect(() => {
    if (location?.lat && location?.lon) {
      (async () => {
        const coffeeShops = await fetchCoffeeShops(location.lat, location.lon);
        setShops(coffeeShops);
      })();
    }
  }, [location]);

  // Handler when user clicks on a coffee shop in the list
  const handleSelectShop = (shop: CoffeeShop) => {
    setSelectedShop(shop);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" translucent={false} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mapWrapper}>
          {location ? (
            <OpenStreetMapView
              location={location}
              selectedShop={selectedShop}
            />
          ) : (
            <MapSkeleton />
          )}
        </View>

        <View style={styles.listWrapper}>
          {location && shops ? (
            <CoffeeList
              shops={shops}
              onSelectShop={handleSelectShop}
              selectedShop={selectedShop}
            />
          ) : (
            <ListSkeleton />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    gap: 20,
  },
  mapWrapper: {
    width,
    height: 300,
    paddingHorizontal: 30,
  },
  listWrapper: {
    flex: 1,
    width,
    paddingHorizontal: 30,
  },
});

export default HomeScreen;
