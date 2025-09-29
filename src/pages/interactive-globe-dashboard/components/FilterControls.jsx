import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FilterControls = ({ onFiltersChange, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localFilters, setLocalFilters] = useState({
    species: activeFilters?.species || 'all',
    confidence: activeFilters?.confidence || 70,
    bloomIntensity: activeFilters?.bloomIntensity || [0, 100],
    region: activeFilters?.region || 'all',
    timeRange: activeFilters?.timeRange || '30d',
    dataSource: activeFilters?.dataSource || 'all',
    ...activeFilters
  });

  const speciesOptions = [
    { value: 'all', label: 'All Species', count: 2847 },
    { value: 'rice', label: 'Rice (Oryza sativa)', count: 456 },
    { value: 'wheat', label: 'Wheat (Triticum aestivum)', count: 234 },
    { value: 'corn', label: 'Corn (Zea mays)', count: 189 },
    { value: 'soybean', label: 'Soybean (Glycine max)', count: 167 },
    { value: 'cotton', label: 'Cotton (Gossypium)', count: 145 },
    { value: 'tea', label: 'Tea (Camellia sinensis)', count: 98 },
    { value: 'coffee', label: 'Coffee (Coffea arabica)', count: 87 }
  ];

  const regionOptions = [
    { value: 'all', label: 'Global View', count: 2847 },
    { value: 'bangladesh', label: 'Bangladesh', count: 847 },
    { value: 'india', label: 'India', count: 623 },
    { value: 'usa', label: 'United States', count: 445 },
    { value: 'china', label: 'China', count: 398 },
    { value: 'brazil', label: 'Brazil', count: 234 },
    { value: 'europe', label: 'Europe', count: 189 },
    { value: 'africa', label: 'Africa', count: 111 }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' },
    { value: 'all', label: 'All time' },
    { value: 'custom', label: 'Custom range' }
  ];

  const dataSourceOptions = [
    { value: 'all', label: 'All Sources', count: 2847 },
    { value: 'nasa', label: 'NASA Earth Data', count: 1234 },
    { value: 'globe', label: 'GLOBE Observer', count: 856 },
    { value: 'sentinel', label: 'Sentinel Satellite', count: 567 },
    { value: 'modis', label: 'MODIS Data', count: 445 },
    { value: 'citizen', label: 'Citizen Science', count: 234 }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleRangeChange = (key, index, value) => {
    const newRange = [...localFilters?.[key]];
    newRange[index] = parseInt(value);
    handleFilterChange(key, newRange);
  };

  const resetFilters = () => {
    const defaultFilters = {
      species: 'all',
      confidence: 70,
      bloomIntensity: [0, 100],
      region: 'all',
      timeRange: '30d',
      dataSource: 'all'
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.species !== 'all') count++;
    if (localFilters?.confidence !== 70) count++;
    if (localFilters?.bloomIntensity?.[0] !== 0 || localFilters?.bloomIntensity?.[1] !== 100) count++;
    if (localFilters?.region !== 'all') count++;
    if (localFilters?.timeRange !== '30d') count++;
    if (localFilters?.dataSource !== 'all') count++;
    return count;
  };

  return (
    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Filter" size={20} className="text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Data Filters</h3>
              <p className="text-xs text-muted-foreground">
                Refine your bloom data visualization
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActiveFilterCount() > 0 && (
              <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium">
                {getActiveFilterCount()} active
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          </div>
        </div>
      </div>
      {/* Quick Filters */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={localFilters?.species === 'rice' ? "default" : "outline"}
            size="sm"
            iconName="Wheat"
            onClick={() => handleFilterChange('species', localFilters?.species === 'rice' ? 'all' : 'rice')}
          >
            Rice
          </Button>
          
          <Button
            variant={localFilters?.region === 'bangladesh' ? "default" : "outline"}
            size="sm"
            iconName="MapPin"
            onClick={() => handleFilterChange('region', localFilters?.region === 'bangladesh' ? 'all' : 'bangladesh')}
          >
            Bangladesh
          </Button>
          
          <Button
            variant={localFilters?.confidence >= 90 ? "default" : "outline"}
            size="sm"
            iconName="Target"
            onClick={() => handleFilterChange('confidence', localFilters?.confidence >= 90 ? 70 : 90)}
          >
            High Confidence
          </Button>
          
          <Button
            variant={localFilters?.timeRange === '7d' ? "default" : "outline"}
            size="sm"
            iconName="Clock"
            onClick={() => handleFilterChange('timeRange', localFilters?.timeRange === '7d' ? '30d' : '7d')}
          >
            Recent
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="p-4 space-y-6 animate-growth">
          {/* Species Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Species Selection
            </label>
            <div className="grid grid-cols-2 gap-2">
              {speciesOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('species', option?.value)}
                  className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                    localFilters?.species === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium text-sm">{option?.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {option?.count?.toLocaleString()} records
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Confidence Threshold */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Minimum Confidence: {localFilters?.confidence}%
            </label>
            <div className="px-3">
              <input
                type="range"
                min="0"
                max="100"
                value={localFilters?.confidence}
                onChange={(e) => handleFilterChange('confidence', parseInt(e?.target?.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Bloom Intensity Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Bloom Intensity Range: {localFilters?.bloomIntensity?.[0]}% - {localFilters?.bloomIntensity?.[1]}%
            </label>
            <div className="px-3 space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground w-8">Min:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localFilters?.bloomIntensity?.[0]}
                  onChange={(e) => handleRangeChange('bloomIntensity', 0, e?.target?.value)}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground w-8">Max:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={localFilters?.bloomIntensity?.[1]}
                  onChange={(e) => handleRangeChange('bloomIntensity', 1, e?.target?.value)}
                  className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Region Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Geographic Region
            </label>
            <div className="grid grid-cols-2 gap-2">
              {regionOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('region', option?.value)}
                  className={`p-2 text-left rounded-lg border text-sm transition-all duration-200 ${
                    localFilters?.region === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="font-medium">{option?.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {option?.count?.toLocaleString()} sites
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Time Range */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Time Range
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeRangeOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('timeRange', option?.value)}
                  className={`p-2 text-center rounded-lg border text-sm transition-all duration-200 ${
                    localFilters?.timeRange === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>

          {/* Data Source */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Data Sources
            </label>
            <div className="space-y-2">
              {dataSourceOptions?.map(option => (
                <button
                  key={option?.value}
                  onClick={() => handleFilterChange('dataSource', option?.value)}
                  className={`w-full p-3 text-left rounded-lg border transition-all duration-200 ${
                    localFilters?.dataSource === option?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{option?.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {option?.count?.toLocaleString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              fullWidth
              iconName="RotateCcw"
              onClick={resetFilters}
            >
              Reset All
            </Button>
            
            <Button
              variant="default"
              fullWidth
              iconName="Download"
              className="bg-gradient-bloom hover:shadow-bloom"
            >
              Export Data
            </Button>
          </div>
        </div>
      )}
      {/* Filter Summary */}
      <div className="p-3 bg-muted/20 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>
            Showing {(2847 * (1 - getActiveFilterCount() * 0.15))?.toFixed(0)} of 2,847 bloom records
          </span>
          <span>
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;