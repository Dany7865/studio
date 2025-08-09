
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, BrainCircuit, FileCog, FileText, LayoutDashboard, LogOut, User as UserIcon } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/career-ai', icon: BrainCircuit, label: 'Smart Career AI', tooltip: 'Career AI' },
  { href: '/academic-hub', icon: BookOpen, label: 'Academic Hub', tooltip: 'Academics' },
  { href: '/resume-builder', icon: FileText, label: 'Resume Builder', tooltip: 'Resume' },
  { href: '/pdf-tools', icon: FileCog, label: 'PDF Tools', tooltip: 'PDF Tools' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'There was an error logging out. Please try again.',
      });
    }
  };

  return (
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
            {user ? (
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.photoURL ?? ''} />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <span className="truncate">{user.email}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mb-2 ml-2">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
            )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 md:hidden">
          <SidebarTrigger>
            <Logo className="size-6 text-primary" />
            <span className="sr-only">Toggle Menu</span>
          </SidebarTrigger>
          <div className="flex-1">
             <h1 className="text-lg font-semibold">EduMate.AI</h1>
          </div>
          {user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL ?? ''} />
                  <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
