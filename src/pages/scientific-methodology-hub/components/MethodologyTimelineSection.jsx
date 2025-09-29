import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MethodologyTimelineSection = () => {
  const [activePhase, setActivePhase] = useState(0);

  const methodologyPhases = [
    {
      id: 0,
      phase: "Data Collection",
      title: "Multi-Source Data Acquisition",
      duration: "Continuous",
      description: "Comprehensive data gathering from satellite imagery, citizen science observations, and agricultural monitoring networks",
      icon: "Database",
      color: "primary",
      steps: [
        "Satellite imagery acquisition from NASA Earth Data APIs",
        "Citizen science observations via GLOBE Observer integration",
        "Agricultural data collection from BARI monitoring networks",
        "Weather and climate data aggregation from meteorological services",
        "Ground-truth validation through field surveys"
      ],
      technologies: ["NASA MODIS API", "Landsat 8/9", "GLOBE Observer", "BARI Database"],
      metrics: {
        "Data Points": "50M+ daily",
        "Sources": "15+ active",
        "Coverage": "Global + Regional",
        "Update Frequency": "Real-time"
      }
    },
    {
      id: 1,
      phase: "Data Processing",
      title: "Advanced Data Preprocessing",
      duration: "Real-time",
      description: "Sophisticated data cleaning, normalization, and feature engineering for optimal model performance",
      icon: "Settings",
      color: "secondary",
      steps: [
        "Satellite image preprocessing and cloud masking",
        "Temporal alignment of multi-source datasets",
        "Feature extraction from spectral indices (NDVI, EVI, SAVI)",
        "Data quality assessment and outlier detection",
        "Spatial and temporal interpolation for missing values"
      ],
      technologies: ["Google Earth Engine", "GDAL", "NumPy", "Pandas"],
      metrics: {
        "Processing Speed": "12ms average",
        "Data Quality": "99.2% clean",
        "Feature Count": "150+ variables",
        "Accuracy": "±0.1% precision"
      }
    },
    {
      id: 2,
      phase: "Model Training",
      title: "AI Model Development",
      duration: "Iterative",
      description: "Development and training of specialized AI models for different aspects of bloom prediction",
      icon: "Brain",
      color: "accent",
      steps: [
        "Architecture design for convolutional neural networks",
        "Training data preparation and augmentation",
        "Hyperparameter optimization using grid search",
        "Cross-validation and performance evaluation",
        "Model ensemble creation for improved accuracy"
      ],
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost"],
      metrics: {
        "Model Accuracy": "98.7%",
        "Training Time": "72 hours",
        "Parameters": "45M+",
        "Validation Score": "0.985 F1"
      }
    },
    {
      id: 3,
      phase: "Validation",
      title: "Rigorous Model Validation",
      duration: "Ongoing",
      description: "Comprehensive validation using independent datasets and real-world testing scenarios",
      icon: "CheckCircle",
      color: "success",
      steps: [
        "Independent dataset validation testing",
        "Cross-regional performance evaluation",
        "Temporal stability assessment",
        "Comparison with existing prediction methods",
        "Statistical significance testing"
      ],
      technologies: ["Statistical Analysis", "A/B Testing", "Cross-validation"],
      metrics: {
        "Validation Accuracy": "96.8%",
        "Test Regions": "25 countries",
        "Time Periods": "5 years",
        "Confidence": "95% CI"
      }
    },
    {
      id: 4,
      phase: "Deployment",
      title: "Production Deployment",
      duration: "Continuous",
      description: "Scalable deployment of validated models with real-time monitoring and performance tracking",
      icon: "Rocket",
      color: "warning",
      steps: [
        "Model containerization and orchestration",
        "API endpoint development and testing",
        "Load balancing and auto-scaling configuration",
        "Monitoring and alerting system setup",
        "Performance optimization and caching"
      ],
      technologies: ["Docker", "Kubernetes", "FastAPI", "Redis"],
      metrics: {
        "Response Time": "12ms avg",
        "Uptime": "99.9%",
        "Requests/Day": "1M+",
        "Global CDN": "15 regions"
      }
    },
    {
      id: 5,
      phase: "Monitoring",
      title: "Continuous Improvement",
      duration: "24/7",
      description: "Real-time monitoring, feedback collection, and iterative model improvement based on performance data",
      icon: "Activity",
      color: "error",
      steps: [
        "Real-time prediction accuracy monitoring",
        "User feedback collection and analysis",
        "Model drift detection and alerting",
        "Automated retraining pipeline execution",
        "Performance benchmarking and reporting"
      ],
      technologies: ["MLflow", "Prometheus", "Grafana", "Apache Airflow"],
      metrics: {
        "Monitoring Points": "500+",
        "Alert Response": "<5 minutes",
        "Model Updates": "Weekly",
        "Feedback Loop": "Real-time"
      }
    }
  ];

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      primary: isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary',
      secondary: isActive ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary',
      accent: isActive ? 'bg-accent text-white' : 'bg-accent/10 text-accent',
      success: isActive ? 'bg-success text-white' : 'bg-success/10 text-success',
      warning: isActive ? 'bg-warning text-white' : 'bg-warning/10 text-warning',
      error: isActive ? 'bg-error text-white' : 'bg-error/10 text-error'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Scientific Methodology Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Follow our comprehensive six-phase methodology that ensures scientific rigor, 
            reproducibility, and continuous improvement in bloom prediction accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Timeline Navigation */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <h3 className="font-semibold text-foreground mb-6">Methodology Phases</h3>
              <div className="space-y-3">
                {methodologyPhases?.map((phase, index) => (
                  <button
                    key={phase?.id}
                    onClick={() => setActivePhase(index)}
                    className={`w-full text-left p-4 rounded-organic transition-all duration-300 ${
                      activePhase === index
                        ? 'bg-card border-2 border-primary shadow-bloom'
                        : 'bg-card border border-border hover:border-primary/50 hover:shadow-card'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-organic flex items-center justify-center ${
                        getColorClasses(phase?.color, activePhase === index)
                      }`}>
                        <Icon name={phase?.icon} size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            Phase {index + 1}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {phase?.duration}
                          </span>
                        </div>
                        <h4 className={`font-semibold text-sm ${
                          activePhase === index ? 'text-primary' : 'text-foreground'
                        }`}>
                          {phase?.phase}
                        </h4>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Phase Details */}
          <div className="lg:col-span-8">
            <div className="data-card animate-growth">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 rounded-organic flex items-center justify-center ${
                  getColorClasses(methodologyPhases?.[activePhase]?.color, true)
                }`}>
                  <Icon name={methodologyPhases?.[activePhase]?.icon} size={32} />
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                    Phase {activePhase + 1} • {methodologyPhases?.[activePhase]?.duration}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {methodologyPhases?.[activePhase]?.title}
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                {methodologyPhases?.[activePhase]?.description}
              </p>

              {/* Process Steps */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="List" size={16} className="mr-2 text-primary" />
                  Process Steps
                </h4>
                <div className="space-y-3">
                  {methodologyPhases?.[activePhase]?.steps?.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        getColorClasses(methodologyPhases?.[activePhase]?.color, true)
                      }`}>
                        {index + 1}
                      </div>
                      <span className="text-sm text-muted-foreground flex-1 pt-0.5">
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="Code" size={16} className="mr-2 text-secondary" />
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {methodologyPhases?.[activePhase]?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary/10 text-secondary rounded-button text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="mb-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <Icon name="BarChart3" size={16} className="mr-2 text-accent" />
                  Key Performance Metrics
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(methodologyPhases?.[activePhase]?.metrics)?.map(([metric, value]) => (
                    <div key={metric} className="bg-muted/50 rounded-organic p-3 text-center">
                      <div className="font-bold text-foreground mb-1">{value}</div>
                      <div className="text-xs text-muted-foreground">{metric}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  className="flex-1"
                >
                  Download Phase Documentation
                </Button>
                
                <Button
                  variant="ghost"
                  iconName="ExternalLink"
                  iconPosition="right"
                  className="flex-1"
                >
                  View Technical Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MethodologyTimelineSection;