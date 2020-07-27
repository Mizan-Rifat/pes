<?php

namespace App\Http\Resources;

use App\Model\Player;
use Illuminate\Http\Resources\Json\JsonResource;

class MatchDetailsResource extends JsonResource
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
            'id'=>$this->id,
            'fixture_id'=>$this->fixture_id,
            'club_id'=>$this->club_id,
            'event_id'=>$this->event_id,
            'player'=>new PlayerResource(Player::find($this->player_id)),
            'minute'=>$this->minute,
            'assist_player'=>new PlayerResource(Player::find($this->assist_player_id)),
        ];
    }
}
