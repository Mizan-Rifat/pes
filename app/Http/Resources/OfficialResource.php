<?php

namespace App\Http\Resources;

use App\Model\Club;
use App\User;
use Illuminate\Http\Resources\Json\JsonResource;

class OfficialResource extends JsonResource
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
            'user_id' => $this->details->id,
            'user_name' => $this->details->name,
        ];
    }
}
