<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchResultResource extends JsonResource
{

    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'team1_details' => new ClubResource(Club::find($this->team1_id)),
            'team2_details' => new ClubResource(Club::find($this->team2_id)),
            'date'=>$this->date,
            'host_details' => new ClubResource(Club::find($this->host_id)),
            'tournament_id'=>$this->tournament_id,
            'group'=>$this->group_,
            'round'=>$this->round,
            'leg'=>$this->leg,
            'completed'=>$this->completed,
            'result_deatils'=> [

                'team1_goals'=>$this->result['team1_goals'],
                'team2_goals'=>$this->result['team2_goals'],
                'team1_events'=> MatchDetailsResource::collection($this->resultDetails->where('club_id',$this->team1_id)),
                'team2_events'=> MatchDetailsResource::collection($this->resultDetails->where('club_id',$this->team2_id)),
                'team1_ratings' => RatingsResource::collection($this->ratings->where('club_id',$this->team1_id)),
                'team2_ratings' => RatingsResource::collection($this->ratings->where('club_id',$this->team2_id)),
            ],


        ];
    }
}
