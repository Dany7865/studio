
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, BrainCircuit, FileCog, FileText, LayoutDashboard } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/icons/logo';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/career-ai', icon: BrainCircuit, label: 'Smart Career AI', tooltip: 'Career AI' },
  { href: '/academic-hub', icon: BookOpen, label: 'Academic Hub', tooltip: 'Academics' },
  { href: '/resume-builder', icon: FileText, label: 'Resume Builder', tooltip: 'Resume' },
  { href: '/pdf-tools', icon: FileCog, label: 'PDF Tools', tooltip: 'PDF Tools' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('https://storage.googleapis.com/stately-studio-public/edumate-robot-bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2">
                <Logo className="size-7 text-primary" />
                <h1 className="text-lg font-semibold">EduMate.AI</h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      className="w-full justify-start"
                      tooltip={item.tooltip}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                {/* Future user auth can go here */}
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card/80 px-4 md:hidden">
              <SidebarTrigger>
                <Logo className="size-6 text-primary" />
                <span className="sr-only">Toggle Menu</span>
              </SidebarTrigger>
              <div className="flex-1">
                 <h1 className="text-lg font-semibold">EduMate.AI</h1>
              </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-8">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </div>
  );
}
