import { ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface JobCardProps {
  title: string;
  company: string;
  url: string;
  snippet: string;
}

const JobCard = ({ title, company, url, snippet }: JobCardProps) => {
  const handleAutoApply = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="card-glow flex flex-col h-full">
      <CardHeader className="pb-3">
        <h3 className="font-bold text-lg text-foreground leading-tight">
          {title}
        </h3>
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
  );
};

export default JobCard;
