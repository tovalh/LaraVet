import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus, Search, Stethoscope } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Pacientes',
        href: '/pacientes',
    },
];

export default function PacientesIndex() {
    const { tienePermiso } = usePermissions();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pacientes" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                            <Stethoscope className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">Pacientes</h1>
                            <p className="text-sm text-muted-foreground">
                                Gestiona la información de todos los pacientes de la clínica
                            </p>
                        </div>
                    </div>

                    {tienePermiso('crear-pacientes') && (
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nuevo Paciente
                        </Button>
                    )}
                </div>

                {/* Barra de búsqueda y filtros */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Buscar pacientes por nombre o propietario..."
                            className="w-full rounded-md border border-input bg-background px-10 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    </div>
                </div>

                {/* Estado vacío */}
                <Card className="flex-1">
                    <CardContent className="flex h-full flex-col items-center justify-center py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <Stethoscope className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">No hay pacientes registrados</CardTitle>
                            <CardDescription className="max-w-sm">
                                Comienza agregando el primer paciente a la base de datos de la clínica.
                            </CardDescription>
                        </CardHeader>

                        {tienePermiso('crear-pacientes') && (
                            <Button className="gap-2 mt-4">
                                <Plus className="h-4 w-4" />
                                Registrar Primer Paciente
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
