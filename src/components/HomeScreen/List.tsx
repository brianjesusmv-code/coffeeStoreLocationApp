import React from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from '../../assets/icons/feather';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CoffeeShop = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  ShopDetails: {latitude: number; longitude: number; name: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  shops: CoffeeShop[];
  onSelectShop?: (shop: CoffeeShop) => void;
  selectedShop?: CoffeeShop | null;
};

const CoffeeList: React.FC<Props> = ({shops, onSelectShop, selectedShop}) => {
  const navigation = useNavigation<NavigationProp>();

  const renderItem = ({item}: {item: CoffeeShop}) => {
    const isSelected = selectedShop?.id === item.id;

    return (
      <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
        <TouchableOpacity
          style={styles.shopInfo}
          onPress={() => onSelectShop?.(item)}>
          <Feather
            name="coffee"
            size={16}
            color={isSelected ? '#2150ff' : '#344055'}
          />
          <Text style={[styles.nameText, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoButton}
          onPress={() =>
            navigation.navigate('ShopDetails', {
              latitude: item.latitude,
              longitude: item.longitude,
              name: item.name,
            })
          }>
          <Feather name="info" size={20} color="#2150ff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={shops}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 12,
    marginBottom: 12,
    padding: 15,
    shadowColor: '#c1c1c1',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.75,
    shadowRadius: 10,
    elevation: 2,
    justifyContent: 'space-between',
  },
  selectedItem: {
    backgroundColor: '#d4ddff',
    borderColor: '#4f6cd1',
    borderWidth: 1,
  },
  shopInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: 40,
  },
  nameText: {
    height: 20,
    borderRadius: 8,
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  selectedText: {
    color: '#2150ff',
  },
  infoButton: {
    padding: 8,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default CoffeeList;
