<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_active',
        'last_login_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'last_login_at' => 'datetime',
        ];
    }

    /**
     * Verifica si el usuario es super admin
     */
    public function esSuperAdmin(): bool
    {
        return $this->hasRole('super-admin');
    }

    /**
     * Verifica si el usuario es administrador
     */
    public function esAdministrador(): bool
    {
        return $this->hasRole('administrador');
    }

    /**
     * Verifica si el usuario es empleado
     */
    public function esEmpleado(): bool
    {
        return $this->hasRole('empleado');
    }

    /**
     * Obtiene el rol principal del usuario
     */
    public function getRolPrincipal(): string
    {
        if ($this->esSuperAdmin()) return 'super-admin';
        if ($this->esAdministrador()) return 'administrador';
        if ($this->esEmpleado()) return 'empleado';

        return 'sin-rol';
    }

    /**
     * Scope para usuarios activos
     */
    public function scopeActivos($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope para usuarios inactivos
     */
    public function scopeInactivos($query)
    {
        return $query->where('is_active', false);
    }

    /**
     * Scope para buscar por nombre o email
     */
    public function scopeBuscar($query, $termino)
    {
        return $query->where(function ($q) use ($termino) {
            $q->where('name', 'like', "%{$termino}%")
                ->orWhere('email', 'like', "%{$termino}%");
        });
    }

    /**
     * Activar usuario
     */
    public function activar(): bool
    {
        return $this->update(['is_active' => true]);
    }

    /**
     * Desactivar usuario
     */
    public function desactivar(): bool
    {
        return $this->update(['is_active' => false]);
    }

    /**
     * Registrar último login
     */
    public function registrarLogin(): bool
    {
        return $this->update(['last_login_at' => now()]);
    }

    /**
     * Relación con invitaciones enviadas
     */
    public function invitacionesEnviadas()
    {
        return $this->hasMany(Invitacion::class, 'invited_by');
    }

    /**
     * Relación con invitaciones aceptadas
     */
    public function invitacionAceptada()
    {
        return $this->belongsTo(Invitacion::class, 'id', 'accepted_by');
    }
}
