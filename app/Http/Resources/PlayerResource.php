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
            'name'=>$this->details['name'],
            'model_id'=>$this->details['model_id'],
            'position'=>$this->details['position'],
            'image'=>asset('/images/players/'.$this->details['model_id'].'.png'),
            // 'details'=>new PlayerModelresource($this->details),
            'jersey'=>$this->jersey,
            'club'=>new ClubResource($this->whenLoaded('club')),
            'stats'=>$this->when($request->stats,$this->stats),
        ];
    }
}
