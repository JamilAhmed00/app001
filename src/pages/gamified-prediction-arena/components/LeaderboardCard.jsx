import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LeaderboardCard = ({ timeframe = 'weekly', onTimeframeChange }) => {
  const [selectedTab, setSelectedTab] = useState(timeframe);

  const leaderboardData = {
    weekly: [
      {
        rank: 1,
        user: {
          id: 1,
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          level: 15,
          badge: "Bloom Master"
        },
        stats: {
          points: 2847,
          accuracy: 94,
          predictions: 23,
          streak: 12
        }
      },
      {
        rank: 2,
        user: {
          id: 2,
          name: "Dr. Ahmed Rahman",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          level: 18,
          badge: "Research Pioneer"
        },
        stats: {
          points: 2634,
          accuracy: 91,
          predictions: 28,
          streak: 8
        }
      },
      {
        rank: 3,
        user: {
          id: 3,
          name: "Maria Rodriguez",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
          level: 12,
          badge: "Data Explorer"
        },
        stats: {
          points: 2156,
          accuracy: 88,
          predictions: 19,
          streak: 15
        }
      },
      {
        rank: 4,
        user: {
          id: 4,
          name: "James Wilson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          level: 10,
          badge: "Prediction Ace"
        },
        stats: {
          points: 1923,
          accuracy: 85,
          predictions: 21,
          streak: 6
        }
      },
      {
        rank: 5,
        user: {
          id: 5,
          name: "You",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
          level: 8,
          badge: "Rising Star"
        },
        stats: {
          points: 1687,
          accuracy: 82,
          predictions: 16,
          streak: 4
        }
      }
    ],
    monthly: [
      {
        rank: 1,
        user: {
          id: 2,
          name: "Dr. Ahmed Rahman",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
          level: 18,
          badge: "Research Pioneer"
        },
        stats: {
          points: 12847,
          accuracy: 93,
          predictions: 142,
          streak: 28
        }
      },
      {
        rank: 2,
        user: {
          id: 1,
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
          level: 15,
          badge: "Bloom Master"
        },
        stats: {
          points: 11634,
          accuracy: 91,
          predictions: 128,
          streak: 22
        }
      }
    ],
    allTime: [
      {
        rank: 1,
        user: {
          id: 6,
          name: "Prof. Elena Vasquez",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
          level: 25,
          badge: "Legendary Predictor"
        },
        stats: {
          points: 45623,
          accuracy: 96,
          predictions: 487,
          streak: 67
        }
      }
    ]
  };

  const timeframeTabs = [
    { key: 'weekly', label: 'This Week', icon: 'Calendar' },
    { key: 'monthly', label: 'This Month', icon: 'CalendarDays' },
    { key: 'allTime', label: 'All Time', icon: 'Trophy' }
  ];

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { icon: 'Crown', color: 'text-yellow-500' };
      case 2: return { icon: 'Medal', color: 'text-gray-400' };
      case 3: return { icon: 'Award', color: 'text-amber-600' };
      default: return { icon: 'Hash', color: 'text-muted-foreground' };
    }
  };

  const getRankBadge = (rank) => {
    if (rank <= 3) {
      return `bg-gradient-to-r ${
        rank === 1 ? 'from-yellow-400 to-yellow-600' :
        rank === 2 ? 'from-gray-300 to-gray-500': 'from-amber-400 to-amber-600'
      } text-white`;
    }
    return 'bg-muted text-muted-foreground';
  };

  const currentData = leaderboardData?.[selectedTab] || [];

  return (
    <div className="data-card">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Leaderboard</h2>
          <p className="text-sm text-muted-foreground">Top predictors this period</p>
        </div>
        <Icon name="TrendingUp" size={24} className="text-primary" />
      </div>
      {/* Timeframe Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-organic p-1">
        {timeframeTabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => {
              setSelectedTab(tab?.key);
              onTimeframeChange?.(tab?.key);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-button text-sm font-medium transition-all duration-300 ${
              selectedTab === tab?.key
                ? 'bg-card text-primary shadow-card'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Leaderboard List */}
      <div className="space-y-3">
        {currentData?.map((entry) => (
          <div
            key={entry?.user?.id}
            className={`flex items-center space-x-4 p-4 rounded-organic transition-all duration-300 ${
              entry?.user?.name === 'You' ?'bg-primary/10 border border-primary/20 hover:bg-primary/15' :'bg-muted/50 hover:bg-muted'
            }`}
          >
            {/* Rank */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${getRankBadge(entry?.rank)}`}>
              {entry?.rank <= 3 ? (
                <Icon 
                  name={getRankIcon(entry?.rank)?.icon} 
                  size={16} 
                  className={entry?.rank <= 3 ? 'text-white' : getRankIcon(entry?.rank)?.color}
                />
              ) : (
                entry?.rank
              )}
            </div>

            {/* Avatar */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                <Image 
                  src={entry?.user?.avatar} 
                  alt={entry?.user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
                {entry?.user?.level}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className={`font-medium truncate ${
                  entry?.user?.name === 'You' ? 'text-primary' : 'text-foreground'
                }`}>
                  {entry?.user?.name}
                </h3>
                {entry?.user?.name === 'You' && (
                  <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">
                    You
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{entry?.user?.badge}</div>
            </div>

            {/* Stats */}
            <div className="text-right">
              <div className="font-bold text-foreground">{entry?.stats?.points?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>

            {/* Accuracy */}
            <div className="text-right">
              <div className="font-medium text-success">{entry?.stats?.accuracy}%</div>
              <div className="text-xs text-muted-foreground">accuracy</div>
            </div>

            {/* Streak */}
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Icon name="Flame" size={14} className="text-orange-500" />
                <span className="font-medium text-foreground">{entry?.stats?.streak}</span>
              </div>
              <div className="text-xs text-muted-foreground">streak</div>
            </div>
          </div>
        ))}
      </div>
      {/* View Full Leaderboard */}
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          className="hover:bg-primary/5 hover:border-primary/20"
        >
          View Full Leaderboard
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardCard;