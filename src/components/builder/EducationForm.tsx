import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useResumeStore, Education } from '@/lib/store';
import { Plus, GraduationCap, Calendar, Trash2, GripVertical } from 'lucide-react';

export const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { register, handleSubmit, reset } = useForm<Omit<Education, 'id'>>();

  const onSubmit = (data: Omit<Education, 'id'>) => {
    addEducation(data);
    reset();
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      {/* Existing Education List */}
      <div className="space-y-4">
        {resumeData.education.map((edu, index) => (
          <Card key={edu.id} className="p-6 border-l-4 border-l-accent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                  <h3 className="font-semibold text-foreground">{edu.degree} in {edu.field}</h3>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground mb-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{edu.institution}</span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>{edu.startDate} - {edu.endDate}</span>
                </div>
                {edu.gpa && (
                  <p className="text-sm text-muted-foreground mb-2">GPA: {edu.gpa}</p>
                )}
                {edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {edu.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Education */}
      {!isAddingNew ? (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full border-dashed border-accent text-accent hover:bg-accent-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      ) : (
        <Card className="p-6 border-accent">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add Education</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution Name</Label>
              <Input
                id="institution"
                placeholder="University of Technology"
                {...register('institution', { required: true })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree">Degree Type</Label>
                <Input
                  id="degree"
                  placeholder="Bachelor of Science"
                  {...register('degree', { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field">Field of Study</Label>
                <Input
                  id="field"
                  placeholder="Computer Science"
                  {...register('field', { required: true })}
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
                  {...register('endDate', { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa">GPA (Optional)</Label>
                <Input
                  id="gpa"
                  placeholder="3.8/4.0"
                  {...register('gpa')}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="achievements">Achievements & Activities (one per line)</Label>
              <Textarea
                id="achievements"
                placeholder="• Dean's List (3 semesters)&#10;• President of Computer Science Club&#10;• Graduated Magna Cum Laude"
                className="min-h-[100px]"
                 {...register('achievements', {
                  setValueAs: (value: string) => 
                    value.split('\n').filter(line => line.trim()).map(line => line.replace(/^[•\-*]\s*/, ''))
                })}
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="btn-primary">
                Add Education
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

      {resumeData.education.length === 0 && !isAddingNew && (
        <Card className="p-8 text-center border-dashed border-accent">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-accent-light rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">No education added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Add your educational background to strengthen your profile.
              </p>
              <Button onClick={() => setIsAddingNew(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your Education
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
