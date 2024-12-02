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
  
export function AppSidebar() {
    return (
        <Sidebar className='pt-8'>
            <SidebarHeader />
            <SidebarContent>
                <SidebarMenu>
                    <Collapsible defaultOpen className="group/collapsible px-2">
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild className='px-4 my-2 text-[10px]'>
                                <SidebarMenuButton className='flex justify-between'>
                                    Guia Tração Uniaxial
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent className='px-2'>
                                <SidebarMenuSub className='text-[10px]'>
                                    <SidebarMenuSubItem className='cursor-pointer py-1'>Montar acessórios</SidebarMenuSubItem>
                                    <SidebarMenuSubItem className='cursor-pointer py-1'>Executar software</SidebarMenuSubItem>
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                </SidebarMenu>
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
  