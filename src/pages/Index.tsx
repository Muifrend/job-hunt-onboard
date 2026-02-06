import OnboardingCard from '@/components/OnboardingCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background gradient-glow">
      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <OnboardingCard />
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
