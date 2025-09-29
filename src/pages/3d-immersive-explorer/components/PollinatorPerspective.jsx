import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PollinatorPerspective = ({ selectedPollinator, onPollinatorSelect, isActive, onToggle }) => {
  const [flightPath, setFlightPath] = useState([]);
  const [currentPosition, setCurrentPosition] = useState({ x: 50, y: 50 });
  const [isFlying, setIsFlying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  const pollinators = [
    {
      id: 1,
      name: "Honeybee",
      scientificName: "Apis mellifera",
      flightSpeed: "Fast",
      viewHeight: "Low (2-4ft)",
      preferences: ["Sunflowers", "Lavender", "Clover"],
      icon: "Bug",
      color: "#F39C12"
    },
    {
      id: 2,
      name: "Butterfly",
      scientificName: "Papilio machaon",
      flightSpeed: "Medium",
      viewHeight: "Medium (3-6ft)",
      preferences: ["Roses", "Marigolds", "Butterfly Bush"],
      icon: "Flower",
      color: "#E74C3C"
    },
    {
      id: 3,
      name: "Hummingbird",
      scientificName: "Trochilidae",
      flightSpeed: "Very Fast",
      viewHeight: "High (4-8ft)",
      preferences: ["Trumpet Vine", "Bee Balm", "Fuchsia"],
      icon: "Bird",
      color: "#27AE60"
    }
  ];

  useEffect(() => {
    if (isFlying && isActive) {
      const interval = setInterval(() => {
        setCurrentPosition(prev => ({
          x: Math.max(10, Math.min(90, prev?.x + (Math.random() - 0.5) * 10)),
          y: Math.max(10, Math.min(90, prev?.y + (Math.random() - 0.5) * 10))
        }));
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isFlying, isActive]);

  const startFlightSimulation = () => {
    setIsFlying(true);
    setFlightPath([]);
    // Simulate flight path generation
    const newPath = Array.from({ length: 8 }, (_, i) => ({
      x: 20 + (i * 10) + Math.random() * 20,
      y: 30 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
      timestamp: Date.now() + i * 1000
    }));
    setFlightPath(newPath);
  };

  const stopFlightSimulation = () => {
    setIsFlying(false);
    setFlightPath([]);
  };

  if (!isActive) {
    return (
      <div className="bg-card rounded-card border border-border p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 mx-auto">
            <Icon name="Eye" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Pollinator Perspective</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Experience the garden through the eyes of different pollinators
          </p>
          <Button
            variant="default"
            iconName="Play"
            iconPosition="left"
            onClick={onToggle}
            className="bg-gradient-bloom hover:shadow-bloom"
          >
            Activate Perspective View
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-card border border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-bloom rounded-full flex items-center justify-center">
              <Icon name="Eye" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Pollinator Perspective</h3>
              <p className="text-sm text-muted-foreground">
                {selectedPollinator ? selectedPollinator?.name : "Select a pollinator"}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onToggle}
          />
        </div>
      </div>
      {/* Pollinator Selection */}
      <div className="p-4 border-b border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Choose Your Pollinator</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pollinators?.map((pollinator) => (
            <button
              key={pollinator?.id}
              onClick={() => onPollinatorSelect(pollinator)}
              className={`p-3 rounded-organic border transition-all duration-300 text-left hover-bloom ${
                selectedPollinator?.id === pollinator?.id
                  ? 'bg-primary/10 border-primary' :'bg-background border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${pollinator?.color}20` }}
                >
                  <Icon 
                    name={pollinator?.icon} 
                    size={16} 
                    style={{ color: pollinator?.color }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{pollinator?.name}</p>
                  <p className="text-xs text-muted-foreground">{pollinator?.scientificName}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Speed:</span>
                  <span className="text-foreground">{pollinator?.flightSpeed}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Height:</span>
                  <span className="text-foreground">{pollinator?.viewHeight}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Flight Simulation Area */}
      {selectedPollinator && (
        <div className="p-4">
          <div className="relative h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-organic border border-border overflow-hidden">
            {/* Garden Background */}
            <div className="absolute inset-0">
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-200/50 to-transparent"></div>
              <div className="absolute top-4 left-8 w-12 h-12 bg-yellow-300 rounded-full opacity-60"></div>
              <div className="absolute top-8 right-12 w-8 h-8 bg-pink-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-8 left-16 w-10 h-10 bg-purple-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-12 right-8 w-14 h-14 bg-orange-300 rounded-full opacity-60"></div>
            </div>

            {/* Flight Path */}
            {flightPath?.length > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d={`M ${flightPath?.map(point => `${point?.x}% ${point?.y}%`)?.join(' L ')}`}
                  stroke={selectedPollinator?.color}
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  opacity="0.6"
                />
              </svg>
            )}

            {/* Pollinator Position */}
            <div
              className="absolute w-6 h-6 transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${currentPosition?.x}%`,
                top: `${currentPosition?.y}%`,
                transform: `translate(-50%, -50%) ${isFlying ? 'scale(1.2)' : 'scale(1)'}`
              }}
            >
              <div 
                className="w-full h-full rounded-full flex items-center justify-center shadow-lg animate-pulse-organic"
                style={{ backgroundColor: selectedPollinator?.color }}
              >
                <Icon 
                  name={selectedPollinator?.icon} 
                  size={12} 
                  color="white"
                  className={isFlying ? 'animate-bounce' : ''}
                />
              </div>
            </div>

            {/* View Cone */}
            {selectedPollinator && (
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${currentPosition?.x}%`,
                  top: `${currentPosition?.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div 
                  className="w-16 h-16 rounded-full border-2 opacity-30"
                  style={{ 
                    borderColor: selectedPollinator?.color,
                    animation: isFlying ? 'pulse 2s infinite' : 'none'
                  }}
                ></div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-2">
              <Button
                variant={isFlying ? "destructive" : "default"}
                size="sm"
                iconName={isFlying ? "Square" : "Play"}
                iconPosition="left"
                onClick={isFlying ? stopFlightSimulation : startFlightSimulation}
              >
                {isFlying ? "Stop Flight" : "Start Flight"}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName={audioEnabled ? "Volume2" : "VolumeX"}
                onClick={() => setAudioEnabled(!audioEnabled)}
                title={audioEnabled ? "Disable Audio" : "Enable Audio"}
              />
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Preferred Plants: {selectedPollinator?.preferences?.join(", ")}
              </p>
            </div>
          </div>

          {/* Environmental Audio Indicator */}
          {audioEnabled && isFlying && (
            <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-organic">
              <div className="flex items-center space-x-2">
                <Icon name="Headphones" size={16} color="var(--color-success)" />
                <span className="text-sm text-success">
                  Spatial audio active - Wing beats, flower rustling, ambient garden sounds
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PollinatorPerspective;