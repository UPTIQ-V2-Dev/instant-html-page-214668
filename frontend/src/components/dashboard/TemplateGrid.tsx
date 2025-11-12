import { Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { templateService } from '@/services/templateService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const TemplateGrid = () => {
  const { data: featuredTemplates, isLoading, error } = useQuery({
    queryKey: ['featuredTemplates'],
    queryFn: templateService.getFeaturedTemplates,
  });

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Templates</CardTitle>
          <CardDescription>Get started with our most popular templates</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Failed to load templates.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
        <CardDescription>Get started with our most popular templates</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {featuredTemplates?.map((template) => (
                <div key={template.id} className="group border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer">
                  <div className="relative mb-3">
                    <img
                      src={template.thumbnailUrl}
                      alt={template.name}
                      className="w-full h-32 object-cover rounded border group-hover:scale-105 transition-transform"
                    />
                    {template.isPremium && (
                      <Badge className="absolute top-2 right-2 bg-yellow-500">
                        <Star className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">{template.name}</h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <Badge variant="outline" className="capitalize">
                        {template.category}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {template.usageCount}
                      </span>
                    </div>
                    <Button 
                      size="sm" 
                      className="w-full" 
                      asChild
                    >
                      <Link to={`/templates/${template.id}`}>
                        Use Template
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button variant="outline" asChild>
                <Link to="/templates" className="flex items-center gap-2">
                  View All Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};