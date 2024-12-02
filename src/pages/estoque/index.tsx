import { DataTableDemo } from '@/components/datatable';
import Layout from '@/components/layout';

export default function Stock () {
    return (
        <Layout>
            <div className='pt-16 px-4 text-xs'>
                <DataTableDemo />
            </div>
        </Layout>
    );
};
