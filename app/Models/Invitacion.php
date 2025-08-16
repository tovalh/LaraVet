<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitacion extends Model
{
    use HasFactory;

    protected $table = 'invitaciones';

    protected $fillable = [
        'email',
        'role',
        'token',
        'invited_by',
        'expires_at',
        'accepted_at',
        'accepted_by',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'accepted_at' => 'datetime',
    ];

    /**
     * Generar token único para la invitación
     */
    public static function generarToken(): string
    {
        return Str::random(64);
    }

    /**
     * Crear nueva invitación
     */
    public static function crear(string $email, string $role, int $invitedBy): self
    {
        return self::create([
            'email' => $email,
            'role' => $role,
            'token' => self::generarToken(),
            'invited_by' => $invitedBy,
            'expires_at' => now()->addDays(7), // 7 días para aceptar
        ]);
    }

    /**
     * Verificar si la invitación está vigente
     */
    public function estaVigente(): bool
    {
        return $this->expires_at > now() && !$this->accepted_at;
    }

    /**
     * Verificar si la invitación está expirada
     */
    public function estaExpirada(): bool
    {
        return $this->expires_at < now();
    }

    /**
     * Verificar si la invitación fue aceptada
     */
    public function fueAceptada(): bool
    {
        return !is_null($this->accepted_at);
    }

    /**
     * Marcar invitación como aceptada
     */
    public function marcarComoAceptada(int $userId): bool
    {
        return $this->update([
            'accepted_at' => now(),
            'accepted_by' => $userId,
        ]);
    }

    /**
     * Scope para invitaciones vigentes
     */
    public function scopeVigentes($query)
    {
        return $query->where('expires_at', '>', now())
            ->whereNull('accepted_at');
    }

    /**
     * Scope para invitaciones expiradas
     */
    public function scopeExpiradas($query)
    {
        return $query->where('expires_at', '<', now())
            ->whereNull('accepted_at');
    }

    /**
     * Scope para invitaciones aceptadas
     */
    public function scopeAceptadas($query)
    {
        return $query->whereNotNull('accepted_at');
    }

    /**
     * Relación con el usuario que envió la invitación
     */
    public function invitadoPor()
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    /**
     * Relación con el usuario que aceptó la invitación
     */
    public function aceptadaPor()
    {
        return $this->belongsTo(User::class, 'accepted_by');
    }

    /**
     * Obtener el estado de la invitación
     */
    public function getEstadoAttribute(): string
    {
        if ($this->fueAceptada()) {
            return 'aceptada';
        }

        if ($this->estaExpirada()) {
            return 'expirada';
        }

        return 'pendiente';
    }

    /**
     * Obtener la URL de aceptación
     */
    public function getUrlAceptacionAttribute(): string
    {
        return route('invitaciones.aceptar', $this->token);
    }
}
