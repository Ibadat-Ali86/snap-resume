import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useResumeStore, PersonalInfo } from '@/lib/store';
import { User, Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResumeStore();
  const { register, watch } = useForm<PersonalInfo>({
    defaultValues: resumeData.personalInfo
  });

  // Use callback ref to track if this is initial render
  const isInitialRender = React.useRef(true);

  // Watch form data
  const watchedData = watch();

  // Debounced update to prevent infinite loops
  React.useEffect(() => {
    // Skip initial render to prevent loop
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    // Only update if data has actually changed
    const hasChanges = Object.keys(watchedData).some(
      key => watchedData[key as keyof PersonalInfo] !== resumeData.personalInfo[key as keyof PersonalInfo]
    );

    if (hasChanges) {
      const timer = setTimeout(() => {
        updatePersonalInfo(watchedData);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [watchedData, updatePersonalInfo, resumeData.personalInfo]);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>First Name</span>
          </Label>
          <Input
            id="firstName"
            placeholder="Enter your first name"
            {...register('firstName')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>Last Name</span>
          </Label>
          <Input
            id="lastName"
            placeholder="Enter your last name"
            {...register('lastName')}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email Address</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            {...register('email')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Phone Number</span>
          </Label>
          <Input
            id="phone"
            placeholder="+1 (555) 123-4567"
            {...register('phone')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>Location</span>
        </Label>
        <Input
          id="location"
          placeholder="City, State, Country"
          {...register('location')}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Website (Optional)</span>
          </Label>
          <Input
            id="website"
            placeholder="https://yourwebsite.com"
            {...register('website')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center space-x-2">
            <Linkedin className="h-4 w-4" />
            <span>LinkedIn (Optional)</span>
          </Label>
          <Input
            id="linkedin"
            placeholder="https://linkedin.com/in/yourprofile"
            {...register('linkedin')}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
          className="min-h-[120px]"
          {...register('summary')}
        />
        <p className="text-sm text-muted-foreground">
          A compelling summary can significantly improve your chances of getting noticed by recruiters.
        </p>
      </div>

      <Card className="p-4 bg-primary-light border-primary">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-bold">💡</span>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-primary mb-1">Pro Tip</h4>
            <p className="text-sm text-primary">
              Use keywords from the job description in your summary to improve ATS compatibility.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};