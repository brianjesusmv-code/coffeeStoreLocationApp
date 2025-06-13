declare module 'react-native-leaflet-view' {
  import {Component} from 'react';
  import {ViewProps} from 'react-native';

  interface Marker {
    id: string;
    coordinate: [number, number];
    title?: string;
    color?: string;
  }

  interface LeafletViewProps extends ViewProps {
    mapCenter: [number, number];
    zoom: number;
    mapMarkers?: Marker[];
    onMapReady?: () => void;
  }

  export default class LeafletView extends Component<LeafletViewProps> {}
}

declare module 'react-native-vector-icons/Feather' {
  import FeatherIcon from 'react-native-vector-icons';
  export default FeatherIcon;
}

declare module 'react-native-onboarding-swiper' {
  import * as React from 'react';
  import {ViewStyle, TextStyle, StyleProp} from 'react-native';

  interface Page {
    backgroundColor?: string;
    image?: React.ReactNode;
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
  }

  interface OnboardingProps {
    pages: Page[];
    showSkip?: boolean;
    showNext?: boolean;
    showDone?: boolean;
    onDone?: () => void;
    onSkip?: () => void;
    onNext?: () => void;
    containerStyles?: StyleProp<ViewStyle>;
    titleStyles?: StyleProp<TextStyle>;
    subTitleStyles?: StyleProp<TextStyle>;
    imageContainerStyles?: StyleProp<ViewStyle>;
    bottomBarHighlight?: boolean;
    bottomBarHeight?: number;
    bottomBarColor?: string;
  }

  export default class Onboarding extends React.Component<OnboardingProps> {}
}
