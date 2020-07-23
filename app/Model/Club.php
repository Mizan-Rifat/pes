<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Club extends Model
{
    public function owner(){
        return $this->hasOne('App\User','id','owner_id');
    }

    public function players(){
        return $this->hasMany('App\Model\Player');
    }
    public function tournaments(){
        return $this->belongsToMany('App\Model\Tournament');
    }
}
