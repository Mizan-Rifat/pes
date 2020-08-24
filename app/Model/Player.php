<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use CacheQueryBuilder;

    protected $guarded = [];

    public function details(){
        return $this->hasOne('App\Model\PlayerModel','id','playermodel_id');
    }

    public function club(){
        return $this->belongsTo('App\Model\Club');
    }

    public function ratings(){
        return $this->hasMany('App\Model\MatchRating');
    }
    public function events(){
        return $this->hasMany('App\Model\MatchDetails');
    }
}
