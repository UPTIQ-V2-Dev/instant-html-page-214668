import { Star, Users, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Template } from '@/types/template';

interface TemplateCardProps {
  template: Template;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <img
          src={template.thumbnailUrl}
          alt={template.name}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
        />
        {template.isPremium && (
          <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600">
            <Star className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )}
        {template.isPopular && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Popular
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">{template.name}</CardTitle>
            <CardDescription className="text-sm line-clamp-2">
              {template.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="capitalize">
              {template.category}
            </Badge>
            {template.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {template.usageCount} uses
            </span>
          </div>
          
          {/* Actions */}
          <div className="flex gap-2">
            <Button asChild className="flex-1">
              <Link to={`/templates/${template.id}`}>
                Use Template
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to={`/preview/template/${template.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};