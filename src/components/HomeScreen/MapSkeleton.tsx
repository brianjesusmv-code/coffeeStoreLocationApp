import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const MapSkeleton = () => {
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
    outputRange: [-width, width],
  });

  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonBase} />
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
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  skeletonBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#e0e0e0',
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.6,
    transform: [{rotate: '15deg'}],
  },
});

export default MapSkeleton;
