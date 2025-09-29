import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PredictionCard = ({ prediction, onMakePrediction, userPrediction, isCompleted }) => {
  const [selectedOption, setSelectedOption] = useState(userPrediction?.option || null);
  const [confidence, setConfidence] = useState(userPrediction?.confidence || 50);
  const [showResult, setShowResult] = useState(isCompleted);

  const difficultyColors = {
    easy: 'text-success bg-success/10',
    medium: 'text-warning bg-warning/10',
    hard: 'text-error bg-error/10'
  };

  const handleSubmitPrediction = () => {
    if (selectedOption) {
      onMakePrediction(prediction?.id, {
        option: selectedOption,
        confidence: confidence,
        timestamp: new Date()?.toISOString()
      });
    }
  };

  const formatTimeRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  return (
    <div className="data-card hover-bloom group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-button text-xs font-medium ${difficultyColors?.[prediction?.difficulty]}`}>
              {prediction?.difficulty?.toUpperCase()}
            </span>
            <span className="text-xs text-muted-foreground">
              {prediction?.points} points
            </span>
          </div>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
            {prediction?.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {prediction?.description}
          </p>
        </div>
        
        <div className="ml-4 text-right">
          <div className="text-xs text-muted-foreground">Ends in</div>
          <div className="text-sm font-medium text-foreground">
            {formatTimeRemaining(prediction?.endDate)}
          </div>
        </div>
      </div>
      {/* Location & Image */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-16 h-16 rounded-organic overflow-hidden bg-muted">
          <Image 
            src={prediction?.image} 
            alt={prediction?.location}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="flex items-center space-x-1 text-sm text-foreground">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>{prediction?.location}</span>
          </div>
          <div className="flex items-center space-x-1 text-xs text-muted-foreground mt-1">
            <Icon name="Calendar" size={14} />
            <span>Prediction for {new Date(prediction.targetDate)?.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      {/* Prediction Options */}
      {!isCompleted && (
        <div className="space-y-3 mb-4">
          <div className="text-sm font-medium text-foreground">Make your prediction:</div>
          <div className="grid grid-cols-1 gap-2">
            {prediction?.options?.map((option) => (
              <button
                key={option?.id}
                onClick={() => setSelectedOption(option?.id)}
                className={`p-3 rounded-organic border transition-all duration-300 text-left ${
                  selectedOption === option?.id
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option?.label}</span>
                  <div className="flex items-center space-x-2">
                    {selectedOption === option?.id && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {option?.description}
                </div>
              </button>
            ))}
          </div>

          {/* Confidence Slider */}
          {selectedOption && (
            <div className="mt-4 p-3 bg-muted/50 rounded-organic">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Confidence Level</span>
                <span className="text-sm text-primary font-medium">{confidence}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e?.target?.value))}
                className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${confidence}%, var(--color-border) ${confidence}%, var(--color-border) 100%)`
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            variant="default"
            fullWidth
            iconName="Target"
            iconPosition="left"
            disabled={!selectedOption}
            onClick={handleSubmitPrediction}
            className="bg-gradient-bloom hover:shadow-bloom"
          >
            Submit Prediction
          </Button>
        </div>
      )}
      {/* Results (if completed) */}
      {isCompleted && userPrediction && (
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">Your Prediction</span>
            <div className={`px-2 py-1 rounded-button text-xs font-medium ${
              userPrediction?.isCorrect 
                ? 'text-success bg-success/10' :'text-error bg-error/10'
            }`}>
              {userPrediction?.isCorrect ? 'Correct' : 'Incorrect'}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Choice:</span>
              <span className="text-foreground font-medium">
                {prediction?.options?.find(opt => opt?.id === userPrediction?.option)?.label}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Confidence:</span>
              <span className="text-foreground font-medium">{userPrediction?.confidence}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Points Earned:</span>
              <span className={`font-medium ${userPrediction?.isCorrect ? 'text-success' : 'text-error'}`}>
                {userPrediction?.isCorrect ? `+${userPrediction?.pointsEarned}` : '0'}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Participation Stats */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-4 pt-3 border-t border-border">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>{prediction?.participantCount} participants</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>Created {new Date(prediction.createdAt)?.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;