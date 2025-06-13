import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {WebView} from 'react-native-webview';

const {width} = Dimensions.get('window');

type Location = {lat: number; lon: number} | null;
type CoffeeShop = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
} | null;

type Props = {
  location: Location;
  selectedShop?: CoffeeShop;
};

const OpenStreetMapView: React.FC<Props> = ({location, selectedShop}) => {
  const webviewRef = useRef<WebView>(null);

  // Inject JS to add/update markers whenever location or selectedShop changes
  useEffect(() => {
    if (!location) return;

    const js = `
    if(window.map) {
      // Update user location marker
      if(window.currentLocationMarker) {
        window.currentLocationMarker.setLatLng([${location.lat}, ${
      location.lon
    }]);
      } else {
        window.currentLocationMarker = L.marker([${location.lat}, ${
      location.lon
    }]).addTo(window.map).bindPopup('You are here');
      }

      // Remove existing coffee shop marker if any
      if(window.selectedShopMarker) {
        window.map.removeLayer(window.selectedShopMarker);
        window.selectedShopMarker = null;
      }

      if (${!!selectedShop}) {
        // Add new coffee shop marker
        window.selectedShopMarker = L.marker([${selectedShop?.latitude}, ${
      selectedShop?.longitude
    }], {
          icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [25, 40],
            iconAnchor: [12, 30],
            popupAnchor: [1, -24],
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
            shadowSize: [41, 41],
          }),
        }).addTo(window.map).bindPopup('${selectedShop?.name}');

        // Create bounds including user location and coffee shop
        var bounds = L.latLngBounds([
          [${location.lat}, ${location.lon}],
          [${selectedShop?.latitude}, ${selectedShop?.longitude}]
        ]);
        window.map.fitBounds(bounds, { padding: [50, 50] });

      } else {
        // Only user location: center with zoom 15
        window.map.setView([${location.lat}, ${location.lon}], 15);
      }
    }
    true;
  `;

    webviewRef.current?.injectJavaScript(js);
  }, [location, selectedShop]);

  const recenterMap = () => {
    if (!location) {
      return;
    }

    const js = `
      if (window.map) {
        window.map.setView([${location.lat}, ${location.lon}], 15);
        if(window.currentLocationMarker) {
          window.currentLocationMarker.openPopup();
        }
      }
      true;
    `;

    webviewRef.current?.injectJavaScript(js);
  };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
        <style> 
          html, body, #map { margin:0; padding:0; height:100%; width:100%; border-radius: 20px; overflow: hidden;}
          .leaflet-control-attribution {
            display: none !important;
          }
        </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          window.map = L.map('map', { attributionControl: false }).setView([${location?.lat}, ${location?.lon}], 13);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(window.map);

          window.currentLocationMarker = L.marker([${location?.lat}, ${location?.lon}]).addTo(window.map).bindPopup('Estás aquí').openPopup();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {location && (
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            source={{html}}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            automaticallyAdjustContentInsets={false}
            scrollEnabled={false}
          />
        )}
        <TouchableOpacity
          onPress={recenterMap}
          style={styles.recenterButton}
          activeOpacity={0.7}>
          <Text style={styles.recenterText}>📍</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 300,
  },
  mapContainer: {
    width: width,
    height: 300,
    paddingHorizontal: 30,
    borderRadius: 20,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  recenterButton: {
    position: 'absolute',
    bottom: 15,
    right: 40,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  recenterText: {
    fontSize: 20,
  },
});

export default OpenStreetMapView;
