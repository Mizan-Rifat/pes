<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class FixtureResource extends JsonResource
{

    
    public function toArray($request)
    {
        $completed = [false,true,'pending'];
        return [

            'id' => $this->id,
            'team1_id'=>$this->team1_id,
            'team1_details' => $this->whenLoaded('team1', $this->team1_id == 0 ? 
                            [
                                "id"=> 0,
                                "name"=> "TBD",
                                "slug"=> "tbd",
                                "logo"=> "fcb.png"
                            ]   
                                :         
                                new ClubResource($this->whenLoaded('team1'))
                            ),
            
            'team2_id'=>$this->team2_id,

            'team2_details' => $this->whenLoaded('team2', $this->team2_id == 0 ? 
                            [
                                "id"=> 0,
                                "name"=> "TBD",
                                "slug"=> "tbd",
                                "logo"=> "fcb.png"
                            ]   
                                :         
                                new ClubResource($this->whenLoaded('team2'))
                            ),

            'date'=>$this->date === null ? 'N/A' : date("Y-m-d\TH:i:s", strtotime($this->date)),

            // 'host_details' => new ClubResource(Club::find($this->host_id)),
            'tournament_id'=>$this->tournament_id,
            'group'=>$this->group_,
            // 'group'=>$this->group_ === null ? 'none' : $this->group_,
            'round'=>$this->round,
            'leg'=>$this->leg,
            'completed'=>$this->completed,

        ];
    }
}
