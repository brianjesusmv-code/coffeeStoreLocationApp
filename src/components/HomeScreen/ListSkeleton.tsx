import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const ITEM_COUNT = 5;

const CoffeeListSkeleton = () => {
  const shimmerTranslate = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerTranslate, {
        toValue: 1,
        duration: 1300,
        useNativeDriver: true,
      }),
    ).start();
  }, [shimmerTranslate]);

  const translateX = shimmerTranslate.interpolate({
    inputRange: [-1, 1],
    outputRange: [-300, 300],
  });

  const renderSkeletonItem = (index: number) => (
    <View key={index} style={styles.itemContainer}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonSubtitle} />
      <Animated.View
        style={[
          styles.shimmerOverlay,
          {
            transform: [{translateX}],
          },
        ]}
      />
    </View>
  );

  return (
    <View>
      {Array.from({length: ITEM_COUNT}).map((_, i) => renderSkeletonItem(i))}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    marginBottom: 12,
    padding: 15,
    overflow: 'hidden',
  },
  skeletonTitle: {
    height: 20,
    width: '60%',
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  skeletonSubtitle: {
    height: 14,
    width: '40%',
    backgroundColor: '#ccc',
    borderRadius: 6,
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.3)',
    opacity: 0.6,
    transform: [{rotate: '15deg'}],
  },
});

export default CoffeeListSkeleton;
