import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePermissions } from '@/hooks/use-permissions';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, CalendarDays, Plus } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Citas',
        href: '/citas',
    },
];

export default function CitasIndex() {
    const { tienePermiso } = usePermissions();

    const today = new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Citas" />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
                            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-foreground">Agenda de Citas</h1>
                            <p className="text-sm text-muted-foreground capitalize">
                                {today}
                            </p>
                        </div>
                    </div>

                    {tienePermiso('crear-citas') && (
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nueva Cita
                        </Button>
                    )}
                </div>

                {/* Vista rápida del día */}
                <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Citas de Hoy</CardTitle>
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Sin citas programadas</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Próximas</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Esta semana</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Este mes</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Estado vacío */}
                <Card className="flex-1">
                    <CardContent className="flex h-full flex-col items-center justify-center py-16">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <Calendar className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl">No hay citas programadas</CardTitle>
                            <CardDescription className="max-w-sm">
                                Programa la primera cita para comenzar a gestionar la agenda de la clínica.
                            </CardDescription>
                        </CardHeader>

                        {tienePermiso('crear-citas') && (
                            <Button className="gap-2 mt-4">
                                <Plus className="h-4 w-4" />
                                Programar Primera Cita
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
