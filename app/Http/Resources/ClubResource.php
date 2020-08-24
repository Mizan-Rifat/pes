<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClubResource extends JsonResource
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
            'name'=>$this->name,
            'slug'=>$this->slug,
            'logo'=>asset('/images/logo/'.$this->logo),
            'invitation' => $this->whenPivotLoaded('club_tournament', function () {
                return $this->pivot->invitation;
            }),
            'establishedIn'=>$this->created_at,
            'owner'=>new UserResource($this->whenLoaded('owner')),
            'tournaments'=> TournamentResource::collection($this->whenLoaded('tournaments')),
            'players'=> PlayerResource::collection($this->whenLoaded('players')),
        ];
    }
}
