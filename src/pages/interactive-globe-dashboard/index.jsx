import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';

import Button from '../../components/ui/Button';

// Import dashboard components
import GlobeVisualization from './components/GlobeVisualization';
import TimelineControl from './components/TimelineControl';
import DataPanel from './components/DataPanel';
import FilterControls from './components/FilterControls';
import QuickStats from './components/QuickStats';

const InteractiveGlobeDashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [timelineValue, setTimelineValue] = useState(50);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    species: 'all',
    confidence: 70,
    bloomIntensity: [0, 100],
    region: 'all',
    timeRange: '30d',
    dataSource: 'all'
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewMode, setViewMode] = useState('standard'); // standard, focus, analysis

  // Mock bloom data based on timeline and filters
  const [bloomData, setBloomData] = useState({
    totalSites: 2847,
    activeSites: 156,
    predictions: 234,
    accuracy: 92.4
  });

  useEffect(() => {
    // Simulate data updates based on timeline and filters
    const updateData = () => {
      const timeMultiplier = timelineValue / 100;
      const filterMultiplier = activeFilters?.confidence / 100;
      
      setBloomData({
        totalSites: Math.round(2847 * (0.5 + timeMultiplier * 0.5)),
        activeSites: Math.round(156 * (0.3 + timeMultiplier * 0.7) * filterMultiplier),
        predictions: Math.round(234 * (0.4 + timeMultiplier * 0.6)),
        accuracy: Math.round((85 + timeMultiplier * 10) * filterMultiplier * 100) / 100
      });
    };

    updateData();
  }, [timelineValue, activeFilters]);

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
  };

  const handleTimelineChange = (value) => {
    setTimelineValue(value);
  };

  const handleTimelinePlayToggle = () => {
    setIsTimelinePlaying(!isTimelinePlaying);
  };

  const handleFiltersChange = (filters) => {
    setActiveFilters(filters);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const getLayoutClasses = () => {
    const baseClasses = "min-h-screen bg-background transition-all duration-300";
    
    if (isFullscreen) {
      return `${baseClasses} p-0`;
    }
    
    if (viewMode === 'focus') {
      return `${baseClasses} pt-16`;
    }
    
    return `${baseClasses} pt-16 ${sidebarCollapsed ? 'pl-16' : 'pl-72'}`;
  };

  const getMainContentClasses = () => {
    if (isFullscreen) {
      return "h-screen";
    }
    
    if (viewMode === 'focus') {
      return "container mx-auto px-4 py-6";
    }
    
    return "p-6 space-y-6";
  };

  return (
    <>
      <Helmet>
        <title>Interactive Globe Dashboard - BloomX Platform</title>
        <meta name="description" content="Real-time bloom data visualization with temporal controls and predictive overlays. Explore global botanical patterns through our interactive 3D globe interface." />
        <meta name="keywords" content="bloom prediction, interactive globe, data visualization, botanical analysis, agricultural insights, NASA Earth Data" />
      </Helmet>
      <div className={getLayoutClasses()}>
        {/* Header */}
        {!isFullscreen && <Header />}
        
        {/* Sidebar */}
        {!isFullscreen && viewMode === 'standard' && (
          <Sidebar 
            isCollapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        )}

        {/* Main Content */}
        <main className={getMainContentClasses()}>
          {isFullscreen ? (
            // Fullscreen Globe View
            (<div className="relative h-full">
              <GlobeVisualization
                selectedRegion={selectedRegion}
                onRegionSelect={handleRegionSelect}
                timelineValue={timelineValue}
                bloomData={bloomData}
              />
              {/* Fullscreen Controls */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <h1 className="text-white font-bold text-lg mb-1">BloomX Globe</h1>
                  <p className="text-white/80 text-sm">Interactive Bloom Visualization</p>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    iconName="Minimize2"
                    onClick={toggleFullscreen}
                    className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    Exit Fullscreen
                  </Button>
                </div>
              </div>
              {/* Fullscreen Timeline */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <TimelineControl
                    onTimeChange={handleTimelineChange}
                    isPlaying={isTimelinePlaying}
                    onPlayToggle={handleTimelinePlayToggle}
                  />
                </div>
              </div>
            </div>)
          ) : (
            // Standard Dashboard Layout
            (<>
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Interactive Globe Dashboard
                  </h1>
                  <p className="text-muted-foreground">
                    Real-time bloom data visualization with temporal controls and predictive overlays
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  {/* View Mode Toggle */}
                  <div className="flex bg-muted rounded-lg p-1">
                    <button
                      onClick={() => handleViewModeChange('standard')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        viewMode === 'standard' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      onClick={() => handleViewModeChange('focus')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        viewMode === 'focus' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Focus
                    </button>
                    <button
                      onClick={() => handleViewModeChange('analysis')}
                      className={`px-3 py-1 text-sm rounded-md transition-colors ${
                        viewMode === 'analysis' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Analysis
                    </button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Maximize2"
                    onClick={toggleFullscreen}
                  >
                    Fullscreen
                  </Button>
                  
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Share"
                    className="bg-gradient-bloom hover:shadow-bloom"
                  >
                    Share View
                  </Button>
                </div>
              </div>
              {/* Dashboard Content */}
              {viewMode === 'standard' && (
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Column - Controls */}
                  <div className="col-span-12 lg:col-span-3 space-y-6">
                    <QuickStats
                      selectedRegion={selectedRegion}
                      timelineValue={timelineValue}
                      filters={activeFilters}
                    />
                    
                    <FilterControls
                      onFiltersChange={handleFiltersChange}
                      activeFilters={activeFilters}
                    />
                  </div>
                  
                  {/* Center Column - Globe */}
                  <div className="col-span-12 lg:col-span-6">
                    <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
                      <div className="h-96 lg:h-[600px]">
                        <GlobeVisualization
                          selectedRegion={selectedRegion}
                          onRegionSelect={handleRegionSelect}
                          timelineValue={timelineValue}
                          bloomData={bloomData}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <TimelineControl
                        onTimeChange={handleTimelineChange}
                        isPlaying={isTimelinePlaying}
                        onPlayToggle={handleTimelinePlayToggle}
                      />
                    </div>
                  </div>
                  
                  {/* Right Column - Data Panel */}
                  <div className="col-span-12 lg:col-span-3">
                    <DataPanel
                      selectedRegion={selectedRegion}
                      timelineValue={timelineValue}
                      bloomData={bloomData}
                    />
                  </div>
                </div>
              )}
              {viewMode === 'focus' && (
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8">
                      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
                        <div className="h-[500px] lg:h-[700px]">
                          <GlobeVisualization
                            selectedRegion={selectedRegion}
                            onRegionSelect={handleRegionSelect}
                            timelineValue={timelineValue}
                            bloomData={bloomData}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <TimelineControl
                          onTimeChange={handleTimelineChange}
                          isPlaying={isTimelinePlaying}
                          onPlayToggle={handleTimelinePlayToggle}
                        />
                      </div>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                      <QuickStats
                        selectedRegion={selectedRegion}
                        timelineValue={timelineValue}
                        filters={activeFilters}
                      />
                      
                      <DataPanel
                        selectedRegion={selectedRegion}
                        timelineValue={timelineValue}
                        bloomData={bloomData}
                      />
                    </div>
                  </div>
                </div>
              )}
              {viewMode === 'analysis' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-8">
                      <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
                        <div className="h-96">
                          <GlobeVisualization
                            selectedRegion={selectedRegion}
                            onRegionSelect={handleRegionSelect}
                            timelineValue={timelineValue}
                            bloomData={bloomData}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-12 lg:col-span-4">
                      <QuickStats
                        selectedRegion={selectedRegion}
                        timelineValue={timelineValue}
                        filters={activeFilters}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 lg:col-span-4">
                      <FilterControls
                        onFiltersChange={handleFiltersChange}
                        activeFilters={activeFilters}
                      />
                    </div>
                    
                    <div className="col-span-12 lg:col-span-4">
                      <TimelineControl
                        onTimeChange={handleTimelineChange}
                        isPlaying={isTimelinePlaying}
                        onPlayToggle={handleTimelinePlayToggle}
                      />
                    </div>
                    
                    <div className="col-span-12 lg:col-span-4">
                      <DataPanel
                        selectedRegion={selectedRegion}
                        timelineValue={timelineValue}
                        bloomData={bloomData}
                      />
                    </div>
                  </div>
                </div>
              )}
            </>)
          )}
        </main>

        {/* Keyboard Shortcuts Help */}
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            iconName="Keyboard"
            className="bg-card/90 backdrop-blur-sm border-border/50 text-muted-foreground hover:text-foreground"
            title="Keyboard Shortcuts: F - Fullscreen, Space - Play/Pause, Arrow Keys - Navigate"
          >
            Shortcuts
          </Button>
        </div>
      </div>
    </>
  );
};

export default InteractiveGlobeDashboard;