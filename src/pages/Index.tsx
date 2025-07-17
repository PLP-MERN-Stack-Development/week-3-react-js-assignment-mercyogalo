import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/sections/HeroSection';
import TaskManager from '@/components/tasks/TaskManager';
import PostList from '@/components/posts/PostList';
import AboutSection from '@/components/sections/AboutSection';
import { ThemeProvider } from '@/contexts/ThemeContext';

const Index = () => {
  return (
    <ThemeProvider>
      <Layout>
        <HeroSection />
        <TaskManager />
        <PostList />
        <AboutSection />
      </Layout>
    </ThemeProvider>
  );
};

export default Index;
