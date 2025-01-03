import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebarLayout/app-sidebar';

export default function Layout({ children }: { children?: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='flex-1'>
                <SidebarTrigger className='m-2' style={{ position: 'sticky', top: '10px', background: 'var(--code-background)' }} />
                {children}
            </main>
        </SidebarProvider>
    );
}
