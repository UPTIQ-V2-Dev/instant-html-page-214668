export interface Page {
  id: string;
  title: string;
  content: {
    html: string;
    css: string;
    js: string;
  };
  templateId?: string;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
  previewUrl?: string;
}

export interface CreatePageRequest {
  title: string;
  templateId?: string;
  content?: {
    html: string;
    css: string;
    js: string;
  };
}

export interface UpdatePageRequest {
  title?: string;
  content?: {
    html: string;
    css: string;
    js: string;
  };
  isPublished?: boolean;
}

export interface DashboardStats {
  totalPages: number;
  publishedPages: number;
  templatesUsed: number;
  totalViews: number;
}

export interface RecentPage {
  id: string;
  title: string;
  updatedAt: string;
  templateName?: string;
  isPublished: boolean;
}