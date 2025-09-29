import React, { useRef, useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GlobeVisualization = ({ selectedRegion, onRegionSelect, timelineValue, bloomData }) => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [globeRotation, setGlobeRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Mock globe regions with bloom data
  const globeRegions = [
    {
      id: 'bangladesh',
      name: 'Bangladesh',
      lat: 23.6850,
      lng: 90.3563,
      bloomIntensity: 0.85,
      confidence: 0.92,
      species: 'Rice (Oryza sativa)',
      predictedBloom: '2025-04-15',
      temperature: 28.5,
      humidity: 78
    },
    {
      id: 'india',
      name: 'Northern India',
      lat: 28.7041,
      lng: 77.1025,
      bloomIntensity: 0.72,
      confidence: 0.88,
      species: 'Wheat (Triticum aestivum)',
      predictedBloom: '2025-03-22',
      temperature: 25.2,
      humidity: 65
    },
    {
      id: 'california',
      name: 'California, USA',
      lat: 36.7783,
      lng: -119.4179,
      bloomIntensity: 0.68,
      confidence: 0.91,
      species: 'Almond (Prunus dulcis)',
      predictedBloom: '2025-02-28',
      temperature: 18.7,
      humidity: 55
    },
    {
      id: 'netherlands',
      name: 'Netherlands',
      lat: 52.3676,
      lng: 4.9041,
      bloomIntensity: 0.45,
      confidence: 0.76,
      species: 'Tulip (Tulipa gesneriana)',
      predictedBloom: '2025-04-08',
      temperature: 12.3,
      humidity: 72
    },
    {
      id: 'japan',
      name: 'Japan',
      lat: 35.6762,
      lng: 139.6503,
      bloomIntensity: 0.91,
      confidence: 0.95,
      species: 'Cherry Blossom (Prunus serrulata)',
      predictedBloom: '2025-03-30',
      temperature: 15.8,
      humidity: 68
    },
    {
      id: 'brazil',
      name: 'São Paulo, Brazil',
      lat: -23.5505,
      lng: -46.6333,
      bloomIntensity: 0.63,
      confidence: 0.82,
      species: 'Coffee (Coffea arabica)',
      predictedBloom: '2025-09-15',
      temperature: 22.1,
      humidity: 71
    }
  ];

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const rect = canvas?.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect?.width * window.devicePixelRatio;
    canvas.height = rect?.height * window.devicePixelRatio;
    ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    // Draw globe
    drawGlobe(ctx, canvas?.width / window.devicePixelRatio, canvas?.height / window.devicePixelRatio);
  }, [globeRotation, zoomLevel, selectedRegion, timelineValue]);

  const drawGlobe = (ctx, width, height) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35 * zoomLevel;

    // Clear canvas
    ctx?.clearRect(0, 0, width, height);

    // Draw space background
    const spaceGradient = ctx?.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
    spaceGradient?.addColorStop(0, '#1a1a2e');
    spaceGradient?.addColorStop(1, '#0f0f1a');
    ctx.fillStyle = spaceGradient;
    ctx?.fillRect(0, 0, width, height);

    // Draw stars
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.8})`;
      ctx?.beginPath();
      ctx?.arc(x, y, size, 0, Math.PI * 2);
      ctx?.fill();
    }

    // Draw globe base
    const globeGradient = ctx?.createRadialGradient(
      centerX - radius * 0.3, 
      centerY - radius * 0.3, 
      0, 
      centerX, 
      centerY, 
      radius
    );
    globeGradient?.addColorStop(0, '#4a90e2');
    globeGradient?.addColorStop(0.7, '#2c5aa0');
    globeGradient?.addColorStop(1, '#1a365d');
    
    ctx.fillStyle = globeGradient;
    ctx?.beginPath();
    ctx?.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx?.fill();

    // Draw continents (simplified)
    ctx.fillStyle = '#2d5016';
    drawContinents(ctx, centerX, centerY, radius);

    // Draw bloom points
    globeRegions?.forEach((region, index) => {
      const point = projectToGlobe(region?.lat, region?.lng, centerX, centerY, radius);
      if (point?.visible) {
        drawBloomPoint(ctx, point?.x, point?.y, region, index);
      }
    });

    // Draw atmosphere glow
    const atmosphereGradient = ctx?.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.1);
    atmosphereGradient?.addColorStop(0, 'rgba(135, 206, 235, 0)');
    atmosphereGradient?.addColorStop(1, 'rgba(135, 206, 235, 0.3)');
    ctx.fillStyle = atmosphereGradient;
    ctx?.beginPath();
    ctx?.arc(centerX, centerY, radius * 1.1, 0, Math.PI * 2);
    ctx?.fill();
  };

  const drawContinents = (ctx, centerX, centerY, radius) => {
    // Simplified continent shapes
    const continents = [
      // Asia
      { x: 0.3, y: -0.1, width: 0.4, height: 0.3 },
      // Europe
      { x: 0.1, y: -0.2, width: 0.2, height: 0.15 },
      // Africa
      { x: 0.05, y: 0.1, width: 0.25, height: 0.4 },
      // North America
      { x: -0.4, y: -0.2, width: 0.3, height: 0.35 },
      // South America
      { x: -0.3, y: 0.2, width: 0.2, height: 0.4 },
      // Australia
      { x: 0.4, y: 0.3, width: 0.15, height: 0.1 }
    ];

    continents?.forEach(continent => {
      const x = centerX + continent?.x * radius;
      const y = centerY + continent?.y * radius;
      const w = continent?.width * radius;
      const h = continent?.height * radius;
      
      ctx?.fillRect(x, y, w, h);
    });
  };

  const projectToGlobe = (lat, lng, centerX, centerY, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + globeRotation?.y) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return {
      x: centerX + x,
      y: centerY + y,
      z: z,
      visible: z > -radius * 0.1
    };
  };

  const drawBloomPoint = (ctx, x, y, region, index) => {
    const intensity = region?.bloomIntensity;
    const size = 8 + intensity * 12;
    const pulseOffset = (Date.now() / 1000 + index) % (Math.PI * 2);
    const pulse = Math.sin(pulseOffset) * 0.3 + 0.7;
    
    // Glow effect
    const glowGradient = ctx?.createRadialGradient(x, y, 0, x, y, size * 2);
    glowGradient?.addColorStop(0, `rgba(46, 204, 113, ${intensity * pulse * 0.8})`);
    glowGradient?.addColorStop(0.5, `rgba(46, 204, 113, ${intensity * pulse * 0.4})`);
    glowGradient?.addColorStop(1, 'rgba(46, 204, 113, 0)');
    
    ctx.fillStyle = glowGradient;
    ctx?.beginPath();
    ctx?.arc(x, y, size * 2, 0, Math.PI * 2);
    ctx?.fill();
    
    // Core point
    ctx.fillStyle = selectedRegion === region?.id ? '#F39C12' : '#2ECC71';
    ctx?.beginPath();
    ctx?.arc(x, y, size * pulse, 0, Math.PI * 2);
    ctx?.fill();
    
    // Inner highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx?.beginPath();
    ctx?.arc(x - size * 0.3, y - size * 0.3, size * 0.3, 0, Math.PI * 2);
    ctx?.fill();
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastMousePos({ x: e?.clientX, y: e?.clientY });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e?.clientX - lastMousePos?.x;
      const deltaY = e?.clientY - lastMousePos?.y;
      
      setGlobeRotation(prev => ({
        x: prev?.x + deltaY * 0.5,
        y: prev?.y + deltaX * 0.5
      }));
      
      setLastMousePos({ x: e?.clientX, y: e?.clientY });
    } else {
      // Check for hover on bloom points
      const canvas = canvasRef?.current;
      const rect = canvas?.getBoundingClientRect();
      const mouseX = e?.clientX - rect?.left;
      const mouseY = e?.clientY - rect?.top;
      
      const centerX = rect?.width / 2;
      const centerY = rect?.height / 2;
      const radius = Math.min(rect?.width, rect?.height) * 0.35 * zoomLevel;
      
      let hoveredRegion = null;
      globeRegions?.forEach(region => {
        const point = projectToGlobe(region?.lat, region?.lng, centerX, centerY, radius);
        if (point?.visible) {
          const distance = Math.sqrt(Math.pow(mouseX - point?.x, 2) + Math.pow(mouseY - point?.y, 2));
          if (distance < 20) {
            hoveredRegion = region;
          }
        }
      });
      
      setHoveredPoint(hoveredRegion);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e?.preventDefault();
    const delta = e?.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(3, prev * delta)));
  };

  const handleCanvasClick = (e) => {
    if (hoveredPoint) {
      onRegionSelect(hoveredPoint?.id);
    }
  };

  const resetView = () => {
    setGlobeRotation({ x: 0, y: 0 });
    setZoomLevel(1);
    onRegionSelect(null);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 rounded-xl overflow-hidden">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-slate-900/90 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">Initializing Globe Visualization...</p>
            <p className="text-slate-300 text-sm mt-1">Loading bloom data from NASA Earth Data</p>
          </div>
        </div>
      )}
      {/* Globe Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={handleCanvasClick}
      />
      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="secondary"
          size="sm"
          iconName="RotateCcw"
          onClick={resetView}
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
        >
          Reset View
        </Button>
        
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            onClick={() => setZoomLevel(prev => Math.min(3, prev * 1.2))}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Minus"
            onClick={() => setZoomLevel(prev => Math.max(0.5, prev * 0.8))}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          />
        </div>
      </div>
      {/* Region Info Tooltip */}
      {hoveredPoint && (
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-xs animate-growth">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <h3 className="font-semibold text-foreground">{hoveredPoint?.name}</h3>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Species:</span>
              <span className="font-medium">{hoveredPoint?.species}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bloom Intensity:</span>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-300"
                    style={{ width: `${hoveredPoint?.bloomIntensity * 100}%` }}
                  ></div>
                </div>
                <span className="font-medium">{Math.round(hoveredPoint?.bloomIntensity * 100)}%</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="font-medium text-success">{Math.round(hoveredPoint?.confidence * 100)}%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Predicted Bloom:</span>
              <span className="font-medium">{hoveredPoint?.predictedBloom}</span>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="flex justify-between text-xs">
                <span>Temp: {hoveredPoint?.temperature}°C</span>
                <span>Humidity: {hoveredPoint?.humidity}%</span>
              </div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            fullWidth
            className="mt-3"
            onClick={() => onRegionSelect(hoveredPoint?.id)}
          >
            View Details
          </Button>
        </div>
      )}
      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-3 text-white text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Mouse" size={14} />
            <span>Drag to rotate</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="MousePointer" size={14} />
            <span>Scroll to zoom</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>Click points for details</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobeVisualization;