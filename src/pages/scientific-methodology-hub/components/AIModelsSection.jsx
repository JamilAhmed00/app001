import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIModelsSection = () => {
  const [selectedModel, setSelectedModel] = useState(0);

  const aiModels = [
    {
      id: 0,
      name: "BloomNet Deep Learning",
      type: "Convolutional Neural Network",
      description: "Primary prediction model using satellite imagery and environmental data",
      icon: "Brain",
      accuracy: "98.7%",
      trainingData: "2.3M samples",
      parameters: "45M parameters",
      architecture: "ResNet-50 backbone with custom temporal attention layers for sequential bloom pattern recognition",
      applications: ["Global bloom prediction", "Species-specific timing", "Climate impact modeling"],
      performance: {
        precision: 0.987,
        recall: 0.983,
        f1Score: 0.985,
        latency: "12ms"
      },
      lastTrained: "2025-09-15",
      status: "Production"
    },
    {
      id: 1,
      name: "AgriCast Ensemble",
      type: "Random Forest + XGBoost",
      description: "Agricultural-focused model for crop bloom prediction in Bangladesh",
      icon: "TreePine",
      accuracy: "96.4%",
      trainingData: "850K samples",
      parameters: "12K trees",
      architecture: "Ensemble of Random Forest and XGBoost models with feature engineering for agricultural variables",
      applications: ["Crop yield prediction", "Harvest timing", "Agricultural planning"],
      performance: {
        precision: 0.964,
        recall: 0.961,
        f1Score: 0.962,
        latency: "8ms"
      },
      lastTrained: "2025-09-20",
      status: "Production"
    },
    {
      id: 2,
      name: "ClimateSync LSTM",
      type: "Long Short-Term Memory",
      description: "Time-series model for climate-driven bloom pattern analysis",
      icon: "TrendingUp",
      accuracy: "94.2%",
      trainingData: "1.8M sequences",
      parameters: "28M parameters",
      architecture: "Multi-layer LSTM with attention mechanism for long-term climate pattern recognition",
      applications: ["Climate change impact", "Long-term forecasting", "Seasonal predictions"],
      performance: {
        precision: 0.942,
        recall: 0.938,
        f1Score: 0.940,
        latency: "15ms"
      },
      lastTrained: "2025-09-10",
      status: "Production"
    },
    {
      id: 3,
      name: "PollinatorVision CNN",
      type: "Computer Vision Model",
      description: "Experimental model for pollinator behavior prediction",
      icon: "Eye",
      accuracy: "89.3%",
      trainingData: "450K images",
      parameters: "32M parameters",
      architecture: "EfficientNet-B4 with custom detection heads for pollinator activity recognition",
      applications: ["Pollinator tracking", "Ecosystem health", "Biodiversity monitoring"],
      performance: {
        precision: 0.893,
        recall: 0.887,
        f1Score: 0.890,
        latency: "22ms"
      },
      lastTrained: "2025-09-25",
      status: "Beta Testing"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Production': return 'text-success bg-success/10';
      case 'Beta Testing': return 'text-warning bg-warning/10';
      case 'Development': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Advanced AI Model Architecture
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our prediction accuracy is powered by a sophisticated ensemble of AI models, 
            each specialized for different aspects of bloom prediction and validation.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-12">
          {aiModels?.map((model, index) => (
            <button
              key={model?.id}
              onClick={() => setSelectedModel(index)}
              className={`text-left p-6 rounded-card transition-all duration-300 ${
                selectedModel === index
                  ? 'bg-card border-2 border-primary shadow-bloom transform -translate-y-1'
                  : 'bg-card border border-border hover:border-primary/50 hover:shadow-card'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-organic flex items-center justify-center ${
                  selectedModel === index ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon name={model?.icon} size={24} />
                </div>
                
                <div className={`px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(model?.status)}`}>
                  {model?.status}
                </div>
              </div>
              
              <h3 className="font-semibold text-foreground mb-2">{model?.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {model?.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium text-foreground">{model?.accuracy}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium text-foreground">{model?.type}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Model View */}
        <div className="data-card">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Model Overview */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-bloom rounded-organic flex items-center justify-center">
                  <Icon name={aiModels?.[selectedModel]?.icon} size={32} color="white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {aiModels?.[selectedModel]?.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {aiModels?.[selectedModel]?.type}
                  </p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {aiModels?.[selectedModel]?.description}
              </p>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-organic p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <Icon name="Settings" size={16} className="mr-2 text-primary" />
                  Architecture Details
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {aiModels?.[selectedModel]?.architecture}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Applications</h4>
                <div className="flex flex-wrap gap-2">
                  {aiModels?.[selectedModel]?.applications?.map((app, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-button text-sm font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Performance Metrics</h4>
              
              <div className="space-y-4 mb-6">
                <div className="bg-muted/50 rounded-organic p-4">
                  <div className="text-2xl font-bold text-success mb-1">
                    {aiModels?.[selectedModel]?.accuracy}
                  </div>
                  <div className="text-sm text-muted-foreground">Overall Accuracy</div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted/50 rounded-organic p-3 text-center">
                    <div className="font-bold text-foreground">
                      {aiModels?.[selectedModel]?.trainingData}
                    </div>
                    <div className="text-xs text-muted-foreground">Training Data</div>
                  </div>
                  <div className="bg-muted/50 rounded-organic p-3 text-center">
                    <div className="font-bold text-foreground">
                      {aiModels?.[selectedModel]?.parameters}
                    </div>
                    <div className="text-xs text-muted-foreground">Parameters</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {Object.entries(aiModels?.[selectedModel]?.performance)?.map(([metric, value]) => (
                    <div key={metric} className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground capitalize">
                        {metric?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </span>
                      <span className="font-medium text-foreground">
                        {typeof value === 'number' ? value?.toFixed(3) : value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs text-muted-foreground mb-2">Last Trained</div>
                <div className="font-medium text-foreground mb-4">
                  {new Date(aiModels[selectedModel].lastTrained)?.toLocaleDateString()}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Model Documentation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIModelsSection;