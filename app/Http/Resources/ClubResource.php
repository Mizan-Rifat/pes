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
            'logo'=>$this->logo,
            'owner'=>new UserResource($this->whenLoaded('owner')),
            'tournaments'=> TournamentResource::collection($this->whenLoaded('tournaments')),
            'players'=> PlayerResource::collection($this->whenLoaded('players')),
        ];
    }
}
