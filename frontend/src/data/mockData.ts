import type { PaginatedResponse } from '@/types/api';
import type { AuthResponse, User } from '@/types/user';
import type { Template, FeaturedTemplate, TemplateCategory } from '@/types/template';
import type { Page, DashboardStats, RecentPage } from '@/types/page';

export const mockUser: User = {
    id: 1,
    email: 'user@example.com',
    name: 'John Doe',
    role: 'USER',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockAdminUser: User = {
    id: 2,
    email: 'admin@example.com',
    name: 'Jane Smith',
    role: 'ADMIN',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

export const mockUsers: User[] = [mockUser, mockAdminUser];

export const mockAuthResponse: AuthResponse = {
    user: mockUser,
    tokens: {
        access: {
            token: 'mock-access-token',
            expires: new Date(Date.now() + 15 * 60 * 1000).toISOString()
        },
        refresh: {
            token: 'mock-refresh-token',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
    }
};

export const mockPaginatedUsers: PaginatedResponse<User> = {
    results: mockUsers,
    page: 1,
    limit: 10,
    totalPages: 1,
    totalResults: 2
};

// Dashboard Mock Data
export const mockDashboardStats: DashboardStats = {
    totalPages: 12,
    publishedPages: 8,
    templatesUsed: 5,
    totalViews: 1234
};

export const mockRecentPages: RecentPage[] = [
    {
        id: '1',
        title: 'My Portfolio Website',
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        templateName: 'Modern Portfolio',
        isPublished: true
    },
    {
        id: '2',
        title: 'Business Landing Page',
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        templateName: 'Corporate Landing',
        isPublished: false
    },
    {
        id: '3',
        title: 'Blog Template Test',
        updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        templateName: 'Clean Blog',
        isPublished: true
    }
];

// Template Mock Data
export const mockFeaturedTemplates: FeaturedTemplate[] = [
    {
        id: '1',
        name: 'Modern Portfolio',
        category: 'portfolio',
        thumbnailUrl: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Portfolio',
        usageCount: 156,
        isPremium: false
    },
    {
        id: '2',
        name: 'Corporate Landing',
        category: 'business',
        thumbnailUrl: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Business',
        usageCount: 89,
        isPremium: true
    },
    {
        id: '3',
        name: 'E-commerce Store',
        category: 'ecommerce',
        thumbnailUrl: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=E-commerce',
        usageCount: 203,
        isPremium: true
    },
    {
        id: '4',
        name: 'Clean Blog',
        category: 'blog',
        thumbnailUrl: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Blog',
        usageCount: 67,
        isPremium: false
    }
];

export const mockTemplates: Template[] = [
    {
        id: '1',
        name: 'Modern Portfolio',
        description: 'A sleek and modern portfolio template perfect for designers and developers',
        category: 'portfolio',
        tags: ['responsive', 'modern', 'minimal'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Portfolio',
        previewUrl: 'https://example.com/preview/portfolio',
        content: {
            html: '<!DOCTYPE html><html><head><title>Modern Portfolio</title></head><body><h1>Welcome to My Portfolio</h1></body></html>',
            css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }',
            js: 'console.log("Portfolio loaded");'
        },
        isPremium: false,
        isPopular: true,
        createdAt: new Date().toISOString(),
        usageCount: 156
    },
    {
        id: '2',
        name: 'Corporate Landing',
        description: 'Professional business landing page with call-to-action sections',
        category: 'business',
        tags: ['corporate', 'professional', 'landing'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Business',
        previewUrl: 'https://example.com/preview/corporate',
        content: {
            html: '<!DOCTYPE html><html><head><title>Corporate Landing</title></head><body><h1>Your Business Solution</h1></body></html>',
            css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }',
            js: 'console.log("Corporate page loaded");'
        },
        isPremium: true,
        isPopular: true,
        createdAt: new Date().toISOString(),
        usageCount: 89
    },
    {
        id: '3',
        name: 'E-commerce Store',
        description: 'Complete e-commerce template with product showcase and shopping cart',
        category: 'ecommerce',
        tags: ['ecommerce', 'shopping', 'products'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/06b6d4/ffffff?text=E-commerce',
        previewUrl: 'https://example.com/preview/ecommerce',
        content: {
            html: '<!DOCTYPE html><html><head><title>E-commerce Store</title></head><body><h1>Our Products</h1></body></html>',
            css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }',
            js: 'console.log("E-commerce loaded");'
        },
        isPremium: true,
        isPopular: true,
        createdAt: new Date().toISOString(),
        usageCount: 203
    },
    {
        id: '4',
        name: 'Clean Blog',
        description: 'Minimalist blog template with clean typography and easy navigation',
        category: 'blog',
        tags: ['blog', 'clean', 'minimal'],
        thumbnailUrl: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Blog',
        previewUrl: 'https://example.com/preview/blog',
        content: {
            html: '<!DOCTYPE html><html><head><title>Clean Blog</title></head><body><h1>My Blog</h1></body></html>',
            css: 'body { font-family: Georgia, serif; margin: 0; padding: 20px; line-height: 1.6; }',
            js: 'console.log("Blog loaded");'
        },
        isPremium: false,
        isPopular: false,
        createdAt: new Date().toISOString(),
        usageCount: 67
    }
];

export const mockPages: Page[] = [
    {
        id: '1',
        title: 'My Portfolio Website',
        content: {
            html: '<!DOCTYPE html><html><head><title>My Portfolio</title></head><body><h1>Welcome to My Portfolio</h1></body></html>',
            css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }',
            js: 'console.log("Portfolio page loaded");'
        },
        templateId: '1',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        isPublished: true,
        previewUrl: 'https://example.com/preview/page1'
    },
    {
        id: '2',
        title: 'Business Landing Page',
        content: {
            html: '<!DOCTYPE html><html><head><title>Business Landing</title></head><body><h1>Your Business Solution</h1></body></html>',
            css: 'body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f8f9fa; }',
            js: 'console.log("Business page loaded");'
        },
        templateId: '2',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        isPublished: false
    }
];
