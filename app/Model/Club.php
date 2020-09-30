<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Club extends Model
{

    use CacheQueryBuilder;

    protected $guarded = [];

    protected $with = ['details'];

    public function setNameAttribute($value){
        $this->attributes['name'] = strtoupper($value);
    }
    
    public function owner(){
        return $this->hasOne('App\User','id','owner_user_id');
    }

    public function players(){
        return $this->hasMany('App\Model\Player');
    }
    public function tournaments(){
        return $this->belongsToMany('App\Model\Tournament')->withPivot('invitation','group_');
    }

    public function details(){
        return $this->hasOne('App\Model\ClubModel','id','model_id');
    }
}
