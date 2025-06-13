export type CoffeeShop = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
};

type OverpassElement = {
  id: number;
  lat: number;
  lon: number;
  tags?: {[key: string]: string};
};

type OverpassResponse = {
  elements: OverpassElement[];
};

export async function fetchCoffeeShops(
  lat: number,
  lon: number,
): Promise<CoffeeShop[]> {
  const roundedLat = Number(lat.toFixed(4));
  const roundedLon = Number(lon.toFixed(4));

  const query = `[out:json][timeout:25];
node["amenity"="cafe"](around:2000,${roundedLat},${roundedLon});
out;`;

  try {
    const response = await fetch(
      'https://lz4.overpass-api.de/api/interpreter',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          Accept: 'application/json',
        },
        body: query.trim(),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: OverpassResponse = await response.json();
    if (!data.elements || !Array.isArray(data.elements)) {
      console.warn('Unexpected Overpass API response:', data);
      return [];
    }

    const shops: CoffeeShop[] = data.elements
      .filter((el: any) => el.lat !== undefined && el.lon !== undefined)
      .map((el: any) => ({
        id: el.id.toString(),
        name: el.tags?.name || 'Café sin nombre',
        latitude: el.lat,
        longitude: el.lon,
      }));

    return shops;
  } catch (error) {
    console.error('Error fetching coffee shops:', error);
    return [];
  }
}
