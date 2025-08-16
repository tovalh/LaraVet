import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const { user, rolPrincipal, esSuperAdmin, esAdministrador, esEmpleado } = usePermissions();

    const getSaludo = () => {
        const hora = new Date().getHours();
        if (hora < 12) return 'Buenos días';
        if (hora < 18) return 'Buenas tardes';
        return 'Buenas noches';
    };

    const getRolDisplay = () => {
        switch (rolPrincipal) {
            case 'super-admin':
                return 'Super Administrador';
            case 'administrador':
                return 'Administrador';
            case 'empleado':
                return 'Empleado';
            default:
                return 'Usuario';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Panel de Control" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">

                {/* Saludo personalizado */}
                <div className="rounded-xl border border-sidebar-border/70 bg-white p-6 dark:border-sidebar-border dark:bg-card">
                    <h1 className="text-2xl font-semibold text-foreground">
                        {getSaludo()}, {user?.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Has iniciado sesión como <span className="font-medium text-foreground">{getRolDisplay()}</span>
                    </p>

                    {/* Información de debug del rol */}
                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Rol principal:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                esSuperAdmin ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                    esAdministrador ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                        esEmpleado ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                            'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                            }`}>
                                {getRolDisplay()}
                            </span>
                        </div>

                        {user && (
                            <>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Roles:</span>
                                    <span className="text-muted-foreground">{user.roles.join(', ')}</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="font-medium">Permisos:</span>
                                    <div className="flex flex-wrap gap-1">
                                        {user.permisos.map((permiso) => (
                                            <span
                                                key={permiso}
                                                className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs"
                                            >
                                                {permiso}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Tarjetas de estadísticas placeholder */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">0</div>
                                <div className="text-sm text-muted-foreground">Pacientes</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">0</div>
                                <div className="text-sm text-muted-foreground">Citas Hoy</div>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-2xl font-bold">0</div>
                                <div className="text-sm text-muted-foreground">Consultas</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Área principal del dashboard */}
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                            <div className="text-lg font-medium mb-2">¡Bienvenido al Sistema Veterinario!</div>
                            <div className="text-sm">Aquí irán las próximas funcionalidades...</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
