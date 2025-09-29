import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WebXRViewer = ({ selectedPlant, onPlantSelect, isVRMode, onVRToggle }) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [webXRSupported, setWebXRSupported] = useState(false);
  const [handTracking, setHandTracking] = useState(false);
  const [spatialAudio, setSpatialAudio] = useState(true);

  useEffect(() => {
    // Check WebXR support
    if (navigator.xr) {
      navigator.xr?.isSessionSupported('immersive-vr')?.then(supported => {
        setWebXRSupported(supported);
      });
    }

    // Simulate 3D scene loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const plants = [
    {
      id: 1,
      name: "Rosa damascena",
      commonName: "Damask Rose",
      bloomStage: "Full Bloom",
      pollinators: ["Honeybee", "Bumblebee", "Butterfly"],
      model: "rose_model_3d"
    },
    {
      id: 2,
      name: "Helianthus annuus",
      commonName: "Sunflower",
      bloomStage: "Peak Bloom",
      pollinators: ["Honeybee", "Solitary Bee", "Hoverfly"],
      model: "sunflower_model_3d"
    },
    {
      id: 3,
      name: "Lavandula angustifolia",
      commonName: "English Lavender",
      bloomStage: "Early Bloom",
      pollinators: ["Bumblebee", "Butterfly", "Moth"],
      model: "lavender_model_3d"
    }
  ];

  const handleEnterVR = async () => {
    if (webXRSupported) {
      try {
        onVRToggle(true);
        // Simulate VR session start
        console.log("Entering VR mode...");
      } catch (error) {
        console.error("Failed to enter VR:", error);
      }
    }
  };

  const handleExitVR = () => {
    onVRToggle(false);
    console.log("Exiting VR mode...");
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-card border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-bloom rounded-full flex items-center justify-center mb-4 animate-pulse-organic mx-auto">
              <Icon name="Loader" size={32} color="white" className="animate-spin" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Loading 3D Environment</h3>
            <p className="text-sm text-muted-foreground">Preparing immersive botanical experience...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-blue-50 rounded-card border border-border overflow-hidden">
      {/* 3D Canvas Area */}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8ff 100%)' }}
      />
      {/* Mock 3D Scene Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center animate-float">
          <div className="w-32 h-32 bg-gradient-bloom rounded-full flex items-center justify-center mb-4 shadow-bloom">
            <Icon name="Flower" size={64} color="white" className="animate-pulse-organic" />
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-organic p-4 border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {selectedPlant ? selectedPlant?.commonName : "Select a Plant"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {selectedPlant ? selectedPlant?.name : "Choose from the plant library"}
            </p>
          </div>
        </div>
      </div>
      {/* VR Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        {webXRSupported ? (
          <Button
            variant={isVRMode ? "destructive" : "default"}
            size="sm"
            iconName={isVRMode ? "X" : "Glasses"}
            iconPosition="left"
            onClick={isVRMode ? handleExitVR : handleEnterVR}
            className="bg-card/90 backdrop-blur-sm"
          >
            {isVRMode ? "Exit VR" : "Enter VR"}
          </Button>
        ) : (
          <div className="bg-card/90 backdrop-blur-sm rounded-organic p-2 border border-border">
            <p className="text-xs text-muted-foreground">VR not supported</p>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          iconName={handTracking ? "Hand" : "MousePointer"}
          onClick={() => setHandTracking(!handTracking)}
          className="bg-card/90 backdrop-blur-sm"
          title={handTracking ? "Disable Hand Tracking" : "Enable Hand Tracking"}
        />

        <Button
          variant="ghost"
          size="sm"
          iconName={spatialAudio ? "Volume2" : "VolumeX"}
          onClick={() => setSpatialAudio(!spatialAudio)}
          className="bg-card/90 backdrop-blur-sm"
          title={spatialAudio ? "Disable Spatial Audio" : "Enable Spatial Audio"}
        />
      </div>
      {/* Plant Selection */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-organic p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Available Plants</h4>
          <div className="flex space-x-2 overflow-x-auto">
            {plants?.map((plant) => (
              <button
                key={plant?.id}
                onClick={() => onPlantSelect(plant)}
                className={`flex-shrink-0 p-3 rounded-organic border transition-all duration-300 hover-bloom ${
                  selectedPlant?.id === plant?.id
                    ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border text-foreground hover:border-primary/50'
                }`}
              >
                <div className="text-center">
                  <Icon 
                    name="Flower2" 
                    size={20} 
                    className={selectedPlant?.id === plant?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <p className="text-xs font-medium mt-1">{plant?.commonName}</p>
                  <p className="text-xs text-muted-foreground">{plant?.bloomStage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Comfort Settings Indicator */}
      {isVRMode && (
        <div className="absolute top-4 left-4">
          <div className="bg-success/10 border border-success/20 rounded-organic p-2">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-xs text-success font-medium">Comfort Mode Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebXRViewer;