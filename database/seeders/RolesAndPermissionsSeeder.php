<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Resetear cache de roles y permisos
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos
        $permisos = [
            // Gestión de usuarios
            'gestionar-usuarios',

            // Gestión de pacientes
            'ver-pacientes',
            'crear-pacientes',
            'editar-pacientes',
            'eliminar-pacientes',

            // Gestión de citas
            'ver-citas',
            'crear-citas',
            'editar-citas',
            'eliminar-citas',

            // Historial médico
            'ver-historial',
            'crear-historial',
            'editar-historial',

            // Dashboard y reportes
            'ver-dashboard',
            'ver-reportes',
        ];

        foreach ($permisos as $permiso) {
            Permission::create(['name' => $permiso]);
        }

        // Crear roles

        // Super Admin - tiene todos los permisos
        $superAdmin = Role::create(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Administrador - gestiona todo excepto otros admins
        $administrador = Role::create(['name' => 'administrador']);
        $administrador->givePermissionTo([
            'gestionar-usuarios', // puede crear empleados
            'ver-pacientes', 'crear-pacientes', 'editar-pacientes', 'eliminar-pacientes',
            'ver-citas', 'crear-citas', 'editar-citas', 'eliminar-citas',
            'ver-historial', 'crear-historial', 'editar-historial',
            'ver-dashboard', 'ver-reportes',
        ]);

        // Empleado - operaciones básicas, no puede eliminar ni gestionar usuarios
        $empleado = Role::create(['name' => 'empleado']);
        $empleado->givePermissionTo([
            'ver-pacientes', 'crear-pacientes', 'editar-pacientes',
            'ver-citas', 'crear-citas', 'editar-citas',
            'ver-historial', 'crear-historial', 'editar-historial',
            'ver-dashboard',
        ]);

        // Crear usuario super admin por defecto (tú)
        $superAdminUser = User::create([
            'name' => 'Super Administrador',
            'email' => 'admin@veterinaria.local', // Cambia por tu email
            'password' => bcrypt('password'), // Cambia por una contraseña segura
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $superAdminUser->assignRole('super-admin');

        // Crear un usuario administrador de ejemplo
        $adminUser = User::create([
            'name' => 'Dr. Juan Pérez',
            'email' => 'doctor@veterinaria.local',
            'password' => bcrypt('password'),
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $adminUser->assignRole('administrador');

        // Crear un empleado de ejemplo
        $empleadoUser = User::create([
            'name' => 'María González',
            'email' => 'empleado@veterinaria.local',
            'password' => bcrypt('password'),
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $empleadoUser->assignRole('empleado');
    }
}
