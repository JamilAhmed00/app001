import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PublicationsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const publications = [
    {
      id: 1,
      title: "Deep Learning Approaches for Global Bloom Prediction Using Satellite Imagery",
      authors: ["Dr. Sarah Chen", "Prof. Michael Rodriguez", "Dr. Aisha Patel"],
      journal: "Nature Machine Intelligence",
      year: 2025,
      month: "September",
      category: "ai-models",
      type: "Research Article",
      doi: "10.1038/s42256-025-00789-1",
      citations: 47,
      impact: "High",
      abstract: `This study presents BloomNet, a novel deep learning architecture for predicting plant bloom timing using multi-spectral satellite imagery. Our approach combines convolutional neural networks with temporal attention mechanisms to achieve 98.7% accuracy in global bloom prediction. The model was trained on 2.3 million satellite image samples spanning five years of global observations.`,
      keywords: ["Deep Learning", "Satellite Imagery", "Bloom Prediction", "Computer Vision"],
      downloadUrl: "#",
      openAccess: true
    },
    {
      id: 2,
      title: "Citizen Science Integration in Agricultural Bloom Monitoring: The GLOBE Observer Case Study",
      authors: ["Dr. James Wilson", "Prof. Lisa Zhang", "Dr. Robert Kumar"],
      journal: "Environmental Research Letters",
      year: 2025,
      month: "August",
      category: "citizen-science",
      type: "Research Article",
      doi: "10.1088/1748-9326/ab2f45",
      citations: 32,
      impact: "Medium",
      abstract: `We demonstrate how citizen science observations from the GLOBE Observer program can be effectively integrated with satellite data for improved bloom prediction accuracy. Our analysis of 50,000+ citizen contributions shows significant correlation with satellite-derived vegetation indices, providing valuable ground-truth validation for large-scale monitoring systems.`,
      keywords: ["Citizen Science", "GLOBE Observer", "Ground Truth", "Validation"],
      downloadUrl: "#",
      openAccess: true
    },
    {
      id: 3,
      title: "Climate Change Impacts on Rice Bloom Phenology in Bangladesh: A Machine Learning Analysis",
      authors: ["Dr. Fatima Rahman", "Prof. David Thompson", "Dr. Karim Hassan"],
      journal: "Agricultural and Forest Meteorology",
      year: 2025,
      month: "July",
      category: "climate-impact",
      type: "Research Article",
      doi: "10.1016/j.agrformet.2025.109234",
      citations: 28,
      impact: "High",
      abstract: `Using 15 years of agricultural data from Bangladesh, we analyze climate change impacts on rice bloom phenology using ensemble machine learning methods. Our findings indicate a 3-5 day advancement in bloom timing per decade, with significant implications for agricultural planning and food security in the region.`,
      keywords: ["Climate Change", "Rice Phenology", "Bangladesh", "Machine Learning"],
      downloadUrl: "#",
      openAccess: false
    },
    {
      id: 4,
      title: "Real-time Bloom Prediction API: Architecture and Performance Evaluation",
      authors: ["Dr. Alex Johnson", "Prof. Maria Garcia", "Dr. Tom Anderson"],
      journal: "IEEE Transactions on Geoscience and Remote Sensing",
      year: 2025,
      month: "June",
      category: "technology",
      type: "Technical Paper",
      doi: "10.1109/TGRS.2025.3456789",
      citations: 19,
      impact: "Medium",
      abstract: `We present the architecture and performance evaluation of a real-time bloom prediction API serving global agricultural and research communities. The system processes 50+ million data points daily with sub-15ms response times, demonstrating scalable deployment of machine learning models for environmental monitoring applications.`,
      keywords: ["API Architecture", "Real-time Processing", "Scalability", "Performance"],
      downloadUrl: "#",
      openAccess: true
    },
    {
      id: 5,
      title: "Pollinator Behavior Prediction Using Computer Vision and Environmental Data",
      authors: ["Dr. Emma Taylor", "Prof. Carlos Mendez", "Dr. Nina Petrov"],
      journal: "Ecological Informatics",
      year: 2025,
      month: "May",
      category: "biodiversity",
      type: "Research Article",
      doi: "10.1016/j.ecoinf.2025.101567",
      citations: 15,
      impact: "Medium",
      abstract: `This research introduces PollinatorVision, a computer vision system for predicting pollinator behavior based on bloom timing and environmental conditions. Our model achieves 89.3% accuracy in predicting pollinator activity patterns, contributing to ecosystem health monitoring and biodiversity conservation efforts.`,
      keywords: ["Computer Vision", "Pollinator Behavior", "Biodiversity", "Ecosystem Health"],
      downloadUrl: "#",
      openAccess: true
    },
    {
      id: 6,
      title: "Ensemble Methods for Agricultural Yield Prediction: A Bangladesh Case Study",
      authors: ["Dr. Hassan Ali", "Prof. Jennifer Lee", "Dr. Priya Sharma"],
      journal: "Computers and Electronics in Agriculture",
      year: 2024,
      month: "December",
      category: "agriculture",
      type: "Research Article",
      doi: "10.1016/j.compag.2024.107892",
      citations: 41,
      impact: "High",
      abstract: `We evaluate ensemble machine learning methods for agricultural yield prediction in Bangladesh, combining bloom timing data with weather and soil information. Our AgriCast ensemble model achieves 96.4% accuracy in crop yield prediction, demonstrating significant potential for agricultural planning and food security applications.`,
      keywords: ["Ensemble Methods", "Yield Prediction", "Agriculture", "Food Security"],
      downloadUrl: "#",
      openAccess: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Publications', count: publications?.length },
    { id: 'ai-models', name: 'AI & Machine Learning', count: publications?.filter(p => p?.category === 'ai-models')?.length },
    { id: 'citizen-science', name: 'Citizen Science', count: publications?.filter(p => p?.category === 'citizen-science')?.length },
    { id: 'climate-impact', name: 'Climate Impact', count: publications?.filter(p => p?.category === 'climate-impact')?.length },
    { id: 'agriculture', name: 'Agriculture', count: publications?.filter(p => p?.category === 'agriculture')?.length },
    { id: 'technology', name: 'Technology', count: publications?.filter(p => p?.category === 'technology')?.length },
    { id: 'biodiversity', name: 'Biodiversity', count: publications?.filter(p => p?.category === 'biodiversity')?.length }
  ];

  const filteredPublications = selectedCategory === 'all' 
    ? publications 
    : publications?.filter(p => p?.category === selectedCategory);

  const sortedPublications = [...filteredPublications]?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(`${b.month} ${b.year}`) - new Date(`${a.month} ${a.year}`);
      case 'citations':
        return b?.citations - a?.citations;
      case 'title':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'Low': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Scientific Publications & Research
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore our peer-reviewed research contributions to the scientific community, 
            featuring cutting-edge methodologies and breakthrough discoveries in bloom prediction science.
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Category Filters */}
          <div className="flex-1">
            <h3 className="font-semibold text-foreground mb-4">Research Categories</h3>
            <div className="flex flex-wrap gap-2">
              {categories?.map((category) => (
                <button
                  key={category?.id}
                  onClick={() => setSelectedCategory(category?.id)}
                  className={`px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category?.id
                      ? 'bg-primary text-white shadow-bloom'
                      : 'bg-card text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
                  }`}
                >
                  {category?.name}
                  <span className="ml-2 text-xs opacity-75">({category?.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sort Controls */}
          <div className="lg:w-64">
            <h3 className="font-semibold text-foreground mb-4">Sort By</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="w-full px-4 py-2 bg-card border border-border rounded-organic text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="date">Publication Date</option>
              <option value="citations">Citation Count</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Publications Grid */}
        <div className="space-y-6">
          {sortedPublications?.map((publication) => (
            <div key={publication?.id} className="data-card hover-bloom">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Publication Info */}
                <div className="lg:col-span-3">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2 leading-tight">
                        {publication?.title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center">
                          <Icon name="Users" size={14} className="mr-1" />
                          {publication?.authors?.join(', ')}
                        </span>
                        <span className="flex items-center">
                          <Icon name="BookOpen" size={14} className="mr-1" />
                          {publication?.journal}
                        </span>
                        <span className="flex items-center">
                          <Icon name="Calendar" size={14} className="mr-1" />
                          {publication?.month} {publication?.year}
                        </span>
                      </div>

                      <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                        {publication?.abstract}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {publication?.keywords?.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-button text-xs font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Publication Metrics */}
                <div className="lg:col-span-1">
                  <div className="space-y-4">
                    <div className="bg-muted/50 rounded-organic p-4 text-center">
                      <div className="text-2xl font-bold text-foreground mb-1">
                        {publication?.citations}
                      </div>
                      <div className="text-xs text-muted-foreground">Citations</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Impact</span>
                      <span className={`px-2 py-1 rounded-button text-xs font-medium ${getImpactColor(publication?.impact)}`}>
                        {publication?.impact}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Access</span>
                      <div className="flex items-center space-x-1">
                        {publication?.openAccess && (
                          <Icon name="Unlock" size={14} className="text-success" />
                        )}
                        <span className={`text-xs font-medium ${
                          publication?.openAccess ? 'text-success' : 'text-warning'
                        }`}>
                          {publication?.openAccess ? 'Open Access' : 'Subscription'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Download"
                        iconPosition="left"
                        fullWidth
                      >
                        Download PDF
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="ExternalLink"
                        iconPosition="right"
                        fullWidth
                      >
                        View DOI
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Quote"
                        iconPosition="left"
                        fullWidth
                      >
                        Cite Paper
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            iconName="Plus"
            iconPosition="left"
          >
            Load More Publications
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PublicationsSection;