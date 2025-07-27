import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useResumeStore, Skill } from '@/lib/store';
import { Plus, Code, Users, Globe, X, Star } from 'lucide-react';

export const SkillsForm = () => {
  const { resumeData, addSkill, removeSkill } = useResumeStore();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const { register, handleSubmit, reset, setValue, watch } = useForm<Omit<Skill, 'id'>>();

  const category = watch('category');
  const level = watch('level');

  const onSubmit = (data: Omit<Skill, 'id'>) => {
    addSkill(data);
    reset();
    setIsAddingNew(false);
  };

  const getSkillsByCategory = (category: Skill['category']) => {
    return resumeData.skills.filter(skill => skill.category === category);
  };

  const getCategoryIcon = (category: Skill['category']) => {
    switch (category) {
      case 'technical':
        return <Code className="h-4 w-4" />;
      case 'soft':
        return <Users className="h-4 w-4" />;
      case 'language':
        return <Globe className="h-4 w-4" />;
    }
  };

  const getLevelStars = (level: Skill['level']) => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return levels[level] || 0;
  };

  const skillCategories: { value: Skill['category']; label: string; color: string }[] = [
    { value: 'technical', label: 'Technical Skills', color: 'bg-primary' },
    { value: 'soft', label: 'Soft Skills', color: 'bg-success' },
    { value: 'language', label: 'Languages', color: 'bg-accent' }
  ];

  return (
    <div className="space-y-6">
      {/* Skills by Category */}
      {skillCategories.map(categoryInfo => {
        const categorySkills = getSkillsByCategory(categoryInfo.value);
        return (
          <Card key={categoryInfo.value} className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              {getCategoryIcon(categoryInfo.value)}
              <h3 className="text-lg font-semibold text-foreground">{categoryInfo.label}</h3>
              <Badge variant="secondary" className="ml-auto">
                {categorySkills.length} skills
              </Badge>
            </div>
            
            {categorySkills.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg bg-card hover:shadow-sm transition-shadow"
                  >
                    <div className="flex-1">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <div className="flex items-center space-x-1 mt-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star
                            key={star}
                            className={`h-3 w-3 ${
                              star <= getLevelStars(skill.level)
                                ? 'text-yellow-500 fill-current'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="text-destructive hover:text-destructive ml-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No {categoryInfo.label.toLowerCase()} added yet.
              </p>
            )}
          </Card>
        );
      })}

      {/* Add New Skill */}
      {!isAddingNew ? (
        <Button
          variant="outline"
          onClick={() => setIsAddingNew(true)}
          className="w-full border-dashed border-primary text-primary hover:bg-primary-light"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      ) : (
        <Card className="p-6 border-primary">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add New Skill</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                placeholder="e.g., JavaScript, Leadership, Spanish"
                {...register('name', { required: true })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setValue('category', value as Skill['category'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Skills</SelectItem>
                    <SelectItem value="soft">Soft Skills</SelectItem>
                    <SelectItem value="language">Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Proficiency Level</Label>
                <Select onValueChange={(value) => setValue('level', value as Skill['level'])}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner ⭐</SelectItem>
                    <SelectItem value="intermediate">Intermediate ⭐⭐</SelectItem>
                    <SelectItem value="advanced">Advanced ⭐⭐⭐</SelectItem>
                    <SelectItem value="expert">Expert ⭐⭐⭐⭐</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="btn-primary" disabled={!category || !level}>
                Add Skill
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

      {resumeData.skills.length === 0 && !isAddingNew && (
        <Card className="p-8 text-center border-dashed border-primary">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center">
              <Code className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">No skills added yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Showcase your technical skills, soft skills, and languages.
              </p>
              <Button onClick={() => setIsAddingNew(true)} className="btn-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};