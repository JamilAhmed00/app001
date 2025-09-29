import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthenticationGuide = () => {
  const [selectedMethod, setSelectedMethod] = useState('api-key');

  const authMethods = [
    {
      id: 'api-key',
      name: 'API Key',
      icon: 'Key',
      description: 'Simple authentication using API keys',
      recommended: true
    },
    {
      id: 'oauth2',
      name: 'OAuth 2.0',
      icon: 'Shield',
      description: 'Secure OAuth 2.0 flow for user authentication',
      recommended: false
    },
    {
      id: 'jwt',
      name: 'JWT Tokens',
      icon: 'Lock',
      description: 'JSON Web Tokens for stateless authentication',
      recommended: false
    }
  ];

  const authExamples = {
    'api-key': {
      curl: `curl -X GET "https://api.bloomx.io/v1/predictions" \\
  -H "Authorization: Bearer YOUR_API_KEY"\ -H"Content-Type: application/json"`,
      javascript: `const response = await fetch('https://api.bloomx.io/v1/predictions', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});`,
      python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.bloomx.io/v1/predictions', headers=headers)`
    },
    'oauth2': {
      curl: `# Step 1: Get authorization code
curl -X GET "https://api.bloomx.io/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=read:predictions"

# Step 2: Exchange code for token
curl -X POST "https://api.bloomx.io/oauth/token" \\
  -H "Content-Type: application/x-www-form-urlencoded"\ -d"grant_type=authorization_code&code=AUTH_CODE&client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET"`,
      javascript: `// Step 1: Redirect to authorization
window.location.href = 'https://api.bloomx.io/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_REDIRECT_URI&scope=read:predictions';

// Step 2: Exchange code for token
const tokenResponse = await fetch('https://api.bloomx.io/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    code: authCode,
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
  })
});`,
      python: `import requests

# Step 1: Get authorization URL
auth_url = "https://api.bloomx.io/oauth/authorize"
params = {
    'client_id': 'YOUR_CLIENT_ID',
    'response_type': 'code',
    'redirect_uri': 'YOUR_REDIRECT_URI',
    'scope': 'read:predictions'
}

# Step 2: Exchange code for token
token_data = {
    'grant_type': 'authorization_code',
    'code': 'AUTH_CODE',
    'client_id': 'YOUR_CLIENT_ID',
    'client_secret': 'YOUR_CLIENT_SECRET'
}

token_response = requests.post('https://api.bloomx.io/oauth/token', data=token_data)`
    },
    'jwt': {
      curl: `curl -X GET "https://api.bloomx.io/v1/predictions" \\
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."\ -H"Content-Type: application/json"`,
      javascript: `const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

const response = await fetch('https://api.bloomx.io/v1/predictions', {
  headers: {
    'Authorization': \`Bearer \${jwt}\`,
    'Content-Type': 'application/json'
  }
});`,
      python: `import requests

jwt_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

headers = {
    'Authorization': f'Bearer {jwt_token}',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.bloomx.io/v1/predictions', headers=headers)`
    }
  };

  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  return (
    <div className="bg-card border border-border rounded-card shadow-card">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-gradient-bloom rounded-organic flex items-center justify-center">
            <Icon name="Shield" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Authentication</h2>
            <p className="text-muted-foreground text-sm">Secure access to BloomX API</p>
          </div>
        </div>

        {/* Authentication Methods */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-foreground mb-4">Authentication Methods</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {authMethods?.map((method) => (
              <button
                key={method?.id}
                onClick={() => setSelectedMethod(method?.id)}
                className={`p-4 rounded-card border-2 transition-all duration-300 text-left hover-bloom ${
                  selectedMethod === method?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon 
                    name={method?.icon} 
                    size={20} 
                    className={selectedMethod === method?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span className={`font-medium ${selectedMethod === method?.id ? 'text-primary' : 'text-foreground'}`}>
                    {method?.name}
                  </span>
                  {method?.recommended && (
                    <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-button">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{method?.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Code Examples */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground">Implementation Example</h3>
            <div className="flex space-x-1">
              {Object.keys(authExamples?.[selectedMethod])?.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1 rounded-button text-xs font-medium transition-colors duration-200 ${
                    selectedLanguage === lang
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {lang?.charAt(0)?.toUpperCase() + lang?.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto">
              <code className="text-foreground">{authExamples?.[selectedMethod]?.[selectedLanguage]}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              iconSize={14}
              className="absolute top-2 right-2 opacity-70 hover:opacity-100"
              onClick={() => navigator.clipboard?.writeText(authExamples?.[selectedMethod]?.[selectedLanguage])}
            >
              Copy
            </Button>
          </div>
        </div>

        {/* API Key Management */}
        {selectedMethod === 'api-key' && (
          <div className="bg-primary/5 border border-primary/20 rounded-organic p-4 mb-6">
            <h4 className="text-sm font-medium text-foreground mb-3">API Key Management</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-card rounded-organic border border-border">
                <div>
                  <div className="font-medium text-sm text-foreground">Production Key</div>
                  <div className="text-xs text-muted-foreground">Full access to all endpoints</div>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">bx_prod_••••••••••••••••</code>
                  <Button variant="ghost" size="sm" iconName="Eye" iconSize={14} />
                  <Button variant="ghost" size="sm" iconName="Copy" iconSize={14} />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-card rounded-organic border border-border">
                <div>
                  <div className="font-medium text-sm text-foreground">Development Key</div>
                  <div className="text-xs text-muted-foreground">Limited to 1000 requests/day</div>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="text-xs font-mono bg-muted px-2 py-1 rounded">bx_dev_••••••••••••••••</code>
                  <Button variant="ghost" size="sm" iconName="Eye" iconSize={14} />
                  <Button variant="ghost" size="sm" iconName="Copy" iconSize={14} />
                </div>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              iconSize={16}
              className="mt-3"
            >
              Generate New Key
            </Button>
          </div>
        )}

        {/* Security Best Practices */}
        <div className="bg-warning/5 border border-warning/20 rounded-organic p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">Security Best Practices</span>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5" />
              <span>Never expose API keys in client-side code or public repositories</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5" />
              <span>Use environment variables to store sensitive credentials</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5" />
              <span>Rotate API keys regularly and revoke unused keys</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5" />
              <span>Implement proper error handling for authentication failures</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5" />
              <span>Use HTTPS for all API requests to encrypt data in transit</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationGuide;