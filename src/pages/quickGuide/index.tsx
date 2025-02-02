import ImageWithLoader from '@/components/imageWithLoader';
import Layout from '@/components/layout';
import SidebarLayout from '@/components/sidebarLayout';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICategoriesResponseWithImage, IPostCategoriesWithImages } from '@/interfaces';
import { getAllCategoriesPostsAndImages } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function QuickGuide () {
    const { data: categoriesResponse, isLoading } = useQuery<ICategoriesResponseWithImage, Error>({
        queryKey: ['postCategoriesAndImages'],
        queryFn: getAllCategoriesPostsAndImages,
    });

    const postCategories = categoriesResponse?.postCategories || [] as IPostCategoriesWithImages[];

    if (isLoading) {
        return (
            <Layout>
                <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                    <SidebarLayout>
                        <LoaderCircle className='animate-spin' />
                    </SidebarLayout>
                </ScrollArea>
            </Layout>
        );
    }

    return (
        <Layout>
            <ScrollArea className="mt-12" style={{ height: 'calc(100vh - 48px)' }}>
                <SidebarLayout>
                    <div className='px-6 animate-in fade-in transition duration-700'>
                        { postCategories.map(({ categoryName, post, id }) => (
                            <div key={id}>
                                {post?.length && (
                                    <div>
                                        <h2 className='text-2xl my-4 font-bold'>{categoryName}</h2>
                                        {post.map(({ coverImage, excerpt, slug, title }) => (
                                            <Card key={slug} className='flex gap-2 p-4 mb-4' style={{ backgroundColor: 'hsl(var(--sidebar-background))' }}>
                                                {coverImage?.url && (
                                                    <div className='hidden sm:block' style={{ maxWidth: '140px', minWidth: '140px', width: '140px', height: '100%', minHeight: '80px' }}>
                                                        <Link to={`/guia-rapido/${slug}`}>
                                                            <ImageWithLoader
                                                                src={coverImage?.url}
                                                                alt={title}
                                                                sizeClassName='min-w-[140px] min-h-[80px] max-h-[80px]'
                                                                className='max-h-[80px]'
                                                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                            />
                                                        </Link>
                                                    </div>
                                                )}
                                                <CardContent className='pb-0 px-2'>
                                                    <CardTitle className='sm:text-1xl lg:text-2xl line-clamp-1 mb-1'>
                                                        <Link to={`/guia-rapido/${slug}`}>
                                                            {title}
                                                        </Link>
                                                    </CardTitle>
                                                    <CardDescription className='line-clamp-2'>
                                                        <Link to={`/guia-rapido/${slug}`}>
                                                            {excerpt}
                                                        </Link>
                                                    </CardDescription>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </SidebarLayout>
            </ScrollArea>
        </Layout>
    );
};