import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebarLayout/app-sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className='m-2' />
            <main>
                {children}
            </main>
        </SidebarProvider>
    );
}
