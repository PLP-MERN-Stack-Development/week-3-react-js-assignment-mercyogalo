import React from 'react';
import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { CustomCard, CustomCardContent } from '@/components/ui/custom-card';
import { Task } from '@/types';

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: TrendingUp,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    {
      label: 'Active',
      value: activeTasks,
      icon: Clock,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      label: 'High Priority',
      value: highPriorityTasks,
      icon: AlertTriangle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  ];

  if (totalTasks === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <CustomCard
          key={stat.label}
          variant="elevated"
          className="text-center animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CustomCardContent className="p-4">
            <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat.label}
            </div>
          </CustomCardContent>
        </CustomCard>
      ))}

      {/* Completion Rate */}
      {totalTasks > 0 && (
        <CustomCard variant="gradient" className="md:col-span-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <CustomCardContent className="p-4 text-center">
            <div className="text-white/90 text-sm font-medium mb-2">Completion Rate</div>
            <div className="text-3xl font-bold text-white mb-2">{completionRate}%</div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500 ease-out"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </CustomCardContent>
        </CustomCard>
      )}
    </div>
  );
};

export default TaskStats;