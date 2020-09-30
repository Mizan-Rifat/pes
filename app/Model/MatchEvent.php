<?php

namespace App\Model;

use App\Http\Support\Database\CacheQueryBuilder;
use Illuminate\Database\Eloquent\Model;

class MatchEvent extends Model
{

    use CacheQueryBuilder;
    
    protected $guarded = [];
    
    public function scopeTeamEvents($query,$club_id){
        return $query->where('club_id',$club_id);
    }
}
