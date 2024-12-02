import Layout from '@/components/layout';
import SidebarLayout from '@/components/sidebarLayout';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function QuickGuide () {
    return (
        <Layout>
            <ScrollArea className="pt-12">
                <SidebarLayout>
                    <h1 className='flex-1 py-2 px-4'>Escolha uma opção</h1>
                </SidebarLayout>
            </ScrollArea>
        </Layout>
    );
};