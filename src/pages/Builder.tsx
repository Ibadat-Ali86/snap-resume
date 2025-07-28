import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Download, Eye, Save, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth-store';
import { PersonalInfoForm } from '@/components/builder/PersonalInfoForm';
import { ExperienceForm } from '@/components/builder/ExperienceForm';
import { EducationForm } from '@/components/builder/EducationForm';
import { ProjectsForm } from '@/components/builder/ProjectsForm';
import { SkillsForm } from '@/components/builder/SkillsForm';
import { ResumePreview } from '@/components/builder/ResumePreview';
import { useResumeStore } from '@/lib/store';
import { toast } from '@/hooks/use-toast';

const Builder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { resumeData, saveResume, downloadPDF } = useResumeStore();
  const { user, signOut } = useAuthStore();

  const handleSave = async () => {
    const success = await saveResume();
    if (success) {
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
    } else {
      toast({
        title: "Save Failed",
        description: "Failed to save your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    downloadPDF();
    toast({
      title: "Download Started",
      description: "Your resume PDF is being prepared for download.",
    });
  };

  const steps = [
    { title: 'Personal Info', component: PersonalInfoForm },
    { title: 'Experience', component: ExperienceForm },
    { title: 'Education', component: EducationForm },
    { title: 'Projects', component: ProjectsForm },
    { title: 'Skills', component: SkillsForm },
  ];

  const currentStepComponent = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="hidden md:block">
                <h1 className="text-xl font-semibold text-foreground">Resume Builder</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="hidden md:flex items-center space-x-2 mr-4">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button className="btn-success" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Form */}
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card className="p-6">
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-foreground">
                    Step {currentStep + 1} of {steps.length}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {Math.round(progress)}% Complete
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              {/* Step Navigation */}
              <div className="flex space-x-2">
                {steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => handleStepClick(index)}
                    className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all duration-200 ${
                      index === currentStep
                        ? 'bg-primary text-primary-foreground'
                        : index < currentStep
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {step.title}
                  </button>
                ))}
              </div>
            </Card>

            {/* Current Step Form */}
            <Card className="p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {currentStepComponent.title}
                </h2>
                <p className="text-muted-foreground">
                  {currentStep === 0 && "Let's start with your basic information"}
                  {currentStep === 1 && "Add your work experience and achievements"}
                  {currentStep === 2 && "Include your educational background"}
                  {currentStep === 3 && "Showcase your projects and technical work"}
                  {currentStep === 4 && "Highlight your skills and expertise"}
                </p>
              </div>

              {/* Form Component */}
              <currentStepComponent.component />

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  className="btn-primary"
                  onClick={handleNext}
                  disabled={currentStep === steps.length - 1}
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next Step'}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Side - Preview */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Live Preview</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button className="btn-success" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Preview Container */}
              <div className="border border-border rounded-lg overflow-hidden bg-white shadow-soft">
                <ResumePreview data={resumeData} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;