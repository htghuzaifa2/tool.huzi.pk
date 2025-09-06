
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { tools } from '@/lib/search-data';

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarMenu>
          {tools.map(tool => (
            <SidebarMenuItem key={tool.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === tool.href}
              >
                <Link href={tool.href} prefetch={false}>
                  {tool.icon}
                  <span>{tool.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
