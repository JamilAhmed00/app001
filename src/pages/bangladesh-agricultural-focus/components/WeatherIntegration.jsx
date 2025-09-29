import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WeatherIntegration = ({ selectedDistrict }) => {
  const [weatherData, setWeatherData] = useState({});
  const [forecastPeriod, setForecastPeriod] = useState('7days');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Mock weather data based on selected district
    setTimeout(() => {
      const mockWeatherData = {
        current: {
          temperature: 32,
          humidity: 78,
          windSpeed: 12,
          pressure: 1013,
          visibility: 8,
          uvIndex: 7,
          condition: 'Partly Cloudy',
          icon: 'CloudSun'
        },
        forecast: {
          '7days': [
            { day: 'Today', temp: { min: 26, max: 32 }, condition: 'Partly Cloudy', icon: 'CloudSun', rain: 20, wind: 12 },
            { day: 'Tomorrow', temp: { min: 25, max: 30 }, condition: 'Light Rain', icon: 'CloudRain', rain: 65, wind: 15 },
            { day: 'Wed', temp: { min: 24, max: 28 }, condition: 'Heavy Rain', icon: 'CloudRain', rain: 85, wind: 18 },
            { day: 'Thu', temp: { min: 26, max: 31 }, condition: 'Cloudy', icon: 'Cloud', rain: 40, wind: 10 },
            { day: 'Fri', temp: { min: 27, max: 33 }, condition: 'Sunny', icon: 'Sun', rain: 5, wind: 8 },
            { day: 'Sat', temp: { min: 28, max: 35 }, condition: 'Hot', icon: 'Sun', rain: 0, wind: 6 },
            { day: 'Sun', temp: { min: 26, max: 32 }, condition: 'Partly Cloudy', icon: 'CloudSun', rain: 15, wind: 11 }
          ],
          '14days': [
            { day: 'Week 1', temp: { min: 24, max: 35 }, condition: 'Variable', icon: 'CloudSun', rain: 45, wind: 12 },
            { day: 'Week 2', temp: { min: 26, max: 33 }, condition: 'Monsoon', icon: 'CloudRain', rain: 75, wind: 16 }
          ]
        },
        alerts: [
          { type: 'warning', message: 'Heavy rainfall expected Wed-Thu. Monitor crop drainage.', icon: 'AlertTriangle' },
          { type: 'info', message: 'Optimal bloom conditions predicted for Friday-Sunday.', icon: 'Info' },
          { type: 'success', message: 'Temperature range ideal for rice flowering phase.', icon: 'CheckCircle' }
        ],
        soilConditions: {
          moisture: 68,
          temperature: 28,
          ph: 6.8,
          nitrogen: 45,
          phosphorus: 32,
          potassium: 58
        }
      };

      setWeatherData(mockWeatherData);
      setIsLoading(false);
    }, 1000);
  }, [selectedDistrict]);

  const getAlertColor = (type) => {
    const colors = {
      warning: 'bg-warning/10 border-warning/20 text-warning',
      info: 'bg-secondary/10 border-secondary/20 text-secondary',
      success: 'bg-success/10 border-success/20 text-success',
      error: 'bg-error/10 border-error/20 text-error'
    };
    return colors?.[type] || colors?.info;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Weather Integration</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time meteorological data for {selectedDistrict || 'Bangladesh'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="RefreshCw" size={16} />
            <span className="text-xs">Updated 5 min ago</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Conditions */}
          <div className="bg-gradient-sky rounded-organic p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">{weatherData?.current?.temperature}°C</div>
                <div className="text-sm opacity-90">{weatherData?.current?.condition}</div>
              </div>
              <Icon name={weatherData?.current?.icon} size={48} />
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Droplets" size={16} />
                <span>{weatherData?.current?.humidity}% Humidity</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Wind" size={16} />
                <span>{weatherData?.current?.windSpeed} km/h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Gauge" size={16} />
                <span>{weatherData?.current?.pressure} hPa</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} />
                <span>{weatherData?.current?.visibility} km</span>
              </div>
            </div>
          </div>

          {/* Soil Conditions */}
          <div className="bg-gradient-bloom rounded-organic p-6 text-white">
            <h3 className="font-semibold mb-4 flex items-center space-x-2">
              <Icon name="Layers" size={20} />
              <span>Soil Conditions</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Moisture</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-white/20 rounded-full">
                    <div 
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${weatherData?.soilConditions?.moisture}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{weatherData?.soilConditions?.moisture}%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Temperature</span>
                <span className="text-sm font-medium">{weatherData?.soilConditions?.temperature}°C</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">pH Level</span>
                <span className="text-sm font-medium">{weatherData?.soilConditions?.ph}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div className="text-center">
                  <div className="font-medium">N</div>
                  <div>{weatherData?.soilConditions?.nitrogen}%</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">P</div>
                  <div>{weatherData?.soilConditions?.phosphorus}%</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">K</div>
                  <div>{weatherData?.soilConditions?.potassium}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Weather Forecast */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Weather Forecast</h3>
          
          <div className="flex space-x-1 bg-muted p-1 rounded-organic">
            <button
              onClick={() => setForecastPeriod('7days')}
              className={`px-3 py-1 rounded-button text-sm transition-all duration-300 ${
                forecastPeriod === '7days' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setForecastPeriod('14days')}
              className={`px-3 py-1 rounded-button text-sm transition-all duration-300 ${
                forecastPeriod === '14days' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              14 Days
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {weatherData?.forecast?.[forecastPeriod]?.map((day, index) => (
            <div key={index} className="bg-muted rounded-organic p-3 text-center hover-bloom">
              <div className="text-sm font-medium text-foreground mb-2">{day?.day}</div>
              <Icon name={day?.icon} size={24} className="mx-auto mb-2 text-primary" />
              <div className="text-xs text-muted-foreground mb-1">{day?.condition}</div>
              <div className="text-sm font-semibold text-foreground">
                {day?.temp?.max}° / {day?.temp?.min}°
              </div>
              <div className="flex items-center justify-center space-x-1 mt-2 text-xs text-secondary">
                <Icon name="CloudRain" size={12} />
                <span>{day?.rain}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Weather Alerts */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Agricultural Alerts</h3>
        
        <div className="space-y-3">
          {weatherData?.alerts?.map((alert, index) => (
            <div key={index} className={`p-4 rounded-organic border ${getAlertColor(alert?.type)}`}>
              <div className="flex items-start space-x-3">
                <Icon name={alert?.icon} size={20} className="mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{alert?.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherIntegration;