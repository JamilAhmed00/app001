import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BotanicalModelLibrary = ({ onModelSelect, selectedModel }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");

  const botanicalModels = [
    {
      id: 1,
      name: "Rosa damascena",
      commonName: "Damask Rose",
      category: "Flowers",
      bloomStage: "Full Bloom",
      complexity: "High",
      polygonCount: "125K",
      downloadSize: "8.2 MB",
      accuracy: "Scientific",
      features: ["Detailed Petals", "Realistic Textures", "Animation Ready"],
      description: `Highly detailed 3D model of Rosa damascena in full bloom stage.\nFeatures scientifically accurate petal structure and realistic surface textures.\nIncludes multiple LOD levels for optimal performance.`,
      thumbnail: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-15",
      downloads: 1247,
      rating: 4.8
    },
    {
      id: 2,
      name: "Helianthus annuus",
      commonName: "Sunflower",
      category: "Flowers",
      bloomStage: "Peak Bloom",
      complexity: "Medium",
      polygonCount: "89K",
      downloadSize: "6.1 MB",
      accuracy: "Scientific",
      features: ["Seed Pattern Detail", "Ray Petal Animation", "Growth Stages"],
      description: `Accurate 3D representation of Helianthus annuus at peak bloom.\nIncludes detailed seed head pattern and individual ray petals.\nSupports growth animation from bud to full bloom.`,
      thumbnail: "https://images.unsplash.com/photo-1597848212624-e6d2b8b3d9b5?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-12",
      downloads: 892,
      rating: 4.9
    },
    {
      id: 3,
      name: "Lavandula angustifolia",
      commonName: "English Lavender",
      category: "Herbs",
      bloomStage: "Early Bloom",
      complexity: "Medium",
      polygonCount: "67K",
      downloadSize: "4.8 MB",
      accuracy: "Scientific",
      features: ["Spike Detail", "Essential Oil Glands", "Wind Animation"],
      description: `Detailed model of English Lavender with accurate spike structure.\nIncludes microscopic detail of essential oil glands.\nFeatures realistic wind movement animation.`,
      thumbnail: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-10",
      downloads: 634,
      rating: 4.7
    },
    {
      id: 4,
      name: "Quercus robur",
      commonName: "English Oak",
      category: "Trees",
      bloomStage: "Leaf Development",
      complexity: "Very High",
      polygonCount: "340K",
      downloadSize: "22.4 MB",
      accuracy: "Scientific",
      features: ["Bark Texture", "Seasonal Changes", "Branch Physics"],
      description: `Comprehensive 3D model of mature English Oak tree.\nIncludes detailed bark texture and seasonal leaf variations.\nSupports realistic branch physics and wind interaction.`,
      thumbnail: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-08",
      downloads: 445,
      rating: 4.6
    },
    {
      id: 5,
      name: "Tulipa gesneriana",
      commonName: "Garden Tulip",
      category: "Flowers",
      bloomStage: "Bud to Bloom",
      complexity: "Low",
      polygonCount: "34K",
      downloadSize: "2.9 MB",
      accuracy: "Educational",
      features: ["Simple Structure", "Color Variants", "Fast Loading"],
      description: `Simplified tulip model perfect for educational purposes.\nIncludes multiple color variants and bloom stages.\nOptimized for fast loading and mobile devices.`,
      thumbnail: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-05",
      downloads: 1156,
      rating: 4.5
    },
    {
      id: 6,
      name: "Acer palmatum",
      commonName: "Japanese Maple",
      category: "Trees",
      bloomStage: "Autumn Colors",
      complexity: "High",
      polygonCount: "198K",
      downloadSize: "14.7 MB",
      accuracy: "Scientific",
      features: ["Leaf Detail", "Color Gradients", "Branch Structure"],
      description: `Beautiful Japanese Maple in autumn coloration.\nFeatures detailed leaf structure with realistic color gradients.\nIncludes accurate branch architecture and growth patterns.`,
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
      lastUpdated: "2025-01-03",
      downloads: 723,
      rating: 4.8
    }
  ];

  const categories = [
    { value: "all", label: "All Categories", count: botanicalModels?.length },
    { value: "Flowers", label: "Flowers", count: botanicalModels?.filter(m => m?.category === "Flowers")?.length },
    { value: "Trees", label: "Trees", count: botanicalModels?.filter(m => m?.category === "Trees")?.length },
    { value: "Herbs", label: "Herbs", count: botanicalModels?.filter(m => m?.category === "Herbs")?.length }
  ];

  const filteredModels = botanicalModels?.filter(model => {
      const matchesSearch = model?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           model?.commonName?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesCategory = selectedCategory === "all" || model?.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })?.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a?.commonName?.localeCompare(b?.commonName);
        case "downloads":
          return b?.downloads - a?.downloads;
        case "rating":
          return b?.rating - a?.rating;
        case "updated":
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return 0;
      }
    });

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Low": return "text-success";
      case "Medium": return "text-warning";
      case "High": return "text-error";
      case "Very High": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="bg-card rounded-card border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Botanical Model Library</h2>
            <p className="text-sm text-muted-foreground">
              Scientifically accurate 3D plant models for immersive exploration
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setViewMode("grid")}
            />
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              iconName="List"
              onClick={() => setViewMode("list")}
            />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search plants by name or scientific name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-button bg-background text-foreground text-sm"
            >
              {categories?.map(category => (
                <option key={category?.value} value={category?.value}>
                  {category?.label} ({category?.count})
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-button bg-background text-foreground text-sm"
            >
              <option value="name">Sort by Name</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="rating">Sort by Rating</option>
              <option value="updated">Sort by Updated</option>
            </select>
          </div>
        </div>
      </div>
      {/* Models Grid/List */}
      <div className="p-6">
        {filteredModels?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No models found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or category filter
            </p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
            {filteredModels?.map((model) => (
              <div
                key={model?.id}
                className={`group border border-border rounded-organic overflow-hidden transition-all duration-300 hover-bloom cursor-pointer ${
                  selectedModel?.id === model?.id ? 'ring-2 ring-primary bg-primary/5' : 'bg-background hover:shadow-organic'
                } ${viewMode === "list" ? "flex" : ""}`}
                onClick={() => onModelSelect(model)}
              >
                {/* Thumbnail */}
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-32 h-24 flex-shrink-0" : "h-48"}`}>
                  <img
                    src={model?.thumbnail}
                    alt={model?.commonName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Complexity Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-background/90 ${getComplexityColor(model?.complexity)}`}>
                      {model?.complexity}
                    </span>
                  </div>

                  {/* Selected Indicator */}
                  {selectedModel?.id === model?.id && (
                    <div className="absolute top-2 left-2">
                      <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="Check" size={14} color="white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {model?.commonName}
                      </h3>
                      <p className="text-sm text-muted-foreground italic">{model?.name}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm font-medium text-foreground">{model?.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Category:</span>
                      <span className="text-foreground">{model?.category}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bloom Stage:</span>
                      <span className="text-foreground">{model?.bloomStage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Polygons:</span>
                      <span className="text-foreground">{model?.polygonCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Size:</span>
                      <span className="text-foreground">{model?.downloadSize}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1">
                      {model?.features?.slice(0, 2)?.map((feature, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                      {model?.features?.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                          +{model?.features?.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {model?.description?.split('\n')?.[0]}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{model?.downloads?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{new Date(model.lastUpdated)?.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BotanicalModelLibrary;