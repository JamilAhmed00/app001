import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathway = ({ userProgress, onModuleSelect, onProgressUpdate }) => {
  const [selectedPathway, setSelectedPathway] = useState("beginner");
  const [completedModules, setCompletedModules] = useState(new Set());
  const [currentModule, setCurrentModule] = useState(null);

  const learningPathways = {
    beginner: {
      title: "Botanical Basics",
      description: "Start your journey into plant science",
      color: "success",
      icon: "Seedling",
      modules: [
        {
          id: "intro-botany",
          title: "Introduction to Botany",
          description: "Learn the fundamentals of plant biology and structure",
          duration: "15 min",
          difficulty: "Beginner",
          prerequisites: [],
          rewards: ["Basic Botanist Badge", "50 XP"],
          content: `Welcome to the fascinating world of botany!\n\nBotany is the scientific study of plants, including their structure, growth, reproduction, metabolism, development, diseases, chemical properties, and evolutionary relationships.\n\nIn this module, you'll discover:\n• Plant cell structure and function\n• Basic plant anatomy\n• Photosynthesis process\n• Plant classification systems`,
          interactiveElements: ["3D Plant Cell Model", "Photosynthesis Animation", "Plant Parts Quiz"],
          unlocks: ["plant-anatomy"]
        },
        {
          id: "plant-anatomy",
          title: "Plant Anatomy Exploration",
          description: "Dive deep into plant structures and their functions",
          duration: "20 min",
          difficulty: "Beginner",
          prerequisites: ["intro-botany"],
          rewards: ["Anatomy Expert Badge", "75 XP"],
          content: `Understanding plant anatomy is crucial for botanical exploration.\n\nPlants have specialized structures that perform specific functions:\n• Roots: Absorption and anchoring\n• Stems: Support and transport\n• Leaves: Photosynthesis and gas exchange\n• Flowers: Reproduction\n• Fruits: Seed protection and dispersal`,
          interactiveElements: ["Interactive Plant Dissection", "Root System Explorer", "Leaf Structure Viewer"],
          unlocks: ["flower-biology"]
        },
        {
          id: "flower-biology",
          title: "Flower Biology & Reproduction",
          description: "Explore the intricate world of plant reproduction",
          duration: "25 min",
          difficulty: "Intermediate",
          prerequisites: ["plant-anatomy"],
          rewards: ["Pollination Master Badge", "100 XP"],
          content: `Flowers are the reproductive organs of angiosperms.\n\nKey components include:\n• Sepals: Protective outer layer\n• Petals: Attract pollinators\n• Stamens: Male reproductive parts\n• Pistils: Female reproductive parts\n\nPollination strategies vary widely among species, from wind dispersal to complex animal partnerships.`,
          interactiveElements: ["Flower Dissection Tool", "Pollination Simulator", "Pollen Grain Viewer"],
          unlocks: ["pollinator-relationships"]
        }
      ]
    },
    intermediate: {
      title: "Ecological Interactions",
      description: "Understand plant-environment relationships",
      color: "primary",
      icon: "TreePine",
      modules: [
        {
          id: "pollinator-relationships",
          title: "Pollinator Relationships",
          description: "Discover the co-evolution of plants and pollinators",
          duration: "30 min",
          difficulty: "Intermediate",
          prerequisites: ["flower-biology"],
          rewards: ["Pollinator Partner Badge", "125 XP"],
          content: `Plants and pollinators have evolved together over millions of years.\n\nThis co-evolution has resulted in:\n• Specialized flower shapes for specific pollinators\n• Color patterns visible to different animal vision systems\n• Nectar and pollen rewards for pollination services\n• Timing synchronization between bloom and pollinator activity`,
          interactiveElements: ["Pollinator Vision Simulator", "Co-evolution Timeline", "Pollination Network Map"],
          unlocks: ["plant-communities"]
        },
        {
          id: "plant-communities",
          title: "Plant Communities & Ecosystems",
          description: "Learn how plants interact within ecosystems",
          duration: "35 min",
          difficulty: "Intermediate",
          prerequisites: ["pollinator-relationships"],
          rewards: ["Ecosystem Expert Badge", "150 XP"],
          content: `Plants don't exist in isolation - they form complex communities.\n\nEcosystem interactions include:\n• Competition for resources\n• Symbiotic relationships\n• Succession patterns\n• Nutrient cycling\n• Climate adaptation strategies`,
          interactiveElements: ["Ecosystem Builder", "Succession Simulator", "Competition Model"],
          unlocks: ["climate-adaptation"]
        }
      ]
    },
    advanced: {
      title: "Climate & Conservation",
      description: "Advanced topics in plant science and conservation",
      color: "secondary",
      icon: "Globe",
      modules: [
        {
          id: "climate-adaptation",
          title: "Climate Change Adaptation",
          description: "How plants respond to changing environmental conditions",
          duration: "40 min",
          difficulty: "Advanced",
          prerequisites: ["plant-communities"],
          rewards: ["Climate Scientist Badge", "200 XP"],
          content: `Climate change is dramatically affecting plant communities worldwide.\n\nAdaptation mechanisms include:\n• Phenological shifts in timing\n• Range migrations\n• Physiological adaptations\n• Genetic changes\n• Community restructuring`,
          interactiveElements: ["Climate Impact Simulator", "Range Shift Predictor", "Adaptation Strategies Game"],
          unlocks: ["conservation-biology"]
        },
        {
          id: "conservation-biology",
          title: "Plant Conservation Biology",
          description: "Strategies for protecting plant biodiversity",
          duration: "45 min",
          difficulty: "Advanced",
          prerequisites: ["climate-adaptation"],
          rewards: ["Conservation Hero Badge", "250 XP"],
          content: `Plant conservation is critical for maintaining biodiversity.\n\nConservation approaches include:\n• In-situ conservation (protected areas)\n• Ex-situ conservation (seed banks, botanical gardens)\n• Restoration ecology\n• Community-based conservation\n• Policy and legislation`,
          interactiveElements: ["Conservation Planning Tool", "Seed Bank Manager", "Restoration Simulator"],
          unlocks: []
        }
      ]
    }
  };

  useEffect(() => {
    // Load user progress
    if (userProgress?.completedModules) {
      setCompletedModules(new Set(userProgress.completedModules));
    }
  }, [userProgress]);

  const isModuleUnlocked = (module) => {
    if (module.prerequisites?.length === 0) return true;
    return module.prerequisites?.every(prereq => completedModules?.has(prereq));
  };

  const isModuleCompleted = (moduleId) => {
    return completedModules?.has(moduleId);
  };

  const getModuleStatus = (module) => {
    if (isModuleCompleted(module.id)) return "completed";
    if (isModuleUnlocked(module)) return "available";
    return "locked";
  };

  const handleModuleStart = (module) => {
    setCurrentModule(module);
    onModuleSelect(module);
  };

  const handleModuleComplete = (moduleId) => {
    const newCompleted = new Set([...completedModules, moduleId]);
    setCompletedModules(newCompleted);
    onProgressUpdate({ completedModules: Array.from(newCompleted) });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed": return "CheckCircle";
      case "available": return "Play";
      case "locked": return "Lock";
      default: return "Circle";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-success";
      case "available": return "text-primary";
      case "locked": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const calculatePathwayProgress = (pathway) => {
    const totalModules = pathway?.modules?.length;
    const completedCount = pathway?.modules?.filter(m => isModuleCompleted(m?.id))?.length;
    return Math.round((completedCount / totalModules) * 100);
  };

  return (
    <div className="bg-card rounded-card border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Learning Pathways</h2>
            <p className="text-sm text-muted-foreground">
              Progressive modules to master bloom science concepts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} className="text-warning" />
            <span className="text-sm font-medium text-foreground">
              {Array.from(completedModules)?.length} modules completed
            </span>
          </div>
        </div>

        {/* Pathway Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(learningPathways)?.map(([key, pathway]) => {
            const progress = calculatePathwayProgress(pathway);
            return (
              <button
                key={key}
                onClick={() => setSelectedPathway(key)}
                className={`p-4 rounded-organic border transition-all duration-300 text-left hover-bloom ${
                  selectedPathway === key
                    ? `bg-${pathway?.color}/10 border-${pathway?.color} text-${pathway?.color}`
                    : 'bg-background border-border text-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedPathway === key 
                      ? `bg-${pathway?.color} text-white` 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={pathway?.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{pathway?.title}</h3>
                    <p className="text-xs text-muted-foreground">{pathway?.description}</p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-${pathway?.color} transition-all duration-300`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Module List */}
      <div className="p-6">
        <div className="space-y-4">
          {learningPathways?.[selectedPathway]?.modules?.map((module, index) => {
            const status = getModuleStatus(module);
            const isLocked = status === "locked";
            
            return (
              <div
                key={module.id}
                className={`p-4 rounded-organic border transition-all duration-300 ${
                  isLocked 
                    ? 'border-muted bg-muted/20' :'border-border bg-background hover:border-primary/50 hover-bloom'
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Status Icon */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${
                    status === "completed" 
                      ? 'bg-success/10 text-success' 
                      : status === "available"
                        ? 'bg-primary/10 text-primary' :'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={getStatusIcon(status)} size={20} />
                  </div>

                  {/* Module Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className={`font-semibold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {module.title}
                        </h3>
                        <p className={`text-sm ${isLocked ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                          {module.description}
                        </p>
                      </div>
                      
                      {!isLocked && (
                        <Button
                          variant={status === "completed" ? "outline" : "default"}
                          size="sm"
                          iconName={status === "completed" ? "RotateCcw" : "Play"}
                          iconPosition="left"
                          onClick={() => handleModuleStart(module)}
                        >
                          {status === "completed" ? "Review" : "Start"}
                        </Button>
                      )}
                    </div>

                    {/* Module Details */}
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="BarChart" size={12} />
                        <span>{module.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Gift" size={12} />
                        <span>{module.rewards?.join(", ")}</span>
                      </div>
                    </div>

                    {/* Prerequisites */}
                    {module.prerequisites?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Prerequisites:</p>
                        <div className="flex flex-wrap gap-1">
                          {module.prerequisites?.map(prereq => (
                            <span
                              key={prereq}
                              className={`px-2 py-1 text-xs rounded-full ${
                                isModuleCompleted(prereq)
                                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                              }`}
                            >
                              {learningPathways?.[selectedPathway]?.modules?.find(m => m?.id === prereq)?.title || prereq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interactive Elements */}
                    {!isLocked && module.interactiveElements && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Interactive Elements:</p>
                        <div className="flex flex-wrap gap-1">
                          {module.interactiveElements?.map((element, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                            >
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Locked Message */}
                    {isLocked && (
                      <div className="mt-2 p-2 bg-muted/30 rounded-organic">
                        <p className="text-xs text-muted-foreground">
                          Complete prerequisite modules to unlock this content
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pathway Completion */}
        {calculatePathwayProgress(learningPathways?.[selectedPathway]) === 100 && (
          <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-organic">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                <Icon name="Trophy" size={24} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-success">Pathway Completed!</h3>
                <p className="text-sm text-success/80">
                  Congratulations! You've mastered {learningPathways?.[selectedPathway]?.title}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningPathway;