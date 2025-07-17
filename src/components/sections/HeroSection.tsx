import React from 'react';
import { ArrowDown, CheckCircle, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomCard, CustomCardContent } from '@/components/ui/custom-card';

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Task Management',
      description: 'Organize and track your tasks efficiently',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built with modern React and optimized performance',
    },
    {
      icon: Clock,
      title: 'Real-time Updates',
      description: 'See changes instantly with live data updates',
    },
  ];

  const scrollToTasks = () => {
    document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-xl" />

      <div className="container mx-auto max-w-6xl relative">
        <div className="text-center mb-16">
          {/* Main Hero Content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
              TaskMaster
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
              A beautiful and powerful task management application built with{' '}
              <span className="text-primary font-semibold">React</span>,{' '}
              <span className="text-accent font-semibold">Tailwind CSS</span>, and modern web technologies.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button
              size="lg"
              variant="gradient"
              onClick={scrollToTasks}
              className="text-lg px-8 py-4"
            >
              Get Started
              <ArrowDown className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-lg px-8 py-4"
            >
              Explore Posts
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <CustomCard
                key={feature.title}
                variant="elevated"
                className="text-center animate-fade-in"
                style={{ animationDelay: `${600 + index * 150}ms` }}
              >
                <CustomCardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary mx-auto mb-4 flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CustomCardContent>
              </CustomCard>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center animate-fade-in" style={{ animationDelay: '1000ms' }}>
          <p className="text-sm text-muted-foreground mb-4">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'React Router'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;