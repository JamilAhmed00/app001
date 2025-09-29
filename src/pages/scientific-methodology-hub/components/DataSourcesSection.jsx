import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSourcesSection = () => {
  const [activeSource, setActiveSource] = useState(0);

  const dataSources = [
    {
      id: 0,
      name: "NASA Earth Data",
      description: "Satellite imagery and environmental data from NASA\'s Earth Observing System",
      icon: "Satellite",
      metrics: {
        coverage: "Global",
        resolution: "30m spatial",
        frequency: "Daily updates",
        accuracy: "±2.5m precision"
      },
      integration: "Real-time API integration with MODIS, Landsat, and VIIRS datasets for vegetation indices, land surface temperature, and precipitation data.",
      lastUpdate: "2025-09-28T10:30:00Z"
    },
    {
      id: 1,
      name: "GLOBE Observer",
      description: "Citizen science observations from the Global Learning and Observations program",
      icon: "Users",
      metrics: {
        coverage: "Worldwide",
        contributors: "50,000+",
        frequency: "Continuous",
        accuracy: "Community validated"
      },
      integration: "Direct API connection to GLOBE Observer database for ground-truth validation of satellite observations and phenological data collection.",
      lastUpdate: "2025-09-28T09:15:00Z"
    },
    {
      id: 2,
      name: "Bangladesh Agricultural Research",
      description: "Localized crop data from Bangladesh Agricultural Research Institute (BARI)",
      icon: "Sprout",
      metrics: {
        coverage: "64 Districts",
        crops: "25+ varieties",
        frequency: "Seasonal",
        accuracy: "Field verified"
      },
      integration: "Custom data pipeline processing crop phenology, yield data, and farmer observations from BARI's agricultural monitoring network.",
      lastUpdate: "2025-09-28T08:45:00Z"
    },
    {
      id: 3,
      name: "Climate Data Networks",
      description: "Weather and climate data from multiple meteorological services",
      icon: "CloudRain",
      metrics: {
        coverage: "Regional",
        stations: "1,200+",
        frequency: "Hourly",
        accuracy: "±0.1°C temp"
      },
      integration: "Aggregated weather data from BMD, NOAA, and regional meteorological services for climate correlation analysis.",
      lastUpdate: "2025-09-28T13:00:00Z"
    }
  ];

  const formatLastUpdate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just updated";
    if (diffHours < 24) return `${diffHours}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Comprehensive Data Integration
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our predictions are powered by a diverse ecosystem of scientific data sources, 
            ensuring accuracy and reliability across global and regional scales.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Source Selection */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              {dataSources?.map((source, index) => (
                <button
                  key={source?.id}
                  onClick={() => setActiveSource(index)}
                  className={`w-full text-left p-4 rounded-organic transition-all duration-300 ${
                    activeSource === index
                      ? 'bg-primary/10 border-2 border-primary shadow-bloom'
                      : 'bg-card border-2 border-transparent hover:border-border hover:shadow-card'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-organic flex items-center justify-center ${
                      activeSource === index ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Icon name={source?.icon} size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm mb-1 ${
                        activeSource === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {source?.name}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {source?.description}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          activeSource === index ? 'bg-success animate-pulse' : 'bg-muted'
                        }`}></div>
                        <span className="text-xs text-muted-foreground">
                          {formatLastUpdate(source?.lastUpdate)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Source Details */}
          <div className="lg:col-span-2">
            <div className="data-card h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-organic flex items-center justify-center">
                    <Icon name={dataSources?.[activeSource]?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      {dataSources?.[activeSource]?.name}
                    </h3>
                    <p className="text-muted-foreground">
                      {dataSources?.[activeSource]?.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-success">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Active</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(dataSources?.[activeSource]?.metrics)?.map(([key, value]) => (
                  <div key={key} className="bg-muted/50 rounded-organic p-3 text-center">
                    <div className="text-lg font-bold text-foreground mb-1">{value}</div>
                    <div className="text-xs text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Integration Details */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-organic p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <Icon name="Zap" size={16} className="mr-2 text-primary" />
                  Integration Method
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {dataSources?.[activeSource]?.integration}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="flex-1"
                >
                  View API Documentation
                </Button>
                
                <Button
                  variant="ghost"
                  iconName="BarChart3"
                  iconPosition="left"
                  className="flex-1"
                >
                  Data Quality Metrics
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSourcesSection;