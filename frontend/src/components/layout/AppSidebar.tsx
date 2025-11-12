import { 
  Home, 
  FileTemplate, 
  Code, 
  Eye, 
  Download,
  Settings,
  Zap
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const navigation = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Templates',
    url: '/templates',
    icon: FileTemplate,
  },
  {
    title: 'Editor',
    url: '/editor',
    icon: Code,
  },
  {
    title: 'Preview',
    url: '/preview',
    icon: Eye,
  },
  {
    title: 'Export',
    url: '/export',
    icon: Download,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">HTML Instant</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4 py-4">
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={location.pathname === item.url}
              >
                <Link to={item.url} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">v1.0.0</span>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      
      <SidebarTrigger className="fixed top-4 left-4 z-50 lg:hidden" />
    </Sidebar>
  );
};