import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

export function usePermissions() {
    const { auth } = usePage<SharedData>().props;

    if (!auth.user) {
        return {
            user: null,
            tienePermiso: () => false,
            esRol: () => false,
            esSuperAdmin: false,
            esAdministrador: false,
            esEmpleado: false,
            rolPrincipal: 'sin-rol' as const,
        };
    }

    const user = auth.user;

    /**
     * Verifica si el usuario tiene un permiso específico
     */
    const tienePermiso = (permiso: string): boolean => {
        return user.permisos.includes(permiso);
    };

    /**
     * Verifica si el usuario tiene un rol específico
     */
    const esRol = (rol: string): boolean => {
        return user.roles.includes(rol);
    };

    /**
     * Verifica múltiples permisos (AND - todos deben estar presentes)
     */
    const tienePermisosAnd = (permisos: string[]): boolean => {
        return permisos.every(permiso => tienePermiso(permiso));
    };

    /**
     * Verifica múltiples permisos (OR - al menos uno debe estar presente)
     */
    const tienePermisosOr = (permisos: string[]): boolean => {
        return permisos.some(permiso => tienePermiso(permiso));
    };

    return {
        user,
        tienePermiso,
        tienePermisosAnd,
        tienePermisosOr,
        esRol,
        esSuperAdmin: user.es_super_admin,
        esAdministrador: user.es_administrador,
        esEmpleado: user.es_empleado,
        rolPrincipal: user.rol_principal,
    };
}
