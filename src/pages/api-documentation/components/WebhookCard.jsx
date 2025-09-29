import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WebhookCard = ({ webhook }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEventTypeColor = (type) => {
    const colors = {
      'bloom.predicted': 'bg-success/10 text-success border-success/20',
      'bloom.confirmed': 'bg-primary/10 text-primary border-primary/20',
      'data.updated': 'bg-secondary/10 text-secondary border-secondary/20',
      'prediction.scored': 'bg-warning/10 text-warning border-warning/20',
      'user.achievement': 'bg-accent/10 text-accent border-accent/20'
    };
    return colors?.[type] || 'bg-muted/10 text-muted-foreground border-border';
  };

  return (
    <div className="bg-card border border-border rounded-card shadow-card hover:shadow-bloom transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-sky rounded-organic flex items-center justify-center">
                <Icon name="Webhook" size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{webhook?.name}</h3>
                <span className={`px-3 py-1 rounded-button text-xs font-medium border ${getEventTypeColor(webhook?.eventType)}`}>
                  {webhook?.eventType}
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{webhook?.description}</p>
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

        {/* Trigger Conditions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Trigger Conditions</h4>
          <div className="bg-muted/30 rounded-organic p-3">
            <p className="text-sm text-muted-foreground">{webhook?.triggerCondition}</p>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 animate-growth">
            {/* Payload Example */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Payload Example</h4>
              <div className="relative">
                <pre className="bg-muted/50 border border-border rounded-organic p-4 text-sm font-mono overflow-x-auto max-h-64">
                  <code className="text-foreground">
                    {JSON.stringify(webhook?.payloadExample, null, 2)}
                  </code>
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Copy"
                  iconSize={14}
                  className="absolute top-2 right-2 opacity-70 hover:opacity-100"
                  onClick={() => navigator.clipboard?.writeText(JSON.stringify(webhook?.payloadExample, null, 2))}
                >
                  Copy
                </Button>
              </div>
            </div>

            {/* Headers */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Request Headers</h4>
              <div className="space-y-2">
                {webhook?.headers?.map((header, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-organic">
                    <div className="flex items-center space-x-3">
                      <code className="text-primary font-mono text-sm">{header?.name}</code>
                      <span className="text-muted-foreground text-sm">{header?.description}</span>
                    </div>
                    <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                      {header?.example}
                    </code>
                  </div>
                ))}
              </div>
            </div>

            {/* Security */}
            <div className="bg-warning/5 border border-warning/20 rounded-organic p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Shield" size={16} className="text-warning" />
                <span className="text-sm font-medium text-warning">Security</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{webhook?.security}</p>
              
              <div className="bg-muted/50 rounded-organic p-3">
                <h5 className="text-xs font-medium text-foreground mb-2">Signature Verification</h5>
                <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                  <code>{webhook?.signatureExample}</code>
                </pre>
              </div>
            </div>

            {/* Retry Policy */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Retry Policy</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 rounded-organic p-3 text-center">
                  <div className="text-lg font-semibold text-primary">{webhook?.retryPolicy?.maxAttempts}</div>
                  <div className="text-xs text-muted-foreground">Max Attempts</div>
                </div>
                <div className="bg-muted/30 rounded-organic p-3 text-center">
                  <div className="text-lg font-semibold text-secondary">{webhook?.retryPolicy?.backoffStrategy}</div>
                  <div className="text-xs text-muted-foreground">Backoff Strategy</div>
                </div>
                <div className="bg-muted/30 rounded-organic p-3 text-center">
                  <div className="text-lg font-semibold text-accent">{webhook?.retryPolicy?.timeout}</div>
                  <div className="text-xs text-muted-foreground">Timeout</div>
                </div>
              </div>
            </div>

            {/* Test Webhook */}
            <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-organic">
              <div>
                <h5 className="text-sm font-medium text-foreground">Test This Webhook</h5>
                <p className="text-xs text-muted-foreground">Send a test payload to your endpoint</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                iconName="Send"
                iconPosition="left"
                iconSize={16}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Send Test
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookCard;