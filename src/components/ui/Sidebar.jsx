import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading achievements
    setAchievements([
      { id: 1, name: 'First Prediction', icon: 'Target', unlocked: true },
      { id: 2, name: 'Data Explorer', icon: 'Compass', unlocked: true },
      { id: 3, name: 'Accuracy Master', icon: 'Award', unlocked: false },
    ]);
  }, []);

  const navigationItems = [
    {
      name: 'Globe Dashboard',
      path: '/interactive-globe-dashboard',
      icon: 'Globe',
      description: 'Interactive 3D visualization',
      category: 'primary'
    },
    {
      name: 'Prediction Arena',
      path: '/gamified-prediction-arena',
      icon: 'Target',
      description: 'Gamified challenges',
      category: 'primary'
    },
    {
      name: '3D Explorer',
      path: '/3d-immersive-explorer',
      icon: 'Compass',
      description: 'Immersive exploration',
      category: 'primary'
    },
    {
      name: 'Agricultural Focus',
      path: '/bangladesh-agricultural-focus',
      icon: 'Sprout',
      description: 'Bangladesh insights',
      category: 'primary'
    },
    {
      name: 'Methodology Hub',
      path: '/scientific-methodology-hub',
      icon: 'BookOpen',
      description: 'Research methods',
      category: 'secondary'
    },
    {
      name: 'API Documentation',
      path: '/api-documentation',
      icon: 'Code',
      description: 'Developer docs',
      category: 'secondary'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;
  const isExpanded = !isCollapsed || isHovered;

  const handleMouseEnter = () => {
    if (isCollapsed) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isCollapsed) {
      setIsHovered(false);
    }
  };

  const primaryItems = navigationItems?.filter(item => item?.category === 'primary');
  const secondaryItems = navigationItems?.filter(item => item?.category === 'secondary');

  return (
    <aside 
      className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
        isExpanded ? 'w-72' : 'w-16'
      } hover:shadow-organic`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {isExpanded && (
              <div className="animate-growth">
                <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
                <p className="text-xs text-muted-foreground">Explore BloomX Platform</p>
              </div>
            )}
            
            {onToggle && (
              <Button
                variant="ghost"
                size="sm"
                iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                iconSize={18}
                onClick={onToggle}
                className="hover:bg-muted"
              />
            )}
          </div>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* Primary Navigation */}
            <div>
              {isExpanded && (
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 animate-growth">
                  Core Features
                </h3>
              )}
              <nav className="space-y-1">
                {primaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`group flex items-center rounded-organic transition-all duration-300 ${
                      isExpanded ? 'p-3' : 'p-2 justify-center'
                    } ${
                      isActivePath(item?.path)
                        ? 'bg-primary/10 text-primary shadow-bloom'
                        : 'text-foreground hover:bg-muted hover:text-primary hover-bloom'
                    }`}
                    title={!isExpanded ? item?.name : undefined}
                  >
                    <div className="relative">
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`transition-all duration-300 ${
                          isActivePath(item?.path) 
                            ? 'text-primary' :'text-muted-foreground group-hover:text-primary'
                        } ${isActivePath(item?.path) ? 'animate-pulse-organic' : ''}`}
                      />
                      {isActivePath(item?.path) && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    {isExpanded && (
                      <div className="ml-3 flex-1 animate-growth">
                        <div className="font-medium text-sm">{item?.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item?.description}</div>
                      </div>
                    )}
                    
                    {isActivePath(item?.path) && isExpanded && (
                      <div className="w-1 h-6 bg-primary rounded-full animate-pulse-organic"></div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Secondary Navigation */}
            <div>
              {isExpanded && (
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 animate-growth">
                  Resources
                </h3>
              )}
              <nav className="space-y-1">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`group flex items-center rounded-organic transition-all duration-300 ${
                      isExpanded ? 'p-3' : 'p-2 justify-center'
                    } ${
                      isActivePath(item?.path)
                        ? 'bg-secondary/10 text-secondary' :'text-foreground hover:bg-muted hover:text-secondary hover-bloom'
                    }`}
                    title={!isExpanded ? item?.name : undefined}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={`transition-colors duration-300 ${
                        isActivePath(item?.path) 
                          ? 'text-secondary' :'text-muted-foreground group-hover:text-secondary'
                      }`}
                    />
                    
                    {isExpanded && (
                      <div className="ml-3 flex-1 animate-growth">
                        <div className="font-medium text-sm">{item?.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item?.description}</div>
                      </div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Achievement Section */}
            {isExpanded && (
              <div className="animate-growth">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Recent Achievements
                </h3>
                <div className="space-y-2">
                  {achievements?.map((achievement) => (
                    <div
                      key={achievement?.id}
                      className={`flex items-center p-2 rounded-organic transition-all duration-300 ${
                        achievement?.unlocked
                          ? 'bg-success/10 text-success hover:bg-success/20' :'bg-muted/50 text-muted-foreground'
                      }`}
                    >
                      <div className={`relative ${achievement?.unlocked ? 'achievement-glow' : ''}`}>
                        <Icon 
                          name={achievement?.icon} 
                          size={16} 
                          className={achievement?.unlocked ? 'text-success' : 'text-muted-foreground'}
                        />
                        {achievement?.unlocked && (
                          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <span className="ml-2 text-xs font-medium">{achievement?.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-border">
          {isExpanded ? (
            <div className="animate-growth">
              <div className="bg-gradient-bloom rounded-organic p-3 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="TrendingUp" size={16} />
                  <span className="text-sm font-medium">Prediction Streak</span>
                </div>
                <div className="text-2xl font-bold">7 days</div>
                <div className="text-xs opacity-90">Keep it growing!</div>
              </div>
              
              <Button
                variant="ghost"
                fullWidth
                iconName="Settings"
                iconPosition="left"
                iconSize={16}
                className="mt-3 text-muted-foreground hover:text-foreground"
              >
                Settings
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gradient-bloom rounded-organic flex items-center justify-center">
                <span className="text-white text-xs font-bold">7</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
                title="Settings"
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;