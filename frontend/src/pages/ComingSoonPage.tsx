import { Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
      <div className="relative">
        <Construction className="h-24 w-24 text-muted-foreground" />
        <div className="absolute -top-2 -right-2 animate-bounce">
          <div className="h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-xs">🚧</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground max-w-md">
          {description || `The ${title} feature is currently under development. Check back soon!`}
        </p>
      </div>
      
      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/templates">Browse Templates</Link>
        </Button>
      </div>
    </div>
  );
};