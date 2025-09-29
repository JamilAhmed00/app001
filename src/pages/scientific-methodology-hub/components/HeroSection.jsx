import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-bloom text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-growth">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-organic flex items-center justify-center backdrop-blur-sm">
                <Icon name="BookOpen" size={24} color="white" />
              </div>
              <span className="text-white/90 font-medium">Scientific Methodology Hub</span>
            </div>
            
            <h1 className="text-hero text-white mb-6 leading-tight">
              Transparent Science,
              <br />
              <span className="text-accent">Verified Results</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Explore the rigorous scientific methodologies behind BloomX's predictions. 
              From NASA Earth Data integration to AI model validation, discover how we 
              transform complex botanical data into actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="secondary"
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="bg-white text-primary hover:bg-white/90"
              >
                Download Research Papers
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="text-white border-white/30 hover:bg-white/10"
              >
                Watch Methodology Video
              </Button>
            </div>
          </div>
          
          <div className="relative animate-float">
            <div className="bg-white/10 backdrop-blur-sm rounded-card p-8 border border-white/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">98.7%</div>
                  <div className="text-white/80 text-sm">Prediction Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">15+</div>
                  <div className="text-white/80 text-sm">Data Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50M+</div>
                  <div className="text-white/80 text-sm">Data Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">24/7</div>
                  <div className="text-white/80 text-sm">Real-time Updates</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-pulse-organic"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </section>
  );
};

export default HeroSection;