import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookTextIcon, LoaderCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICategoriesResponse, IPostCategories } from '@/interfaces';
import { getAllCategoriesPosts } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export function AppSidebar() {
    const { postSlugName } = useParams();
    const { data: categoriesResponse, isLoading } = useQuery<ICategoriesResponse, Error>({
        queryKey: ['postCategories'],
        queryFn: getAllCategoriesPosts,
    });

    if (isLoading) {
        return (
            <Sidebar className='pt-0'>
                <SidebarHeader />
                <SidebarContent className='mt-2'>
                    <ScrollArea>
                        <div className='py-8 px-4'><LoaderCircle className='animate-spin' /></div>
                    </ScrollArea>
                </SidebarContent>
            </Sidebar>
        );
    }

    const postCategories = categoriesResponse?.postCategories || [] as IPostCategories[];

    return (
        <Sidebar className='pt-0'>
            <SidebarHeader />
            <SidebarContent className='mt-2'>
                <ScrollArea>
                    {postCategories.map(({categoryName, id, post }) => (
                        <SidebarMenu key={id}>
                            <Collapsible defaultOpen className="group/collapsible px-2">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild className='px-4 py-2 text-[10px] font-bold'>
                                        <SidebarMenuButton className='flex justify-between'>
                                            <div className='flex items-center gap-1'>
                                                <BookTextIcon size={12} />
                                                {categoryName}
                                            </div>
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {/* ============ Posts ============ */}
                                    <CollapsibleContent className='px-2'>
                                        {post?.length && (
                                            <SidebarMenuSub className='text-[12px] font-light pl-0'>
                                                {post?.map(({id, title, slug}) => (
                                                    <Link key={id} to={`/guia-rapido/${slug}`}>
                                                        <SidebarMenuSubItem className={`cursor-pointer change-color transition duration-500 py-2 pl-2 ${slug === postSlugName ? 'menu-item-selected font-black' : ''}`}>{title}</SidebarMenuSubItem>
                                                    </Link>
                                                ))}
                                            </SidebarMenuSub>
                                        )}
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    ))}
                </ScrollArea>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
