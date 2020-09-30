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
            'fbID'=>$this->fbID,
            'blocked'=>$this->blocked,
            'role'=>$this->when($this->role != null,$this->role),
            'notifications'=>NotificationsResource::collection($this->whenLoaded('notifications')),
            // 'unread_notifications_count'=>$this->when($this->unread_notifications_count != null,$this->unread_notifications_count)
        ];
    }
}
