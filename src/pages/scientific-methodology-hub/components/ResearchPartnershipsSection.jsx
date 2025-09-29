import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ResearchPartnershipsSection = () => {
  const [activePartnership, setActivePartnership] = useState(0);

  const partnerships = [
    {
      id: 0,
      name: "NASA Earth Science Division",
      type: "Government Agency",
      logo: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=100&h=100&fit=crop&crop=center",
      description: "Strategic partnership for satellite data access and Earth observation research",
      collaboration: "Direct API access to MODIS, Landsat, and VIIRS datasets with real-time processing capabilities",
      contributions: [
        "Satellite imagery and vegetation indices",
        "Land surface temperature data",
        "Precipitation and climate variables",
        "Global environmental monitoring"
      ],
      impact: "Enables global-scale bloom prediction with 30m spatial resolution",
      duration: "2022 - 2027",
      status: "Active",
      publications: 12,
      jointProjects: 5
    },
    {
      id: 1,
      name: "GLOBE Observer Program",
      type: "Citizen Science Network",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=center",
      description: "Collaboration with global citizen science community for ground-truth validation",
      collaboration: "Integration with GLOBE Observer mobile app for phenological observations and data validation",
      contributions: [
        "Ground-truth phenological observations",
        "Community-contributed bloom photos",
        "Local environmental measurements",
        "Educational outreach programs"
      ],
      impact: "50,000+ citizen scientists contributing validation data worldwide",
      duration: "2021 - Ongoing",
      status: "Active",
      publications: 8,
      jointProjects: 3
    },
    {
      id: 2,
      name: "Bangladesh Agricultural Research Institute",
      type: "Research Institution",
      logo: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=100&h=100&fit=crop&crop=center",
      description: "Regional partnership for agricultural bloom prediction and crop optimization",
      collaboration: "Custom data pipeline for crop phenology, yield data, and farmer observations across 64 districts",
      contributions: [
        "District-level crop bloom data",
        "Agricultural calendar integration",
        "Farmer observation networks",
        "Local variety characterization"
      ],
      impact: "Improved agricultural planning for 2.5M farmers in Bangladesh",
      duration: "2023 - 2026",
      status: "Active",
      publications: 6,
      jointProjects: 4
    },
    {
      id: 3,
      name: "International Rice Research Institute",
      type: "Research Institution",
      logo: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=100&h=100&fit=crop&crop=center",
      description: "Specialized collaboration for rice bloom prediction and yield optimization",
      collaboration: "Joint research on rice phenology modeling with focus on climate adaptation strategies",
      contributions: [
        "Rice variety bloom characteristics",
        "Climate adaptation research",
        "Yield prediction models",
        "Sustainable farming practices"
      ],
      impact: "Enhanced rice production efficiency across South and Southeast Asia",
      duration: "2024 - 2027",
      status: "Active",
      publications: 4,
      jointProjects: 2
    },
    {
      id: 4,
      name: "University of Cambridge - Plant Sciences",
      type: "Academic Institution",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=100&h=100&fit=crop&crop=center",
      description: "Academic collaboration for advanced botanical modeling and AI research",
      collaboration: "Joint PhD programs and research initiatives in computational botany and machine learning",
      contributions: [
        "Advanced AI model development",
        "Botanical research expertise",
        "PhD student exchanges",
        "Peer review and validation"
      ],
      impact: "Cutting-edge research in computational botany and phenology modeling",
      duration: "2023 - 2028",
      status: "Active",
      publications: 9,
      jointProjects: 6
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-success bg-success/10';
      case 'Pending': return 'text-warning bg-warning/10';
      case 'Completed': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Government Agency': return 'Building';
      case 'Research Institution': return 'GraduationCap';
      case 'Academic Institution': return 'BookOpen';
      case 'Citizen Science Network': return 'Users';
      default: return 'Building';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Global Research Partnerships
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            BloomX collaborates with leading institutions worldwide to ensure scientific rigor, 
            data quality, and real-world impact across diverse agricultural and ecological contexts.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          {partnerships?.map((partnership, index) => (
            <button
              key={partnership?.id}
              onClick={() => setActivePartnership(index)}
              className={`text-center p-6 rounded-card transition-all duration-300 ${
                activePartnership === index
                  ? 'bg-card border-2 border-primary shadow-bloom transform -translate-y-1'
                  : 'bg-card border border-border hover:border-primary/50 hover:shadow-card'
              }`}
            >
              <div className="relative mb-4">
                <div className="w-16 h-16 mx-auto rounded-organic overflow-hidden bg-muted">
                  <Image
                    src={partnership?.logo}
                    alt={partnership?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                  activePartnership === index ? 'bg-primary' : 'bg-muted'
                }`}>
                  <Icon 
                    name={getTypeIcon(partnership?.type)} 
                    size={12} 
                    color={activePartnership === index ? 'white' : 'currentColor'}
                  />
                </div>
              </div>
              
              <h3 className="font-semibold text-sm text-foreground mb-2 line-clamp-2">
                {partnership?.name}
              </h3>
              
              <div className={`inline-block px-2 py-1 rounded-button text-xs font-medium ${getStatusColor(partnership?.status)}`}>
                {partnership?.status}
              </div>
            </button>
          ))}
        </div>

        {/* Detailed Partnership View */}
        <div className="data-card">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Partnership Overview */}
            <div className="lg:col-span-2">
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-20 h-20 rounded-organic overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={partnerships?.[activePartnership]?.logo}
                    alt={partnerships?.[activePartnership]?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-foreground">
                      {partnerships?.[activePartnership]?.name}
                    </h3>
                    <div className={`px-3 py-1 rounded-button text-sm font-medium ${getStatusColor(partnerships?.[activePartnership]?.status)}`}>
                      {partnerships?.[activePartnership]?.status}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon name={getTypeIcon(partnerships?.[activePartnership]?.type)} size={16} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{partnerships?.[activePartnership]?.type}</span>
                  </div>
                  <p className="text-muted-foreground">
                    {partnerships?.[activePartnership]?.description}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-organic p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <Icon name="Handshake" size={16} className="mr-2 text-primary" />
                  Collaboration Details
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {partnerships?.[activePartnership]?.collaboration}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-foreground mb-3">Key Contributions</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {partnerships?.[activePartnership]?.contributions?.map((contribution, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{contribution}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-success/10 rounded-organic p-4">
                <h4 className="font-semibold text-success mb-2 flex items-center">
                  <Icon name="Target" size={16} className="mr-2" />
                  Impact & Outcomes
                </h4>
                <p className="text-sm text-muted-foreground">
                  {partnerships?.[activePartnership]?.impact}
                </p>
              </div>
            </div>

            {/* Partnership Metrics */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Partnership Metrics</h4>
              
              <div className="space-y-4 mb-6">
                <div className="bg-muted/50 rounded-organic p-4">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {partnerships?.[activePartnership]?.publications}
                  </div>
                  <div className="text-sm text-muted-foreground">Joint Publications</div>
                </div>

                <div className="bg-muted/50 rounded-organic p-4">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {partnerships?.[activePartnership]?.jointProjects}
                  </div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>

                <div className="bg-muted/50 rounded-organic p-4">
                  <div className="text-sm font-medium text-foreground mb-1">Duration</div>
                  <div className="text-sm text-muted-foreground">
                    {partnerships?.[activePartnership]?.duration}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  fullWidth
                >
                  View Publications
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                  fullWidth
                >
                  Contact Partnership
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  fullWidth
                >
                  Collaboration Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchPartnershipsSection;