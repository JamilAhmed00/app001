import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import PredictionCard from './components/PredictionCard';
import LeaderboardCard from './components/LeaderboardCard';
import AchievementPanel from './components/AchievementPanel';
import UserStatsCard from './components/UserStatsCard';
import ChallengeCard from './components/ChallengeCard';

const GamifiedPredictionArena = () => {
  const [activeTab, setActiveTab] = useState('predictions');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [userPredictions, setUserPredictions] = useState({});
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(4);

  // Mock data for predictions
  const predictions = [
    {
      id: 1,
      title: "Rice Bloom Prediction - Dhaka Division",
      description: "Predict when rice fields in Dhaka division will reach peak bloom stage based on current weather patterns and soil conditions.",
      location: "Dhaka Division, Bangladesh",
      targetDate: "2025-10-15",
      endDate: "2025-10-10T23:59:59Z",
      difficulty: "medium",
      points: 150,
      image: "https://images.pexels.com/photos/2589457/pexels-photo-2589457.jpeg?w=400&h=300&fit=crop",
      options: [
        {
          id: 'early',
          label: 'Early Bloom (Oct 12-14)',
          description: 'Favorable conditions lead to earlier flowering'
        },
        {
          id: 'predicted',
          label: 'On Schedule (Oct 15-17)',
          description: 'Normal bloom timing as predicted by models'
        },
        {
          id: 'late',
          label: 'Late Bloom (Oct 18-20)',
          description: 'Delayed due to weather or soil factors'
        }
      ],
      participantCount: 234,
      createdAt: "2025-09-25T08:00:00Z"
    },
    {
      id: 2,
      title: "Sunflower Peak Bloom - Rajshahi",
      description: "When will the sunflower fields in Rajshahi reach their peak blooming period? Consider temperature trends and rainfall patterns.",
      location: "Rajshahi, Bangladesh",
      targetDate: "2025-10-08",
      endDate: "2025-10-05T18:00:00Z",
      difficulty: "easy",
      points: 100,
      image: "https://images.pixabay.com/photo/2015/06/19/21/24/sunflower-815270_1280.jpg?w=400&h=300&fit=crop",
      options: [
        {
          id: 'oct6',
          label: 'October 6-7',
          description: 'Early peak due to warm weather'
        },
        {
          id: 'oct8',
          label: 'October 8-9',
          description: 'Expected peak timing'
        },
        {
          id: 'oct10',
          label: 'October 10-11',
          description: 'Delayed peak bloom'
        }
      ],
      participantCount: 156,
      createdAt: "2025-09-24T12:00:00Z"
    },
    {
      id: 3,
      title: "Mango Blossom Intensity - Chapainawabganj",
      description: "Predict the intensity of mango blossom in Chapainawabganj based on winter temperature patterns and humidity levels.",
      location: "Chapainawabganj, Bangladesh",
      targetDate: "2025-11-20",
      endDate: "2025-11-15T23:59:59Z",
      difficulty: "hard",
      points: 250,
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=300&fit=crop",
      options: [
        {
          id: 'low',
          label: 'Low Intensity (< 60%)',
          description: 'Sparse flowering due to unfavorable conditions'
        },
        {
          id: 'moderate',
          label: 'Moderate Intensity (60-80%)',
          description: 'Average flowering intensity'
        },
        {
          id: 'high',
          label: 'High Intensity (> 80%)',
          description: 'Abundant flowering with optimal conditions'
        }
      ],
      participantCount: 89,
      createdAt: "2025-09-26T10:30:00Z"
    }
  ];

  // Mock data for challenges
  const challenges = [
    {
      id: 1,
      title: "Weekly Prediction Master",
      description: "Make 5 correct predictions this week to earn the Weekly Master badge and bonus points.",
      type: "weekly",
      difficulty: "medium",
      endDate: "2025-10-05T23:59:59Z",
      image: "https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?w=400&h=200&fit=crop",
      requirements: {
        total: 5,
        items: [
          "Make 5 predictions this week",
          "Achieve 80% accuracy minimum",
          "Include at least 2 different regions",
          "Maintain prediction streak"
        ]
      },
      rewards: {
        points: 500,
        badge: "Weekly Master",
        exclusive: false
      },
      participants: {
        current: 1247,
        max: null
      },
      isLimited: false,
      createdAt: "2025-09-28T00:00:00Z"
    },
    {
      id: 2,
      title: "Bangladesh Agricultural Expert",
      description: "Become an expert in Bangladesh agricultural predictions by completing region-specific challenges.",
      type: "seasonal",
      difficulty: "hard",
      endDate: "2025-12-31T23:59:59Z",
      image: "https://images.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg?w=400&h=200&fit=crop",
      requirements: {
        total: 10,
        items: [
          "Complete 10 Bangladesh-specific predictions",
          "Achieve 85% accuracy in agricultural predictions",
          "Cover all 8 divisions of Bangladesh",
          "Contribute to citizen science database"
        ]
      },
      rewards: {
        points: 1000,
        badge: "Agricultural Expert",
        exclusive: true
      },
      participants: {
        current: 234,
        max: 500
      },
      isLimited: true,
      createdAt: "2025-09-15T00:00:00Z"
    }
  ];

  // Mock user stats
  const userStats = {
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
      currentStreak: currentStreak,
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

  const tabs = [
    { key: 'predictions', label: 'Active Predictions', icon: 'Target' },
    { key: 'challenges', label: 'Challenges', icon: 'Trophy' },
    { key: 'leaderboard', label: 'Leaderboard', icon: 'Crown' },
    { key: 'achievements', label: 'Achievements', icon: 'Award' },
    { key: 'stats', label: 'My Stats', icon: 'BarChart3' }
  ];

  const difficultyFilters = [
    { key: 'all', label: 'All Levels' },
    { key: 'easy', label: 'Easy' },
    { key: 'medium', label: 'Medium' },
    { key: 'hard', label: 'Hard' }
  ];

  const regionFilters = [
    { key: 'all', label: 'All Regions' },
    { key: 'bangladesh', label: 'Bangladesh' },
    { key: 'asia', label: 'Asia' },
    { key: 'global', label: 'Global' }
  ];

  const handleMakePrediction = (predictionId, predictionData) => {
    setUserPredictions(prev => ({
      ...prev,
      [predictionId]: predictionData
    }));
    
    // Show success animation
    setShowSuccessAnimation(true);
    setTimeout(() => setShowSuccessAnimation(false), 3000);
    
    // Update streak
    setCurrentStreak(prev => prev + 1);
  };

  const handleJoinChallenge = (challengeId) => {
    console.log('Joined challenge:', challengeId);
  };

  const handleLeaveChallenge = (challengeId) => {
    console.log('Left challenge:', challengeId);
  };

  const handleClaimReward = (achievementId) => {
    console.log('Claimed reward for achievement:', achievementId);
  };

  const filteredPredictions = predictions?.filter(prediction => {
    if (selectedDifficulty !== 'all' && prediction?.difficulty !== selectedDifficulty) {
      return false;
    }
    if (selectedRegion !== 'all') {
      if (selectedRegion === 'bangladesh' && !prediction?.location?.includes('Bangladesh')) {
        return false;
      }
      // Add more region filtering logic as needed
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Success Animation */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="achievement-glow bg-gradient-bloom text-white p-8 rounded-card text-center animate-growth">
            <Icon name="Target" size={48} className="mx-auto mb-4 animate-pulse-organic" />
            <div className="text-xl font-bold mb-2">Prediction Submitted!</div>
            <div className="text-sm opacity-90">Great choice! Your streak continues.</div>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <Icon name="Flame" size={16} className="text-orange-300" />
              <span className="font-medium">Streak: {currentStreak} days</span>
            </div>
          </div>
        </div>
      )}
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-bloom text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Icon name="Target" size={48} className="animate-pulse-organic" />
                <h1 className="text-hero">Prediction Arena</h1>
              </div>
              <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
                Challenge yourself with bloom predictions, compete with scientists worldwide, 
                and contribute to agricultural research while earning rewards and achievements.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{userStats?.performance?.currentStreak}</div>
                  <div className="text-sm opacity-80">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{userStats?.performance?.totalPoints?.toLocaleString()}</div>
                  <div className="text-sm opacity-80">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">{userStats?.performance?.accuracy}%</div>
                  <div className="text-sm opacity-80">Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">#{userStats?.performance?.rank}</div>
                  <div className="text-sm opacity-80">Global Rank</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="bg-card border-b border-border sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {tabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-button text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab?.key
                      ? 'bg-primary text-white shadow-bloom'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Predictions Tab */}
            {activeTab === 'predictions' && (
              <div>
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div className="flex items-center space-x-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Difficulty</label>
                      <select
                        value={selectedDifficulty}
                        onChange={(e) => setSelectedDifficulty(e?.target?.value)}
                        className="px-3 py-2 border border-border rounded-button bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {difficultyFilters?.map((filter) => (
                          <option key={filter?.key} value={filter?.key}>
                            {filter?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Region</label>
                      <select
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e?.target?.value)}
                        className="px-3 py-2 border border-border rounded-button bg-card text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        {regionFilters?.map((filter) => (
                          <option key={filter?.key} value={filter?.key}>
                            {filter?.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      iconName="RefreshCw"
                      iconPosition="left"
                      size="sm"
                    >
                      Refresh
                    </Button>
                    <Button
                      variant="default"
                      iconName="Plus"
                      iconPosition="left"
                      size="sm"
                      className="bg-gradient-bloom hover:shadow-bloom"
                    >
                      Suggest Prediction
                    </Button>
                  </div>
                </div>

                {/* Predictions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPredictions?.map((prediction) => (
                    <PredictionCard
                      key={prediction?.id}
                      prediction={prediction}
                      onMakePrediction={handleMakePrediction}
                      userPrediction={userPredictions?.[prediction?.id]}
                      isCompleted={false}
                    />
                  ))}
                </div>

                {filteredPredictions?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Target" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No predictions found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or check back later for new predictions.
                    </p>
                    <Button
                      variant="outline"
                      iconName="RefreshCw"
                      iconPosition="left"
                      onClick={() => {
                        setSelectedDifficulty('all');
                        setSelectedRegion('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">Active Challenges</h2>
                  <p className="text-muted-foreground">
                    Join challenges to earn extra points, badges, and exclusive rewards.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {challenges?.map((challenge) => (
                    <ChallengeCard
                      key={challenge?.id}
                      challenge={challenge}
                      onJoinChallenge={handleJoinChallenge}
                      onLeaveChallenge={handleLeaveChallenge}
                      userParticipation={{
                        isParticipating: challenge?.id === 1,
                        completed: challenge?.id === 1 ? 2 : 0,
                        completedItems: challenge?.id === 1 ? [0, 1] : []
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <LeaderboardCard onTimeframeChange={(timeframe) => console.log('Timeframe changed:', timeframe)} />
                </div>
                <div>
                  <UserStatsCard userStats={userStats} />
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AchievementPanel 
                    onClaimReward={handleClaimReward} 
                    userAchievements={userStats?.achievements || {}}
                  />
                </div>
                <div>
                  <UserStatsCard userStats={userStats} />
                </div>
              </div>
            )}

            {/* Stats Tab */}
            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <UserStatsCard userStats={userStats} />
                  <AchievementPanel 
                    onClaimReward={handleClaimReward} 
                    userAchievements={userStats?.achievements || {}}
                  />
                </div>
                <div>
                  <LeaderboardCard onTimeframeChange={(timeframe) => console.log('Timeframe changed:', timeframe)} />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Quick Navigation */}
        <section className="bg-muted py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">Explore More</h2>
              <p className="text-muted-foreground">
                Discover other features of the BloomX platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/interactive-globe-dashboard"
                className="data-card hover-bloom group text-center"
              >
                <Icon name="Globe" size={48} className="mx-auto text-primary mb-4 group-hover:animate-pulse-organic" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Globe Dashboard</h3>
                <p className="text-sm text-muted-foreground">
                  Explore global bloom data with interactive 3D visualization
                </p>
              </Link>
              
              <Link
                to="/3d-immersive-explorer"
                className="data-card hover-bloom group text-center"
              >
                <Icon name="Compass" size={48} className="mx-auto text-secondary mb-4 group-hover:animate-pulse-organic" />
                <h3 className="text-lg font-semibold text-foreground mb-2">3D Explorer</h3>
                <p className="text-sm text-muted-foreground">
                  Immersive botanical exploration with WebXR technology
                </p>
              </Link>
              
              <Link
                to="/bangladesh-agricultural-focus"
                className="data-card hover-bloom group text-center"
              >
                <Icon name="Sprout" size={48} className="mx-auto text-accent mb-4 group-hover:animate-pulse-organic" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Agricultural Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Bangladesh-specific agricultural insights and predictions
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; {new Date()?.getFullYear()} BloomX Platform. Advancing agricultural science through gamified prediction.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GamifiedPredictionArena;