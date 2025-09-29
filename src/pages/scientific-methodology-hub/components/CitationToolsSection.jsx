import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CitationToolsSection = () => {
  const [selectedFormat, setSelectedFormat] = useState('apa');
  const [selectedPublication, setSelectedPublication] = useState(0);

  const publications = [
    {
      id: 0,
      title: "Deep Learning Approaches for Global Bloom Prediction Using Satellite Imagery",
      authors: ["Chen, S.", "Rodriguez, M.", "Patel, A."],
      journal: "Nature Machine Intelligence",
      year: 2025,
      volume: 6,
      issue: 9,
      pages: "789-801",
      doi: "10.1038/s42256-025-00789-1",
      url: "https://doi.org/10.1038/s42256-025-00789-1"
    },
    {
      id: 1,
      title: "BloomX Platform: Democratizing Agricultural Bloom Prediction Through Citizen Science",
      authors: ["Wilson, J.", "Zhang, L.", "Kumar, R."],
      journal: "Environmental Research Letters",
      year: 2025,
      volume: 20,
      issue: 8,
      pages: "084012",
      doi: "10.1088/1748-9326/ab2f45",
      url: "https://doi.org/10.1088/1748-9326/ab2f45"
    }
  ];

  const citationFormats = [
    {
      id: 'apa',
      name: 'APA 7th Edition',
      description: 'American Psychological Association style'
    },
    {
      id: 'mla',
      name: 'MLA 9th Edition',
      description: 'Modern Language Association style'
    },
    {
      id: 'chicago',
      name: 'Chicago 17th Edition',
      description: 'Chicago Manual of Style'
    },
    {
      id: 'ieee',
      name: 'IEEE',
      description: 'Institute of Electrical and Electronics Engineers'
    },
    {
      id: 'harvard',
      name: 'Harvard',
      description: 'Harvard referencing system'
    },
    {
      id: 'bibtex',
      name: 'BibTeX',
      description: 'LaTeX bibliography format'
    }
  ];

  const generateCitation = (pub, format) => {
    const authorsStr = pub?.authors?.join(', ');
    const year = pub?.year;
    const title = pub?.title;
    const journal = pub?.journal;
    const volume = pub?.volume;
    const issue = pub?.issue;
    const pages = pub?.pages;
    const doi = pub?.doi;
    const url = pub?.url;

    switch (format) {
      case 'apa':
        return `${authorsStr} (${year}). ${title}. *${journal}*, *${volume}*(${issue}), ${pages}. https://doi.org/${doi}`;
      
      case 'mla':
        return `${authorsStr} "${title}." *${journal}*, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}, doi:${doi}.`;
      
      case 'chicago':
        return `${authorsStr} "${title}." *${journal}* ${volume}, no. ${issue} (${year}): ${pages}. https://doi.org/${doi}.`;
      
      case 'ieee':
        return `${authorsStr} "${title}," *${journal}*, vol. ${volume}, no. ${issue}, pp. ${pages}, ${year}, doi: ${doi}.`;
      
      case 'harvard':
        return `${authorsStr} ${year}, '${title}', *${journal}*, vol. ${volume}, no. ${issue}, pp. ${pages}, viewed [date], <${url}>.`;
      
      case 'bibtex':
        return `@article{${pub?.authors?.[0]?.split(',')?.[0]?.toLowerCase()}${year},
  title={${title}},
  author={${pub?.authors?.join(' and ')}},
  journal={${journal}},
  volume={${volume}},
  number={${issue}},
  pages={${pages}},
  year={${year}},
  publisher={Nature Publishing Group},
  doi={${doi}},
  url={${url}}
}`;
      
      default:
        return `${authorsStr} (${year}). ${title}. *${journal}*, *${volume}*(${issue}), ${pages}. https://doi.org/${doi}`;
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could add a toast notification here
      console.log('Citation copied to clipboard');
    });
  };

  const downloadCitation = (citation, format) => {
    const element = document.createElement('a');
    const file = new Blob([citation], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `citation_${format}.txt`;
    document.body?.appendChild(element);
    element?.click();
    document.body?.removeChild(element);
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section text-foreground mb-6">
            Citation Tools & Academic Resources
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Generate properly formatted citations for BloomX research publications 
            in multiple academic styles. Perfect for researchers, students, and academic institutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Publication Selection */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Select Publication</h3>
            <div className="space-y-3 mb-8">
              {publications?.map((pub, index) => (
                <button
                  key={pub?.id}
                  onClick={() => setSelectedPublication(index)}
                  className={`w-full text-left p-4 rounded-organic transition-all duration-300 ${
                    selectedPublication === index
                      ? 'bg-primary/10 border-2 border-primary shadow-bloom'
                      : 'bg-card border border-border hover:border-primary/50 hover:shadow-card'
                  }`}
                >
                  <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${
                    selectedPublication === index ? 'text-primary' : 'text-foreground'
                  }`}>
                    {pub?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {pub?.authors?.join(', ')}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{pub?.journal}</span>
                    <span>{pub?.year}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Citation Format Selection */}
            <h3 className="font-semibold text-foreground mb-4">Citation Format</h3>
            <div className="space-y-2">
              {citationFormats?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => setSelectedFormat(format?.id)}
                  className={`w-full text-left p-3 rounded-organic transition-all duration-300 ${
                    selectedFormat === format?.id
                      ? 'bg-secondary/10 border border-secondary text-secondary' :'bg-card border border-border hover:border-secondary/50 text-foreground'
                  }`}
                >
                  <div className="font-medium text-sm">{format?.name}</div>
                  <div className="text-xs opacity-75">{format?.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Citation Display */}
          <div className="lg:col-span-2">
            <div className="data-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Generated Citation
                </h3>
                <div className="flex items-center space-x-2">
                  <Icon name="Quote" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {citationFormats?.find(f => f?.id === selectedFormat)?.name}
                  </span>
                </div>
              </div>

              {/* Citation Preview */}
              <div className="bg-muted/30 rounded-organic p-6 mb-6 border-l-4 border-primary">
                <pre className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono">
                  {generateCitation(publications?.[selectedPublication], selectedFormat)}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="grid sm:grid-cols-3 gap-3 mb-8">
                <Button
                  variant="default"
                  iconName="Copy"
                  iconPosition="left"
                  onClick={() => copyToClipboard(generateCitation(publications?.[selectedPublication], selectedFormat))}
                  className="bg-primary hover:bg-primary/90"
                >
                  Copy Citation
                </Button>
                
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => downloadCitation(generateCitation(publications?.[selectedPublication], selectedFormat), selectedFormat)}
                >
                  Download
                </Button>
                
                <Button
                  variant="ghost"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Citation
                </Button>
              </div>

              {/* Publication Details */}
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-foreground mb-4">Publication Details</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">DOI:</span>
                      <div className="text-sm text-foreground font-mono">
                        {publications?.[selectedPublication]?.doi}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Journal:</span>
                      <div className="text-sm text-foreground">
                        {publications?.[selectedPublication]?.journal}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Volume/Issue:</span>
                      <div className="text-sm text-foreground">
                        Vol. {publications?.[selectedPublication]?.volume}, No. {publications?.[selectedPublication]?.issue}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Pages:</span>
                      <div className="text-sm text-foreground">
                        {publications?.[selectedPublication]?.pages}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Year:</span>
                      <div className="text-sm text-foreground">
                        {publications?.[selectedPublication]?.year}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">URL:</span>
                      <div className="text-sm text-primary hover:underline cursor-pointer">
                        {publications?.[selectedPublication]?.url}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Tools */}
            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div className="data-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-organic flex items-center justify-center">
                    <Icon name="BookOpen" size={20} className="text-accent" />
                  </div>
                  <h4 className="font-semibold text-foreground">Reference Manager</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Export citations directly to popular reference management tools.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" fullWidth iconName="ExternalLink" iconPosition="right">
                    Export to Zotero
                  </Button>
                  <Button variant="outline" size="sm" fullWidth iconName="ExternalLink" iconPosition="right">
                    Export to Mendeley
                  </Button>
                  <Button variant="outline" size="sm" fullWidth iconName="ExternalLink" iconPosition="right">
                    Export to EndNote
                  </Button>
                </div>
              </div>

              <div className="data-card">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-success/10 rounded-organic flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-success" />
                  </div>
                  <h4 className="font-semibold text-foreground">Bulk Citations</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate citations for multiple publications at once.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
                    Download All (APA)
                  </Button>
                  <Button variant="outline" size="sm" fullWidth iconName="Download" iconPosition="left">
                    Download All (BibTeX)
                  </Button>
                  <Button variant="ghost" size="sm" fullWidth iconName="Settings" iconPosition="left">
                    Custom Format
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CitationToolsSection;