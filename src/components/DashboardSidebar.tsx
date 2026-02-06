import { Search, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

type View = 'find-jobs' | 'tracker';

interface DashboardSidebarProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

const menuItems = [
  { id: 'find-jobs' as View, label: 'Find Jobs', icon: Search },
  { id: 'tracker' as View, label: 'My Tracker', icon: BarChart3 },
];

const DashboardSidebar = ({ activeView, onViewChange }: DashboardSidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
            JA
          </span>
          Job Agent
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                  activeView === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Powered by AI
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
