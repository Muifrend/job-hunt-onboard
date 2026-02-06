import { useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';
import FileUploadZone from './FileUploadZone';

const OnboardingCard = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartHunting = () => {
    setIsLoading(true);
    // Simulate processing - in real app, this would call an API
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
                  Searching...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Start Hunting
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
