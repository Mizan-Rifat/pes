<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    use CacheQueryBuilder;

    protected $guarded = [];

    public function team1(){
        return $this->hasOne('App\Model\Club','id','team1_id');
    }
    public function team2(){
        return $this->hasOne('App\Model\Club','id','team2_id');
    }
    
    public function result(){
        return $this->hasOne('App\Model\MatchResult','fixture_id','id');
    }
    public function events(){
        return $this->hasMany('App\Model\MatchEvent');
    }
    public function ratings(){
        return $this->hasMany('App\Model\MatchRating');
    }
    public function images(){
        return $this->hasMany('App\Model\MatchImage');
    }
    public function tournament(){
        return $this->belongsTo('App\Model\Tournament');
    }
}
