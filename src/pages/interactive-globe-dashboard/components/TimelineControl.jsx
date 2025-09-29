import React, { useState, useEffect, useRef } from 'react';

import Button from '../../../components/ui/Button';

const TimelineControl = ({ onTimeChange, isPlaying, onPlayToggle }) => {
  const [currentTime, setCurrentTime] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const timelineRef = useRef(null);
  const intervalRef = useRef(null);

  // Timeline data points
  const timelineData = [
    { value: 0, label: '2020', season: 'Historical Data' },
    { value: 20, label: '2021', season: 'Historical Data' },
    { value: 40, label: '2022', season: 'Historical Data' },
    { value: 60, label: '2023', season: 'Historical Data' },
    { value: 80, label: '2024', season: 'Current Year' },
    { value: 100, label: '2025', season: 'Predictions' }
  ];

  // Seasonal bloom periods
  const bloomPeriods = [
    { start: 15, end: 25, name: 'Spring Bloom 2021', color: '#2ECC71' },
    { start: 35, end: 45, name: 'Spring Bloom 2022', color: '#27AE60' },
    { start: 55, end: 65, name: 'Spring Bloom 2023', color: '#2ECC71' },
    { start: 75, end: 85, name: 'Current Bloom 2024', color: '#F39C12' },
    { start: 90, end: 100, name: 'Predicted Bloom 2025', color: '#3498DB' }
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + (playbackSpeed * 0.5);
          if (newTime >= 100) {
            onPlayToggle();
            return 100;
          }
          return newTime;
        });
      }, 100);
    } else {
      clearInterval(intervalRef?.current);
    }

    return () => clearInterval(intervalRef?.current);
  }, [isPlaying, playbackSpeed, onPlayToggle]);

  useEffect(() => {
    onTimeChange(currentTime);
  }, [currentTime, onTimeChange]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateTimeFromMouse(e);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      updateTimeFromMouse(e);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateTimeFromMouse = (e) => {
    if (!timelineRef?.current) return;
    
    const rect = timelineRef?.current?.getBoundingClientRect();
    const x = e?.clientX - rect?.left;
    const percentage = Math.max(0, Math.min(100, (x / rect?.width) * 100));
    setCurrentTime(percentage);
  };

  const getCurrentLabel = () => {
    const closest = timelineData?.reduce((prev, curr) => 
      Math.abs(curr?.value - currentTime) < Math.abs(prev?.value - currentTime) ? curr : prev
    );
    return closest;
  };

  const getCurrentBloomPeriod = () => {
    return bloomPeriods?.find(period => 
      currentTime >= period?.start && currentTime <= period?.end
    );
  };

  const jumpToTime = (value) => {
    setCurrentTime(value);
  };

  const speedOptions = [0.5, 1, 2, 4];

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Temporal Analysis</h3>
          <p className="text-sm text-muted-foreground">
            Explore bloom patterns across time periods
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Speed Control */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              iconName="Gauge"
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="text-xs"
            >
              {playbackSpeed}x
            </Button>
            
            {showSpeedMenu && (
              <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-modal z-10 animate-growth">
                <div className="p-2">
                  {speedOptions?.map(speed => (
                    <button
                      key={speed}
                      onClick={() => {
                        setPlaybackSpeed(speed);
                        setShowSpeedMenu(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                        playbackSpeed === speed
                          ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                      }`}
                    >
                      {speed}x Speed
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Play/Pause */}
          <Button
            variant={isPlaying ? "destructive" : "default"}
            size="sm"
            iconName={isPlaying ? "Pause" : "Play"}
            onClick={onPlayToggle}
            className={isPlaying ? "" : "bg-gradient-bloom hover:shadow-bloom"}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
      {/* Current Time Display */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-foreground">
              {getCurrentLabel()?.label}
            </div>
            <div className="text-sm text-muted-foreground">
              {getCurrentLabel()?.season}
            </div>
          </div>
          
          {getCurrentBloomPeriod() && (
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: getCurrentBloomPeriod()?.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">
                  {getCurrentBloomPeriod()?.name}
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Active bloom period
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Timeline Scrubber */}
      <div className="mb-6">
        <div
          ref={timelineRef}
          className="relative h-12 bg-muted rounded-lg cursor-pointer select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Bloom Period Backgrounds */}
          {bloomPeriods?.map((period, index) => (
            <div
              key={index}
              className="absolute top-0 h-full rounded opacity-30"
              style={{
                left: `${period?.start}%`,
                width: `${period?.end - period?.start}%`,
                backgroundColor: period?.color
              }}
            />
          ))}
          
          {/* Timeline Track */}
          <div className="absolute top-1/2 left-2 right-2 h-1 bg-border rounded-full transform -translate-y-1/2">
            {/* Progress */}
            <div
              className="h-full bg-gradient-bloom rounded-full transition-all duration-200"
              style={{ width: `${currentTime}%` }}
            />
          </div>
          
          {/* Time Markers */}
          {timelineData?.map((point, index) => (
            <div
              key={index}
              className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 cursor-pointer"
              style={{ left: `${point?.value}%` }}
              onClick={() => jumpToTime(point?.value)}
            >
              <div className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                Math.abs(currentTime - point?.value) < 5
                  ? 'bg-primary border-primary scale-125' :'bg-card border-border hover:border-primary'
              }`} />
              
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap">
                {point?.label}
              </div>
            </div>
          ))}
          
          {/* Current Time Indicator */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-primary transform -translate-x-1/2 transition-all duration-200"
            style={{ left: `${currentTime}%` }}
          >
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg" />
          </div>
        </div>
      </div>
      {/* Quick Jump Buttons */}
      <div className="flex flex-wrap gap-2">
        {timelineData?.map((point, index) => (
          <Button
            key={index}
            variant={Math.abs(currentTime - point?.value) < 5 ? "default" : "outline"}
            size="sm"
            onClick={() => jumpToTime(point?.value)}
            className="text-xs"
          >
            {point?.label}
          </Button>
        ))}
      </div>
      {/* Timeline Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-foreground">
            {bloomPeriods?.length}
          </div>
          <div className="text-xs text-muted-foreground">
            Bloom Periods
          </div>
        </div>
        
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-foreground">
            {Math.round(currentTime)}%
          </div>
          <div className="text-xs text-muted-foreground">
            Timeline Progress
          </div>
        </div>
        
        <div className="p-3 bg-muted/30 rounded-lg">
          <div className="text-lg font-bold text-foreground">
            {getCurrentBloomPeriod() ? 'Active' : 'Inactive'}
          </div>
          <div className="text-xs text-muted-foreground">
            Bloom Status
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineControl;