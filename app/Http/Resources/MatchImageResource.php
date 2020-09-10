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
        $fields = ['','event','team1_Rating','team2_rating'];

        return [
            'id'=>$this->id,
            'image'=>$this->field == 1 ? asset('/images/events/'.$this->image) : asset('/images/ratings/'.$this->image),
            'fixture_id'=>$this->fixture_id,
            'submitted_by'=>new ClubResource(Club::find($this->submitted_by)),
            'field'=>$fields[$this->field]
        ];
    }
}
