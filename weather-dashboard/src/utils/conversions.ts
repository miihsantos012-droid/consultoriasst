/**
 * Unit Conversion Utilities
 * Convert between different measurement units
 */

// ============================================
// Temperature Conversions
// ============================================

export function celsiusToFahrenheit(celsius: number): number {
  return Math.round((celsius * 9) / 5 + 32);
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return Math.round(((fahrenheit - 32) * 5) / 9);
}

export function getTemperatureInUnit(celsius: number, unit: 'C' | 'F'): number {
  return unit === 'F' ? celsiusToFahrenheit(celsius) : celsius;
}

export function getTemperatureSymbol(unit: 'C' | 'F'): string {
  return unit === 'F' ? '°F' : '°C';
}

// ============================================
// Wind Speed Conversions
// ============================================

/**
 * Convert m/s to km/h
 */
export function meterPerSecondToKmh(ms: number): number {
  return Math.round(ms * 3.6 * 10) / 10;
}

/**
 * Convert m/s to mph
 */
export function meterPerSecondToMph(ms: number): number {
  return Math.round(ms * 2.237 * 10) / 10;
}

/**
 * Convert m/s to knots
 */
export function meterPerSecondToKnots(ms: number): number {
  return Math.round(ms * 1.944 * 10) / 10;
}

export function getWindSpeedInUnit(ms: number, unit: 'ms' | 'kmh' | 'mph'): number {
  switch (unit) {
    case 'kmh':
      return meterPerSecondToKmh(ms);
    case 'mph':
      return meterPerSecondToMph(ms);
    default:
      return ms;
  }
}

export function getWindSpeedLabel(unit: 'ms' | 'kmh' | 'mph'): string {
  switch (unit) {
    case 'kmh':
      return 'km/h';
    case 'mph':
      return 'mph';
    default:
      return 'm/s';
  }
}

// ============================================
// Pressure Conversions
// ============================================

export function hPaToPsi(hPa: number): number {
  return Math.round(hPa * 0.01450377 * 100) / 100;
}

export function hPaToInHg(hPa: number): number {
  return Math.round(hPa * 0.02953 * 100) / 100;
}

export function hPaToMmHg(hPa: number): number {
  return Math.round(hPa * 0.7501 * 100) / 100;
}

// ============================================
// Visibility Conversions
// ============================================

export function metersToMiles(meters: number): number {
  return Math.round(meters * 0.00062137 * 100) / 100;
}

export function metersToKilometers(meters: number): number {
  return Math.round(meters / 1000 * 100) / 100;
}

export function getVisibilityString(km: number): string {
  if (km >= 10) return '> 10 km';
  return `${km.toFixed(1)} km`;
}

// ============================================
// Precipitation Conversions
// ============================================

export function mmToInches(mm: number): number {
  return Math.round(mm * 0.0394 * 100) / 100;
}

// ============================================
// UV Index Utilities
// ============================================

export function getUVIndexLevel(index: number): string {
  if (index < 3) return 'Low';
  if (index < 6) return 'Moderate';
  if (index < 8) return 'High';
  if (index < 11) return 'Very High';
  return 'Extreme';
}

export function getUVIndexColor(index: number): string {
  if (index < 3) return '#4CAF50'; // Green
  if (index < 6) return '#FFC107'; // Amber
  if (index < 8) return '#FF9800'; // Orange
  if (index < 11) return '#F44336'; // Red
  return '#8B0000'; // Dark Red
}

// ============================================
// Wind Direction
// ============================================

export function degreesToDirection(degrees: number): string {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];

  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

// ============================================
// Feels Like Temperature
// ============================================

export function getFeelsLikeMessage(temp: number, feelsLike: number): string {
  const diff = feelsLike - temp;

  if (diff < -5) {
    return `Feels much colder than ${temp}°C`;
  } else if (diff < 0) {
    return `Feels colder than ${temp}°C`;
  } else if (diff > 5) {
    return `Feels much warmer than ${temp}°C`;
  } else if (diff > 0) {
    return `Feels warmer than ${temp}°C`;
  }

  return `Same as actual temperature`;
}

// ============================================
// Air Quality (AQI)
// ============================================

export function getAirQualityLevel(aqi: number): string {
  switch (aqi) {
    case 1:
      return 'Good';
    case 2:
      return 'Fair';
    case 3:
      return 'Moderate';
    case 4:
      return 'Poor';
    case 5:
      return 'Very Poor';
    default:
      return 'Unknown';
  }
}

export function getAirQualityColor(aqi: number): string {
  switch (aqi) {
    case 1:
      return '#4CAF50'; // Green
    case 2:
      return '#8BC34A'; // Light Green
    case 3:
      return '#FFC107'; // Amber
    case 4:
      return '#FF9800'; // Orange
    case 5:
      return '#F44336'; // Red
    default:
      return '#9E9E9E'; // Gray
  }
}
