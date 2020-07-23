<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlayerResource extends JsonResource
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
            'details'=>new PlayerModelresource($this->whenLoaded('details')),
            'jersey'=>$this->jersey,
            'club'=>new ClubResource($this->whenLoaded('club')),
        ];
    }
}
