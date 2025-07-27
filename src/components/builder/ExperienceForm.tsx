import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore, Experience } from '@/lib/store';
import { Plus, Building, Calendar, Trash2, GripVertical } from 'lucide-react';

export const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { register, handleSubmit, reset, watch, setValue } = useForm<Omit<Experience, 'id'>>();

  const onSubmit = (data: Omit<Experience, 'id'>) => {
    addExperience(data);
    reset();
    setIsAddingNew(false);
  };

  const currentRole = watch('current');

  return (
    <div className="space-y-6">
      {/* Existing Experience List */}
      <div className="space-y-4">
        {resumeData.experience.map((exp, index) => (
          <Card key={exp.id} className="p-6 border-l-4 border-l-primary">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <h3 className="font-semibold text-foreground">{exp.position}</h3>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                  <Building className="h-4 w-4" />
                  <span>{exp.company}</span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                {exp.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))
                  }
                  </ul>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Experience */}
      {!isAddingNew ? (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full border-dashed border-primary text-primary hover:bg-primary-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Work Experience
        </Button>
      ) : (
        <Card className="p-6 border-primary">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add Work Experience</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Job Title</Label>
                <Input
                  id="position"
                  placeholder="Software Developer"
                  {...register('position', { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  placeholder="Tech Company Inc."
                  {...register('company', { required: true })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  disabled={currentRole}
                  {...register('endDate')}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="current"
                onCheckedChange={(checked) => {
                  setValue('current', !!checked);
                  if (checked) setValue('endDate', '');
                }}
              />
              <Label htmlFor="current" className="text-sm">
                I currently work here
              </Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your role, responsibilities, and key contributions..."
                className="min-h-[100px]"
                {...register('description')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Key Achievements (one per line)</Label>
              <Textarea
                id="achievements"
                placeholder="• Increased team productivity by 25% through process optimization&#10;• Led development of new feature that improved user engagement by 40%&#10;• Mentored 3 junior developers"
                className="min-h-[120px]"
                {...register('achievements', {
                  setValueAs: (value: string) => 
                    value.split('\n').filter(line => line.trim()).map(line => line.replace(/^[•\-*]\s*/, ''))
                })}
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="btn-primary">
                Add Experience
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

      {resumeData.experience.length === 0 && !isAddingNew && (
        <Card className="p-8 text-center border-dashed border-primary">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">No work experience added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your professional experience to showcase your career journey.
              </p>
              <Button onClick={() => setIsAddingNew(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
