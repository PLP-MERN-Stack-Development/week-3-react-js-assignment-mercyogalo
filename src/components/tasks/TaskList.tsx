import React, { useState } from 'react';
import { Check, Edit, Trash2, Clock, AlertCircle, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CustomCard, CustomCardContent } from '@/components/ui/custom-card';
import { Task } from '@/types';
import TaskForm from './TaskForm';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onUpdateTask,
  onDeleteTask,
}) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'medium':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'low':
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleEditSubmit = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      onUpdateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <>
      <div className="space-y-3">
        {tasks.map((task, index) => (
          <CustomCard
            key={task.id}
            variant="default"
            className={`transition-all duration-300 hover:shadow-medium ${
              task.completed ? 'opacity-75' : ''
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CustomCardContent className="p-4">
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <Button
                  variant="ghost"
                  size="icon"
                  className={`mt-1 rounded-full transition-all duration-200 ${
                    task.completed 
                      ? 'bg-success hover:bg-success/90 text-success-foreground' 
                      : 'hover:bg-accent'
                  }`}
                  onClick={() => onToggleComplete(task.id)}
                >
                  {task.completed ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                </Button>

                {/* Task Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3
                        className={`font-medium text-foreground mb-1 ${
                          task.completed ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p
                          className={`text-sm text-muted-foreground mb-2 ${
                            task.completed ? 'line-through' : ''
                          }`}
                        >
                          {task.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(task.priority)}
                          <Badge 
                            variant={getPriorityColor(task.priority) as any}
                            className="text-xs capitalize"
                          >
                            {task.priority}
                          </Badge>
                        </div>
                        <span>Created {formatDate(task.createdAt)}</span>
                        {task.updatedAt !== task.createdAt && (
                          <span>Updated {formatDate(task.updatedAt)}</span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity duration-200">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => setEditingTask(task)}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => onDeleteTask(task.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CustomCardContent>
          </CustomCard>
        ))}
      </div>

      {/* Edit Task Modal */}
      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditingTask(null)}
        />
      )}
    </>
  );
};

export default TaskList;