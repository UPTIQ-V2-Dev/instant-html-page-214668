export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  thumbnailUrl: string;
  previewUrl: string;
  content: {
    html: string;
    css: string;
    js: string;
  };
  isPremium: boolean;
  isPopular: boolean;
  createdAt: string;
  usageCount: number;
}

export type TemplateCategory = 
  | 'business'
  | 'portfolio'
  | 'blog'
  | 'ecommerce'
  | 'landing'
  | 'dashboard'
  | 'forms'
  | 'other';

export interface TemplateFilters {
  category?: TemplateCategory;
  tags?: string[];
  isPremium?: boolean;
  isPopular?: boolean;
  search?: string;
}

export interface FeaturedTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  usageCount: number;
  isPremium: boolean;
}