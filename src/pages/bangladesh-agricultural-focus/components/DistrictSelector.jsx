import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const DistrictSelector = ({ selectedDistrict, onDistrictChange, selectedCrop, onCropChange }) => {
  const [isMapView, setIsMapView] = useState(false);

  const districts = [
    { value: 'dhaka', label: 'Dhaka', description: 'Capital region with diverse agriculture' },
    { value: 'chittagong', label: 'Chittagong', description: 'Coastal district with rice cultivation' },
    { value: 'sylhet', label: 'Sylhet', description: 'Tea and rice production hub' },
    { value: 'rajshahi', label: 'Rajshahi', description: 'Major rice and wheat region' },
    { value: 'khulna', label: 'Khulna', description: 'Shrimp and rice cultivation area' },
    { value: 'barisal', label: 'Barisal', description: 'River delta agricultural zone' },
    { value: 'rangpur', label: 'Rangpur', description: 'Northern agricultural belt' },
    { value: 'mymensingh', label: 'Mymensingh', description: 'Rice and jute production center' }
  ];

  const crops = [
    { value: 'rice', label: 'Rice (Oryza sativa)', description: 'Primary staple crop' },
    { value: 'wheat', label: 'Wheat (Triticum aestivum)', description: 'Winter crop variety' },
    { value: 'jute', label: 'Jute (Corchorus capsularis)', description: 'Golden fiber crop' },
    { value: 'tea', label: 'Tea (Camellia sinensis)', description: 'Export quality leaves' },
    { value: 'sugarcane', label: 'Sugarcane (Saccharum officinarum)', description: 'Industrial crop' },
    { value: 'potato', label: 'Potato (Solanum tuberosum)', description: 'Vegetable crop' },
    { value: 'cotton', label: 'Cotton (Gossypium hirsutum)', description: 'Fiber crop' },
    { value: 'mustard', label: 'Mustard (Brassica nigra)', description: 'Oil seed crop' }
  ];

  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">District & Crop Selection</h2>
          <p className="text-sm text-muted-foreground mt-1">Choose your focus area and crop type</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMapView(!isMapView)}
            className={`p-2 rounded-button transition-all duration-300 ${
              isMapView 
                ? 'bg-primary text-primary-foreground shadow-bloom' 
                : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
            }`}
            title={isMapView ? 'Switch to list view' : 'Switch to map view'}
          >
            <Icon name={isMapView ? "List" : "Map"} size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Select
            label="Select District"
            description="Choose the administrative district for analysis"
            options={districts}
            value={selectedDistrict}
            onChange={onDistrictChange}
            searchable
            placeholder="Search districts..."
            className="mb-4"
          />
        </div>

        <div>
          <Select
            label="Select Crop Type"
            description="Choose the crop variety for bloom prediction"
            options={crops}
            value={selectedCrop}
            onChange={onCropChange}
            searchable
            placeholder="Search crops..."
            className="mb-4"
          />
        </div>
      </div>
      {isMapView && (
        <div className="mt-6 animate-growth">
          <div className="bg-muted rounded-organic p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="MapPin" size={18} className="text-primary" />
              <span className="font-medium text-foreground">Interactive District Map</span>
            </div>
            
            <div className="w-full h-64 bg-background rounded-organic overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Bangladesh Agricultural Districts"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=23.6850,90.3563&z=7&output=embed"
                className="rounded-organic"
              />
            </div>
            
            <div className="mt-3 text-xs text-muted-foreground">
              Click on districts to select them directly from the map
            </div>
          </div>
        </div>
      )}
      {selectedDistrict && selectedCrop && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-organic animate-growth">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={18} className="text-success" />
            <span className="font-medium text-success">
              Analysis ready for {crops?.find(c => c?.value === selectedCrop)?.label} in {districts?.find(d => d?.value === selectedDistrict)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictSelector;