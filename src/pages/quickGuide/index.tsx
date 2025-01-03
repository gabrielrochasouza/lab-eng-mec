import Layout from '@/components/layout';
import SidebarLayout from '@/components/sidebarLayout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function QuickGuide () {
    return (
        <Layout>
            <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                <SidebarLayout />
            </ScrollArea>
        </Layout>
    );
};