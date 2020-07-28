<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class FixtureResource extends JsonResource
{

    
    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'team1_details' => new ClubResource(Club::with('players')->find($this->team1_id)),
            'team2_details' => new ClubResource(Club::with('players')->find($this->team2_id)),
            'date'=>$this->date,
            'host_details' => new ClubResource(Club::find($this->host_id)),
            'tournament_id'=>$this->tournament_id,
            'group'=>$this->group_,
            'round'=>$this->round,
            'leg'=>$this->leg,
            'completed'=>$this->completed,

        ];
    }
}
