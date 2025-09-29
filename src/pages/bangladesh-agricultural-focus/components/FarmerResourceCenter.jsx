import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmerResourceCenter = ({ selectedDistrict, selectedCrop }) => {
  const [activeSection, setActiveSection] = useState('guides');
  const [resources, setResources] = useState({});
  const [extensionOfficers, setExtensionOfficers] = useState([]);

  useEffect(() => {
    // Mock resource data
    const mockResources = {
      guides: [
        {
          id: 1,
          title: "Rice Bloom Prediction Guide",
          description: "Complete guide to understanding and predicting rice bloom cycles in Bangladesh climate",
          category: "Bloom Prediction",
          downloadUrl: "#",
          views: 2450,
          rating: 4.8,
          language: "Bengali/English",
          icon: "BookOpen"
        },
        {
          id: 2,
          title: "Optimal Planting Calendar 2024",
          description: "District-wise planting schedules based on climate data and bloom predictions",
          category: "Planning",
          downloadUrl: "#",
          views: 1890,
          rating: 4.6,
          language: "Bengali",
          icon: "Calendar"
        },
        {
          id: 3,
          title: "Pest Management During Bloom",
          description: "Integrated pest management strategies during critical bloom phases",
          category: "Pest Control",
          downloadUrl: "#",
          views: 1650,
          rating: 4.7,
          language: "Bengali/English",
          icon: "Shield"
        },
        {
          id: 4,
          title: "Weather-Based Farming Decisions",
          description: "How to use weather forecasts for better agricultural outcomes",
          category: "Weather",
          downloadUrl: "#",
          views: 2100,
          rating: 4.9,
          language: "Bengali",
          icon: "CloudSun"
        }
      ],
      tools: [
        {
          id: 1,
          name: "Bloom Prediction Calculator",
          description: "Calculate optimal bloom timing based on your location and crop variety",
          type: "Web Tool",
          icon: "Calculator",
          status: "Available"
        },
        {
          id: 2,
          name: "Fertilizer Recommendation System",
          description: "Get personalized fertilizer recommendations based on soil and crop data",
          type: "AI Tool",
          icon: "Beaker",
          status: "Available"
        },
        {
          id: 3,
          name: "Harvest Timing Optimizer",
          description: "Determine the best harvest time for maximum yield and quality",
          type: "Prediction Tool",
          icon: "Clock",
          status: "Beta"
        },
        {
          id: 4,
          name: "Mobile Field Assistant",
          description: "Offline mobile app for field data collection and analysis",
          type: "Mobile App",
          icon: "Smartphone",
          status: "Coming Soon"
        }
      ],
      training: [
        {
          id: 1,
          title: "Digital Agriculture Basics",
          instructor: "Dr. Rahman Ahmed",
          duration: "4 weeks",
          participants: 156,
          nextSession: "2024-10-15",
          level: "Beginner",
          format: "Online",
          icon: "GraduationCap"
        },
        {
          id: 2,
          title: "Advanced Bloom Prediction Techniques",
          instructor: "Prof. Fatima Khan",
          duration: "6 weeks",
          participants: 89,
          nextSession: "2024-10-22",
          level: "Advanced",
          format: "Hybrid",
          icon: "Target"
        },
        {
          id: 3,
          title: "Climate-Smart Agriculture",
          instructor: "Dr. Karim Hassan",
          duration: "8 weeks",
          participants: 234,
          nextSession: "2024-11-01",
          level: "Intermediate",
          format: "Online",
          icon: "Leaf"
        }
      ]
    };

    const mockExtensionOfficers = [
      {
        id: 1,
        name: "Md. Abdul Rahman",
        designation: "Senior Agricultural Extension Officer",
        district: "Dhaka",
        specialization: "Rice Cultivation",
        phone: "+880-1712-345678",
        email: "rahman@dae.gov.bd",
        experience: "12 years",
        languages: ["Bengali", "English"],
        availability: "Online",
        rating: 4.8,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Dr. Fatima Begum",
        designation: "Agricultural Research Officer",
        district: "Chittagong",
        specialization: "Crop Disease Management",
        phone: "+880-1713-456789",
        email: "fatima@bari.gov.bd",
        experience: "8 years",
        languages: ["Bengali", "English"],
        availability: "Busy",
        rating: 4.9,
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      {
        id: 3,
        name: "Eng. Karim Uddin",
        designation: "Irrigation Specialist",
        district: "Sylhet",
        specialization: "Water Management",
        phone: "+880-1714-567890",
        email: "karim@bmda.gov.bd",
        experience: "15 years",
        languages: ["Bengali"],
        availability: "Online",
        rating: 4.7,
        avatar: "https://randomuser.me/api/portraits/men/56.jpg"
      }
    ];

    setResources(mockResources);
    setExtensionOfficers(mockExtensionOfficers);
  }, [selectedDistrict, selectedCrop]);

  const sections = [
    { id: 'guides', label: 'Resource Guides', icon: 'BookOpen' },
    { id: 'tools', label: 'Digital Tools', icon: 'Wrench' },
    { id: 'training', label: 'Training Programs', icon: 'GraduationCap' },
    { id: 'officers', label: 'Extension Officers', icon: 'Users' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Available': 'bg-success/10 text-success',
      'Beta': 'bg-warning/10 text-warning',
      'Coming Soon': 'bg-secondary/10 text-secondary',
      'Online': 'bg-success/10 text-success',
      'Busy': 'bg-warning/10 text-warning',
      'Offline': 'bg-error/10 text-error'
    };
    return colors?.[status] || 'bg-muted/10 text-muted-foreground';
  };

  const renderGuides = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources?.guides?.map((guide) => (
        <div key={guide?.id} className="bg-muted/50 rounded-organic p-6 hover-bloom">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-organic flex items-center justify-center">
              <Icon name={guide?.icon} size={24} className="text-primary" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">{guide?.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{guide?.description}</p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{guide?.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-accent" />
                  <span>{guide?.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Globe" size={12} />
                  <span>{guide?.language}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-button">
                  {guide?.category}
                </span>
                <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTools = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {resources?.tools?.map((tool) => (
        <div key={tool?.id} className="bg-muted/50 rounded-organic p-6 hover-bloom">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-organic flex items-center justify-center">
              <Icon name={tool?.icon} size={24} className="text-secondary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{tool?.name}</h3>
                <span className={`text-xs px-2 py-1 rounded-button ${getStatusColor(tool?.status)}`}>
                  {tool?.status}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{tool?.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-button">
                  {tool?.type}
                </span>
                <Button 
                  variant={tool?.status === 'Available' ? 'default' : 'outline'} 
                  size="sm"
                  disabled={tool?.status !== 'Available'}
                  iconName={tool?.status === 'Available' ? 'ExternalLink' : 'Clock'}
                  iconPosition="left"
                >
                  {tool?.status === 'Available' ? 'Launch' : tool?.status}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTraining = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {resources?.training?.map((program) => (
        <div key={program?.id} className="bg-muted/50 rounded-organic p-6 hover-bloom">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-accent/10 rounded-organic flex items-center justify-center">
              <Icon name={program?.icon} size={24} className="text-accent" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">{program?.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">Instructor: {program?.instructor}</p>
              
              <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{program?.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{program?.participants} enrolled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={12} />
                  <span>{program?.nextSession}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Monitor" size={12} />
                  <span>{program?.format}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-button">
                  {program?.level}
                </span>
                <Button variant="default" size="sm" iconName="UserPlus" iconPosition="left">
                  Enroll Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOfficers = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {extensionOfficers?.map((officer) => (
        <div key={officer?.id} className="bg-muted/50 rounded-organic p-6 hover-bloom">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <img
                src={officer?.avatar}
                alt={officer?.name}
                className="w-16 h-16 rounded-organic object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                officer?.availability === 'Online' ? 'bg-success' : 
                officer?.availability === 'Busy' ? 'bg-warning' : 'bg-error'
              }`}></div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{officer?.name}</h3>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} className="text-accent" />
                  <span className="text-xs text-muted-foreground">{officer?.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-1">{officer?.designation}</p>
              <p className="text-xs text-muted-foreground mb-3">
                {officer?.district} • {officer?.specialization} • {officer?.experience}
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                {officer?.languages?.map((lang, index) => (
                  <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-button">
                    {lang}
                  </span>
                ))}
                <span className={`text-xs px-2 py-1 rounded-button ${getStatusColor(officer?.availability)}`}>
                  {officer?.availability}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
                  Call
                </Button>
                <Button variant="default" size="sm" iconName="MessageCircle" iconPosition="left">
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Farmer Resource Center</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Comprehensive resources and support for agricultural success
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="HelpCircle" size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Need Help?</span>
        </div>
      </div>
      {/* Section Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 bg-muted p-1 rounded-organic">
        {sections?.map((section) => (
          <button
            key={section?.id}
            onClick={() => setActiveSection(section?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-button transition-all duration-300 ${
              activeSection === section?.id
                ? 'bg-primary text-primary-foreground shadow-bloom'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <Icon name={section?.icon} size={16} />
            <span className="text-sm font-medium">{section?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="animate-growth">
        {activeSection === 'guides' && renderGuides()}
        {activeSection === 'tools' && renderTools()}
        {activeSection === 'training' && renderTraining()}
        {activeSection === 'officers' && renderOfficers()}
      </div>
      {/* Quick Actions */}
      <div className="mt-8 p-4 bg-gradient-bloom rounded-organic text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Need Immediate Support?</h3>
            <p className="text-sm opacity-90">Connect with our agricultural experts 24/7</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary">
              Emergency Hotline
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-primary">
              Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerResourceCenter;