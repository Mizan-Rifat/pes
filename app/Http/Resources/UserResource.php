<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email'=>$this->email,
            'email_verified'=>$this->email_verified_at === null ? false : true,
            'club'=>new ClubResource($this->whenLoaded('club')),
            'blocked'=>$this->blocked == 0 ? false : true,
        ];
    }
}
