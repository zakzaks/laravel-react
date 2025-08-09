<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = [
        'name',
        'address',
        'phone',
        'birth',
        'gender',
        'photo',
    ];
}
