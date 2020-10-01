<?php

namespace App\Repositories\Traits;

use App\Model\MatchEvent;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

trait MatchImageRepository
{
    public function addImage($images,$fixture_id,$field){
        
        $images = collect($images)->map(function($item) use($fixture_id,$field) {
            $item->store('match_events');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$fixture_id,
                'field'=>$field
            ];
        })->toArray();

        DB::table('match_images')->insert($images);
       
    }
}