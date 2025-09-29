import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import ApiEndpointCard from './components/ApiEndpointCard';
import SdkCard from './components/SdkCard';
import WebhookCard from './components/WebhookCard';
import AuthenticationGuide from './components/AuthenticationGuide';
import InteractiveApiExplorer from './components/InteractiveApiExplorer';

const ApiDocumentation = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = 'API Documentation - BloomX Platform';
  }, []);

  const apiEndpoints = [
    {
      id: 'predictions',
      title: 'Get Bloom Predictions',
      method: 'GET',
      path: '/v1/predictions',
      url: 'https://api.bloomx.io/v1/predictions',
      description: 'Retrieve bloom predictions for specified locations and species with confidence scores and environmental factors.',
      parameters: [
        { name: 'location', required: false, description: 'Filter by location coordinates or name' },
        { name: 'species', required: false, description: 'Filter by plant species scientific name' },
        { name: 'date_range', required: false, description: 'Date range for predictions (YYYY-MM-DD to YYYY-MM-DD)' },
        { name: 'confidence_min', required: false, description: 'Minimum confidence threshold (0.0 to 1.0)' }
      ],
      responseExample: {
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
              "rainfall": 120.5
            }
          }
        ],
        "pagination": {
          "page": 1,
          "total": 156
        }
      },
      rateLimit: '1000 requests per hour for authenticated users'
    },
    {
      id: 'create-prediction',
      title: 'Submit Prediction',
      method: 'POST',
      path: '/v1/predictions',
      url: 'https://api.bloomx.io/v1/predictions',
      description: 'Submit a new bloom prediction as part of the citizen science program.',
      parameters: [
        { name: 'location', required: true, description: 'Location coordinates (lat, lng)' },
        { name: 'species', required: true, description: 'Plant species scientific name' },
        { name: 'predicted_date', required: true, description: 'Predicted bloom date (YYYY-MM-DD)' },
        { name: 'confidence', required: false, description: 'Your confidence in the prediction (0.0 to 1.0)' }
      ],
      requestBody: {
        "location": {
          "lat": 23.8103,
          "lng": 90.4125,
          "name": "Dhaka, Bangladesh"
        },
        "species": "Oryza sativa",
        "predicted_date": "2025-04-15",
        "confidence": 0.8,
        "notes": "Based on local weather patterns and soil conditions"
      },
      responseExample: {
        "data": {
          "id": "pred_002",
          "status": "created",
          "points_earned": 50,
          "message": "Prediction submitted successfully"
        }
      },
      rateLimit: '100 submissions per day for authenticated users'
    },
    {
      id: 'locations',
      title: 'Get Monitoring Locations',
      method: 'GET',
      path: '/v1/locations',
      url: 'https://api.bloomx.io/v1/locations',
      description: 'Retrieve all available monitoring locations with active sensor stations.',
      parameters: [
        { name: 'country', required: false, description: 'Filter by country code (ISO 3166-1 alpha-2)' },
        { name: 'region', required: false, description: 'Filter by administrative region' },
        { name: 'active_only', required: false, description: 'Show only locations with active sensors (true/false)' }
      ],
      responseExample: {
        "data": [
          {
            "id": "loc_001",
            "name": "Dhaka Division",
            "country": "BD",
            "coordinates": {
              "lat": 23.8103,
              "lng": 90.4125
            },
            "activeStations": 12,
            "lastUpdate": "2025-01-15T08:00:00Z"
          }
        ]
      },
      rateLimit: '2000 requests per hour'
    },
    {
      id: 'graphql',
      title: 'GraphQL Query',
      method: 'POST',
      path: '/graphql',
      url: 'https://api.bloomx.io/graphql',
      description: 'Flexible GraphQL endpoint for complex queries with real-time subscriptions.',
      graphqlQuery: 'GetBloomData',
      graphqlFields: `bloomPredictions(location: "Bangladesh", limit: 10) {
    id
    species
    predictedDate
    confidence
    location {
      name
      coordinates
    }
    factors {
      temperature
      humidity
      rainfall
    }
  }`,
      responseExample: {
        "data": {
          "bloomPredictions": [
            {
              "id": "pred_001",
              "species": "Oryza sativa",
              "predictedDate": "2025-04-15T00:00:00Z",
              "confidence": 0.87,
              "location": {
                "name": "Dhaka, Bangladesh",
                "coordinates": {
                  "lat": 23.8103,
                  "lng": 90.4125
                }
              }
            }
          ]
        }
      },
      rateLimit: 'Query complexity based rate limiting'
    }
  ];

  const sdkData = [
    {
      name: 'BloomX JavaScript SDK',
      language: 'JavaScript',
      version: '2.1.0',
      description: 'Official JavaScript/TypeScript SDK for web and Node.js applications with full TypeScript support.',
      isOfficial: true,
      installation: 'npm install @bloomx/sdk',
      quickStart: `import { BloomXClient } from '@bloomx/sdk';

const client = new BloomXClient({
  apiKey: 'your-api-key'
});

const predictions = await client.predictions.list({
  location: 'Bangladesh',
  species: 'Oryza sativa'
});`,
      features: [
        'TypeScript support',
        'Real-time subscriptions',
        'Automatic retries',
        'Request caching',
        'Error handling',
        'Rate limit management'
      ],
      downloads: '12.5K',
      stars: '234',
      forks: '45',
      lastUpdated: '2 days ago'
    },
    {
      name: 'BloomX Python SDK',
      language: 'Python',
      version: '1.8.2',
      description: 'Comprehensive Python SDK with pandas integration for data analysis and machine learning workflows.',
      isOfficial: true,
      installation: 'pip install bloomx-python',
      quickStart: `from bloomx import BloomXClient

client = BloomXClient(api_key='your-api-key')

predictions = client.predictions.list(
    location='Bangladesh',
    species='Oryza sativa'
)

# Convert to pandas DataFrame
df = predictions.to_dataframe()`,
      features: [
        'Pandas integration',
        'Async/await support',
        'Data visualization helpers',
        'Batch operations',
        'Scientific computing',
        'Jupyter notebook support'
      ],
      downloads: '8.7K',
      stars: '189',
      forks: '32',
      lastUpdated: '1 week ago'
    },
    {
      name: 'BloomX Java SDK',
      language: 'Java',
      version: '1.5.1',
      description: 'Enterprise-grade Java SDK with Spring Boot integration and comprehensive documentation.',
      isOfficial: true,
      installation: `<dependency>
  <groupId>io.bloomx</groupId>
  <artifactId>bloomx-java-sdk</artifactId>
  <version>1.5.1</version>
</dependency>`,
      quickStart: `BloomXClient client = BloomXClient.builder()
    .apiKey("your-api-key")
    .build();

PredictionRequest request = PredictionRequest.builder()
    .location("Bangladesh")
    .species("Oryza sativa")
    .build();

List<Prediction> predictions = client.predictions().list(request);`,
      features: [
        'Spring Boot integration',
        'Reactive programming',
        'Connection pooling',
        'Metrics collection',
        'Circuit breaker',
        'Enterprise security'
      ],
      downloads: '3.2K',
      stars: '67',
      forks: '18',
      lastUpdated: '3 days ago'
    }
  ];

  const webhookData = [
    {
      name: 'Bloom Prediction Created',
      eventType: 'bloom.predicted',
      description: 'Triggered when a new bloom prediction is generated by our AI models.',
      triggerCondition: 'New prediction with confidence score above 0.7 for monitored locations',
      payloadExample: {
        "event": "bloom.predicted",
        "timestamp": "2025-01-15T10:30:00Z",
        "data": {
          "prediction_id": "pred_001",
          "location": {
            "lat": 23.8103,
            "lng": 90.4125,
            "name": "Dhaka, Bangladesh"
          },
          "species": "Oryza sativa",
          "predicted_date": "2025-04-15T00:00:00Z",
          "confidence": 0.87,
          "model_version": "v2.1.0"
        }
      },
      headers: [
        {
          name: 'X-BloomX-Signature',
          description: 'HMAC-SHA256 signature for payload verification',
          example: 'sha256=a1b2c3d4e5f6...'
        },
        {
          name: 'X-BloomX-Event',
          description: 'Event type identifier',
          example: 'bloom.predicted'
        },
        {
          name: 'X-BloomX-Delivery',
          description: 'Unique delivery identifier',
          example: 'uuid-12345-67890'
        }
      ],
      security: 'All webhook payloads are signed using HMAC-SHA256 with your webhook secret. Verify the signature to ensure authenticity.',
      signatureExample: `const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');
  
  return \`sha256=\${expectedSignature}\` === signature;
}`,
      retryPolicy: {
        maxAttempts: '5',
        backoffStrategy: 'Exponential',
        timeout: '30s'
      }
    },
    {
      name: 'Bloom Confirmed',
      eventType: 'bloom.confirmed',
      description: 'Triggered when a bloom prediction is confirmed by citizen scientists or sensor data.',
      triggerCondition: 'Prediction confirmed by at least 3 independent sources within 48 hours',
      payloadExample: {
        "event": "bloom.confirmed",
        "timestamp": "2025-01-15T14:20:00Z",
        "data": {
          "prediction_id": "pred_001",
          "confirmation_sources": [
            {
              "type": "citizen_scientist",
              "user_id": "user_123",
              "timestamp": "2025-01-15T12:00:00Z"
            },
            {
              "type": "sensor_data",
              "station_id": "station_456",
              "timestamp": "2025-01-15T13:30:00Z"
            }
          ],
          "accuracy_score": 0.94
        }
      },
      headers: [
        {
          name: 'X-BloomX-Signature',
          description: 'HMAC-SHA256 signature for payload verification',
          example: 'sha256=b2c3d4e5f6g7...'
        },
        {
          name: 'X-BloomX-Event',
          description: 'Event type identifier',
          example: 'bloom.confirmed'
        }
      ],
      security: 'Webhook signatures must be verified within 5 minutes of delivery to prevent replay attacks.',
      signatureExample: `import hmac
import hashlib

def verify_signature(payload, signature, secret):
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    return f"sha256={expected_signature}" == signature`,
      retryPolicy: {
        maxAttempts: '3',
        backoffStrategy: 'Linear',
        timeout: '15s'
      }
    }
  ];

  const navigationSections = [
    { id: 'overview', name: 'Overview', icon: 'BookOpen' },
    { id: 'authentication', name: 'Authentication', icon: 'Shield' },
    { id: 'endpoints', name: 'API Endpoints', icon: 'Globe' },
    { id: 'graphql', name: 'GraphQL', icon: 'Code' },
    { id: 'sdks', name: 'SDKs & Libraries', icon: 'Package' },
    { id: 'webhooks', name: 'Webhooks', icon: 'Webhook' },
    { id: 'explorer', name: 'API Explorer', icon: 'Play' },
    { id: 'examples', name: 'Code Examples', icon: 'FileCode' }
  ];

  const filteredEndpoints = apiEndpoints?.filter(endpoint =>
    endpoint?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    endpoint?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Sidebar Navigation */}
          <div className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border overflow-y-auto">
            <div className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-foreground mb-2">API Documentation</h2>
                <p className="text-sm text-muted-foreground">Complete developer resources</p>
              </div>
              
              <nav className="space-y-1">
                {navigationSections?.map((section) => (
                  <button
                    key={section?.id}
                    onClick={() => setActiveSection(section?.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-organic transition-all duration-300 text-left ${
                      activeSection === section?.id
                        ? 'bg-primary/10 text-primary' :'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                  >
                    <Icon 
                      name={section?.icon} 
                      size={18} 
                      className={activeSection === section?.id ? 'text-primary' : 'text-muted-foreground'}
                    />
                    <span className="font-medium text-sm">{section?.name}</span>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/interactive-globe-dashboard"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Icon name="Globe" size={14} />
                    <span>Globe Dashboard</span>
                  </Link>
                  <Link
                    to="/gamified-prediction-arena"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Icon name="Target" size={14} />
                    <span>Prediction Arena</span>
                  </Link>
                  <Link
                    to="/scientific-methodology-hub"
                    className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <Icon name="BookOpen" size={14} />
                    <span>Methodology Hub</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 ml-64">
            <div className="max-w-6xl mx-auto p-6 space-y-8">
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <div className="space-y-8">
                  {/* Hero Section */}
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-bloom rounded-organic mx-auto mb-6 flex items-center justify-center animate-pulse-organic">
                      <Icon name="Code" size={40} className="text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-4">BloomX API Documentation</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                      Comprehensive developer resources for accessing BloomX datasets and contributing to the world's largest bloom prediction platform.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Button
                        variant="default"
                        iconName="Play"
                        iconPosition="left"
                        iconSize={16}
                        onClick={() => setActiveSection('explorer')}
                        className="bg-gradient-bloom hover:shadow-bloom"
                      >
                        Try API Explorer
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Download"
                        iconPosition="left"
                        iconSize={16}
                        onClick={() => setActiveSection('sdks')}
                      >
                        Download SDKs
                      </Button>
                      <Button
                        variant="ghost"
                        iconName="BookOpen"
                        iconPosition="left"
                        iconSize={16}
                        onClick={() => setActiveSection('authentication')}
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-card border border-border rounded-card p-6 shadow-card hover:shadow-bloom transition-all duration-300 hover-bloom">
                      <div className="w-12 h-12 bg-gradient-bloom rounded-organic flex items-center justify-center mb-4">
                        <Icon name="Zap" size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Real-time Data</h3>
                      <p className="text-muted-foreground text-sm">
                        Access live bloom predictions with WebSocket subscriptions and real-time updates from our global sensor network.
                      </p>
                    </div>

                    <div className="bg-card border border-border rounded-card p-6 shadow-card hover:shadow-bloom transition-all duration-300 hover-bloom">
                      <div className="w-12 h-12 bg-gradient-sky rounded-organic flex items-center justify-center mb-4">
                        <Icon name="Globe" size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Global Coverage</h3>
                      <p className="text-muted-foreground text-sm">
                        Comprehensive data from 50+ countries with special focus on Bangladesh's agricultural regions and biodiversity.
                      </p>
                    </div>

                    <div className="bg-card border border-border rounded-card p-6 shadow-card hover:shadow-bloom transition-all duration-300 hover-bloom">
                      <div className="w-12 h-12 bg-gradient-sunset rounded-organic flex items-center justify-center mb-4">
                        <Icon name="Shield" size={24} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Enterprise Security</h3>
                      <p className="text-muted-foreground text-sm">
                        Bank-level security with OAuth 2.0, API key management, and comprehensive audit logging for enterprise users.
                      </p>
                    </div>
                  </div>

                  {/* API Stats */}
                  <div className="bg-card border border-border rounded-card p-8 shadow-card">
                    <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">API Statistics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">2.5M+</div>
                        <div className="text-sm text-muted-foreground">API Calls/Month</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary mb-2">99.9%</div>
                        <div className="text-sm text-muted-foreground">Uptime SLA</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-success mb-2">150ms</div>
                        <div className="text-sm text-muted-foreground">Avg Response Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-warning mb-2">50+</div>
                        <div className="text-sm text-muted-foreground">Countries Covered</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication Section */}
              {activeSection === 'authentication' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Authentication</h1>
                    <p className="text-lg text-muted-foreground">
                      Secure your API access with multiple authentication methods
                    </p>
                  </div>
                  <AuthenticationGuide />
                </div>
              )}

              {/* API Endpoints Section */}
              {activeSection === 'endpoints' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">API Endpoints</h1>
                      <p className="text-lg text-muted-foreground">
                        Complete reference for all available endpoints
                      </p>
                    </div>
                    <div className="w-80">
                      <div className="relative">
                        <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search endpoints..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e?.target?.value)}
                          className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-border rounded-organic text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {filteredEndpoints?.map((endpoint) => (
                      <ApiEndpointCard key={endpoint?.id} endpoint={endpoint} />
                    ))}
                  </div>
                </div>
              )}

              {/* GraphQL Section */}
              {activeSection === 'graphql' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">GraphQL API</h1>
                    <p className="text-lg text-muted-foreground">
                      Flexible queries with real-time subscriptions
                    </p>
                  </div>

                  <div className="bg-card border border-border rounded-card p-8 shadow-card">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4">GraphQL Endpoint</h3>
                        <div className="bg-muted/50 rounded-organic p-4 mb-4">
                          <code className="text-primary font-mono">https://api.bloomx.io/graphql</code>
                        </div>
                        
                        <h4 className="text-lg font-medium text-foreground mb-3">Example Query</h4>
                        <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto">
                          <code className="text-foreground">{`query GetBloomPredictions {
  bloomPredictions(
    location: "Bangladesh" species:"Oryza sativa"
    limit: 10
  ) {
    id
    predictedDate
    confidence
    location {
      name
      coordinates {
        lat
        lng
      }
    }
    species
    factors {
      temperature
      humidity
      rainfall
    }
  }
}`}</code>
                        </pre>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-4">Real-time Subscriptions</h3>
                        <p className="text-muted-foreground mb-4">
                          Subscribe to real-time updates for bloom predictions and confirmations.
                        </p>
                        
                        <h4 className="text-lg font-medium text-foreground mb-3">Example Subscription</h4>
                        <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto">
                          <code className="text-foreground">{`subscription BloomUpdates {
  bloomPredictionUpdated(
    location: "Bangladesh"
  ) {
    id
    predictedDate
    confidence
    status
    location {
      name
    }
  }
}`}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SDKs Section */}
              {activeSection === 'sdks' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">SDKs & Libraries</h1>
                    <p className="text-lg text-muted-foreground">
                      Official SDKs for popular programming languages
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {sdkData?.map((sdk, index) => (
                      <SdkCard key={index} sdk={sdk} />
                    ))}
                  </div>
                </div>
              )}

              {/* Webhooks Section */}
              {activeSection === 'webhooks' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Webhooks</h1>
                    <p className="text-lg text-muted-foreground">
                      Real-time notifications for bloom events and data updates
                    </p>
                  </div>

                  <div className="space-y-6">
                    {webhookData?.map((webhook, index) => (
                      <WebhookCard key={index} webhook={webhook} />
                    ))}
                  </div>
                </div>
              )}

              {/* API Explorer Section */}
              {activeSection === 'explorer' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Interactive API Explorer</h1>
                    <p className="text-lg text-muted-foreground">
                      Test API endpoints directly in your browser
                    </p>
                  </div>
                  <InteractiveApiExplorer />
                </div>
              )}

              {/* Code Examples Section */}
              {activeSection === 'examples' && (
                <div className="space-y-8">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Code Examples</h1>
                    <p className="text-lg text-muted-foreground">
                      Ready-to-use code snippets for common use cases
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-card p-6 shadow-card">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Basic Prediction Fetching</h3>
                      <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto">
                        <code className="text-foreground">{`// JavaScript Example
const client = new BloomXClient({
  apiKey: 'your-api-key'
});

const predictions = await client.predictions.list({
  location: 'Bangladesh',
  species: 'Oryza sativa',
  confidence_min: 0.8
});

console.log(predictions.data);`}</code>
                      </pre>
                    </div>

                    <div className="bg-card border border-border rounded-card p-6 shadow-card">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Real-time Subscriptions</h3>
                      <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto">
                        <code className="text-foreground">{`// WebSocket Subscription
const ws = new WebSocket('wss://api.bloomx.io/ws');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'bloom.predicted') {
    console.log('New prediction:', data.payload);
  }
};

ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'bloom-predictions',
  filters: { location: 'Bangladesh' }
}));`}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocumentation;