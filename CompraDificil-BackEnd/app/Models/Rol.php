<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'roles';
    protected $primaryKey = 'id_rol';
    public $timestamps = false;

    protected $fillable = ['tipo_rol'];

    /**
     * Relación inversa: Un rol tiene muchos empleados
     */
    public function empleados()
    {
        return $this->hasMany(Empleado::class, 'id_rol', 'id_rol');
    }
}