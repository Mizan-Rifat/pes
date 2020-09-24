<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MyUser extends Model
{
    protected $table = 'myusers';
    protected $guarded = [];
    public $timestamps = false;
}
