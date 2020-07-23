<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    public function details(){
        return $this->hasOne('App\Model\PlayerModel','id','playermodel_id');
    }

    public function club(){
        return $this->belongsTo('App\Model\Club');
    }
}
