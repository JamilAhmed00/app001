import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const EconomicImpactDashboard = ({ selectedDistrict, selectedCrop }) => {
  const [impactData, setImpactData] = useState({});
  const [activeTab, setActiveTab] = useState('yield');

  useEffect(() => {
    // Mock economic impact data
    const mockImpactData = {
      yield: [
        { month: 'Jan', predicted: 2.8, actual: 2.6, target: 3.0 },
        { month: 'Feb', predicted: 3.2, actual: 3.1, target: 3.5 },
        { month: 'Mar', predicted: 3.8, actual: 3.6, target: 4.0 },
        { month: 'Apr', predicted: 4.2, actual: 4.0, target: 4.5 },
        { month: 'May', predicted: 4.8, actual: 4.5, target: 5.0 },
        { month: 'Jun', predicted: 5.2, actual: 4.9, target: 5.5 }
      ],
      revenue: [
        { district: 'Dhaka', revenue: 125000, growth: 8.5 },
        { district: 'Chittagong', revenue: 98000, growth: 12.3 },
        { district: 'Sylhet', revenue: 87000, growth: 6.7 },
        { district: 'Rajshahi', revenue: 156000, growth: 15.2 },
        { district: 'Khulna', revenue: 78000, growth: 9.8 }
      ],
      distribution: [
        { name: 'Local Market', value: 45, color: '#2ECC71' },
        { name: 'Export', value: 30, color: '#3498DB' },
        { name: 'Processing', value: 20, color: '#F39C12' },
        { name: 'Storage', value: 5, color: '#E74C3C' }
      ],
      metrics: {
        totalFarmers: 12450,
        avgIncome: 45600,
        yieldIncrease: 12.8,
        costReduction: 8.5,
        marketPrice: 28.50,
        priceChange: 5.2
      }
    };

    setImpactData(mockImpactData);
  }, [selectedDistrict, selectedCrop]);

  const tabs = [
    { id: 'yield', label: 'Yield Analysis', icon: 'TrendingUp' },
    { id: 'revenue', label: 'Revenue Impact', icon: 'DollarSign' },
    { id: 'distribution', label: 'Market Distribution', icon: 'PieChart' }
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    })?.format(value);
  };

  const renderYieldChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={impactData?.yield}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#7F8C8D" />
          <YAxis stroke="#7F8C8D" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            stroke="#3498DB" 
            strokeWidth={3}
            name="Predicted Yield (tons/hectare)"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#2ECC71" 
            strokeWidth={3}
            name="Actual Yield (tons/hectare)"
          />
          <Line 
            type="monotone" 
            dataKey="target" 
            stroke="#F39C12" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Target Yield (tons/hectare)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  const renderRevenueChart = () => (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={impactData?.revenue}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="district" stroke="#7F8C8D" />
          <YAxis stroke="#7F8C8D" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#FFFFFF', 
              border: '1px solid #E5E7EB',
              borderRadius: '8px'
            }}
            formatter={(value) => [formatCurrency(value), 'Revenue']}
          />
          <Bar dataKey="revenue" fill="#27AE60" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  const renderDistributionChart = () => (
    <div className="h-80 flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={impactData?.distribution}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}%`}
          >
            {impactData?.distribution?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-card p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Economic Impact Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Financial analysis and market insights
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Icon name="Download" size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Export Report</span>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-success/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-success" />
            <span className="text-xs text-success font-medium">Farmers</span>
          </div>
          <div className="text-xl font-bold text-success">{impactData?.metrics?.totalFarmers?.toLocaleString()}</div>
        </div>

        <div className="bg-primary/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-primary" />
            <span className="text-xs text-primary font-medium">Avg Income</span>
          </div>
          <div className="text-xl font-bold text-primary">{formatCurrency(impactData?.metrics?.avgIncome || 0)}</div>
        </div>

        <div className="bg-accent/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-accent" />
            <span className="text-xs text-accent font-medium">Yield ↑</span>
          </div>
          <div className="text-xl font-bold text-accent">+{impactData?.metrics?.yieldIncrease}%</div>
        </div>

        <div className="bg-secondary/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-secondary" />
            <span className="text-xs text-secondary font-medium">Cost ↓</span>
          </div>
          <div className="text-xl font-bold text-secondary">-{impactData?.metrics?.costReduction}%</div>
        </div>

        <div className="bg-warning/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-warning" />
            <span className="text-xs text-warning font-medium">Price/kg</span>
          </div>
          <div className="text-xl font-bold text-warning">৳{impactData?.metrics?.marketPrice}</div>
        </div>

        <div className="bg-error/10 p-4 rounded-organic">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-error" />
            <span className="text-xs text-error font-medium">Price Change</span>
          </div>
          <div className="text-xl font-bold text-error">+{impactData?.metrics?.priceChange}%</div>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-organic">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-button transition-all duration-300 ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-bloom'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="text-sm font-medium">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Content */}
      <div className="animate-growth">
        {activeTab === 'yield' && renderYieldChart()}
        {activeTab === 'revenue' && renderRevenueChart()}
        {activeTab === 'distribution' && renderDistributionChart()}
      </div>
      {/* Insights */}
      <div className="mt-6 p-4 bg-gradient-bloom rounded-organic text-white">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="mt-0.5" />
          <div>
            <h3 className="font-semibold mb-2">Key Insights</h3>
            <ul className="text-sm space-y-1 opacity-90">
              <li>• Bloom predictions have improved yield accuracy by 12.8% this season</li>
              <li>• Early bloom detection saved farmers ৳8.5M in preventive measures</li>
              <li>• Export opportunities increased by 30% due to quality improvements</li>
              <li>• Optimal harvest timing reduced post-harvest losses by 15%</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicImpactDashboard;