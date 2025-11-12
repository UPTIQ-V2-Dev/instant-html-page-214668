import { Plus, FileTemplate, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const QuickActions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Start creating your HTML page instantly</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="flex-1">
          <Link to="/editor" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Page
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link to="/templates" className="flex items-center gap-2">
            <FileTemplate className="h-4 w-4" />
            Browse Templates
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link to="/editor" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            Code from Scratch
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};