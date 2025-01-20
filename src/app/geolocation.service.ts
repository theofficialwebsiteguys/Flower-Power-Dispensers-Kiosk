import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  private NYBounds = {
    north: 45.0153,  // Northernmost point
    south: 40.4774,  // Southernmost point
    west: -79.7624,  // Westernmost point
    east: -71.8562,  // Easternmost point
  };

  constructor() {}

  async isUserInNewYork(): Promise<boolean> {
    try {
      // Request location permissions
      const permission = await Geolocation.requestPermissions();
  
      if (permission.location !== 'granted') {
        console.error('Location permission not granted');
        return false;
      }
  
      // Get the user's current position
      const coordinates = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = coordinates.coords;
  
      // Check if the user is within NY bounds
      const isInNY =
        latitude >= this.NYBounds.south &&
        latitude <= this.NYBounds.north &&
        longitude >= this.NYBounds.west &&
        longitude <= this.NYBounds.east;
  
      return isInNY;
    } catch (error) {
      console.error('Error getting user location:', error);
      return false;
    }
  }
  
}
