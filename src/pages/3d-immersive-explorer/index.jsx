import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import WebXRViewer from './components/WebXRViewer';
import PollinatorPerspective from './components/PollinatorPerspective';
import BotanicalModelLibrary from './components/BotanicalModelLibrary';
import ImmersiveControls from './components/ImmersiveControls';
import LearningPathway from './components/LearningPathway';

const ImmersiveExplorer = () => {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [selectedPollinator, setSelectedPollinator] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isVRMode, setIsVRMode] = useState(false);
  const [isARMode, setIsARMode] = useState(false);
  const [pollinatorPerspectiveActive, setPollinatorPerspectiveActive] = useState(false);
  const [userProgress, setUserProgress] = useState({ completedModules: [] });
  const [comfortSettings, setComfortSettings] = useState({
    motionSickness: false,
    snapTurning: false,
    teleportMovement: true,
    reducedMotion: false
  });
  const [audioSettings, setAudioSettings] = useState({
    spatialAudio: true,
    ambientSounds: true,
    pollinatorSounds: true,
    plantInteraction: true
  });

  useEffect(() => {
    // Load user preferences and progress
    const savedProgress = localStorage.getItem('bloomx_learning_progress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    const savedComfort = localStorage.getItem('bloomx_comfort_settings');
    if (savedComfort) {
      setComfortSettings(JSON.parse(savedComfort));
    }

    const savedAudio = localStorage.getItem('bloomx_audio_settings');
    if (savedAudio) {
      setAudioSettings(JSON.parse(savedAudio));
    }
  }, []);

  const handlePlantSelect = (plant) => {
    setSelectedPlant(plant);
  };

  const handlePollinatorSelect = (pollinator) => {
    setSelectedPollinator(pollinator);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedPlant({
      id: model?.id,
      name: model?.name,
      commonName: model?.commonName,
      bloomStage: model?.bloomStage
    });
  };

  const handleVRToggle = (active) => {
    setIsVRMode(active);
    if (active) setIsARMode(false);
  };

  const handleARToggle = (active) => {
    setIsARMode(active);
    if (active) setIsVRMode(false);
  };

  const handleComfortChange = (settings) => {
    setComfortSettings(settings);
    localStorage.setItem('bloomx_comfort_settings', JSON.stringify(settings));
  };

  const handleAudioChange = (settings) => {
    setAudioSettings(settings);
    localStorage.setItem('bloomx_audio_settings', JSON.stringify(settings));
  };

  const handleProgressUpdate = (progress) => {
    const updatedProgress = { ...userProgress, ...progress };
    setUserProgress(updatedProgress);
    localStorage.setItem('bloomx_learning_progress', JSON.stringify(updatedProgress));
  };

  const handleModuleSelect = (module) => {
    console.log("Selected module:", module);
    // Here you would typically navigate to the module content or open a modal
  };

  const navigationRoutes = [
    { path: '/interactive-globe-dashboard', name: 'Globe Dashboard', icon: 'Globe' },
    { path: '/gamified-prediction-arena', name: 'Prediction Arena', icon: 'Target' },
    { path: '/bangladesh-agricultural-focus', name: 'Agricultural Focus', icon: 'Sprout' },
    { path: '/scientific-methodology-hub', name: 'Methodology Hub', icon: 'BookOpen' },
    { path: '/api-documentation', name: 'API Docs', icon: 'Code' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-16 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/5 rounded-full blur-3xl animate-pulse-organic"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-bloom rounded-full flex items-center justify-center shadow-bloom animate-pulse-organic">
                  <Icon name="Compass" size={32} color="white" />
                </div>
              </div>
              
              <h1 className="text-hero text-foreground mb-6">
                3D Immersive Explorer
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Experience botanical science through cutting-edge WebXR technology. Explore plants from pollinator perspectives, 
                interact with scientifically accurate 3D models, and learn through immersive educational pathways.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="Play"
                  iconPosition="left"
                  className="bg-gradient-bloom hover:shadow-bloom"
                  onClick={() => setPollinatorPerspectiveActive(true)}
                >
                  Start Exploring
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  iconName="BookOpen"
                  iconPosition="left"
                >
                  Learning Guide
                </Button>
              </div>
            </motion.div>

            {/* Quick Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {navigationRoutes?.map((route) => (
                <Link
                  key={route?.path}
                  to={route?.path}
                  className="flex items-center space-x-2 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-organic text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover-bloom"
                >
                  <Icon name={route?.icon} size={16} />
                  <span className="text-sm font-medium">{route?.name}</span>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Controls and Settings */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImmersiveControls
                    isVRActive={isVRMode}
                    onVRToggle={handleVRToggle}
                    isARActive={isARMode}
                    onARToggle={handleARToggle}
                    comfortSettings={comfortSettings}
                    onComfortChange={handleComfortChange}
                    audioSettings={audioSettings}
                    onAudioChange={handleAudioChange}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <PollinatorPerspective
                    selectedPollinator={selectedPollinator}
                    onPollinatorSelect={handlePollinatorSelect}
                    isActive={pollinatorPerspectiveActive}
                    onToggle={() => setPollinatorPerspectiveActive(!pollinatorPerspectiveActive)}
                  />
                </motion.div>
              </div>

              {/* Center Column - 3D Viewer */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <WebXRViewer
                    selectedPlant={selectedPlant}
                    onPlantSelect={handlePlantSelect}
                    isVRMode={isVRMode}
                    onVRToggle={handleVRToggle}
                  />
                </motion.div>

                {/* Experience Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  <div className="bg-card rounded-card border border-border p-4 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Eye" size={24} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Immersive Views</h3>
                    <p className="text-2xl font-bold text-primary mb-1">12</p>
                    <p className="text-sm text-muted-foreground">Plants explored</p>
                  </div>

                  <div className="bg-card rounded-card border border-border p-4 text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Clock" size={24} className="text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Session Time</h3>
                    <p className="text-2xl font-bold text-secondary mb-1">24m</p>
                    <p className="text-sm text-muted-foreground">Current session</p>
                  </div>

                  <div className="bg-card rounded-card border border-border p-4 text-center">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon name="Award" size={24} className="text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">Learning Progress</h3>
                    <p className="text-2xl font-bold text-success mb-1">67%</p>
                    <p className="text-sm text-muted-foreground">Modules completed</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Botanical Model Library */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <BotanicalModelLibrary
                onModelSelect={handleModelSelect}
                selectedModel={selectedModel}
              />
            </motion.div>

            {/* Learning Pathways */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12"
            >
              <LearningPathway
                userProgress={userProgress}
                onModuleSelect={handleModuleSelect}
                onProgressUpdate={handleProgressUpdate}
              />
            </motion.div>

            {/* Features Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-section text-foreground mb-4">Immersive Features</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Cutting-edge technology meets botanical science for unprecedented learning experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: "Glasses",
                    title: "WebXR Support",
                    description: "Full VR/AR compatibility with hand tracking and spatial audio",
                    color: "primary"
                  },
                  {
                    icon: "Bug",
                    title: "Pollinator Views",
                    description: "Experience gardens through the eyes of bees, butterflies, and birds",
                    color: "secondary"
                  },
                  {
                    icon: "Flower2",
                    title: "Scientific Models",
                    description: "Anatomically accurate 3D plant models with realistic physics",
                    color: "success"
                  },
                  {
                    icon: "BookOpen",
                    title: "Learning Paths",
                    description: "Progressive educational modules with interactive elements",
                    color: "warning"
                  }
                ]?.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-card border border-border p-6 text-center hover-bloom group"
                  >
                    <div className={`w-16 h-16 bg-${feature?.color}/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-${feature?.color}/20 transition-colors duration-300`}>
                      <Icon name={feature?.icon} size={32} className={`text-${feature?.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature?.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature?.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-success/10 rounded-card p-8 border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ready to Explore?</h2>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of citizen scientists exploring the botanical world through immersive technology. 
                  Start your journey into the fascinating realm of plant science today.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="Compass"
                    iconPosition="left"
                    className="bg-gradient-bloom hover:shadow-bloom"
                  >
                    Begin Exploration
                  </Button>
                  <Link to="/gamified-prediction-arena">
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Target"
                      iconPosition="left"
                    >
                      Try Prediction Arena
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ImmersiveExplorer;