import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockTemplates, mockFeaturedTemplates } from '@/data/mockData';
import type { Template, FeaturedTemplate, TemplateFilters } from '@/types/template';
import type { Page } from '@/types/page';

export const templateService = {
  getFeaturedTemplates: async (): Promise<FeaturedTemplate[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getFeaturedTemplates ---');
      await mockApiDelay();
      return mockFeaturedTemplates;
    }
    const response = await api.get('/api/templates/featured');
    return response.data;
  },

  getTemplates: async (filters?: TemplateFilters): Promise<Template[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getTemplates ---', filters);
      await mockApiDelay();
      let filteredTemplates = [...mockTemplates];
      
      if (filters?.category) {
        filteredTemplates = filteredTemplates.filter(t => t.category === filters.category);
      }
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTemplates = filteredTemplates.filter(t => 
          t.name.toLowerCase().includes(searchLower) ||
          t.description.toLowerCase().includes(searchLower) ||
          t.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
      
      if (filters?.isPremium !== undefined) {
        filteredTemplates = filteredTemplates.filter(t => t.isPremium === filters.isPremium);
      }
      
      if (filters?.isPopular !== undefined) {
        filteredTemplates = filteredTemplates.filter(t => t.isPopular === filters.isPopular);
      }
      
      if (filters?.tags && filters.tags.length > 0) {
        filteredTemplates = filteredTemplates.filter(t => 
          filters.tags!.some(tag => t.tags.includes(tag))
        );
      }
      
      return filteredTemplates;
    }
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.isPremium !== undefined) params.append('isPremium', filters.isPremium.toString());
    if (filters?.isPopular !== undefined) params.append('isPopular', filters.isPopular.toString());
    if (filters?.tags) filters.tags.forEach(tag => params.append('tags', tag));
    
    const response = await api.get(`/api/templates?${params.toString()}`);
    return response.data;
  },

  getTemplateById: async (id: string): Promise<Template> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getTemplateById ---', id);
      await mockApiDelay();
      const template = mockTemplates.find(t => t.id === id);
      if (!template) {
        throw new Error('Template not found');
      }
      return template;
    }
    const response = await api.get(`/api/templates/${id}`);
    return response.data;
  },

  useTemplate: async (templateId: string, title: string): Promise<Page> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: useTemplate ---', templateId, title);
      await mockApiDelay();
      const template = mockTemplates.find(t => t.id === templateId);
      if (!template) {
        throw new Error('Template not found');
      }
      
      const newPage: Page = {
        id: Date.now().toString(),
        title,
        content: template.content,
        templateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: false
      };
      return newPage;
    }
    const response = await api.post(`/api/templates/${templateId}/use`, { title });
    return response.data;
  }
};