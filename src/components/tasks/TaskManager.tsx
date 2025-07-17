import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent } from '@/components/ui/custom-card';
import { Badge } from '@/components/ui/badge';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Task, TaskFilter } from '@/types';

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.completed) || 
      (filter === 'completed' && task.completed);
    
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskComplete = (id: string) => {
    updateTask(id, { 
      completed: !tasks.find(task => task.id === id)?.completed 
    });
  };

  const filterButtons = [
    { key: 'all' as TaskFilter, label: 'All', count: tasks.length },
    { key: 'active' as TaskFilter, label: 'Active', count: tasks.filter(t => !t.completed).length },
    { key: 'completed' as TaskFilter, label: 'Completed', count: tasks.filter(t => t.completed).length },
  ];

  return (
    <section id="tasks" className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Task Manager
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Organize your life with our beautiful and intuitive task management system. 
            Add, edit, and track your tasks with ease.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8">
          <TaskStats tasks={tasks} />
        </div>

        {/* Controls */}
        <CustomCard className="mb-8">
          <CustomCardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CustomCardTitle className="text-xl">Your Tasks</CustomCardTitle>
              <Button 
                onClick={() => setIsFormOpen(true)}
                variant="gradient"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </CustomCardHeader>
          
          <CustomCardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter:</span>
              </div>
              {filterButtons.map((filterBtn) => (
                <Button
                  key={filterBtn.key}
                  variant={filter === filterBtn.key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterBtn.key)}
                  className="flex items-center gap-2"
                >
                  {filterBtn.label}
                  <Badge variant="secondary" className="text-xs">
                    {filterBtn.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleTaskComplete}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />

            {/* Empty State */}
            {filteredTasks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filter'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {tasks.length === 0 
                    ? 'Get started by creating your first task!' 
                    : 'Try adjusting your search or filter criteria.'
                  }
                </p>
                {tasks.length === 0 && (
                  <Button onClick={() => setIsFormOpen(true)} variant="default">
                    Create Your First Task
                  </Button>
                )}
              </div>
            )}
          </CustomCardContent>
        </CustomCard>

        {/* Task Form Modal */}
        {isFormOpen && (
          <TaskForm
            onSubmit={addTask}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </div>
    </section>
  );
};

export default TaskManager;