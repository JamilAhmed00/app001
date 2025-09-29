import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImmersiveControls = ({ 
  isVRActive, 
  onVRToggle, 
  isARActive, 
  onARToggle,
  comfortSettings,
  onComfortChange,
  audioSettings,
  onAudioChange
}) => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    vr: false,
    ar: false,
    handTracking: false,
    spatialAudio: false
  });
  const [showSettings, setShowSettings] = useState(false);
  const [performanceMode, setPerformanceMode] = useState("balanced");

  useEffect(() => {
    // Check device capabilities
    const checkCapabilities = async () => {
      const capabilities = {
        vr: false,
        ar: false,
        handTracking: false,
        spatialAudio: true // Assume spatial audio is available
      };

      // Check WebXR support
      if (navigator.xr) {
        try {
          capabilities.vr = await navigator.xr?.isSessionSupported('immersive-vr');
          capabilities.ar = await navigator.xr?.isSessionSupported('immersive-ar');
        } catch (error) {
          console.log("WebXR not fully supported");
        }
      }

      // Check hand tracking (mock for demo)
      capabilities.handTracking = capabilities?.vr;

      setDeviceCapabilities(capabilities);
    };

    checkCapabilities();
  }, []);

  const comfortOptions = [
    {
      id: "motionSickness",
      label: "Motion Sickness Prevention",
      description: "Reduces camera movement and adds comfort vignetting",
      enabled: comfortSettings?.motionSickness || false
    },
    {
      id: "snapTurning",
      label: "Snap Turning",
      description: "Turn in discrete increments instead of smooth rotation",
      enabled: comfortSettings?.snapTurning || false
    },
    {
      id: "teleportMovement",
      label: "Teleport Movement",
      description: "Move by teleporting instead of smooth locomotion",
      enabled: comfortSettings?.teleportMovement || true
    },
    {
      id: "reducedMotion",
      label: "Reduced Motion",
      description: "Minimize animations and particle effects",
      enabled: comfortSettings?.reducedMotion || false
    }
  ];

  const audioOptions = [
    {
      id: "spatialAudio",
      label: "Spatial Audio",
      description: "3D positional audio based on plant proximity",
      enabled: audioSettings?.spatialAudio || true
    },
    {
      id: "ambientSounds",
      label: "Ambient Garden Sounds",
      description: "Background nature sounds and wind",
      enabled: audioSettings?.ambientSounds || true
    },
    {
      id: "pollinatorSounds",
      label: "Pollinator Audio",
      description: "Wing beats and movement sounds",
      enabled: audioSettings?.pollinatorSounds || true
    },
    {
      id: "plantInteraction",
      label: "Plant Interaction Audio",
      description: "Sounds when touching or examining plants",
      enabled: audioSettings?.plantInteraction || true
    }
  ];

  const performanceModes = [
    {
      value: "performance",
      label: "Performance",
      description: "Optimized for smooth frame rates",
      icon: "Zap"
    },
    {
      value: "balanced",
      label: "Balanced",
      description: "Good balance of quality and performance",
      icon: "Settings"
    },
    {
      value: "quality",
      label: "Quality",
      description: "Maximum visual fidelity",
      icon: "Eye"
    }
  ];

  const handleComfortToggle = (optionId) => {
    const newSettings = {
      ...comfortSettings,
      [optionId]: !comfortSettings?.[optionId]
    };
    onComfortChange(newSettings);
  };

  const handleAudioToggle = (optionId) => {
    const newSettings = {
      ...audioSettings,
      [optionId]: !audioSettings?.[optionId]
    };
    onAudioChange(newSettings);
  };

  return (
    <div className="bg-card rounded-card border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Immersive Controls</h3>
            <p className="text-sm text-muted-foreground">Configure your 3D exploration experience</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={showSettings ? "ChevronUp" : "ChevronDown"}
            onClick={() => setShowSettings(!showSettings)}
          />
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* XR Mode Controls */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Extended Reality Modes</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* VR Control */}
            <div className={`p-4 rounded-organic border transition-all duration-300 ${
              deviceCapabilities?.vr 
                ? 'border-border hover:border-primary/50 cursor-pointer' :'border-muted bg-muted/20 cursor-not-allowed'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isVRActive 
                      ? 'bg-primary text-white' 
                      : deviceCapabilities?.vr 
                        ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name="Glasses" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Virtual Reality</p>
                    <p className="text-xs text-muted-foreground">
                      {deviceCapabilities?.vr ? "VR headset detected" : "VR not available"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isVRActive ? "destructive" : "default"}
                  size="sm"
                  disabled={!deviceCapabilities?.vr}
                  onClick={onVRToggle}
                >
                  {isVRActive ? "Exit VR" : "Enter VR"}
                </Button>
              </div>
              {deviceCapabilities?.vr && (
                <div className="text-xs text-muted-foreground">
                  Immersive 360° botanical exploration with hand tracking
                </div>
              )}
            </div>

            {/* AR Control */}
            <div className={`p-4 rounded-organic border transition-all duration-300 ${
              deviceCapabilities?.ar 
                ? 'border-border hover:border-secondary/50 cursor-pointer' :'border-muted bg-muted/20 cursor-not-allowed'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isARActive 
                      ? 'bg-secondary text-white' 
                      : deviceCapabilities?.ar 
                        ? 'bg-secondary/10 text-secondary' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name="Smartphone" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Augmented Reality</p>
                    <p className="text-xs text-muted-foreground">
                      {deviceCapabilities?.ar ? "AR camera available" : "AR not supported"}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isARActive ? "destructive" : "secondary"}
                  size="sm"
                  disabled={!deviceCapabilities?.ar}
                  onClick={onARToggle}
                >
                  {isARActive ? "Exit AR" : "Start AR"}
                </Button>
              </div>
              {deviceCapabilities?.ar && (
                <div className="text-xs text-muted-foreground">
                  Place 3D plants in your real environment
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Performance Mode */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Performance Mode</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {performanceModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => setPerformanceMode(mode?.value)}
                className={`p-3 rounded-organic border transition-all duration-300 text-left hover-bloom ${
                  performanceMode === mode?.value
                    ? 'bg-primary/10 border-primary text-primary' :'bg-background border-border text-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <Icon 
                    name={mode?.icon} 
                    size={16} 
                    className={performanceMode === mode?.value ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className="text-sm font-medium">{mode?.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{mode?.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Expanded Settings */}
        {showSettings && (
          <>
            {/* Comfort Settings */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Comfort Settings</h4>
              <div className="space-y-3">
                {comfortOptions?.map((option) => (
                  <div key={option?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-organic">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{option?.label}</span>
                        {option?.enabled && (
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </div>
                    <Button
                      variant={option?.enabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleComfortToggle(option?.id)}
                    >
                      {option?.enabled ? "On" : "Off"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Settings */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Audio Settings</h4>
              <div className="space-y-3">
                {audioOptions?.map((option) => (
                  <div key={option?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-organic">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-foreground">{option?.label}</span>
                        {option?.enabled && (
                          <div className="w-2 h-2 bg-success rounded-full"></div>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{option?.description}</p>
                    </div>
                    <Button
                      variant={option?.enabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAudioToggle(option?.id)}
                    >
                      {option?.enabled ? "On" : "Off"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Info */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Device Capabilities</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted/30 rounded-organic">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={deviceCapabilities?.vr ? "Check" : "X"} 
                      size={14} 
                      className={deviceCapabilities?.vr ? "text-success" : "text-error"}
                    />
                    <span className="text-sm font-medium text-foreground">VR Support</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deviceCapabilities?.vr ? "WebXR VR available" : "No VR headset detected"}
                  </p>
                </div>
                
                <div className="p-3 bg-muted/30 rounded-organic">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={deviceCapabilities?.ar ? "Check" : "X"} 
                      size={14} 
                      className={deviceCapabilities?.ar ? "text-success" : "text-error"}
                    />
                    <span className="text-sm font-medium text-foreground">AR Support</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deviceCapabilities?.ar ? "WebXR AR available" : "AR not supported"}
                  </p>
                </div>
                
                <div className="p-3 bg-muted/30 rounded-organic">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={deviceCapabilities?.handTracking ? "Check" : "X"} 
                      size={14} 
                      className={deviceCapabilities?.handTracking ? "text-success" : "text-error"}
                    />
                    <span className="text-sm font-medium text-foreground">Hand Tracking</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deviceCapabilities?.handTracking ? "Natural hand interaction" : "Controller required"}
                  </p>
                </div>
                
                <div className="p-3 bg-muted/30 rounded-organic">
                  <div className="flex items-center space-x-2 mb-1">
                    <Icon 
                      name={deviceCapabilities?.spatialAudio ? "Check" : "X"} 
                      size={14} 
                      className={deviceCapabilities?.spatialAudio ? "text-success" : "text-error"}
                    />
                    <span className="text-sm font-medium text-foreground">Spatial Audio</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {deviceCapabilities?.spatialAudio ? "3D positional audio" : "Stereo audio only"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset View
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Camera"
            iconPosition="left"
          >
            Screenshot
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Share"
            iconPosition="left"
          >
            Share Experience
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="HelpCircle"
            iconPosition="left"
          >
            Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveControls;