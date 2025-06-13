import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FeatherGlyphMap from 'react-native-vector-icons/glyphmaps/Feather.json';

type FeatherIconName = keyof typeof FeatherGlyphMap;

interface FeatherProps {
  name: FeatherIconName;
  size?: number;
  color?: string;
  style?: object;
}

const Feather = ({name, size = 24, color = '#000', style}: FeatherProps) => {
  return <FeatherIcon name={name} size={size} color={color} style={style} />;
};

export default Feather;
export type {FeatherIconName};
