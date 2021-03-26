import { EsriProvider } from 'leaflet-geosearch'

const geoSearchProvider = new EsriProvider()

export function findGPSCoordinates(address) {
  return new Promise(resolve => {
    geoSearchProvider
      .search({ query: address })
      .then(result => {
        resolve({
          latitude: result[0].y,
          longitude: result[0].x,
        })
      })
      .catch(() => {
        // Silently fail when something goes wrong with the service
        resolve({
          latitude: null,
          longitude: null,
        })
      })
  })
}
