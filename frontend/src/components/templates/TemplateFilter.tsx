import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { TemplateFilters, TemplateCategory } from '@/types/template';

const categories: Array<{ value: TemplateCategory; label: string }> = [
  { value: 'business', label: 'Business' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'landing', label: 'Landing Page' },
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'forms', label: 'Forms' },
  { value: 'other', label: 'Other' },
];

const popularTags = [
  'responsive', 'modern', 'minimal', 'corporate', 
  'creative', 'clean', 'professional', 'colorful'
];

interface TemplateFilterProps {
  filters: TemplateFilters;
  onFiltersChange: (filters: TemplateFilters) => void;
  onClearFilters: () => void;
}

export const TemplateFilter = ({ filters, onFiltersChange, onClearFilters }: TemplateFilterProps) => {
  const handleCategoryChange = (category: TemplateCategory, checked: boolean) => {
    onFiltersChange({
      ...filters,
      category: checked ? category : undefined,
    });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const currentTags = filters.tags || [];
    const newTags = checked
      ? [...currentTags, tag]
      : currentTags.filter(t => t !== tag);
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handlePremiumChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      isPremium: checked ? true : undefined,
    });
  };

  const handlePopularChange = (checked: boolean) => {
    onFiltersChange({
      ...filters,
      isPopular: checked ? true : undefined,
    });
  };

  const hasActiveFilters = !!(
    filters.category || 
    filters.tags?.length || 
    filters.isPremium || 
    filters.isPopular
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="capitalize">
                  {filters.category}
                  <button
                    className="ml-1 hover:bg-muted"
                    onClick={() => handleCategoryChange(filters.category!, false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                  <button
                    className="ml-1 hover:bg-muted"
                    onClick={() => handleTagChange(tag, false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {filters.isPremium && (
                <Badge variant="secondary">
                  Premium
                  <button
                    className="ml-1 hover:bg-muted"
                    onClick={() => handlePremiumChange(false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {filters.isPopular && (
                <Badge variant="secondary">
                  Popular
                  <button
                    className="ml-1 hover:bg-muted"
                    onClick={() => handlePopularChange(false)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Categories */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:underline">
            Categories
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={filters.category === category.value}
                  onCheckedChange={(checked) => handleCategoryChange(category.value, !!checked)}
                />
                <label
                  htmlFor={category.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {category.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Tags */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:underline">
            Tags
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2 mt-2">
            {popularTags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={filters.tags?.includes(tag) || false}
                  onCheckedChange={(checked) => handleTagChange(tag, !!checked)}
                />
                <label
                  htmlFor={tag}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer capitalize"
                >
                  {tag}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Type Filters */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Type</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="premium"
                checked={filters.isPremium || false}
                onCheckedChange={handlePremiumChange}
              />
              <label
                htmlFor="premium"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Premium Only
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="popular"
                checked={filters.isPopular || false}
                onCheckedChange={handlePopularChange}
              />
              <label
                htmlFor="popular"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                Popular Only
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};