<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchResultDetailsResource extends JsonResource
{

    public function toArray($request)
    {
        
        return [
            // 'result'=new ResultResource()

            'team1_events'=> MatchEventsResource::collection($this->events->where('club_id',$this->team1_id)),
            'team2_events'=> MatchEventsResource::collection($this->events->where('club_id',$this->team2_id)),
            'team1_ratings' => MatchRatingsResource::collection($this->ratings->where('club_id',$this->team1_id)),
            'team2_ratings' => MatchRatingsResource::collection($this->ratings->where('club_id',$this->team2_id)),    

        ];
    }
}
