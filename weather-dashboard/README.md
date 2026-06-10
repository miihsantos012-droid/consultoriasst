# Weather Dashboard

A modern, responsive weather dashboard built with React, TypeScript, and Tailwind CSS. Fetches real-time weather data from OpenWeatherMap API with support for current weather, hourly forecasts, and 7-day predictions.

## ✨ Features

### 🌤️ Weather Information
- **Current Weather**: Real-time temperature, humidity, wind speed, pressure, and more
- **Hourly Forecast**: 24-hour weather predictions with precipitation probability
- **7-Day Forecast**: Extended weather outlook with temperature ranges and UV index
- **Weather Alerts**: Real-time alerts for severe weather conditions

### 📍 Location Services
- **Geolocation**: Automatic location detection using browser geolocation API
- **City Search**: Search for any city worldwide and get instant weather updates
- **Favorite Locations**: Save and manage favorite locations (persistent storage)

### ⚙️ Customization
- **Temperature Units**: Switch between Celsius and Fahrenheit
- **Wind Speed Units**: Choose between m/s, km/h, and mph
- **Responsive Design**: Optimized for mobile, tablet, and desktop screens

### 🎨 User Interface
- **Modern Design**: Clean, intuitive UI with Tailwind CSS
- **Dark/Light Support**: Adaptive theme based on system preferences
- **Real-time Updates**: Refresh weather data on demand
- **Weather Icons**: Visual weather indicators for quick understanding

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **API**: OpenWeatherMap One Call API 3.0

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- OpenWeatherMap API key (free tier available)

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone repository
git clone <repository-url>
cd weather-dashboard

# Install dependencies
npm install
```

### 2. Configure API Key

Create `.env.local` file:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

Get your free API key: https://openweathermap.org/api

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm run test
```

## 📁 Project Structure

```
weather-dashboard/
├── src/
│   ├── components/           # React components
│   │   ├── CurrentWeatherCard.tsx
│   │   ├── HourlyForecast.tsx
│   │   ├── DailyForecast.tsx
│   │   └── CitySearch.tsx
│   ├── services/            # API and utility services
│   │   ├── weatherService.ts    # OpenWeatherMap API
│   │   └── geolocationService.ts # Geolocation handling
│   ├── store/               # State management
│   │   └── weatherStore.ts  # Zustand store
│   ├── types/               # TypeScript types
│   │   └── weather.ts       # Weather domain types
│   ├── utils/               # Utility functions
│   │   └── conversions.ts   # Unit conversions
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🌐 API Integration

### OpenWeatherMap One Call API

The dashboard uses the One Call API 3.0 which provides:

```typescript
// Current weather
- Temperature, feels like
- Humidity, pressure
- Wind speed and direction
- Cloud coverage, visibility
- UV index

// Hourly forecast (24 hours)
- Hourly temperature and conditions
- Precipitation probability and amount

// Daily forecast (8 days)
- Max/min temperature
- Weather conditions
- Precipitation and probability
- UV index
```

### API Calls

```typescript
// Fetch weather for coordinates
GET /data/3.0/onecall?lat={lat}&lon={lon}&appid={apiKey}&units=metric

// Search cities
GET /geo/1.0/direct?q={city}&limit=5&appid={apiKey}

// Reverse geocoding
GET /geo/1.0/reverse?lat={lat}&lon={lon}&appid={apiKey}
```

## 🔧 Configuration

### Vite Environment Variables

```env
# API Configuration
VITE_OPENWEATHER_API_KEY=<your_api_key>

# Optional
VITE_APP_NAME=Weather Dashboard
VITE_API_TIMEOUT=10000
VITE_DEBUG=false
```

### Tailwind CSS

Custom configuration in `tailwind.config.js`:

```javascript
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## 📱 Features in Detail

### Current Weather Card

- Large temperature display
- Weather description and icon
- "Feels like" temperature
- Detailed metrics grid:
  - Humidity percentage
  - Wind speed and direction
  - Atmospheric pressure
  - Visibility distance
  - Cloud coverage
  - UV index with level indicator

### Hourly Forecast

- 24-hour horizontal scrollable forecast
- Hourly temperature and conditions
- Precipitation probability
- Humidity levels
- Wind speed information

### Daily Forecast

- 7-day forecast with
- High/low temperatures
- Weather conditions
- Humidity and wind
- Precipitation probability
- UV index indicators

### Location Search

- Real-time city search
- Autocomplete with debouncing
- Display country and region
- Quick selection
- Geolocation support

## 🎨 UI/UX Features

### Responsive Design

- **Mobile**: Single column layout, touch-optimized
- **Tablet**: Two column layout
- **Desktop**: Full width with hover effects

### Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

### Performance

- Lazy loading of forecasts
- Efficient state management
- Optimized re-renders
- Image optimization

## 🔐 Security

- Environment variable protection
- HTTPS enforcement for geolocation
- Input validation and sanitization
- Error handling and user feedback
- No sensitive data in local storage

## 🚨 Error Handling

Comprehensive error handling for:

- API errors (401, 404, 429, 500)
- Network failures
- Geolocation permission denied
- Invalid search queries
- Timeout errors

## 📊 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Known Limitations

- Free tier API limited to 60 calls/minute
- Geolocation requires HTTPS in production
- Some historical data not available in free tier
- Alerts depend on API availability

## 📈 Future Enhancements

- [ ] Weather comparison tool
- [ ] Climate analytics
- [ ] Air quality index (AQI)
- [ ] Astronomical data
- [ ] Historical weather data
- [ ] Weather notifications
- [ ] Multiple location tracking
- [ ] Map integration
- [ ] Export/sharing capabilities
- [ ] Offline mode with service worker

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:

- Open an issue on GitHub
- Check the documentation
- Review API docs: https://openweathermap.org/api

## 🙏 Acknowledgments

- Weather data: [OpenWeatherMap](https://openweathermap.org)
- Icons: [Lucide Icons](https://lucide.dev)
- Styling: [Tailwind CSS](https://tailwindcss.com)
- State: [Zustand](https://github.com/pmndrs/zustand)

---

**Built with ❤️ for weather enthusiasts**
