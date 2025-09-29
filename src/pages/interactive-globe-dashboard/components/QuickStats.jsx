import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStats = ({ selectedRegion, timelineValue, filters }) => {
  const [stats, setStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [animatedValues, setAnimatedValues] = useState({});

  // Mock real-time statistics
  const mockStats = {
    global: {
      totalSites: 2847,
      activeBloomSites: 156,
      predictionAccuracy: 92.4,
      speciesTracked: 1247,
      dataPointsToday: 15678,
      alertsActive: 23,
      topSpecies: 'Rice (Oryza sativa)',
      avgConfidence: 87.3,
      lastUpdate: new Date(),
      trends: {
        sites: 12.5,
        accuracy: 3.2,
        species: 8.7,
        alerts: -15.3
      }
    },
    bangladesh: {
      totalSites: 847,
      activeBloomSites: 67,
      predictionAccuracy: 94.1,
      speciesTracked: 234,
      dataPointsToday: 4567,
      alertsActive: 8,
      topSpecies: 'Rice (Oryza sativa)',
      avgConfidence: 91.2,
      lastUpdate: new Date(),
      trends: {
        sites: 18.3,
        accuracy: 5.1,
        species: 12.4,
        alerts: -22.1
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const currentStats = selectedRegion ? mockStats?.[selectedRegion] || mockStats?.global : mockStats?.global;
      setStats(currentStats);
      setIsLoading(false);
      
      // Animate values
      animateValues(currentStats);
    }, 800);
  }, [selectedRegion, timelineValue, filters]);

  const animateValues = (targetStats) => {
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    const animate = () => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setAnimatedValues({
        totalSites: Math.round(targetStats?.totalSites * easeOutQuart),
        activeBloomSites: Math.round(targetStats?.activeBloomSites * easeOutQuart),
        predictionAccuracy: (targetStats?.predictionAccuracy * easeOutQuart)?.toFixed(1),
        speciesTracked: Math.round(targetStats?.speciesTracked * easeOutQuart),
        dataPointsToday: Math.round(targetStats?.dataPointsToday * easeOutQuart),
        alertsActive: Math.round(targetStats?.alertsActive * easeOutQuart),
        avgConfidence: (targetStats?.avgConfidence * easeOutQuart)?.toFixed(1)
      });
      
      if (currentStep < steps) {
        setTimeout(animate, stepDuration);
      }
    };
    
    animate();
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000)?.toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000)?.toFixed(1) + 'K';
    return num?.toString();
  };

  const statCards = [
    {
      id: 'sites',
      title: 'Total Sites',
      value: animatedValues?.totalSites || 0,
      icon: 'MapPin',
      color: 'primary',
      trend: stats?.trends?.sites || 0,
      description: 'Monitoring locations'
    },
    {
      id: 'active',
      title: 'Active Blooms',
      value: animatedValues?.activeBloomSites || 0,
      icon: 'Zap',
      color: 'success',
      trend: stats?.trends?.accuracy || 0,
      description: 'Currently blooming'
    },
    {
      id: 'accuracy',
      title: 'Accuracy',
      value: `${animatedValues?.predictionAccuracy || 0}%`,
      icon: 'Target',
      color: 'secondary',
      trend: stats?.trends?.accuracy || 0,
      description: 'Prediction precision'
    },
    {
      id: 'species',
      title: 'Species',
      value: animatedValues?.speciesTracked || 0,
      icon: 'Leaf',
      color: 'accent',
      trend: stats?.trends?.species || 0,
      description: 'Tracked varieties'
    }
  ];

  const additionalStats = [
    {
      title: 'Data Points Today',
      value: formatNumber(animatedValues?.dataPointsToday || 0),
      icon: 'Database',
      change: '+2.3K from yesterday'
    },
    {
      title: 'Active Alerts',
      value: animatedValues?.alertsActive || 0,
      icon: 'Bell',
      change: stats?.trends?.alerts > 0 ? `+${stats?.trends?.alerts}%` : `${stats?.trends?.alerts}%`
    },
    {
      title: 'Avg Confidence',
      value: `${animatedValues?.avgConfidence || 0}%`,
      icon: 'Shield',
      change: 'Excellent reliability'
    },
    {
      title: 'Top Species',
      value: stats?.topSpecies || 'Loading...',
      icon: 'Crown',
      change: 'Most predicted'
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 bg-muted rounded w-32"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4]?.map(i => (
              <div key={i} className="p-4 bg-muted/30 rounded-lg">
                <div className="h-4 bg-muted rounded w-16 mb-2"></div>
                <div className="h-8 bg-muted rounded w-12 mb-2"></div>
                <div className="h-3 bg-muted rounded w-20"></div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4]?.map(i => (
              <div key={i} className="p-3 bg-muted/20 rounded-lg">
                <div className="h-4 bg-muted rounded w-24 mb-1"></div>
                <div className="h-3 bg-muted rounded w-16"></div>
              </div>
            ))}
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
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {selectedRegion ? `${selectedRegion?.charAt(0)?.toUpperCase() + selectedRegion?.slice(1)} Statistics` : 'Global Statistics'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Real-time bloom monitoring insights
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">
              Live • Updated {stats?.lastUpdate?.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>
      {/* Main Stats Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards?.map(card => (
            <div
              key={card?.id}
              className={`p-4 rounded-lg bg-${card?.color}/10 border border-${card?.color}/20 hover:shadow-card transition-all duration-300 hover-bloom`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon 
                  name={card?.icon} 
                  size={20} 
                  className={`text-${card?.color}`}
                />
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(card?.trend)} 
                    size={12} 
                    className={getTrendColor(card?.trend)}
                  />
                  <span className={`text-xs font-medium ${getTrendColor(card?.trend)}`}>
                    {Math.abs(card?.trend)?.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              <div className="mb-1">
                <div className="text-2xl font-bold text-foreground">
                  {typeof card?.value === 'number' ? formatNumber(card?.value) : card?.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {card?.title}
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                {card?.description}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {additionalStats?.map((stat, index) => (
            <div
              key={index}
              className="p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-2 mb-1">
                <Icon name={stat?.icon} size={14} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {stat?.value}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mb-1">
                {stat?.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.change}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            onClick={() => window.location?.reload()}
          >
            Refresh Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
          >
            Export Stats
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
          >
            Share Report
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Bell"
            className="bg-gradient-bloom hover:shadow-bloom ml-auto"
          >
            Set Alerts
          </Button>
        </div>
      </div>
      {/* Footer */}
      <div className="px-6 py-3 bg-muted/20 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Data sources: NASA Earth Data, GLOBE Observer, Sentinel
          </span>
          <span>
            Next update in 5 minutes
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;