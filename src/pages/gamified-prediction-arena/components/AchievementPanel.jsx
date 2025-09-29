import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementPanel = ({ userAchievements, onClaimReward }) => {
  const [selectedCategory, setSelectedCategory] = useState('recent');
  const [showCelebration, setShowCelebration] = useState(false);

  const achievementCategories = [
    { key: 'recent', label: 'Recent', icon: 'Clock' },
    { key: 'prediction', label: 'Prediction', icon: 'Target' },
    { key: 'streak', label: 'Streak', icon: 'Flame' },
    { key: 'social', label: 'Social', icon: 'Users' },
    { key: 'milestone', label: 'Milestone', icon: 'Trophy' }
  ];

  const achievements = {
    recent: [
      {
        id: 'first_prediction',
        title: 'First Prediction',
        description: 'Made your very first bloom prediction',
        icon: 'Target',
        rarity: 'common',
        points: 50,
        unlocked: true,
        unlockedAt: '2025-09-26T10:30:00Z',
        progress: { current: 1, total: 1 }
      },
      {
        id: 'accuracy_novice',
        title: 'Accuracy Novice',
        description: 'Achieved 70% accuracy in your first 5 predictions',
        icon: 'Award',
        rarity: 'uncommon',
        points: 100,
        unlocked: true,
        unlockedAt: '2025-09-27T15:45:00Z',
        progress: { current: 5, total: 5 }
      },
      {
        id: 'daily_predictor',
        title: 'Daily Predictor',
        description: 'Make predictions for 3 consecutive days',
        icon: 'Calendar',
        rarity: 'common',
        points: 75,
        unlocked: false,
        progress: { current: 2, total: 3 }
      }
    ],
    prediction: [
      {
        id: 'prediction_master',
        title: 'Prediction Master',
        description: 'Make 100 successful predictions',
        icon: 'Crown',
        rarity: 'legendary',
        points: 1000,
        unlocked: false,
        progress: { current: 23, total: 100 }
      },
      {
        id: 'high_confidence',
        title: 'High Confidence',
        description: 'Make 10 predictions with 90%+ confidence',
        icon: 'TrendingUp',
        rarity: 'rare',
        points: 250,
        unlocked: false,
        progress: { current: 3, total: 10 }
      }
    ],
    streak: [
      {
        id: 'week_warrior',
        title: 'Week Warrior',
        description: 'Maintain a 7-day prediction streak',
        icon: 'Flame',
        rarity: 'uncommon',
        points: 200,
        unlocked: false,
        progress: { current: 4, total: 7 }
      }
    ],
    social: [
      {
        id: 'team_player',
        title: 'Team Player',
        description: 'Join your first prediction team',
        icon: 'Users',
        rarity: 'common',
        points: 50,
        unlocked: false,
        progress: { current: 0, total: 1 }
      }
    ],
    milestone: [
      {
        id: 'level_10',
        title: 'Rising Star',
        description: 'Reach level 10',
        icon: 'Star',
        rarity: 'rare',
        points: 500,
        unlocked: false,
        progress: { current: 8, total: 10 }
      }
    ]
  };

  const rarityStyles = {
    common: {
      bg: 'bg-gray-100',
      border: 'border-gray-300',
      text: 'text-gray-700',
      glow: 'shadow-gray-200'
    },
    uncommon: {
      bg: 'bg-green-100',
      border: 'border-green-300',
      text: 'text-green-700',
      glow: 'shadow-green-200'
    },
    rare: {
      bg: 'bg-blue-100',
      border: 'border-blue-300',
      text: 'text-blue-700',
      glow: 'shadow-blue-200'
    },
    epic: {
      bg: 'bg-purple-100',
      border: 'border-purple-300',
      text: 'text-purple-700',
      glow: 'shadow-purple-200'
    },
    legendary: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-300',
      text: 'text-yellow-700',
      glow: 'shadow-yellow-200'
    }
  };

  const handleClaimReward = (achievementId) => {
    setShowCelebration(true);
    onClaimReward?.(achievementId);
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const getProgressPercentage = (current, total) => {
    return Math.min((current / total) * 100, 100);
  };

  const currentAchievements = achievements?.[selectedCategory] || [];

  return (
    <div className="data-card">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="achievement-glow bg-gradient-bloom text-white p-6 rounded-card text-center animate-growth">
            <Icon name="Trophy" size={48} className="mx-auto mb-2" />
            <div className="text-lg font-bold">Achievement Unlocked!</div>
            <div className="text-sm opacity-90">Great job, keep it up!</div>
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
          <p className="text-sm text-muted-foreground">Track your progress and earn rewards</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Trophy" size={20} className="text-accent" />
          <span className="text-sm font-medium text-foreground">
            {currentAchievements?.filter(a => a?.unlocked)?.length} / {currentAchievements?.length}
          </span>
        </div>
      </div>
      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-organic p-1 overflow-x-auto">
        {achievementCategories?.map((category) => (
          <button
            key={category?.key}
            onClick={() => setSelectedCategory(category?.key)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-button text-sm font-medium transition-all duration-300 whitespace-nowrap ${
              selectedCategory === category?.key
                ? 'bg-card text-primary shadow-card'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Achievement List */}
      <div className="space-y-4">
        {currentAchievements?.map((achievement) => {
          const rarity = rarityStyles?.[achievement?.rarity];
          const progressPercentage = getProgressPercentage(achievement?.progress?.current, achievement?.progress?.total);
          
          return (
            <div
              key={achievement?.id}
              className={`relative p-4 rounded-organic border-2 transition-all duration-300 ${
                achievement?.unlocked
                  ? `${rarity?.bg} ${rarity?.border} ${rarity?.glow} hover:shadow-bloom`
                  : 'bg-muted/50 border-border hover:bg-muted'
              }`}
            >
              {/* Achievement Content */}
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-organic flex items-center justify-center ${
                  achievement?.unlocked
                    ? 'bg-white/50 text-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={achievement?.icon} 
                    size={24} 
                    className={achievement?.unlocked ? 'animate-pulse-organic' : ''}
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className={`font-semibold ${
                      achievement?.unlocked ? rarity?.text : 'text-muted-foreground'
                    }`}>
                      {achievement?.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      achievement?.unlocked ? rarity?.bg : 'bg-muted text-muted-foreground'
                    }`}>
                      {achievement?.rarity}
                    </span>
                  </div>
                  
                  <p className={`text-sm mb-3 ${
                    achievement?.unlocked ? rarity?.text : 'text-muted-foreground'
                  }`}>
                    {achievement?.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className={achievement?.unlocked ? rarity?.text : 'text-muted-foreground'}>
                        Progress: {achievement?.progress?.current} / {achievement?.progress?.total}
                      </span>
                      <span className={achievement?.unlocked ? rarity?.text : 'text-muted-foreground'}>
                        {Math.round(progressPercentage)}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          achievement?.unlocked ? 'bg-primary' : 'bg-muted-foreground'
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Points and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon name="Coins" size={16} className="text-accent" />
                      <span className={`text-sm font-medium ${
                        achievement?.unlocked ? rarity?.text : 'text-muted-foreground'
                      }`}>
                        {achievement?.points} points
                      </span>
                    </div>

                    {achievement?.unlocked && !achievement?.claimed && (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Gift"
                        iconPosition="left"
                        onClick={() => handleClaimReward(achievement?.id)}
                        className="bg-gradient-bloom hover:shadow-bloom"
                      >
                        Claim
                      </Button>
                    )}

                    {achievement?.unlocked && achievement?.unlockedAt && (
                      <span className="text-xs text-muted-foreground">
                        Unlocked {new Date(achievement.unlockedAt)?.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* Unlocked Badge */}
              {achievement?.unlocked && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">
              {Object.values(achievements)?.flat()?.filter(a => a?.unlocked)?.length}
            </div>
            <div className="text-xs text-muted-foreground">Unlocked</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">
              {Object.values(achievements)?.flat()?.reduce((sum, a) => sum + (a?.unlocked ? a?.points : 0), 0)}
            </div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">
              {Math.round((Object.values(achievements)?.flat()?.filter(a => a?.unlocked)?.length / Object.values(achievements)?.flat()?.length) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementPanel;