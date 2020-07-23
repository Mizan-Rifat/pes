<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    public function clubs(){
        return $this->belongsToMany('App\Model\Club');
    }
}
