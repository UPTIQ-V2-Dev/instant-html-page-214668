import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { ThemeProvider } from 'next-themes';

export const AppLayout = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};