import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Zap, Download, Globe, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth, signOut, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/builder');
    } else {
      navigate('/auth');
    }
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Builder",
      description: "AI-powered suggestions and real-time preview as you build your perfect resume"
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "PDF Export",
      description: "Download professional, ATS-friendly PDFs optimized for any job application"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Share Portfolio",
      description: "Create beautiful portfolio pages and share your professional story online"
    }
  ];

  const templates = [
    {
      name: "Google Zen",
      description: "Minimalist elegance with clean typography",
      preview: "Modern • Clean • Professional",
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Microsoft Pro",
      description: "Corporate sophistication with structured layout",
      preview: "Structured • Corporate • Bold",
      color: "from-indigo-500 to-purple-600"
    },
    {
      name: "Amazon Bold",
      description: "High-impact design with modern aesthetics",
      preview: "Bold • Impactful • ATS-Optimized",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary rounded-lg p-2">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">ResumeBuilder Pro</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a>
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.user_metadata?.full_name || user?.email}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => navigate('/builder')}>
                    Dashboard
                  </Button>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                  <Button className="btn-gradient" size="sm" onClick={handleGetStarted}>
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-up">
              <div className="inline-flex items-center space-x-2 bg-primary-light text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                <span>Professional Resume Builder</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
                Build Your Perfect
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Resume</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Create stunning, ATS-friendly resumes in minutes. Join thousands of professionals who landed their dream jobs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="btn-gradient text-lg px-8 py-6 hover-lift"
                  onClick={handleGetStarted}
                >
                  {isAuthenticated ? 'Go to Builder' : 'Start Building Now'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6">
                  View Templates
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Free to start</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>Export to PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Everything You Need to Stand Out
            </h2>
            <p className="text-xl text-muted-foreground">
              Professional tools designed to help you create resumes that get noticed by employers and ATS systems.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-gradient p-8 text-center hover-lift animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-up">
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Professional Templates
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose from expertly designed templates inspired by top companies and optimized for modern hiring.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <Card key={index} className="card-elevated overflow-hidden hover-lift animate-fade-up" style={{animationDelay: `${index * 0.1}s`}}>
                <div className={`h-48 bg-gradient-to-br ${template.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-xs text-muted-foreground font-medium">{template.preview}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{template.name}</h3>
                  <p className="text-muted-foreground mb-4">{template.description}</p>
                  <Button variant="outline" className="w-full">
                    Preview Template
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto animate-fade-up">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of professionals who've successfully created standout resumes with our platform.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[1,2,3,4,5].map((star) => (
                <Star key={star} className="h-6 w-6 fill-current text-yellow-300" />
              ))}
              <span className="text-lg font-medium ml-2">4.9/5 from 2,000+ users</span>
            </div>
            <Button 
              className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-6 hover-lift"
              onClick={handleGetStarted}
            >
              {isAuthenticated ? 'Continue Building' : 'Start Building Your Resume'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="gradient-primary rounded-lg p-2">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">ResumeBuilder Pro</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © 2024 ResumeBuilder Pro. Crafted with ❤️ for professionals.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;