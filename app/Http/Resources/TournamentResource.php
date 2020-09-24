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
            'slug'=>$this->when($this->slug !== null ,$this->slug),
            'format'=>$this->when($this->type !== null ,$this->type),
            'rounds'=>$this->when($this->rounds !== null ,$this->rounds),
            'leg'=>$this->when($this->leg !== null ,$this->leg),
            'active'=>$this->when($this->active !== null ,$this->active),
            'invitation' => $this->whenPivotLoaded('club_tournament', function () {
                return $this->pivot->invitation;
            }),
            'clubs'=> ClubResource::collection($this->whenLoaded('clubs')),
            'officials'=> UserResource::collection($this->whenLoaded('officials')),
            'groups'=> $this->when(isset($this->groups) ,$this->groups),
            'clubs_count'=> $this->when($this->clubs_count!== null ,$this->clubs_count),
        ];
    }
}
