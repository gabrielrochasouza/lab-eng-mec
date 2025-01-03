import Layout from '@/components/layout';
import SidebarLayout from '@/components/sidebarLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'react-router-dom';
import { getSinglePost } from '@/services/api';
import { ISinglePostResponse } from '@/interfaces/';
import { useQuery } from '@tanstack/react-query';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface HtmlContentProps {
    htmlString: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default function PostPage () {
    const { postSlugName } = useParams();
    
    const { data: singlePostResponse } = useQuery<ISinglePostResponse, Error>({
        queryKey: ['post', postSlugName],
        queryFn: () => getSinglePost(postSlugName),
        enabled: !!postSlugName,
    });

    const post = singlePostResponse?.post;

    return (
        <Layout>
            <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                <SidebarLayout>
                    <Breadcrumb className='inline-block' style={{ width: 'calc(100% - 80px)' }}>
                        <BreadcrumbList className='truncate'>
                            <BreadcrumbItem className='truncate'>
                                <BreadcrumbLink className='truncate'>Guia Rápido</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className='truncate inline-block' style={{ width: 'calc(100% - 120px)' }}>
                                <BreadcrumbPage className='truncate'>{post?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div style={{ width: '95%', maxHeight: '400px', margin: '20px auto', overflow: 'hidden' }}>
                        <img src={post?.coverImage.url} alt={post?.title} />
                    </div>
                    <div className='px-6 pb-6 pt-0 markdown-content'>
                        <h1>{post?.title}</h1>
                        <HtmlContent htmlString={post?.content.html || 'Loading...'} />
                    </div>
                </SidebarLayout>
            </ScrollArea>
        </Layout>
    );
};
