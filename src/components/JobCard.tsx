import { useState } from 'react';
import { ExternalLink, Loader2, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';

const BACKEND_URL = "http://127.0.0.1:8000";

interface JobCardProps {
  title: string;
  company: string;
  url: string;
  snippet: string;
}

const JobCard = ({ title, company, url, snippet }: JobCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullDescription, setFullDescription] = useState<string | null>(null);

  const handleCardClick = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch(
        `${BACKEND_URL}/get-job-details?url=${encodeURIComponent(url)}`,
        { method: "POST" }
      );
      
      const data = await response.json();
      
      if (response.ok) {
        setFullDescription(data.description || data.full_description || "No description available.");
        setIsModalOpen(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to fetch job details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to fetch job details:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to backend.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleGenerateCoverLetter = () => {
    toast({
      title: "Coming Soon",
      description: "Cover letter generation will be available soon!",
    });
  };

  return (
    <>
      <Card 
        className="card-glow flex flex-col h-full cursor-pointer transition-all hover:scale-[1.02] hover:shadow-lg"
        onClick={handleCardClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-lg text-foreground leading-tight">
              {title}
            </h3>
            {isLoading && (
              <Loader2 className="w-5 h-5 animate-spin text-primary flex-shrink-0" />
            )}
          </div>
          <Badge variant="secondary" className="w-fit mt-2">
            {company}
          </Badge>
        </CardHeader>
        
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {snippet}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button 
            onClick={handleAutoApply}
            className="w-full btn-hunting"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Auto-Apply
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <DialogDescription asChild>
              <div className="flex items-center gap-2 pt-1">
                <Badge variant="secondary">{company}</Badge>
              </div>
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Full Job Description</h4>
              <div className="text-sm text-muted-foreground whitespace-pre-wrap bg-secondary/50 rounded-lg p-4">
                {fullDescription}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
            <Button 
              onClick={handleGenerateCoverLetter}
              variant="outline"
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              Generate Cover Letter
            </Button>
            <Button 
              onClick={handleAutoApply}
              className="flex-1 btn-hunting"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Auto-Apply
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default JobCard;
