import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const UserStatsCard = ({ userStats }) => {
  const stats = userStats || {
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
      level: 8,
      badge: "Rising Star",
      joinedDate: "2025-08-15"
    },
    performance: {
      totalPredictions: 47,
      correctPredictions: 39,
      accuracy: 82.9,
      totalPoints: 1687,
      currentStreak: 4,
      longestStreak: 12,
      rank: 5,
      percentile: 85
    },
    achievements: {
      total: 12,
      recent: 3,
      legendary: 0,
      epic: 1,
      rare: 3,
      uncommon: 4,
      common: 4
    },
    activity: {
      predictionsThisWeek: 8,
      predictionsThisMonth: 23,
      averageConfidence: 76,
      favoriteCategory: "Agricultural Blooms",
      mostAccurateRegion: "Bangladesh"
    }
  };

  const levelProgress = {
    current: stats?.user?.level,
    pointsToNext: 2500 - (stats?.performance?.totalPoints % 2500),
    totalForNext: 2500,
    currentLevelPoints: stats?.performance?.totalPoints % 2500
  };

  const progressPercentage = (levelProgress?.currentLevelPoints / levelProgress?.totalForNext) * 100;

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'text-success';
    if (accuracy >= 80) return 'text-primary';
    if (accuracy >= 70) return 'text-warning';
    return 'text-error';
  };

  const getStreakIcon = (streak) => {
    if (streak >= 10) return { icon: 'Flame', color: 'text-red-500' };
    if (streak >= 5) return { icon: 'Flame', color: 'text-orange-500' };
    if (streak >= 1) return { icon: 'Flame', color: 'text-yellow-500' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  const streakIcon = getStreakIcon(stats?.performance?.currentStreak);

  return (
    <div className="data-card">
      {/* User Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
            <Image 
              src={stats?.user?.avatar} 
              alt={stats?.user?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            {stats?.user?.level}
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-foreground">{stats?.user?.name}</h2>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Award" size={14} className="text-accent" />
            <span>{stats?.user?.badge}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
            <Icon name="Calendar" size={12} />
            <span>Joined {new Date(stats.user.joinedDate)?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Level Progress */}
      <div className="mb-6 p-4 bg-gradient-bloom rounded-organic text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Level {stats?.user?.level}</span>
          <span className="text-sm">{levelProgress?.pointsToNext} to next level</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 mb-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="text-xs opacity-90">
          {levelProgress?.currentLevelPoints?.toLocaleString()} / {levelProgress?.totalForNext?.toLocaleString()} XP
        </div>
      </div>
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/50 rounded-organic">
          <div className={`text-2xl font-bold ${getAccuracyColor(stats?.performance?.accuracy)}`}>
            {stats?.performance?.accuracy}%
          </div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
          <div className="text-xs text-muted-foreground mt-1">
            {stats?.performance?.correctPredictions}/{stats?.performance?.totalPredictions} correct
          </div>
        </div>
        
        <div className="text-center p-3 bg-muted/50 rounded-organic">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Icon name={streakIcon?.icon} size={20} className={streakIcon?.color} />
            <span className="text-2xl font-bold text-foreground">{stats?.performance?.currentStreak}</span>
          </div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
          <div className="text-xs text-muted-foreground mt-1">
            Best: {stats?.performance?.longestStreak} days
          </div>
        </div>
      </div>
      {/* Detailed Stats */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Performance Overview</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-primary" />
                <span className="text-muted-foreground">Total Points</span>
              </div>
              <span className="font-medium text-foreground">{stats?.performance?.totalPoints?.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-secondary" />
                <span className="text-muted-foreground">Global Rank</span>
              </div>
              <span className="font-medium text-foreground">#{stats?.performance?.rank}</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-accent" />
                <span className="text-muted-foreground">Percentile</span>
              </div>
              <span className="font-medium text-foreground">Top {100 - stats?.performance?.percentile}%</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-primary" />
                <span className="text-muted-foreground">This Week</span>
              </div>
              <span className="font-medium text-foreground">{stats?.activity?.predictionsThisWeek} predictions</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="CalendarDays" size={16} className="text-secondary" />
                <span className="text-muted-foreground">This Month</span>
              </div>
              <span className="font-medium text-foreground">{stats?.activity?.predictionsThisMonth} predictions</span>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Gauge" size={16} className="text-accent" />
                <span className="text-muted-foreground">Avg. Confidence</span>
              </div>
              <span className="font-medium text-foreground">{stats?.activity?.averageConfidence}%</span>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3">Achievements Summary</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-muted/30 rounded-organic">
              <div className="text-lg font-bold text-foreground">{stats?.achievements?.total}</div>
              <div className="text-xs text-muted-foreground">Total Earned</div>
            </div>
            <div className="text-center p-2 bg-success/10 rounded-organic">
              <div className="text-lg font-bold text-success">{stats?.achievements?.recent}</div>
              <div className="text-xs text-muted-foreground">This Week</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-4 mt-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-muted-foreground">{stats?.achievements?.legendary} Legendary</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">{stats?.achievements?.epic} Epic</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">{stats?.achievements?.rare} Rare</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;