import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SdkCard = ({ sdk }) => {
  const getLanguageIcon = (language) => {
    const icons = {
      javascript: 'Code',
      python: 'FileCode',
      java: 'Coffee',
      php: 'Globe',
      ruby: 'Gem',
      go: 'Zap',
      rust: 'Shield',
      swift: 'Smartphone'
    };
    return icons?.[language?.toLowerCase()] || 'Code';
  };

  const getLanguageColor = (language) => {
    const colors = {
      javascript: 'text-yellow-600',
      python: 'text-blue-600',
      java: 'text-red-600',
      php: 'text-purple-600',
      ruby: 'text-red-500',
      go: 'text-cyan-600',
      rust: 'text-orange-600',
      swift: 'text-orange-500'
    };
    return colors?.[language?.toLowerCase()] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-card shadow-card hover:shadow-bloom transition-all duration-300 hover-bloom">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-bloom rounded-organic flex items-center justify-center">
              <Icon 
                name={getLanguageIcon(sdk?.language)} 
                size={24} 
                className="text-white"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{sdk?.name}</h3>
              <p className={`text-sm font-medium ${getLanguageColor(sdk?.language)}`}>
                {sdk?.language}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-button">
              v{sdk?.version}
            </span>
            {sdk?.isOfficial && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-button">
                Official
              </span>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4">{sdk?.description}</p>

        <div className="space-y-4">
          {/* Installation */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Installation</h4>
            <div className="relative">
              <pre className="bg-muted/50 border border-border rounded-organic p-3 text-sm font-mono overflow-x-auto">
                <code className="text-foreground">{sdk?.installation}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                iconSize={14}
                className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                onClick={() => navigator.clipboard?.writeText(sdk?.installation)}
              />
            </div>
          </div>

          {/* Quick Start */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Quick Start</h4>
            <div className="relative">
              <pre className="bg-muted/50 border border-border rounded-organic p-3 text-sm font-mono overflow-x-auto">
                <code className="text-foreground">{sdk?.quickStart}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                iconSize={14}
                className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                onClick={() => navigator.clipboard?.writeText(sdk?.quickStart)}
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sdk?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={14} className="text-success" />
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="bg-gradient-bloom hover:shadow-bloom"
            >
              Download SDK
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="BookOpen"
              iconPosition="left"
              iconSize={16}
            >
              Documentation
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Github"
              iconPosition="left"
              iconSize={16}
            >
              View Source
            </Button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Download" size={14} />
                <span>{sdk?.downloads}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={14} />
                <span>{sdk?.stars}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="GitFork" size={14} />
                <span>{sdk?.forks}</span>
              </div>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Updated {sdk?.lastUpdated}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SdkCard;