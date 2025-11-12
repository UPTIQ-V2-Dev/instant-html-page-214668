# Frontend Implementation Plan - HTML Page Instant

## Project Overview
React 19 + Vite + shadcn/ui + Tailwind v4 application for instantly creating and generating HTML pages with live preview capabilities.

## Core Architecture

### Layout & Navigation
- **AppLayout** (`src/components/layout/AppLayout.tsx`)
  - Main application shell with sidebar navigation
  - Theme toggle integration
  - Responsive design for mobile/desktop

- **Sidebar** (`src/components/layout/Sidebar.tsx`)
  - Navigation menu with sections: Templates, Editor, Preview, Export
  - Uses shadcn/ui sidebar component
  - Active page indicators

### Page 1: Dashboard/Home (`/`)
**Files to Create:**
- `src/pages/Dashboard.tsx` - Main dashboard component
- `src/components/dashboard/QuickActions.tsx` - Quick start buttons
- `src/components/dashboard/RecentPages.tsx` - Recently created pages list
- `src/components/dashboard/TemplateGrid.tsx` - Template preview cards

**Features:**
- Welcome section with quick actions
- Recent HTML pages created
- Popular template showcase
- Statistics cards (pages created, templates used)

**API Endpoints:**
- `GET /api/recent-pages` - Fetch user's recent pages
- `GET /api/templates/featured` - Get featured templates
- `GET /api/dashboard/stats` - Dashboard statistics

### Page 2: Template Selection (`/templates`)
**Files to Create:**
- `src/pages/Templates.tsx` - Template browser page
- `src/components/templates/TemplateCard.tsx` - Individual template preview
- `src/components/templates/TemplateFilter.tsx` - Category/tag filters
- `src/components/templates/TemplateSearch.tsx` - Search functionality
- `src/types/template.ts` - Template type definitions

**Features:**
- Grid of available HTML templates
- Filter by category (Business, Portfolio, Blog, etc.)
- Search templates by name/tags
- Preview template on hover/click
- "Use Template" button integration

**API Endpoints:**
- `GET /api/templates` - Fetch all templates with filters
- `GET /api/templates/:id` - Get specific template details
- `POST /api/templates/:id/use` - Initialize new page from template

### Page 3: HTML Editor (`/editor` or `/editor/:pageId`)
**Files to Create:**
- `src/pages/Editor.tsx` - Main editor interface
- `src/components/editor/CodeEditor.tsx` - HTML/CSS/JS code editor
- `src/components/editor/VisualEditor.tsx` - WYSIWYG editor option
- `src/components/editor/PreviewPane.tsx` - Live preview iframe
- `src/components/editor/EditorToolbar.tsx` - Editor controls
- `src/components/editor/ElementInspector.tsx` - HTML element tree
- `src/hooks/useAutoSave.ts` - Auto-save functionality
- `src/hooks/usePreview.ts` - Preview management
- `src/types/editor.ts` - Editor state types

**Features:**
- Split-pane layout (code editor + live preview)
- Syntax highlighting for HTML/CSS/JS
- Auto-completion and error detection
- Live preview updates
- Element selection and inspection
- Undo/redo functionality
- Auto-save every 30 seconds

**API Endpoints:**
- `GET /api/pages/:id` - Load page content
- `PUT /api/pages/:id` - Save page content
- `POST /api/pages/new` - Create new page
- `POST /api/preview/generate` - Generate preview HTML

### Page 4: Live Preview (`/preview/:pageId`)
**Files to Create:**
- `src/pages/Preview.tsx` - Full-screen preview page
- `src/components/preview/PreviewFrame.tsx` - Responsive preview iframe
- `src/components/preview/DeviceSelector.tsx` - Mobile/tablet/desktop views
- `src/components/preview/PreviewControls.tsx` - Preview options toolbar

**Features:**
- Full-screen HTML preview
- Responsive device simulation
- Refresh and reload controls
- Share preview link
- Print preview option

**API Endpoints:**
- `GET /api/preview/:pageId` - Get page preview data
- `POST /api/preview/:pageId/share` - Generate shareable link

### Page 5: Export & Download (`/export/:pageId`)
**Files to Create:**
- `src/pages/Export.tsx` - Export options page
- `src/components/export/ExportOptions.tsx` - Export format selection
- `src/components/export/DownloadProgress.tsx` - Download progress indicator
- `src/components/export/ExportHistory.tsx` - Previous exports list
- `src/utils/exportHelpers.ts` - Export utility functions

**Features:**
- Export as HTML file
- Export as ZIP with assets
- Export as PDF
- Export options (minify, inline CSS, etc.)
- Download progress tracking
- Export history and re-download

**API Endpoints:**
- `POST /api/export/:pageId` - Generate export file
- `GET /api/export/:exportId/download` - Download exported file
- `GET /api/export/:pageId/history` - Get export history

## Common Components

### UI Components (using shadcn/ui)
- `src/components/ui/LoadingSpinner.tsx` - Loading states
- `src/components/ui/ErrorBoundary.tsx` - Error handling
- `src/components/ui/ConfirmDialog.tsx` - Confirmation modals
- `src/components/ui/ThemeToggle.tsx` - Dark/light theme switcher

### Shared Components
- `src/components/common/PageHeader.tsx` - Page title and breadcrumbs
- `src/components/common/SearchBar.tsx` - Reusable search component
- `src/components/common/EmptyState.tsx` - Empty state illustrations

## Utilities & Services

### API Layer
- `src/services/api.ts` - Base API client (already exists)
- `src/services/pageService.ts` - Page CRUD operations
- `src/services/templateService.ts` - Template management
- `src/services/exportService.ts` - Export functionality

### State Management
- `src/store/editorStore.ts` - Editor state management
- `src/store/pageStore.ts` - Page data management
- `src/hooks/useEditor.ts` - Editor state hook
- `src/hooks/usePages.ts` - Page management hook

### Types
- `src/types/page.ts` - Page data structures
- `src/types/export.ts` - Export configuration types
- `src/types/api.ts` - API response types (already exists)

## Routing Structure
```
/ - Dashboard
/templates - Template selection
/editor/:pageId? - HTML editor (new or existing page)
/preview/:pageId - Live preview
/export/:pageId - Export options
/settings - User preferences
```

## Implementation Priority
1. **Phase 1:** Layout, Dashboard, Template selection
2. **Phase 2:** Basic HTML editor with preview
3. **Phase 3:** Advanced editor features, export functionality
4. **Phase 4:** Polish, optimization, additional features

## Key Libraries Integration
- **React Router** - Page navigation (already included)
- **React Query** - API state management (already included)
- **Monaco Editor** - Code editor for HTML/CSS/JS
- **React Hook Form** - Form handling (already included)
- **Zod** - Schema validation (already included)
- **Lucide React** - Icons (already included)