import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { templateService } from '@/services/templateService';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { TemplateFilter } from '@/components/templates/TemplateFilter';
import { TemplateSearch } from '@/components/templates/TemplateSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileTemplate, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import type { TemplateFilters } from '@/types/template';

export const TemplatesPage = () => {
  const [filters, setFilters] = useState<TemplateFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const currentFilters = {
    ...filters,
    search: searchQuery || undefined
  };

  const { data: templates, isLoading, error } = useQuery({
    queryKey: ['templates', currentFilters],
    queryFn: () => templateService.getTemplates(currentFilters),
  });

  const handleFiltersChange = (newFilters: TemplateFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <FileTemplate className="h-8 w-8" />
          Templates
        </h1>
        <p className="text-muted-foreground mt-2">
          Choose from our collection of professional HTML templates to get started quickly
        </p>
      </div>

      {/* Search and View Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="w-full sm:w-96">
          <TemplateSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search templates by name, description, or tags..."
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">View:</span>
          <div className="flex items-center border rounded-md">
            <Toggle
              pressed={viewMode === 'grid'}
              onPressedChange={() => setViewMode('grid')}
              size="sm"
              className="rounded-none border-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Toggle>
            <Toggle
              pressed={viewMode === 'list'}
              onPressedChange={() => setViewMode('list')}
              size="sm"
              className="rounded-none border-0"
            >
              <List className="h-4 w-4" />
            </Toggle>
          </div>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          <TemplateFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {error && (
            <Alert className="mb-6">
              <AlertDescription>
                Failed to load templates. Please try again later.
              </AlertDescription>
            </Alert>
          )}

          {isLoading ? (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-3">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : templates?.length === 0 ? (
            <div className="text-center py-12">
              <FileTemplate className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or clearing filters
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {templates?.length || 0} template{(templates?.length || 0) !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Templates Grid/List */}
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {templates?.map((template) => (
                  <TemplateCard 
                    key={template.id} 
                    template={template}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile Filters (collapsed) */}
      <div className="lg:hidden">
        <details className="group">
          <summary className="flex cursor-pointer items-center justify-between rounded-lg border p-4 text-sm font-medium hover:bg-muted">
            <span>Filters</span>
            <svg
              className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4">
            <TemplateFilter
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </details>
      </div>
    </div>
  );
};