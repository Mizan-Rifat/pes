<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class ResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [

            'id' => $this->id,
            'team1_id'=>$this->team1_id,
            'team2_id'=>$this->team2_id,
            'team1_details' => new ClubResource($this->whenLoaded('team1')),
            // 'team1_details' => new ClubResource(Club::find($this->team1_id)),
            'team2_details' => new ClubResource($this->whenLoaded('team2')),
            // 'team2_details' => new ClubResource(Club::find($this->team2_id)),
            'date'=>$this->date,
            'tournament_id'=>$this->tournament_id,
            'group'=>$this->group_,
            'round'=>$this->round,
            'leg'=>$this->leg,
            'completed'=>$this->completed,
            'team1_goals'=>$this->result->team1_goals,
            'team2_goals'=>$this->result->team2_goals,
           
        ];
    }
}
