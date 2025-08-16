import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Shield, UserCheck, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

export default function UsuariosIndex() {
    const { tienePermiso, esSuperAdmin } = usePermissions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900">
                            <Users className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">Gestión de Usuarios</h1>
                            <p className="text-sm text-muted-foreground">
                                Administra los usuarios y sus permisos en el sistema
                            </p>
                        </div>
                    </div>

                    {tienePermiso('gestionar-usuarios') && (
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nuevo Usuario
                        </Button>
                    )}
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar usuarios por nombre o email..."
                            className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                </div>

                {/* Estadísticas de usuarios */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground">Usuarios registrados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Empleados</CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">Usuarios empleados</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Administradores</CardTitle>
                            <Shield className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{esSuperAdmin ? '2' : '1'}</div>
                            <p className="text-xs text-muted-foreground">Con permisos admin</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Lista de usuarios placeholder */}
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Lista de Usuarios</CardTitle>
                        <CardDescription>
                            Gestiona los usuarios del sistema y sus roles asignados
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex h-full flex-col items-center justify-center py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <Users className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="text-center mt-4">
                            <h3 className="text-lg font-medium">Funcionalidad en desarrollo</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mt-2">
                                Próximamente podrás gestionar completamente los usuarios desde esta interfaz.
                            </p>
                        </div>

                        <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                            <p>• Usuarios actuales: Super Admin, Administrador, Empleado</p>
                            <p>• Cada rol tiene permisos específicos configurados</p>
                            <p>• Sistema de permisos funcionando correctamente</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
