<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Sucursal extends Model
{
    protected $table = 'sucursales';
    protected $primaryKey = 'id_sucursal';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'telefono',
        'calle',
        'colonia',
        'codigo_postal',
    ];

    /**
     * Relación: Una sucursal tiene muchos empleados
     */
    public function empleados()
    {
        return $this->hasMany(Empleado::class, 'id_sucursal', 'id_sucursal');
    }

    /**
     * Relación: Una sucursal tiene muchas ventas
     */
    public function ventas()
    {
        return $this->hasMany(Venta::class, 'id_sucursal', 'id_sucursal');
    }

    /**
     * Relación: Una sucursal tiene inventario (muchos productos)
     */
    public function inventario()
    {
        return $this->belongsToMany(
            Producto::class,
            'inventario',
            'id_sucursal',
            'id_producto'
        )->withPivot('stock');
    }
}