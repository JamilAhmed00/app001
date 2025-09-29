import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      name: 'Globe Dashboard',
      path: '/interactive-globe-dashboard',
      icon: 'Globe',
      description: 'Interactive 3D data visualization'
    },
    {
      name: 'Prediction Arena',
      path: '/gamified-prediction-arena',
      icon: 'Target',
      description: 'Gamified prediction challenges'
    },
    {
      name: '3D Explorer',
      path: '/3d-immersive-explorer',
      icon: 'Compass',
      description: 'Immersive botanical exploration'
    },
    {
      name: 'Agricultural Focus',
      path: '/bangladesh-agricultural-focus',
      icon: 'Sprout',
      description: 'Bangladesh-specific insights'
    }
  ];

  const secondaryItems = [
    {
      name: 'Methodology',
      path: '/scientific-methodology-hub',
      icon: 'BookOpen',
      description: 'Scientific research methods'
    },
    {
      name: 'API Docs',
      path: '/api-documentation',
      icon: 'Code',
      description: 'Developer documentation'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-organic border-b border-border shadow-card' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Logo Section */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover-bloom group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-bloom rounded-organic flex items-center justify-center shadow-bloom group-hover:animate-pulse-organic">
                <Icon 
                  name="Leaf" 
                  size={24} 
                  color="white" 
                  className="transform group-hover:rotate-12 transition-transform duration-300"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse opacity-75"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                BloomX
              </h1>
              <p className="text-xs text-muted-foreground -mt-1">
                Scientific Discovery Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group relative px-4 py-2 rounded-button transition-all duration-300 ${
                  isActivePath(item?.path)
                    ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted hover:text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={item?.icon} 
                    size={18} 
                    className={`transition-colors duration-300 ${
                      isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`}
                  />
                  <span className="font-medium text-sm">{item?.name}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-organic"></div>
                )}
              </Link>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-button text-foreground hover:bg-muted hover:text-primary transition-all duration-300">
                <Icon name="MoreHorizontal" size={18} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <span className="font-medium text-sm">More</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-card shadow-modal opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-start space-x-3 p-3 rounded-organic transition-all duration-300 ${
                        isActivePath(item?.path)
                          ? 'bg-primary/10 text-primary' :'hover:bg-muted hover:text-primary'
                      }`}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={20} 
                        className={`mt-0.5 ${
                          isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'
                        }`}
                      />
                      <div>
                        <div className="font-medium text-sm">{item?.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item?.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconSize={18}
              className="hidden sm:flex"
            >
              Alerts
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="User"
              iconSize={18}
              className="hidden md:flex"
            >
              Account
            </Button>

            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              iconSize={16}
              className="bg-gradient-bloom hover:shadow-bloom hidden sm:flex"
            >
              Start Predicting
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="lg:hidden p-2 rounded-button text-foreground hover:bg-muted transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="transition-transform duration-300"
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible' :'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="bg-card border-t border-border">
            <div className="p-4 space-y-2">
              {/* Primary Navigation */}
              <div className="space-y-1">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 p-3 rounded-organic transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/10 text-primary' :'hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <div>
                      <div className="font-medium text-sm">{item?.name}</div>
                      <div className="text-xs text-muted-foreground">{item?.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-border my-4"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 p-3 rounded-organic transition-all duration-300 ${
                      isActivePath(item?.path)
                        ? 'bg-primary/10 text-primary' :'hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={isActivePath(item?.path) ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <div>
                      <div className="font-medium text-sm">{item?.name}</div>
                      <div className="text-xs text-muted-foreground">{item?.description}</div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Mobile Action Buttons */}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Bell"
                  iconPosition="left"
                  iconSize={18}
                  className="sm:hidden"
                >
                  Prediction Alerts
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  iconName="User"
                  iconPosition="left"
                  iconSize={18}
                  className="md:hidden"
                >
                  My Account
                </Button>

                <Button
                  variant="default"
                  fullWidth
                  iconName="Play"
                  iconPosition="left"
                  iconSize={18}
                  className="bg-gradient-bloom hover:shadow-bloom sm:hidden"
                >
                  Start Predicting Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;