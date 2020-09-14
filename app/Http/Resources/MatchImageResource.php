<?php

namespace App\Http\Resources;

use App\Model\Club;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $fields = ['','event','team1_Rating','team2_Rating'];

        return [
            'id'=>$this->id,
            'image'=> asset('/images/match_events/'.$this->image),
            'fixture_id'=>$this->fixture_id,
            'submitted_by'=>$this->submitted_by,
            'field'=>$fields[$this->field]
        ];
    }
}
