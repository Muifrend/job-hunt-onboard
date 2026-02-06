import { useState } from 'react';
import OnboardingCard from '@/components/OnboardingCard';
import DashboardLayout from '@/components/DashboardLayout';

const Index = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [resumeText, setResumeText] = useState('');

  const handleInitSuccess = (title: string, resume: string) => {
    setJobTitle(title);
    setResumeText(resume);
    setIsInitialized(true);
  };

  // Show Dashboard after successful initialization
  if (isInitialized) {
    return <DashboardLayout initialJobTitle={jobTitle} resumeText={resumeText} />;
  }

  // Show Onboarding Gate initially
  return (
    <div className="min-h-screen bg-background gradient-glow">
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <OnboardingCard onSuccess={handleInitSuccess} />
      </div>
      
      {/* Subtle background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default Index;
