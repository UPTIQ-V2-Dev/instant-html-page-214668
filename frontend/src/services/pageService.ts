import { api } from '@/lib/api';
import { mockApiDelay } from '@/lib/utils';
import { mockDashboardStats, mockRecentPages, mockPages } from '@/data/mockData';
import type { 
  Page, 
  CreatePageRequest, 
  UpdatePageRequest, 
  DashboardStats, 
  RecentPage 
} from '@/types/page';

export const pageService = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getDashboardStats ---');
      await mockApiDelay();
      return mockDashboardStats;
    }
    const response = await api.get('/api/dashboard/stats');
    return response.data;
  },

  getRecentPages: async (): Promise<RecentPage[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getRecentPages ---');
      await mockApiDelay();
      return mockRecentPages;
    }
    const response = await api.get('/api/recent-pages');
    return response.data;
  },

  getPages: async (): Promise<Page[]> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getPages ---');
      await mockApiDelay();
      return mockPages;
    }
    const response = await api.get('/api/pages');
    return response.data;
  },

  getPageById: async (id: string): Promise<Page> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: getPageById ---', id);
      await mockApiDelay();
      const page = mockPages.find(p => p.id === id);
      if (!page) {
        throw new Error('Page not found');
      }
      return page;
    }
    const response = await api.get(`/api/pages/${id}`);
    return response.data;
  },

  createPage: async (data: CreatePageRequest): Promise<Page> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: createPage ---', data);
      await mockApiDelay();
      const newPage: Page = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content || {
          html: '<!DOCTYPE html><html><head><title>New Page</title></head><body><h1>Welcome</h1></body></html>',
          css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }',
          js: ''
        },
        templateId: data.templateId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: false
      };
      return newPage;
    }
    const response = await api.post('/api/pages/new', data);
    return response.data;
  },

  updatePage: async (id: string, data: UpdatePageRequest): Promise<Page> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: updatePage ---', id, data);
      await mockApiDelay();
      const existingPage = mockPages.find(p => p.id === id);
      if (!existingPage) {
        throw new Error('Page not found');
      }
      const updatedPage: Page = {
        ...existingPage,
        ...data,
        updatedAt: new Date().toISOString()
      };
      return updatedPage;
    }
    const response = await api.put(`/api/pages/${id}`, data);
    return response.data;
  },

  deletePage: async (id: string): Promise<void> => {
    if (import.meta.env.VITE_USE_MOCK_DATA === 'true') {
      console.log('--- MOCK API: deletePage ---', id);
      await mockApiDelay();
      return;
    }
    await api.delete(`/api/pages/${id}`);
  }
};