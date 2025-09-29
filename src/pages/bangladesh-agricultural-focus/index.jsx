import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import DistrictSelector from './components/DistrictSelector';
import CropBloomCalendar from './components/CropBloomCalendar';
import EconomicImpactDashboard from './components/EconomicImpactDashboard';
import WeatherIntegration from './components/WeatherIntegration';
import FarmerResourceCenter from './components/FarmerResourceCenter';
import PredictionAccuracyTracker from './components/PredictionAccuracyTracker';

const BangladeshAgriculturalFocus = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('dhaka');
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [activeTab, setActiveTab] = useState('overview');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [platformStats, setPlatformStats] = useState({});

  useEffect(() => {
    // Check for offline mode
    const checkOnlineStatus = () => {
      setIsOfflineMode(!navigator.onLine);
    };

    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);
    checkOnlineStatus();

    // Mock platform statistics
    setPlatformStats({
      totalPredictions: 156420,
      accuracyRate: 87.5,
      agriculturalDecisions: 12450,
      activeFarmers: 8900,
      districtsCovered: 64,
      cropsMonitored: 25
    });

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'calendar', label: 'Bloom Calendar', icon: 'Calendar' },
    { id: 'economics', label: 'Economic Impact', icon: 'DollarSign' },
    { id: 'weather', label: 'Weather Data', icon: 'CloudSun' },
    { id: 'resources', label: 'Resources', icon: 'BookOpen' },
    { id: 'accuracy', label: 'Accuracy Tracker', icon: 'Target' }
  ];

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
  };

  const handleCropChange = (crop) => {
    setSelectedCrop(crop);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Platform Impact Metrics */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Platform Impact Metrics</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time data showing agricultural decisions influenced by BloomX predictions
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOfflineMode ? 'bg-error animate-pulse' : 'bg-success'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isOfflineMode ? 'Offline Mode' : 'Live Data'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-gradient-bloom rounded-organic p-4 text-white text-center">
            <Icon name="Target" size={24} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{platformStats?.totalPredictions?.toLocaleString()}</div>
            <div className="text-xs opacity-90">Total Predictions</div>
          </div>

          <div className="bg-gradient-sky rounded-organic p-4 text-white text-center">
            <Icon name="TrendingUp" size={24} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{platformStats?.accuracyRate}%</div>
            <div className="text-xs opacity-90">Accuracy Rate</div>
          </div>

          <div className="bg-gradient-sunset rounded-organic p-4 text-white text-center">
            <Icon name="Users" size={24} className="mx-auto mb-2" />
            <div className="text-2xl font-bold">{platformStats?.activeFarmers?.toLocaleString()}</div>
            <div className="text-xs opacity-90">Active Farmers</div>
          </div>

          <div className="bg-success/10 p-4 rounded-organic text-center">
            <Icon name="MapPin" size={24} className="mx-auto mb-2 text-success" />
            <div className="text-2xl font-bold text-success">{platformStats?.districtsCovered}</div>
            <div className="text-xs text-success">Districts Covered</div>
          </div>

          <div className="bg-primary/10 p-4 rounded-organic text-center">
            <Icon name="Sprout" size={24} className="mx-auto mb-2 text-primary" />
            <div className="text-2xl font-bold text-primary">{platformStats?.cropsMonitored}</div>
            <div className="text-xs text-primary">Crops Monitored</div>
          </div>

          <div className="bg-accent/10 p-4 rounded-organic text-center">
            <Icon name="Activity" size={24} className="mx-auto mb-2 text-accent" />
            <div className="text-2xl font-bold text-accent">{platformStats?.agriculturalDecisions?.toLocaleString()}</div>
            <div className="text-xs text-accent">Decisions Influenced</div>
          </div>
        </div>
      </div>

      {/* District and Crop Selection */}
      <DistrictSelector
        selectedDistrict={selectedDistrict}
        onDistrictChange={handleDistrictChange}
        selectedCrop={selectedCrop}
        onCropChange={handleCropChange}
      />

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-card p-6 shadow-card hover-bloom">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-success/10 rounded-organic flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-success" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Yield Improvement</h3>
              <p className="text-sm text-muted-foreground">This season vs last</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-success mb-2">+12.8%</div>
          <p className="text-sm text-muted-foreground">
            Farmers using bloom predictions achieved 12.8% higher yields compared to traditional methods
          </p>
        </div>

        <div className="bg-card border border-border rounded-card p-6 shadow-card hover-bloom">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-warning/10 rounded-organic flex items-center justify-center">
              <Icon name="DollarSign" size={24} className="text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Cost Savings</h3>
              <p className="text-sm text-muted-foreground">Per hectare average</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-warning mb-2">৳8,500</div>
          <p className="text-sm text-muted-foreground">
            Average cost reduction through optimized timing of agricultural inputs
          </p>
        </div>

        <div className="bg-card border border-border rounded-card p-6 shadow-card hover-bloom">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-organic flex items-center justify-center">
              <Icon name="Clock" size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Early Warning</h3>
              <p className="text-sm text-muted-foreground">Average lead time</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-secondary mb-2">7 Days</div>
          <p className="text-sm text-muted-foreground">
            Advance notice for optimal bloom conditions and potential issues
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Agricultural Activity</h3>
        <div className="space-y-3">
          {[
            {
              time: '2 hours ago',
              action: 'Bloom prediction updated for Rajshahi rice fields',
              status: 'success',
              icon: 'CheckCircle'
            },
            {
              time: '5 hours ago',
              action: 'Weather alert issued for Chittagong tea gardens',
              status: 'warning',
              icon: 'AlertTriangle'
            },
            {
              time: '1 day ago',
              action: 'New farmer feedback received from Sylhet district',
              status: 'info',
              icon: 'MessageCircle'
            },
            {
              time: '2 days ago',
              action: 'Economic impact report generated for wheat cultivation',
              status: 'success',
              icon: 'FileText'
            }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-organic">
              <Icon 
                name={activity?.icon} 
                size={18} 
                className={`${
                  activity?.status === 'success' ? 'text-success' :
                  activity?.status === 'warning'? 'text-warning' : 'text-secondary'
                }`}
              />
              <div className="flex-1">
                <p className="text-sm text-foreground">{activity?.action}</p>
                <p className="text-xs text-muted-foreground">{activity?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Bangladesh Agricultural Focus - BloomX Platform</title>
        <meta name="description" content="District-level crop bloom analysis with economic and agricultural insights for Bangladesh's agricultural regions" />
        <meta name="keywords" content="Bangladesh agriculture, crop bloom prediction, farming insights, agricultural data" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-bloom text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <Icon name="MapPin" size={32} />
                <h1 className="text-4xl md:text-5xl font-bold">Bangladesh Agricultural Focus</h1>
              </div>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                District-level crop bloom analysis with economic insights, weather integration, 
                and comprehensive agricultural resources for Bangladesh's farming communities
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  <Icon name="Download" size={20} className="mr-2" />
                  Download Mobile App
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Emergency Hotline
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Offline Mode Banner */}
        {isOfflineMode && (
          <div className="bg-warning text-warning-foreground py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="WifiOff" size={20} />
                <span className="font-medium">
                  You're currently offline. Some features may be limited. Data will sync when connection is restored.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Tab Navigation */}
            <div className="flex flex-wrap gap-2 mb-8 bg-card border border-border p-2 rounded-card shadow-card">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-organic transition-all duration-300 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-bloom'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span className="font-medium">{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="animate-growth">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'calendar' && (
                <CropBloomCalendar 
                  selectedDistrict={selectedDistrict} 
                  selectedCrop={selectedCrop} 
                />
              )}
              {activeTab === 'economics' && (
                <EconomicImpactDashboard 
                  selectedDistrict={selectedDistrict} 
                  selectedCrop={selectedCrop} 
                />
              )}
              {activeTab === 'weather' && (
                <WeatherIntegration selectedDistrict={selectedDistrict} />
              )}
              {activeTab === 'resources' && (
                <FarmerResourceCenter 
                  selectedDistrict={selectedDistrict} 
                  selectedCrop={selectedCrop} 
                />
              )}
              {activeTab === 'accuracy' && (
                <PredictionAccuracyTracker 
                  selectedDistrict={selectedDistrict} 
                  selectedCrop={selectedCrop} 
                />
              )}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-sky text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Icon name="Sprout" size={48} className="mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farming?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of Bangladeshi farmers who are already using BloomX predictions 
              to increase yields and reduce costs
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-secondary">
                <Icon name="UserPlus" size={20} className="mr-2" />
                Create Farmer Account
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-secondary">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Contact Extension Officer
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Leaf" size={24} className="text-primary" />
                  <span className="text-lg font-bold text-foreground">BloomX</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Empowering Bangladesh's agricultural future through scientific bloom predictions 
                  and data-driven farming insights.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Farmer Registration</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Mobile App Download</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Training Programs</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Extension Officers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Emergency Hotline</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Feedback Portal</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Contact</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={16} />
                    <span>+880-1700-BLOOM</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Mail" size={16} />
                    <span>support@bloomx.bd</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date()?.getFullYear()} BloomX Platform. All rights reserved. | Empowering Bangladesh Agriculture</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default BangladeshAgriculturalFocus;