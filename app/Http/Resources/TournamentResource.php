<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TournamentResource extends JsonResource
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
            'type'=>$this->type,
            'leg'=>$this->leg,
            'round'=>$this->round,
            'clubs'=> ClubResource::collection($this->whenLoaded('clubs')),
            // 'fixtures'=> ClubResource::collection($this->whenLoaded('clubs'))
        ];
    }
}
