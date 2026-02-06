import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import JobCard from './JobCard';

const BACKEND_URL = "http://127.0.0.1:8000";

interface Job {
  title: string;
  company: string;
  url: string;
  snippet: string;
}

interface FindJobsViewProps {
  initialRole?: string;
  resumeText?: string;
}

const FindJobsView = ({ initialRole = 'software engineer', resumeText = '' }: FindJobsViewProps) => {
  const [role, setRole] = useState(initialRole);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleStartJobHunt = async () => {
    if (!role.trim()) {
      toast({
        title: "Role Required",
        description: "Please enter a job role to search for.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `${BACKEND_URL}/find-jobs?role=${encodeURIComponent(role)}`,
        { method: "POST" }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setJobs(data.jobs || []);
        toast({
          title: "Jobs Found!",
          description: `Found ${data.jobs?.length || 0} opportunities for you.`,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch jobs.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Job search failed:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to backend. Is it running?",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Find Jobs</h2>
        <p className="text-muted-foreground mt-1">
          Let AI scan the web for your perfect opportunity
        </p>
      </div>

      {/* Search Bar */}
      <div className="card-glow rounded-xl bg-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="e.g., Software Engineer"
            className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground input-focus focus:outline-none focus:border-primary"
          />
          <Button
            onClick={handleStartJobHunt}
            disabled={isLoading}
            className="btn-hunting px-6 py-3 h-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" />
                Start Job Hunt
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-3 text-muted-foreground py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-lg">AI Agent is scanning the web...</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-glow rounded-lg bg-card p-6 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && hasSearched && (
        <>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <JobCard
                  key={`${job.company}-${job.title}-${index}`}
                  title={job.title}
                  company={job.company}
                  url={job.url}
                  snippet={job.snippet}
                  resumeText={resumeText}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <p className="text-lg">No jobs found for "{role}"</p>
              <p className="text-sm mt-2">Try adjusting your search terms.</p>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && !hasSearched && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Ready to find your dream job?</p>
          <p className="text-sm mt-2">Enter a role and click "Start Job Hunt"</p>
        </div>
      )}
    </div>
  );
};

export default FindJobsView;
