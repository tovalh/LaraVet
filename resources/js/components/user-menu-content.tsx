import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { usePermissions } from '@/hooks/use-permissions';
import { type User } from '@/types';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings, Users, Crown, UserCheck } from 'lucide-react';

interface UserMenuContentProps {
    user: User;
}

export function UserMenuContent({ user }: UserMenuContentProps) {
    const cleanup = useMobileNavigation();
    const { tienePermiso, rolPrincipal } = usePermissions();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const getRolIcon = () => {
        switch (rolPrincipal) {
            case 'super-admin':
                return <Crown className="mr-2 h-4 w-4 text-yellow-600" />;
            case 'administrador':
                return <Users className="mr-2 h-4 w-4 text-blue-600" />;
            case 'empleado':
                return <UserCheck className="mr-2 h-4 w-4 text-green-600" />;
            default:
                return null;
        }
    };

    const getRolTexto = () => {
        switch (rolPrincipal) {
            case 'super-admin':
                return 'Super Administrador';
            case 'administrador':
                return 'Administrador';
            case 'empleado':
                return 'Empleado';
            default:
                return 'Sin rol';
        }
    };

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>

            {/* Mostrar rol del usuario */}
            <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                <div className="flex items-center">
                    {getRolIcon()}
                    {getRolTexto()}
                </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Configuración
                    </Link>
                </DropdownMenuItem>

                {/* Solo mostrar gestión de usuarios si tiene el permiso */}
                {tienePermiso('gestionar-usuarios') && (
                    <DropdownMenuItem asChild>
                        <Link className="block w-full" href="/usuarios" as="button" prefetch onClick={cleanup}>
                            <Users className="mr-2" />
                            Gestionar Usuarios
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Cerrar Sesión
                </Link>
            </DropdownMenuItem>
        </>
    );
}
