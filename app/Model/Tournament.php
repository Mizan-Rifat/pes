<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    public function clubs(){
        return $this->belongsToMany('App\Model\Club')->withPivot('group_');
    }
    public function groups(){
        return $this->belongsToMany('App\Model\Club')->withPivot('group_')->wherePivot('group_','!=',null);
    }
    public function fixtures(){
        return $this->hasMany('App\Model\Fixture');
    }
    
}
