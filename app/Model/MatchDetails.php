<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class MatchDetails extends Model
{
    public function scopeTeamEvents($query,$club_id){
        return $query->where('club_id',$club_id);
    }
}
