import { formatDistanceToNow } from 'date-fns';
import { Clock, Eye, Edit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { pageService } from '@/services/pageService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const RecentPages = () => {
  const { data: recentPages, isLoading, error } = useQuery({
    queryKey: ['recentPages'],
    queryFn: pageService.getRecentPages,
  });

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Pages</CardTitle>
          <CardDescription>Your recently edited pages</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Failed to load recent pages.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Pages</CardTitle>
        <CardDescription>Your recently edited pages</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </>
        ) : recentPages?.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No pages created yet</p>
            <Button asChild className="mt-4">
              <Link to="/templates">Create Your First Page</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPages?.map((page) => (
              <div key={page.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium truncate">{page.title}</h4>
                    <Badge variant={page.isPublished ? 'default' : 'secondary'} className="text-xs">
                      {page.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(page.updatedAt), { addSuffix: true })}
                    </span>
                    {page.templateName && (
                      <span>Template: {page.templateName}</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/preview/${page.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/editor/${page.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
            <div className="text-center pt-4">
              <Button variant="outline" asChild>
                <Link to="/pages" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  View All Pages
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};