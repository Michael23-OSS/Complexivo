<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios'; // Nombre de la tabla en la base de datos
    protected $fillable = ['usuario', 'address', 'phone']; // Campos que pueden ser llenados de forma masiva
}
