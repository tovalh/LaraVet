import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FileText, Plus, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Historial Médico',
        href: '/historial',
    },
];

export default function HistorialIndex() {
    const { tienePermiso } = usePermissions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Historial Médico" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                            <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">Historial Médico</h1>
                            <p className="text-sm text-muted-foreground">
                                Consulta y gestiona el historial médico de los pacientes
                            </p>
                        </div>
                    </div>

                    {tienePermiso('crear-historial') && (
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nueva Consulta
                        </Button>
                    )}
                </div>

                {/* Barra de búsqueda */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar por paciente, diagnóstico o fecha..."
                            className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Consultas Hoy</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Sin consultas registradas</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Consultas realizadas</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Historiales médicos</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Estado vacío */}
                <Card className="flex-1">
                    <CardContent className="flex h-full flex-col items-center justify-center py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <FileText className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">No hay registros médicos</CardTitle>
                            <CardDescription className="max-w-sm">
                                Comienza registrando la primera consulta médica para crear el historial de un paciente.
                            </CardDescription>
                        </CardHeader>

                        {tienePermiso('crear-historial') && (
                            <Button className="gap-2 mt-4">
                                <Plus className="h-4 w-4" />
                                Registrar Primera Consulta
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
