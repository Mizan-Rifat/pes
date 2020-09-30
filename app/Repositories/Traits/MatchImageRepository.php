<?php

namespace App\Repositories\Traits;

use App\Model\MatchEvent;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

trait MatchImageRepository
{
    public function addImage($request,$fixture){
        
        $validatedData = $request->validate([
            'field'=>['required','numeric','max:3','min:1'],
            'images'=>['required','array'],
            'images.*'=>['mimes:jpeg,jpg,png'],
            
        ]);

        $images = collect($validatedData['images'])->map(function($item) use($validatedData){
            $item->store('match_events');
            return [
                'image'=>$item->hashName(),
                'fixture_id'=>$validatedData['fixture_id'],
                'field'=>$validatedData['field']
            ];
        })->toArray();

        DB::table('match_images')->insert($images);

        return $fixture->images;
       
    }
}