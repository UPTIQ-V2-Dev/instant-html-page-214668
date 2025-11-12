import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/DashboardPage';
import { TemplatesPage } from '@/pages/TemplatesPage';
import { ComingSoonPage } from '@/pages/ComingSoonPage';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="templates" element={<TemplatesPage />} />
            <Route 
              path="editor" 
              element={
                <ComingSoonPage 
                  title="HTML Editor" 
                  description="The powerful HTML editor with live preview is coming soon. You'll be able to create and edit HTML, CSS, and JavaScript with syntax highlighting and real-time preview."
                />
              } 
            />
            <Route 
              path="editor/:pageId" 
              element={
                <ComingSoonPage 
                  title="HTML Editor" 
                  description="The powerful HTML editor with live preview is coming soon."
                />
              } 
            />
            <Route 
              path="preview" 
              element={
                <ComingSoonPage 
                  title="Live Preview" 
                  description="The live preview feature is coming soon. You'll be able to see your HTML pages in different device sizes and share preview links."
                />
              } 
            />
            <Route 
              path="preview/:pageId" 
              element={
                <ComingSoonPage 
                  title="Live Preview" 
                  description="The live preview feature is coming soon."
                />
              } 
            />
            <Route 
              path="export" 
              element={
                <ComingSoonPage 
                  title="Export & Download" 
                  description="The export feature is coming soon. You'll be able to download your HTML pages as files, ZIP archives, or PDFs."
                />
              } 
            />
            <Route 
              path="export/:pageId" 
              element={
                <ComingSoonPage 
                  title="Export & Download" 
                  description="The export feature is coming soon."
                />
              } 
            />
            <Route 
              path="settings" 
              element={
                <ComingSoonPage 
                  title="Settings" 
                  description="User settings and preferences will be available here soon."
                />
              } 
            />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};
