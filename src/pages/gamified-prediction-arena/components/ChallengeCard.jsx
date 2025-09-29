import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChallengeCard = ({ challenge, onJoinChallenge, onLeaveChallenge, userParticipation }) => {
  const [timeRemaining, setTimeRemaining] = useState('');
  const [isJoined, setIsJoined] = useState(userParticipation?.isParticipating || false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = new Date(challenge.endDate);
      const diff = end - now;
      
      if (diff <= 0) {
        setTimeRemaining('Ended');
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`);
      } else {
        setTimeRemaining(`${minutes}m`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [challenge?.endDate]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'hard': return 'text-error bg-error/10 border-error/20';
      case 'expert': return 'text-purple-600 bg-purple-100 border-purple-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'daily': return 'Calendar';
      case 'weekly': return 'CalendarDays';
      case 'seasonal': return 'Leaf';
      case 'tournament': return 'Trophy';
      case 'team': return 'Users';
      default: return 'Target';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'daily': return 'text-blue-600 bg-blue-100';
      case 'weekly': return 'text-green-600 bg-green-100';
      case 'seasonal': return 'text-orange-600 bg-orange-100';
      case 'tournament': return 'text-purple-600 bg-purple-100';
      case 'team': return 'text-pink-600 bg-pink-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleJoinToggle = () => {
    if (isJoined) {
      onLeaveChallenge?.(challenge?.id);
      setIsJoined(false);
    } else {
      onJoinChallenge?.(challenge?.id);
      setIsJoined(true);
    }
  };

  const getProgressPercentage = () => {
    if (!userParticipation) return 0;
    return Math.min((userParticipation?.completed / challenge?.requirements?.total) * 100, 100);
  };

  return (
    <div className={`data-card hover-bloom group transition-all duration-300 ${
      isJoined ? 'ring-2 ring-primary/20 bg-primary/5' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-button text-xs font-medium border ${getTypeColor(challenge?.type)}`}>
              <Icon name={getTypeIcon(challenge?.type)} size={12} className="inline mr-1" />
              {challenge?.type?.toUpperCase()}
            </span>
            <span className={`px-2 py-1 rounded-button text-xs font-medium border ${getDifficultyColor(challenge?.difficulty)}`}>
              {challenge?.difficulty?.toUpperCase()}
            </span>
            {challenge?.isLimited && (
              <span className="px-2 py-1 rounded-button text-xs font-medium text-red-600 bg-red-100 border border-red-200">
                LIMITED
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {challenge?.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {challenge?.description}
          </p>
        </div>
        
        <div className="ml-4 text-right">
          <div className="text-xs text-muted-foreground">
            {timeRemaining === 'Ended' ? 'Ended' : 'Ends in'}
          </div>
          <div className={`text-sm font-medium ${
            timeRemaining === 'Ended' ? 'text-error' : 'text-foreground'
          }`}>
            {timeRemaining}
          </div>
        </div>
      </div>
      {/* Challenge Image */}
      {challenge?.image && (
        <div className="w-full h-32 rounded-organic overflow-hidden mb-4 bg-muted">
          <Image 
            src={challenge?.image} 
            alt={challenge?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {/* Requirements */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Challenge Requirements</h4>
        <div className="space-y-2">
          {challenge?.requirements?.items?.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon 
                name={userParticipation?.completedItems?.includes(index) ? "CheckCircle" : "Circle"} 
                size={16} 
                className={userParticipation?.completedItems?.includes(index) ? "text-success" : "text-muted-foreground"}
              />
              <span className={userParticipation?.completedItems?.includes(index) ? "text-success line-through" : "text-foreground"}>
                {requirement}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Progress (if joined) */}
      {isJoined && userParticipation && (
        <div className="mb-4 p-3 bg-primary/5 rounded-organic border border-primary/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Your Progress</span>
            <span className="text-sm text-primary font-medium">
              {userParticipation?.completed} / {challenge?.requirements?.total}
            </span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {Math.round(getProgressPercentage())}% complete
          </div>
        </div>
      )}
      {/* Rewards */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Rewards</h4>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Coins" size={16} className="text-accent" />
            <span className="text-foreground font-medium">{challenge?.rewards?.points} points</span>
          </div>
          {challenge?.rewards?.badge && (
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={16} className="text-purple-500" />
              <span className="text-foreground font-medium">{challenge?.rewards?.badge}</span>
            </div>
          )}
          {challenge?.rewards?.exclusive && (
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-yellow-500" />
              <span className="text-foreground font-medium">Exclusive Item</span>
            </div>
          )}
        </div>
      </div>
      {/* Participants */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>{challenge?.participants?.current} / {challenge?.participants?.max || '∞'} participants</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>Created {new Date(challenge.createdAt)?.toLocaleDateString()}</span>
        </div>
      </div>
      {/* Action Button */}
      <div className="flex space-x-2">
        {timeRemaining !== 'Ended' ? (
          <>
            <Button
              variant={isJoined ? "outline" : "default"}
              fullWidth
              iconName={isJoined ? "UserMinus" : "UserPlus"}
              iconPosition="left"
              onClick={handleJoinToggle}
              className={isJoined ? "hover:bg-error/5 hover:border-error/20 hover:text-error" : "bg-gradient-bloom hover:shadow-bloom"}
            >
              {isJoined ? "Leave Challenge" : "Join Challenge"}
            </Button>
            {isJoined && (
              <Button
                variant="ghost"
                iconName="ExternalLink"
                iconSize={16}
                className="hover:bg-primary/5"
                title="View Details"
              />
            )}
          </>
        ) : (
          <Button
            variant="outline"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            disabled
          >
            Challenge Ended
          </Button>
        )}
      </div>
      {/* Leaderboard Preview (for tournaments) */}
      {challenge?.type === 'tournament' && challenge?.leaderboard && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Top Performers</span>
            <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
              View All
            </Button>
          </div>
          <div className="space-y-1">
            {challenge?.leaderboard?.slice(0, 3)?.map((entry, index) => (
              <div key={entry?.userId} className="flex items-center space-x-2 text-xs">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                }`}>
                  {index + 1}
                </span>
                <span className="text-foreground font-medium">{entry?.name}</span>
                <span className="text-muted-foreground ml-auto">{entry?.score} pts</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;