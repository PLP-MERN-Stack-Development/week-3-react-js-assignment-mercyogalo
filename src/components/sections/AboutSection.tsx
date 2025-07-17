import React from 'react';
import { Code, Palette, Zap, Heart } from 'lucide-react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent, CustomCardDescription } from '@/components/ui/custom-card';

const AboutSection: React.FC = () => {
  const technologies = [
    {
      icon: Code,
      title: 'React + TypeScript',
      description: 'Modern component architecture with type safety',
      features: ['Hooks: useState, useEffect, useContext', 'Custom hooks for reusability', 'Component composition patterns'],
    },
    {
      icon: Palette,
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      features: ['Responsive design system', 'Dark/light theme support', 'Custom animations and transitions'],
    },
    {
      icon: Zap,
      title: 'Modern Tooling',
      description: 'Cutting-edge development tools and practices',
      features: ['Vite for fast development', 'React Router for navigation', 'Local storage persistence'],
    },
  ];

  const projectFeatures = [
    'Complete task management system',
    'API integration with JSONPlaceholder',
    'Responsive design for all devices',
    'State management with React hooks',
    'Local storage for data persistence',
    'Search and filtering functionality',
    'Pagination for large datasets',
    'Loading and error states',
    'Beautiful animations and transitions',
    'Theme switching (light/dark mode)',
  ];

  return (
    <section id="about" className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            About This Project
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            This is a comprehensive React.js learning project that demonstrates modern web development practices, 
            component architecture, state management, and API integration.
          </p>
        </div>

        {/* Technologies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <CustomCard
              key={tech.title}
              variant="elevated"
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CustomCardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                  <tech.icon className="h-6 w-6 text-white" />
                </div>
                <CustomCardTitle className="text-xl">{tech.title}</CustomCardTitle>
                <CustomCardDescription>{tech.description}</CustomCardDescription>
              </CustomCardHeader>
              <CustomCardContent>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CustomCardContent>
            </CustomCard>
          ))}
        </div>

        {/* Project Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              Project Features
            </h3>
            <p className="text-muted-foreground mb-6">
              This application showcases a complete implementation of modern React.js development practices, 
              from basic component creation to advanced state management and API integration.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projectFeatures.map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 rounded-full bg-success mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '800ms' }}>
            <CustomCard variant="gradient" className="text-center">
              <CustomCardContent className="p-8">
                <Heart className="h-12 w-12 text-white mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-white mb-4">
                  Built with Learning in Mind
                </h4>
                <p className="text-white/90 mb-6">
                  Every component, hook, and pattern in this application was carefully crafted to demonstrate 
                  React.js best practices and modern web development techniques.
                </p>
                <div className="grid grid-cols-2 gap-4 text-white/90">
                  <div>
                    <div className="text-2xl font-bold">5+</div>
                    <div className="text-sm">React Hooks</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">15+</div>
                    <div className="text-sm">Components</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-sm">TypeScript</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">✨</div>
                    <div className="text-sm">Beautiful</div>
                  </div>
                </div>
              </CustomCardContent>
            </CustomCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;