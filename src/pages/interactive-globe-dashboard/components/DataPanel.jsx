import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';


const DataPanel = ({ selectedRegion, timelineValue, bloomData }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dataFilters, setDataFilters] = useState({
    species: 'all',
    confidence: 0.7,
    timeRange: '30d'
  });

  // Mock comprehensive data
  const regionData = {
    bangladesh: {
      name: 'Bangladesh',
      coordinates: [23.6850, 90.3563],
      overview: {
        totalSpecies: 847,
        activeBloomSites: 156,
        predictionAccuracy: 92.4,
        lastUpdated: '2025-01-28 13:45:00',
        climateZone: 'Tropical Monsoon',
        avgTemperature: 28.5,
        avgHumidity: 78,
        avgRainfall: 1200
      },
      species: [
        {
          id: 'rice',
          name: 'Rice (Oryza sativa)',
          bloomIntensity: 0.85,
          confidence: 0.92,
          predictedBloom: '2025-04-15',
          currentStage: 'Pre-bloom',
          economicValue: '$2.4B',
          coverage: '11.5M hectares',
          trend: 'increasing'
        },
        {
          id: 'jute',
          name: 'Jute (Corchorus capsularis)',
          bloomIntensity: 0.67,
          confidence: 0.88,
          predictedBloom: '2025-06-20',
          currentStage: 'Vegetative',
          economicValue: '$890M',
          coverage: '0.7M hectares',
          trend: 'stable'
        },
        {
          id: 'tea',
          name: 'Tea (Camellia sinensis)',
          bloomIntensity: 0.73,
          confidence: 0.91,
          predictedBloom: '2025-03-10',
          currentStage: 'Bud formation',
          economicValue: '$156M',
          coverage: '0.16M hectares',
          trend: 'increasing'
        }
      ],
      predictions: [
        {
          date: '2025-02-15',
          species: 'Mustard',
          probability: 0.89,
          impact: 'High',
          region: 'Rajshahi Division'
        },
        {
          date: '2025-03-10',
          species: 'Tea',
          probability: 0.91,
          impact: 'Medium',
          region: 'Sylhet Division'
        },
        {
          date: '2025-04-15',
          species: 'Rice',
          probability: 0.92,
          impact: 'Critical',
          region: 'Nationwide'
        }
      ],
      environmental: {
        soilMoisture: 68,
        uvIndex: 8.2,
        windSpeed: 12.5,
        airQuality: 'Moderate',
        pollinatorActivity: 'High',
        diseaseRisk: 'Low'
      }
    }
  };

  const currentData = selectedRegion ? regionData?.[selectedRegion] : null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'BarChart3' },
    { id: 'species', name: 'Species', icon: 'Leaf' },
    { id: 'predictions', name: 'Predictions', icon: 'TrendingUp' },
    { id: 'environmental', name: 'Environment', icon: 'Cloud' }
  ];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return 'TrendingUp';
      case 'decreasing': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': return 'text-success';
      case 'decreasing': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'Critical': return 'text-error';
      case 'High': return 'text-warning';
      case 'Medium': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  if (!selectedRegion || !currentData) {
    return (
      <div className="bg-card border border-border rounded-xl p-8 shadow-card">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Globe" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Select a Region
          </h3>
          <p className="text-muted-foreground mb-6">
            Click on any bloom point on the globe to view detailed data and predictions
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-4 bg-muted/30 rounded-lg">
              <Icon name="Target" size={20} className="text-primary mx-auto mb-2" />
              <div className="font-medium">156 Active Sites</div>
              <div className="text-muted-foreground">Global bloom monitoring</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <Icon name="Database" size={20} className="text-secondary mx-auto mb-2" />
              <div className="font-medium">2.4M Data Points</div>
              <div className="text-muted-foreground">Real-time collection</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              {currentData?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentData?.coordinates?.[0]?.toFixed(4)}°N, {currentData?.coordinates?.[1]?.toFixed(4)}°E
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                Last Updated
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(currentData.overview.lastUpdated)?.toLocaleString()}
              </div>
            </div>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Leaf" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Species</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.overview?.totalSpecies?.toLocaleString()}
                </div>
              </div>
              
              <div className="p-4 bg-success/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Active Sites</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.overview?.activeBloomSites}
                </div>
              </div>
              
              <div className="p-4 bg-secondary/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-secondary">Accuracy</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.overview?.predictionAccuracy}%
                </div>
              </div>
              
              <div className="p-4 bg-accent/10 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Thermometer" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Avg Temp</span>
                </div>
                <div className="text-2xl font-bold text-foreground">
                  {currentData?.overview?.avgTemperature}°C
                </div>
              </div>
            </div>

            {/* Climate Info */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-semibold text-foreground mb-3">Climate Overview</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Zone:</span>
                  <div className="font-medium">{currentData?.overview?.climateZone}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Humidity:</span>
                  <div className="font-medium">{currentData?.overview?.avgHumidity}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Rainfall:</span>
                  <div className="font-medium">{currentData?.overview?.avgRainfall}mm</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Updated:</span>
                  <div className="font-medium">Live</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'species' && (
          <div className="space-y-4">
            {currentData?.species?.map(species => (
              <div key={species?.id} className="p-4 border border-border rounded-lg hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{species?.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Coverage: {species?.coverage} • Value: {species?.economicValue}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getTrendIcon(species?.trend)} 
                      size={16} 
                      className={getTrendColor(species?.trend)}
                    />
                    <span className="text-sm font-medium">{species?.currentStage}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bloom Intensity</span>
                    <span className="font-medium">{Math.round(species?.bloomIntensity * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                      style={{ width: `${species?.bloomIntensity * 100}%` }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Confidence</span>
                    <span className="font-medium text-success">{Math.round(species?.confidence * 100)}%</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span>Predicted Bloom</span>
                    <span className="font-medium">{species?.predictedBloom}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-4">
            {currentData?.predictions?.map((prediction, index) => (
              <div key={index} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-primary" />
                    <span className="font-semibold text-foreground">{prediction?.date}</span>
                  </div>
                  <div className={`text-sm font-medium ${getImpactColor(prediction?.impact)}`}>
                    {prediction?.impact} Impact
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Species:</span>
                    <div className="font-medium">{prediction?.species}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Probability:</span>
                    <div className="font-medium text-success">{Math.round(prediction?.probability * 100)}%</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Region:</span>
                    <div className="font-medium">{prediction?.region}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'environmental' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Droplets" size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Soil Moisture</span>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {currentData?.environmental?.soilMoisture}%
              </div>
              <div className="w-full h-2 bg-blue-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500"
                  style={{ width: `${currentData?.environmental?.soilMoisture}%` }}
                />
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Sun" size={16} className="text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600">UV Index</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {currentData?.environmental?.uvIndex}
              </div>
              <div className="text-xs text-muted-foreground">Very High</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Wind" size={16} className="text-green-600" />
                <span className="text-sm font-medium text-green-600">Wind Speed</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {currentData?.environmental?.windSpeed} km/h
              </div>
              <div className="text-xs text-muted-foreground">Light Breeze</div>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Zap" size={16} className="text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Air Quality</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {currentData?.environmental?.airQuality}
              </div>
              <div className="text-xs text-muted-foreground">AQI: 85</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Bug" size={16} className="text-orange-600" />
                <span className="text-sm font-medium text-orange-600">Pollinators</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {currentData?.environmental?.pollinatorActivity}
              </div>
              <div className="text-xs text-muted-foreground">Activity Level</div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={16} className="text-red-600" />
                <span className="text-sm font-medium text-red-600">Disease Risk</span>
              </div>
              <div className="text-lg font-bold text-foreground">
                {currentData?.environmental?.diseaseRisk}
              </div>
              <div className="text-xs text-muted-foreground">Current Status</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPanel;