# ☕ CoffeeWhere

CoffeeWhere es una aplicación móvil desarrollada con **React Native** que permite a los usuarios visualizar cafeterías en un mapa, explorar sus detalles y obtener la ubicación exacta mediante OpenStreetMap.

## 🚀 Características

- 🗺️ Mapa interactivo con ubicación del usuario.
- 📍 Lista de cafeterías cercanas.
- 📄 Detalles completos de cada tienda (dirección, ciudad, provincia, etc).
- 🎯 Onboarding inicial con solicitud de permisos de ubicación.
- 🌐 Uso de Nominatim (OpenStreetMap) para geocodificación inversa.

## 🧱 Tecnologías

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [OpenStreetMap + Nominatim](https://nominatim.openstreetmap.org/)
- [Context API](https://reactjs.org/docs/context.html) para manejo de permisos

## 📂 Estructura del proyecto

```
src/
├── components/         # Componentes reutilizables como la lista de cafés
├── contexts/           # Contexto para permisos de ubicación
├── screens/            # Pantallas principales (Home, Onboarding, ShopDetails)
├── navigation/         # Navegación con React Navigation
├── @types/             # Tipos personalizados globales
```

## 🧭 Navegación

- `Onboarding`: Pantalla de bienvenida y solicitud de permisos.
- `Home`: Muestra un mapa cuadrado con las cafeterías listadas debajo.
- `ShopDetails`: Detalles de la cafetería seleccionada (nombre, dirección, ciudad, etc).

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/brianjesusmv-code/coffeewhere.git
   cd coffeewhere
   ```

2. Instala dependencias:

   ```bash
   npm install
   ```

3. Ejecuta la app:

   - Android:
     ```bash
     npm run android
     ```

> Asegúrate de tener configurado correctamente tu entorno de React Native ([guía oficial](https://reactnative.dev/docs/environment-setup)).

## 🛡️ Permisos necesarios

- **Ubicación**: Para mostrar la posición actual del usuario y encontrar cafeterías cercanas.

## 🧑‍💻 Autor

Desarrollado por [Brian Jesús Marzo Viviani]🧉

## 📄 Licencia

MIT License
