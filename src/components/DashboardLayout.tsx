import { useState } from 'react';
import DashboardSidebar from './DashboardSidebar';
import FindJobsView from './FindJobsView';
import TrackerView from './TrackerView';

type View = 'find-jobs' | 'tracker';

interface DashboardLayoutProps {
  initialJobTitle?: string;
}

const DashboardLayout = ({ initialJobTitle }: DashboardLayoutProps) => {
  const [activeView, setActiveView] = useState<View>('find-jobs');

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          {activeView === 'find-jobs' && (
            <FindJobsView initialRole={initialJobTitle} />
          )}
          {activeView === 'tracker' && <TrackerView />}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
