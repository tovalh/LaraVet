import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { usePermissions } from '@/hooks/use-permissions';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, Folder, LayoutGrid, Stethoscope, Users, FileText } from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'Repositorio',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentación',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { tienePermiso, esSuperAdmin, esAdministrador } = usePermissions();

    // Generar navegación basada en permisos
    const mainNavItems: NavItem[] = useMemo(() => {
        const items: NavItem[] = [];

        // Dashboard - todos pueden verlo
        if (tienePermiso('ver-dashboard')) {
            items.push({
                title: 'Panel de Control',
                href: '/dashboard',
                icon: LayoutGrid,
            });
        }

        // Pacientes - según permisos
        if (tienePermiso('ver-pacientes')) {
            items.push({
                title: 'Pacientes',
                href: '/pacientes',
                icon: Stethoscope,
            });
        }

        // Citas - según permisos
        if (tienePermiso('ver-citas')) {
            items.push({
                title: 'Citas',
                href: '/citas',
                icon: Calendar,
            });
        }

        // Historial Médico - según permisos
        if (tienePermiso('ver-historial')) {
            items.push({
                title: 'Historial Médico',
                href: '/historial',
                icon: FileText,
            });
        }

        // Gestión de Usuarios - solo admin y super admin
        if (tienePermiso('gestionar-usuarios')) {
            items.push({
                title: 'Usuarios',
                href: '/usuarios',
                icon: Users,
            });
        }

        return items;
    }, [tienePermiso, esSuperAdmin, esAdministrador]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
