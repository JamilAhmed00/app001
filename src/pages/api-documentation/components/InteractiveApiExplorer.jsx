import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const InteractiveApiExplorer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('predictions');
  const [requestData, setRequestData] = useState('');
  const [responseData, setResponseData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const endpoints = [
    {
      id: 'predictions',
      name: 'Get Predictions',
      method: 'GET',
      path: '/v1/predictions',
      description: 'Retrieve bloom predictions for specified locations'
    },
    {
      id: 'create-prediction',
      name: 'Create Prediction',
      method: 'POST',
      path: '/v1/predictions',
      description: 'Submit a new bloom prediction'
    },
    {
      id: 'locations',
      name: 'Get Locations',
      method: 'GET',
      path: '/v1/locations',
      description: 'Retrieve available monitoring locations'
    },
    {
      id: 'species',
      name: 'Get Species',
      method: 'GET',
      path: '/v1/species',
      description: 'Retrieve supported plant species'
    }
  ];

  const sampleResponses = {
    predictions: {
      "data": [
        {
          "id": "pred_001",
          "location": {
            "lat": 23.8103,
            "lng": 90.4125,
            "name": "Dhaka, Bangladesh"
          },
          "species": "Oryza sativa",
          "commonName": "Rice",
          "predictedBloomDate": "2025-04-15T00:00:00Z",
          "confidence": 0.87,
          "factors": {
            "temperature": 28.5,
            "humidity": 75,
            "rainfall": 120.5,
            "soilMoisture": 0.65
          },
          "createdAt": "2025-01-15T10:30:00Z"
        }
      ],
      "pagination": {
        "page": 1,
        "limit": 10,
        "total": 156,
        "hasNext": true
      }
    },
    'create-prediction': {
      "data": {
        "id": "pred_002",
        "status": "created",
        "message": "Prediction submitted successfully"
      }
    },
    locations: {
      "data": [
        {
          "id": "loc_001",
          "name": "Dhaka Division",
          "country": "Bangladesh",
          "coordinates": {
            "lat": 23.8103,
            "lng": 90.4125
          },
          "activeStations": 12,
          "lastUpdate": "2025-01-15T08:00:00Z"
        }
      ]
    },
    species: {
      "data": [
        {
          "id": "species_001",
          "scientificName": "Oryza sativa",
          "commonName": "Rice",
          "family": "Poaceae",
          "bloomSeason": "April-May",
          "regions": ["Bangladesh", "India", "Thailand"]
        }
      ]
    }
  };

  const handleTryIt = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponseData(JSON.stringify(sampleResponses?.[selectedEndpoint], null, 2));
      setIsLoading(false);
    }, 1500);
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-success/10 text-success border-success/20',
      POST: 'bg-secondary/10 text-secondary border-secondary/20',
      PUT: 'bg-warning/10 text-warning border-warning/20',
      DELETE: 'bg-error/10 text-error border-error/20'
    };
    return colors?.[method] || 'bg-muted/10 text-muted-foreground border-border';
  };

  const selectedEndpointData = endpoints?.find(ep => ep?.id === selectedEndpoint);

  return (
    <div className="bg-card border border-border rounded-card shadow-card">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-sky rounded-organic flex items-center justify-center">
            <Icon name="Play" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Interactive API Explorer</h2>
            <p className="text-muted-foreground text-sm">Test API endpoints directly in your browser</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Request</h3>
            
            {/* Endpoint Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select Endpoint</label>
              <div className="space-y-2">
                {endpoints?.map((endpoint) => (
                  <button
                    key={endpoint?.id}
                    onClick={() => setSelectedEndpoint(endpoint?.id)}
                    className={`w-full p-3 rounded-organic border-2 transition-all duration-300 text-left hover-bloom ${
                      selectedEndpoint === endpoint?.id
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-1">
                      <span className={`px-2 py-1 rounded-button text-xs font-medium border ${getMethodColor(endpoint?.method)}`}>
                        {endpoint?.method}
                      </span>
                      <code className="text-sm font-mono text-foreground">{endpoint?.path}</code>
                    </div>
                    <div className="text-sm font-medium text-foreground">{endpoint?.name}</div>
                    <div className="text-xs text-muted-foreground">{endpoint?.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* API Key Input */}
            <Input
              label="API Key"
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e?.target?.value)}
              description="Your API key will be used for authentication"
            />

            {/* Request Body (for POST requests) */}
            {selectedEndpointData?.method === 'POST' && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Request Body</label>
                <textarea
                  value={requestData}
                  onChange={(e) => setRequestData(e?.target?.value)}
                  placeholder="Enter JSON request body..."
                  className="w-full h-32 p-3 bg-muted/50 border border-border rounded-organic text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            )}

            {/* Try It Button */}
            <Button
              variant="default"
              fullWidth
              loading={isLoading}
              iconName="Send"
              iconPosition="left"
              iconSize={16}
              onClick={handleTryIt}
              disabled={!apiKey}
              className="bg-gradient-bloom hover:shadow-bloom"
            >
              {isLoading ? 'Sending Request...' : 'Try It Out'}
            </Button>
          </div>

          {/* Response Panel */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Response</h3>
            
            {/* Response Status */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-success">200 OK</span>
              </div>
              <div className="text-sm text-muted-foreground">Response time: 245ms</div>
            </div>

            {/* Response Headers */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Response Headers</label>
              <div className="bg-muted/30 rounded-organic p-3 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Content-Type:</span>
                  <span className="font-mono">application/json</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">X-RateLimit-Remaining:</span>
                  <span className="font-mono">999</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">X-Response-Time:</span>
                  <span className="font-mono">245ms</span>
                </div>
              </div>
            </div>

            {/* Response Body */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Response Body</label>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconSize={14}
                  onClick={() => navigator.clipboard?.writeText(responseData)}
                  disabled={!responseData}
                >
                  Copy
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto h-64">
                  <code className="text-foreground">
                    {responseData || '// Response will appear here after making a request'}
                  </code>
                </pre>
                {isLoading && (
                  <div className="absolute inset-0 bg-card/80 flex items-center justify-center rounded-organic">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm text-muted-foreground">Loading response...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Response Analysis */}
            {responseData && (
              <div className="bg-success/5 border border-success/20 rounded-organic p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-success">Request Successful</span>
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>• Response contains {JSON.parse(responseData)?.data?.length || 1} record(s)</div>
                  <div>• All required fields are present</div>
                  <div>• Response time within acceptable limits</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveApiExplorer;