<?php

namespace App\Repositories\Traits;

use App\Model\MatchEvent;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

trait MatchImageRepository
{
    public function addImages($request){
        
        $images = collect($request->images)->map(function($item) use($request) {
            $item->store('match_events');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$request->fixture_id,
                'field'=>$request->field,
                'submitted_by'=>Auth::user()->club->id
            ];
        })->toArray();

        return DB::table('match_images')->insert($images);
       
    }
}