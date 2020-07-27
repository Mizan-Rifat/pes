<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Fixture extends Model
{
    public function result(){
        return $this->hasOne('App\Model\MatchResult','fixture_id','id');
    }
    public function resultDetails(){
        return $this->hasMany('App\Model\MatchDetails');
    }
    public function ratings(){
        return $this->hasMany('App\Model\MatchRating');
    }
}
