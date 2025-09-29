import React from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import DataSourcesSection from './components/DataSourcesSection';
import AIModelsSection from './components/AIModelsSection';
import ResearchPartnershipsSection from './components/ResearchPartnershipsSection';
import PublicationsSection from './components/PublicationsSection';
import MethodologyTimelineSection from './components/MethodologyTimelineSection';
import CitationToolsSection from './components/CitationToolsSection';

const ScientificMethodologyHub = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <DataSourcesSection />
        <AIModelsSection />
        <MethodologyTimelineSection />
        <ResearchPartnershipsSection />
        <PublicationsSection />
        <CitationToolsSection />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-bloom rounded-organic flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">BloomX Platform</h3>
                  <p className="text-sm text-muted-foreground">Scientific Discovery Platform</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Advancing botanical science through AI-powered bloom prediction, 
                citizen science integration, and transparent research methodologies.
              </p>
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} BloomX Platform. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Research</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Publications</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Data Sources</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partnerships</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Citation Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Research Reports</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScientificMethodologyHub;