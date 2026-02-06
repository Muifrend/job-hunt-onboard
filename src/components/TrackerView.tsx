import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface TrackedJob {
  id: string;
  company: string;
  role: string;
  dateApplied: string;
  status: 'interview' | 'applied' | 'rejected';
}

const mockTrackedJobs: TrackedJob[] = [
  {
    id: '1',
    company: 'OpenAI',
    role: 'AI Intern',
    dateApplied: '2026-02-01',
    status: 'interview',
  },
  {
    id: '2',
    company: 'Google',
    role: 'Software Engineer',
    dateApplied: '2026-01-28',
    status: 'applied',
  },
  {
    id: '3',
    company: 'Airbnb',
    role: 'Frontend Dev',
    dateApplied: '2026-01-25',
    status: 'rejected',
  },
];

const statusConfig = {
  interview: {
    label: 'Interview',
    className: 'bg-green-500/20 text-green-400 border-green-500/30 animate-pulse',
  },
  applied: {
    label: 'Applied',
    className: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/20 text-red-400 border-red-500/30',
  },
};

const TrackerView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Tracker</h2>
        <p className="text-muted-foreground mt-1">
          Track the status of your job applications
        </p>
      </div>

      <Card className="card-glow">
        <CardHeader>
          <CardTitle className="text-lg">Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Date Applied</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrackedJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.company}</TableCell>
                  <TableCell>{job.role}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(job.dateApplied).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        'font-medium',
                        statusConfig[job.status].className
                      )}
                    >
                      {statusConfig[job.status].label}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-glow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">3</p>
              <p className="text-sm text-muted-foreground mt-1">Total Applications</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">1</p>
              <p className="text-sm text-muted-foreground mt-1">Interviews</p>
            </div>
          </CardContent>
        </Card>
        <Card className="card-glow">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-destructive">1</p>
              <p className="text-sm text-muted-foreground mt-1">Pending</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackerView;
