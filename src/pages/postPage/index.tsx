import Layout from '@/components/layout';
import SidebarLayout from '@/components/sidebarLayout';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useParams } from 'react-router-dom';
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
// import ImageWithLoader from '@/components/imageWithLoader';
import { Skeleton } from '@/components/ui/skeleton';

interface HtmlContentProps {
    htmlString: string;
}

const HtmlContent: React.FC<HtmlContentProps> = ({ htmlString }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

export default function PostPage () {
    const { postSlugName } = useParams();

    const { data: singlePostResponse, isLoading } = useQuery<ISinglePostResponse, Error>({
        queryKey: ['post', postSlugName],
        queryFn: () => getSinglePost(postSlugName),
        enabled: !!postSlugName,
    });

    if (isLoading) {
        return (
            <Layout>
                <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                    <SidebarLayout>
                        <Breadcrumb className='inline-block' style={{ width: 'calc(100% - 80px)' }}>
                            <BreadcrumbList className='truncate'>
                                <BreadcrumbItem className='truncate'>
                                    <BreadcrumbLink className='truncate'>
                                        <Link to={'/guia-rapido'}>Guia Rápido</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        {/* <div style={{ width: '100%', margin: '10px auto', }}>
                            <Skeleton style={{ width: '100%', maxHeight: '300px', height: '300px', }} />
                        </div> */}
                        <div className='mt-4 px-6 pb-6 pt-0 markdown-content'>
                            <div>
                                <Skeleton style={{ width: '60%', height: '16px' }} />
                            </div>
                            <div className='my-3'>
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '70%', height: '16px' }} />
                            </div>
                            <div className='my-3'>
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '20%', height: '16px' }} />
                            </div>
                            <div className='my-3'>
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '40%', height: '16px' }} />
                            </div>
                            <div className='my-3'>
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '100%', height: '16px' }} />
                                <Skeleton className='my-2' style={{ width: '10%', height: '16px' }} />
                            </div>
                        </div>
                    </SidebarLayout>
                </ScrollArea>
            </Layout>
        );
    }

    const post = singlePostResponse?.post;

    return (
        <Layout>
            <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                <SidebarLayout>
                    <Breadcrumb className='inline-block' style={{ width: 'calc(100% - 80px)' }}>
                        <BreadcrumbList className='truncate'>
                            <BreadcrumbItem className='truncate'>
                                <BreadcrumbLink className='truncate'>
                                    <Link to={'/guia-rapido'}>Guia Rápido</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem className='truncate inline-block' style={{ width: 'calc(100% - 150px)' }}>
                                <BreadcrumbPage className='truncate'>{post?.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    {/* <div style={{ width: '100%', margin: '10px auto', }}>
                        <ImageWithLoader
                            src={post?.coverImage.url}
                            alt={post?.title}
                            sizeClassName='w-full max-h-[300px] xl:max-h-[500px]'
                            className='max-h-[300px] xl:max-h-[500px]'
                            style={{ width: '100%', objectFit: 'cover', }}
                        />
                    </div> */}
                    <div className='px-6 pb-6 pt-0 markdown-content'>
                        <h1>{post?.title}</h1>
                        <HtmlContent htmlString={post?.content.html || 'Loading...'} />
                    </div>
                </SidebarLayout>
            </ScrollArea>
        </Layout>
    );
};
