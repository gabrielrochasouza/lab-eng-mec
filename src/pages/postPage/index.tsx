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
import { Skeleton } from '@/components/ui/skeleton';
import {
    SidebarContent,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

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

    const addAnchorToHeadings = (html?: string) => {
        if (!html) {
            return;
        }
        const regex = /<(h[1-6])>(.*?)<\/\1>/gi;
        // eslint-disable-next-line quotes
        return html.replace(regex, `<$1 id='$2'>$2 <a href='#$2'>#</a></$1>`);
    };

    const getTitles = (html?: string) => {
        if (!html) {
            return [];
        }
        const regex = /<h[1-6]>(.*?)<\/h[1-6]>/g;
        return [...html.matchAll(regex)].map(match => match[1]);
    };

    const html = addAnchorToHeadings(post?.content?.html);

    const mainTitle = post?.title || '';

    const titles = getTitles(post?.content?.html);
    titles.unshift(mainTitle);

    return (
        <Layout>
            <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                <SidebarLayout>
                    <Breadcrumb className='inline-block animate-in fade-in transition duration-700' style={{ width: 'calc(100% - 80px)' }}>
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
                    <div className='flex gap-0 flex-1 justify-between'>
                        <div className='px-6 pb-6 pt-0 markdown-content animate-in fade-in transition duration-700 my-auto'>
                            <h1 id={post?.title}>{post?.title}</h1>
                            <HtmlContent htmlString={html || 'Loading...'} />
                        </div>
                        <div className='hidden lg:block sticky top-12 min-w-[230px] h-full'>
                            {
                                titles?.map((title, titleIndex) => (
                                    <SidebarContent className='mt-1' key={`${title}-${titleIndex}`}>
                                        <SidebarMenuSub className='text-[12px] font-light change-color'>
                                            <a href={`#${title}`} className='mr-2 my-0'>
                                                <SidebarMenuSubItem className='cursor-pointer change-color py-1'>
                                                    <div className='truncate change-color transition duration-500' >
                                                        {title}
                                                    </div>
                                                </SidebarMenuSubItem>
                                            </a>
                                        </SidebarMenuSub>
                                    </SidebarContent>
                                ))
                            }
                        </div>
                    </div>
                </SidebarLayout>
            </ScrollArea>
        </Layout>
    );
};
