<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Empleado extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'empleados';
    protected $primaryKey = 'id_empleado';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'ap',
        'am',
        'email',
        'contrasena',
        'id_rol',
        'id_sucursal',
        'estado',
    ];

    protected $hidden = [
        'contrasena',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    // --- RELACIONES ---

    public function rol()
    {
        return $this->belongsTo(Rol::class, 'id_rol', 'id_rol');
    }

    /**
     * Relación con la tabla Sucursales
     */
    public function sucursal()
    {
        return $this->belongsTo(Sucursal::class, 'id_sucursal', 'id_sucursal');
    }

    /**
     * Relación: Un empleado realiza muchas ventas
     */
    public function ventas()
    {
        return $this->hasMany(Venta::class, 'id_empleado', 'id_empleado');
    }

    // --- MÉTODOS AUXILIARES ---

    public function tieneRol($tipoRol)
    {
        return $this->rol && $this->rol->tipo_rol === $tipoRol;
    }

    public function estaActivo()
    {
        return $this->estado === 'activo';
    }

    public function getNombreCompletAttribute()
    {
        return "{$this->nombre} {$this->ap} {$this->am}";
    }

    // --- SCOPES DE QUERY ---

    public function scopeActivos($query)
    {
        return $query->where('estado', 'activo');
    }

    public function scopePorTipoRol($query, $tipoRol)
    {
        return $query->whereHas('rol', function ($q) use ($tipoRol) {
            $q->where('tipo_rol', $tipoRol);
        });
    }

    public function scopePorSucursal($query, $idSucursal)
    {
        return $query->where('id_sucursal', $idSucursal);
    }
}