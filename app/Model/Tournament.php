<?php

namespace App\Model;
use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class Tournament extends Model
{
    use CacheQueryBuilder;


    protected $guarded = [];


   
    public function clubs(){
        return $this->belongsToMany('App\Model\Club')->withPivot('group_','invitation');
    }
    public function groups(){
        return $this->belongsToMany('App\Model\Club')->withPivot('group_')->wherePivot('group_','!=',null);
    }
    public function fixtures(){
        return $this->hasMany('App\Model\Fixture');
    }
    public function officials(){
        return $this->belongsToMany('App\User','officials','tournament_id','user_id');
    }
    public function players(){
        return $this->hasManyThrough('App\Model\Player','App\Model\ClubTournament','tournament_id','club_id');
    }

    
    
}
