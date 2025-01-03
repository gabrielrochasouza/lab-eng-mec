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
import { ChevronRight, BookTextIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ICategoriesResponse, IPostCategories } from '@/interfaces';
import { getAllCategoriesPosts } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
  
export function AppSidebar() {
    const { data: categoriesResponse } = useQuery<ICategoriesResponse, Error>({
        queryKey: ['postCategories'],
        queryFn: getAllCategoriesPosts,
    });

    const postCategories = categoriesResponse?.postCategories || [] as IPostCategories[];

    return (
        <Sidebar className='pt-8'>
            <SidebarHeader />
            <SidebarContent className='mt-2'>
                <ScrollArea>
                    {postCategories.map(({categoryName, id, post, categorySlugName}) => (
                        <SidebarMenu key={id}>
                            <Collapsible defaultOpen className="group/collapsible px-2">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild className='px-4 py-2 text-[10px] font-bold'>
                                        <SidebarMenuButton className='flex justify-between'>
                                            <div className='flex items-center gap-1'>
                                                <BookTextIcon size={12} />
                                                {categoryName}
                                            </div>
                                            <ChevronRight />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    {/* ============ Posts ============ */}
                                    <CollapsibleContent className='px-2'>
                                        {post?.length && (
                                            <SidebarMenuSub className='text-[12px] font-light'>
                                                {post?.map(({id, title, slug}) => (
                                                    <Link key={id} to={`/guia-rapido/${categorySlugName}/${slug}`}>
                                                        <SidebarMenuSubItem className='cursor-pointer py-2'>{title}</SidebarMenuSubItem>
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
  