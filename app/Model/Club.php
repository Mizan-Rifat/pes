<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{

    use CacheQueryBuilder;

    protected $guarded = [];
    
    public function owner(){
        return $this->hasOne('App\User','id','owner_id');
    }

    public function players(){
        return $this->hasMany('App\Model\Player');
    }
    public function tournaments(){
        return $this->belongsToMany('App\Model\Tournament')->withPivot('invitation','group_');
    }
}
