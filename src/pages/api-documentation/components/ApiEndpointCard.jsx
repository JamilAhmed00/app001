import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ApiEndpointCard = ({ endpoint }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const getMethodColor = (method) => {
    const colors = {
      GET: 'bg-success/10 text-success border-success/20',
      POST: 'bg-secondary/10 text-secondary border-secondary/20',
      PUT: 'bg-warning/10 text-warning border-warning/20',
      DELETE: 'bg-error/10 text-error border-error/20',
      PATCH: 'bg-accent/10 text-accent border-accent/20'
    };
    return colors?.[method] || 'bg-muted/10 text-muted-foreground border-border';
  };

  const codeExamples = {
    curl: `curl -X ${endpoint?.method} \\
  "${endpoint?.url}" \\
  -H "Authorization: Bearer YOUR_API_KEY"\ -H"Content-Type: application/json"${endpoint?.method !== 'GET' ? ` \ -d'${JSON.stringify(endpoint?.requestBody || {}, null, 2)}'` : ''}`,
    javascript: `const response = await fetch('${endpoint?.url}', {
  method: '${endpoint?.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }${endpoint?.method !== 'GET' ? `,
  body: JSON.stringify(${JSON.stringify(endpoint?.requestBody || {}, null, 2)})` : ''}
});

const data = await response.json();
console.log(data);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.${endpoint?.method?.toLowerCase()}(
    '${endpoint?.url}',
    headers=headers${endpoint?.method !== 'GET' ? `,
    json=${JSON.stringify(endpoint?.requestBody || {}, null, 2)}` : ''}
)

data = response.json()
print(data)`,
    graphql: `query ${endpoint?.graphqlQuery || 'GetBloomData'} {
  ${endpoint?.graphqlFields || `bloomPredictions {
    id
    location
    species
    predictedDate
    confidence
  }`}
}`
  };

  return (
    <div className="bg-card border border-border rounded-card shadow-card hover:shadow-bloom transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-button text-xs font-medium border ${getMethodColor(endpoint?.method)}`}>
                {endpoint?.method}
              </span>
              <code className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                {endpoint?.path}
              </code>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{endpoint?.title}</h3>
            <p className="text-muted-foreground text-sm">{endpoint?.description}</p>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>

        {endpoint?.parameters && endpoint?.parameters?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Parameters</h4>
            <div className="space-y-2">
              {endpoint?.parameters?.map((param, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <code className="text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                    {param?.name}
                  </code>
                  <span className={`px-2 py-1 rounded text-xs ${param?.required ? 'bg-error/10 text-error' : 'bg-muted/50 text-muted-foreground'}`}>
                    {param?.required ? 'Required' : 'Optional'}
                  </span>
                  <span className="text-muted-foreground">{param?.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="space-y-6 animate-growth">
            {/* Code Examples */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">Code Examples</h4>
                <div className="flex space-x-1">
                  {Object.keys(codeExamples)?.map((lang) => (
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
                  <code className="text-foreground">{codeExamples?.[selectedLanguage]}</code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconSize={14}
                  className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                  onClick={() => navigator.clipboard?.writeText(codeExamples?.[selectedLanguage])}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Response Example */}
            {endpoint?.responseExample && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-3">Response Example</h4>
                <pre className="bg-success/5 border border-success/20 rounded-organic p-4 text-sm font-mono overflow-x-auto">
                  <code className="text-foreground">
                    {JSON.stringify(endpoint?.responseExample, null, 2)}
                  </code>
                </pre>
              </div>
            )}

            {/* Rate Limiting */}
            {endpoint?.rateLimit && (
              <div className="bg-warning/5 border border-warning/20 rounded-organic p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Rate Limiting</span>
                </div>
                <p className="text-sm text-muted-foreground">{endpoint?.rateLimit}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiEndpointCard;