import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictionAccuracyTracker = ({ selectedDistrict, selectedCrop }) => {
  const [accuracyData, setAccuracyData] = useState({});
  const [timeRange, setTimeRange] = useState('6months');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    // Mock accuracy tracking data
    const mockAccuracyData = {
      overall: {
        accuracy: 87.5,
        totalPredictions: 15420,
        correctPredictions: 13492,
        improvement: 12.3,
        lastUpdated: '2024-09-28'
      },
      trends: {
        '6months': [
          { month: 'Apr', accuracy: 82.1, predictions: 2450, feedback: 156 },
          { month: 'May', accuracy: 84.3, predictions: 2680, feedback: 189 },
          { month: 'Jun', accuracy: 86.7, predictions: 2890, feedback: 234 },
          { month: 'Jul', accuracy: 88.2, predictions: 3120, feedback: 267 },
          { month: 'Aug', accuracy: 87.9, predictions: 2980, feedback: 198 },
          { month: 'Sep', accuracy: 89.1, predictions: 3200, feedback: 289 }
        ],
        '12months': [
          { month: 'Q1 2024', accuracy: 79.5, predictions: 7200, feedback: 456 },
          { month: 'Q2 2024', accuracy: 84.7, predictions: 8020, feedback: 579 },
          { month: 'Q3 2024', accuracy: 88.4, predictions: 9300, feedback: 754 },
          { month: 'Q4 2024', accuracy: 87.2, predictions: 8900, feedback: 623 }
        ]
      },
      byDistrict: [
        { district: 'Dhaka', accuracy: 89.2, predictions: 2340, color: '#2ECC71' },
        { district: 'Chittagong', accuracy: 86.8, predictions: 2890, color: '#3498DB' },
        { district: 'Sylhet', accuracy: 88.5, predictions: 1980, color: '#F39C12' },
        { district: 'Rajshahi', accuracy: 91.3, predictions: 3450, color: '#E74C3C' },
        { district: 'Khulna', accuracy: 85.7, predictions: 2180, color: '#9B59B6' }
      ],
      byCrop: [
        { crop: 'Rice', accuracy: 92.1, predictions: 8900, color: '#27AE60' },
        { crop: 'Wheat', accuracy: 84.6, predictions: 2340, color: '#F1C40F' },
        { crop: 'Jute', accuracy: 87.3, predictions: 1890, color: '#2980B9' },
        { crop: 'Tea', accuracy: 89.8, predictions: 1560, color: '#E67E22' },
        { crop: 'Others', accuracy: 83.2, predictions: 730, color: '#8E44AD' }
      ],
      recentFeedback: [
        {
          id: 1,
          farmer: "Md. Karim Rahman",
          district: "Rajshahi",
          crop: "Rice",
          prediction: "Bloom expected April 15-18",
          actual: "Bloomed April 16",
          accuracy: "Excellent",
          feedback: "Very accurate prediction helped me prepare irrigation schedule perfectly.",
          rating: 5,
          date: "2024-09-25"
        },
        {
          id: 2,
          farmer: "Fatima Begum",
          district: "Sylhet",
          crop: "Tea",
          prediction: "Peak bloom May 10-12",
          actual: "Bloomed May 14",
          accuracy: "Good",
          feedback: "Slightly delayed but close enough for planning. Weather was unusually cool.",
          rating: 4,
          date: "2024-09-23"
        },
        {
          id: 3,
          farmer: "Abdul Hassan",
          district: "Chittagong",
          crop: "Rice",
          prediction: "Early bloom April 8-10",
          actual: "Bloomed April 12",
          accuracy: "Fair",
          feedback: "Prediction was a bit early. Heavy rains delayed the bloom by few days.",
          rating: 3,
          date: "2024-09-20"
        }
      ]
    };

    setAccuracyData(mockAccuracyData);
  }, [selectedDistrict, selectedCrop]);

  const getRatingColor = (rating) => {
    if (rating >= 90) return 'text-success';
    if (rating >= 80) return 'text-warning';
    return 'text-error';
  };

  const getAccuracyLabel = (accuracy) => {
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 80) return 'Good';
    if (accuracy >= 70) return 'Fair';
    return 'Needs Improvement';
  };

  const handleFeedbackSubmit = () => {
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Overall Accuracy Stats */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Prediction Accuracy Tracker</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time accuracy metrics and farmer feedback
            </p>
          </div>

          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="RefreshCw" size={16} />
            <span className="text-xs">Updated {accuracyData?.overall?.lastUpdated}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-bloom rounded-organic p-6 text-white text-center">
            <Icon name="Target" size={32} className="mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{accuracyData?.overall?.accuracy}%</div>
            <div className="text-sm opacity-90">Overall Accuracy</div>
            <div className="text-xs opacity-75 mt-2">
              +{accuracyData?.overall?.improvement}% this quarter
            </div>
          </div>

          <div className="bg-gradient-sky rounded-organic p-6 text-white text-center">
            <Icon name="BarChart3" size={32} className="mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{accuracyData?.overall?.totalPredictions?.toLocaleString()}</div>
            <div className="text-sm opacity-90">Total Predictions</div>
            <div className="text-xs opacity-75 mt-2">This year</div>
          </div>

          <div className="bg-gradient-sunset rounded-organic p-6 text-white text-center">
            <Icon name="CheckCircle" size={32} className="mx-auto mb-3" />
            <div className="text-3xl font-bold mb-1">{accuracyData?.overall?.correctPredictions?.toLocaleString()}</div>
            <div className="text-sm opacity-90">Correct Predictions</div>
            <div className="text-xs opacity-75 mt-2">Validated by farmers</div>
          </div>

          <div className="bg-primary/10 rounded-organic p-6 text-center">
            <Icon name="TrendingUp" size={32} className="mx-auto mb-3 text-primary" />
            <div className="text-3xl font-bold mb-1 text-primary">
              {getAccuracyLabel(accuracyData?.overall?.accuracy || 0)}
            </div>
            <div className="text-sm text-muted-foreground">Performance Rating</div>
            <div className="text-xs text-muted-foreground mt-2">Based on farmer feedback</div>
          </div>
        </div>
      </div>
      {/* Accuracy Trends */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Accuracy Trends</h3>
          
          <div className="flex space-x-1 bg-muted p-1 rounded-organic">
            <button
              onClick={() => setTimeRange('6months')}
              className={`px-3 py-1 rounded-button text-sm transition-all duration-300 ${
                timeRange === '6months' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setTimeRange('12months')}
              className={`px-3 py-1 rounded-button text-sm transition-all duration-300 ${
                timeRange === '12months' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              12 Months
            </button>
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={accuracyData?.trends?.[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#7F8C8D" />
              <YAxis stroke="#7F8C8D" domain={[70, 95]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  name === 'accuracy' ? `${value}%` : value,
                  name === 'accuracy' ? 'Accuracy' : name === 'predictions' ? 'Predictions' : 'Feedback Count'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#2ECC71" 
                strokeWidth={3}
                name="accuracy"
              />
              <Line 
                type="monotone" 
                dataKey="predictions" 
                stroke="#3498DB" 
                strokeWidth={2}
                yAxisId="right"
                name="predictions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* District and Crop Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Accuracy by District</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData?.byDistrict}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="district" stroke="#7F8C8D" />
                <YAxis stroke="#7F8C8D" domain={[80, 95]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`${value}%`, 'Accuracy']}
                />
                <Bar dataKey="accuracy" fill="#27AE60" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card border border-border rounded-card p-6 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Accuracy by Crop</h3>
          <div className="space-y-3">
            {accuracyData?.byCrop?.map((crop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-organic">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: crop?.color }}
                  ></div>
                  <span className="font-medium text-foreground">{crop?.crop}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    {crop?.predictions} predictions
                  </span>
                  <span className={`font-semibold ${getRatingColor(crop?.accuracy)}`}>
                    {crop?.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Farmer Feedback */}
      <div className="bg-card border border-border rounded-card p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Recent Farmer Feedback</h3>
          <Button 
            variant="default" 
            size="sm" 
            iconName="Plus" 
            iconPosition="left"
            onClick={handleFeedbackSubmit}
            disabled={feedbackSubmitted}
          >
            {feedbackSubmitted ? 'Submitted!' : 'Submit Feedback'}
          </Button>
        </div>

        <div className="space-y-4">
          {accuracyData?.recentFeedback?.map((feedback) => (
            <div key={feedback?.id} className="bg-muted/50 rounded-organic p-4 hover-bloom">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-foreground">{feedback?.farmer}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feedback?.district} • {feedback?.crop} • {feedback?.date}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon 
                      key={i}
                      name="Star" 
                      size={14} 
                      className={i < feedback?.rating ? 'text-accent' : 'text-muted-foreground'}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                <div>
                  <span className="text-xs text-muted-foreground">Prediction:</span>
                  <p className="text-sm text-foreground">{feedback?.prediction}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Actual Result:</span>
                  <p className="text-sm text-foreground">{feedback?.actual}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic">"{feedback?.feedback}"</p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-button ${
                  feedback?.accuracy === 'Excellent' ? 'bg-success/10 text-success' :
                  feedback?.accuracy === 'Good'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
                }`}>
                  {feedback?.accuracy}
                </span>
                
                <div className="flex space-x-2">
                  <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="ThumbsUp" size={14} className="inline mr-1" />
                    Helpful
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                    <Icon name="MessageCircle" size={14} className="inline mr-1" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Feedback Submission Success */}
      {feedbackSubmitted && (
        <div className="fixed bottom-4 right-4 bg-success text-success-foreground p-4 rounded-organic shadow-bloom animate-growth">
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={20} />
            <span className="font-medium">Feedback submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionAccuracyTracker;