import { useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import FileUploadZone from './FileUploadZone';

// WHEN TESTING LOCALLY: Use "http://127.0.0.1:8000"
// WHEN DEPLOYED: Use your production URL
const BACKEND_URL = "http://127.0.0.1:8000";

interface OnboardingCardProps {
  onSuccess: (jobTitle: string) => void;
}

const OnboardingCard = ({ onSuccess }: OnboardingCardProps) => {
  const [jobTitle, setJobTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartHunting = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    const formData = new FormData();
    formData.append("job_title", jobTitle);
    formData.append("experience", notes);

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      console.log("Sending data to backend...");

      const response = await fetch(`${BACKEND_URL}/initialize-agent`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        toast({
          title: "Agent Initialized!",
          description: data.message || "Your job hunt has started.",
        });
        onSuccess(jobTitle);
      } else {
        console.error("Server Error:", data);
        toast({
          title: "Error",
          description: JSON.stringify(data),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Connection Failed:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to backend. Is it running?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = jobTitle.trim().length > 0;

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="card-glow rounded-2xl bg-card p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-4">
            <Briefcase className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Job Application Agent
          </h1>
          <p className="text-sm text-muted-foreground">
            Let AI help you find your next opportunity
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Job Title Input */}
          <div className="space-y-2">
            <label 
              htmlFor="jobTitle" 
              className="block text-sm font-medium text-foreground"
            >
              Target Job Title
            </label>
            <input
              id="jobTitle"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Software Engineer"
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground input-focus focus:outline-none focus:border-primary"
            />
          </div>

          {/* Notes Textarea */}
          <div className="space-y-2">
            <label 
              htmlFor="notes" 
              className="block text-sm font-medium text-foreground"
            >
              Additional Experience / Notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Share any additional skills, preferences, or notes..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground resize-none input-focus focus:outline-none focus:border-primary"
            />
          </div>

          {/* File Upload */}
          <FileUploadZone 
            file={resumeFile} 
            onFileSelect={setResumeFile} 
          />

          {/* Submit Button */}
          <button
            onClick={handleStartHunting}
            disabled={!isFormValid || isLoading}
            className={`w-full py-4 rounded-xl font-semibold text-primary-foreground btn-hunting disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
              isLoading ? 'cursor-wait' : ''
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Initializing Agent...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Initialize Agent
                </>
              )}
            </span>
            {isLoading && <div className="progress-bar" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingCard;
