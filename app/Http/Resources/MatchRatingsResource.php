<?php

namespace App\Http\Resources;

use App\Model\Player;
use Illuminate\Http\Resources\Json\JsonResource;
use phpDocumentor\Reflection\Types\This;

class MatchRatingsResource extends JsonResource
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
            'player_id'=>$this->player_id,
            'player' =>$this->when($request->playerDetails,new PlayerResource(Player::with('details')->find($this->player_id))),
            'rating' => $this->rating,
            'club_id'=>$this->club_id,
            
        ];
    }
}
