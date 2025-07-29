import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore, Project } from '@/lib/store';
import { Plus, Code, Calendar, Trash2, GripVertical, ExternalLink, Github } from 'lucide-react';

export const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm<Omit<Project, 'id'>>();
  const isCurrent = watch('current');

  const onSubmit = (data: Omit<Project, 'id'>) => {
    addProject(data);
    reset();
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Existing Projects List */}
      <div className="space-y-4">
        {resumeData.projects.map((project, index) => (
          <Card key={project.id} className="p-6 border-l-4 border-l-accent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <h3 className="font-semibold text-foreground">{project.name}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark">
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{project.startDate} - {project.current ? 'Present' : project.endDate}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                {project.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.achievements?.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {project.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Project */}
      {!isAddingNew ? (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full border-dashed border-accent text-accent hover:bg-accent-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      ) : (
        <Card className="p-6 border-accent">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add Project</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                placeholder="E-commerce Website"
                {...register('name', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="A full-stack e-commerce application built with React and Node.js"
                className="min-h-[80px]"
                {...register('description', { required: true })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="link">Live Demo URL (Optional)</Label>
                <Input
                  id="link"
                  placeholder="https://myproject.com"
                  {...register('link')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub Repository (Optional)</Label>
                <Input
                  id="github"
                  placeholder="https://github.com/username/project"
                  {...register('github')}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="month"
                  {...register('startDate', { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="month"
                  disabled={isCurrent}
                  {...register('endDate', { required: !isCurrent })}
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="current"
                    {...register('current')}
                    onCheckedChange={(checked) => {
                      setValue('current', checked as boolean);
                      if (checked) {
                        setValue('endDate', '');
                      }
                    }}
                  />
                  <Label htmlFor="current" className="text-sm font-medium">
                    Currently working on this
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies Used (comma-separated)</Label>
              <Input
                id="technologies"
                placeholder="React, Node.js, MongoDB, TypeScript"
                {...register('technologies', {
                  setValueAs: (value: string) =>
                    value.split(',').map(tech => tech.trim()).filter(tech => tech)
                })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Features & Achievements (one per line)</Label>
              <Textarea
                id="achievements"
                placeholder="• Implemented user authentication system&#10;• Integrated payment gateway&#10;• Achieved 99% uptime"
                className="min-h-[100px]"
                {...register('achievements', {
                  setValueAs: (value: string) =>
                    value.split('\n').filter(line => line.trim()).map(line => line.replace(/^[•\-*]\s*/, ''))
                })}
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="btn-primary">
                Add Project
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsAddingNew(false);
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      {resumeData.projects.length === 0 && !isAddingNew && (
        <Card className="p-8 text-center border-dashed border-accent">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center">
              <Code className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">No projects added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Showcase your projects to demonstrate your technical skills and experience.
              </p>
              <Button onClick={() => setIsAddingNew(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
