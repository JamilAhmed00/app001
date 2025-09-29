import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CropBloomCalendar = ({ selectedDistrict, selectedCrop }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date()?.getMonth());
  const [calendarData, setCalendarData] = useState([]);

  useEffect(() => {
    // Mock calendar data based on selected district and crop
    const mockCalendarData = [
      {
        month: 'January',
        index: 0,
        phases: [
          { name: 'Planting', days: [5, 6, 7, 8, 9], status: 'optimal', icon: 'Sprout' },
          { name: 'Germination', days: [15, 16, 17, 18], status: 'active', icon: 'Leaf' }
        ],
        weather: { temp: '18-25°C', rainfall: '15mm', humidity: '75%' }
      },
      {
        month: 'February',
        index: 1,
        phases: [
          { name: 'Vegetative Growth', days: [1, 2, 3, 4, 5, 10, 11, 12], status: 'optimal', icon: 'TreePine' },
          { name: 'Tillering', days: [20, 21, 22, 23], status: 'predicted', icon: 'GitBranch' }
        ],
        weather: { temp: '20-28°C', rainfall: '25mm', humidity: '70%' }
      },
      {
        month: 'March',
        index: 2,
        phases: [
          { name: 'Stem Elongation', days: [5, 6, 7, 8, 15, 16, 17], status: 'optimal', icon: 'ArrowUp' },
          { name: 'Panicle Initiation', days: [25, 26, 27], status: 'predicted', icon: 'Flower' }
        ],
        weather: { temp: '25-32°C', rainfall: '45mm', humidity: '68%' }
      },
      {
        month: 'April',
        index: 3,
        phases: [
          { name: 'Flowering', days: [8, 9, 10, 11, 12, 18, 19, 20], status: 'bloom', icon: 'Flower2' },
          { name: 'Pollination', days: [22, 23, 24, 25], status: 'critical', icon: 'Heart' }
        ],
        weather: { temp: '28-35°C', rainfall: '85mm', humidity: '72%' }
      },
      {
        month: 'May',
        index: 4,
        phases: [
          { name: 'Grain Filling', days: [5, 6, 7, 8, 9, 15, 16, 17], status: 'active', icon: 'Package' },
          { name: 'Maturation', days: [25, 26, 27, 28], status: 'predicted', icon: 'Award' }
        ],
        weather: { temp: '30-38°C', rainfall: '120mm', humidity: '78%' }
      },
      {
        month: 'June',
        index: 5,
        phases: [
          { name: 'Harvest Ready', days: [10, 11, 12, 13, 14], status: 'harvest', icon: 'Scissors' },
          { name: 'Post Harvest', days: [20, 21, 22], status: 'completed', icon: 'CheckCircle' }
        ],
        weather: { temp: '28-35°C', rainfall: '200mm', humidity: '82%' }
      }
    ];

    setCalendarData(mockCalendarData);
  }, [selectedDistrict, selectedCrop]);

  const getStatusColor = (status) => {
    const colors = {
      optimal: 'bg-success text-success-foreground',
      active: 'bg-primary text-primary-foreground',
      predicted: 'bg-secondary text-secondary-foreground',
      bloom: 'bg-accent text-accent-foreground animate-pulse-organic',
      critical: 'bg-warning text-warning-foreground',
      harvest: 'bg-gradient-sunset text-white',
      completed: 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const currentMonthData = calendarData?.[currentMonth] || {};
  const daysInMonth = new Date(2024, currentMonth + 1, 0)?.getDate();
  const firstDayOfMonth = new Date(2024, currentMonth, 1)?.getDay();

  const renderCalendarGrid = () => {
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Day headers
    dayNames?.forEach(day => {
      days?.push(
        <div key={day} className="p-2 text-center text-xs font-medium text-muted-foreground border-b border-border">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDayOfMonth; i++) {
      days?.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayPhases = currentMonthData?.phases?.filter(phase => 
        phase?.days?.includes(day)
      ) || [];

      days?.push(
        <div key={day} className="p-1 border-b border-r border-border min-h-[60px] relative">
          <div className="text-xs font-medium text-foreground mb-1">{day}</div>
          <div className="space-y-1">
            {dayPhases?.map((phase, index) => (
              <div
                key={index}
                className={`text-xs px-1 py-0.5 rounded text-center ${getStatusColor(phase?.status)}`}
                title={phase?.name}
              >
                <Icon name={phase?.icon} size={12} className="inline mr-1" />
                {phase?.name?.split(' ')?.[0]}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Agricultural Calendar</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Crop bloom phases and optimal farming periods
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentMonth(Math.max(0, currentMonth - 1))}
            disabled={currentMonth === 0}
            className="p-2 rounded-button bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Icon name="ChevronLeft" size={18} />
          </button>
          
          <div className="px-4 py-2 bg-primary/10 text-primary rounded-button font-medium min-w-[120px] text-center">
            {currentMonthData?.month || 'January'}
          </div>
          
          <button
            onClick={() => setCurrentMonth(Math.min(11, currentMonth + 1))}
            disabled={currentMonth === 11}
            className="p-2 rounded-button bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>
      {/* Weather Summary */}
      {currentMonthData?.weather && (
        <div className="mb-6 p-4 bg-gradient-sky rounded-organic text-white">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="Thermometer" size={18} />
              <span className="text-sm">{currentMonthData?.weather?.temp}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CloudRain" size={18} />
              <span className="text-sm">{currentMonthData?.weather?.rainfall}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Droplets" size={18} />
              <span className="text-sm">{currentMonthData?.weather?.humidity}</span>
            </div>
          </div>
        </div>
      )}
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 border-l border-t border-border rounded-organic overflow-hidden">
        {renderCalendarGrid()}
      </div>
      {/* Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { status: 'optimal', label: 'Optimal Period', icon: 'CheckCircle' },
          { status: 'bloom', label: 'Bloom Phase', icon: 'Flower2' },
          { status: 'critical', label: 'Critical Care', icon: 'AlertTriangle' },
          { status: 'harvest', label: 'Harvest Time', icon: 'Scissors' }
        ]?.map((item) => (
          <div key={item?.status} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${getStatusColor(item?.status)}`}></div>
            <span className="text-xs text-muted-foreground">{item?.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropBloomCalendar;