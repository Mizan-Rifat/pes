<?php

namespace App\Repositories\Traits;

use App\Model\MatchRating;
use Illuminate\Support\Facades\Validator;

trait RatingRepository
{
    public function createRatings($ratings,$fixture_id){

        $ratingsRules = [
            '*.player_id' => 'required|numeric', 
            '*.club_id' => 'required|numeric', 
            '*.rating' => 'required|numeric|max:10|min:0', 
        ];

        $validatedData = Validator::make($ratings,$ratingsRules)->validate();

        $allRatings = collect($validatedData)->map(function($item) use($fixture_id){
            $item['fixture_id'] = $fixture_id;
            return $item;
        })->toArray();
        
        return MatchRating::insert($allRatings);
    }

    public function addMatchRating($request){

        $ratingRules = [
            'player_id' => 'required|numeric', 
            'club_id' => 'required|numeric', 
            'rating' => 'required|numeric|max:10|min:0', 
        ];
        
        $validatedData = $request->validate($ratingRules);
        
        $rating = MatchRating::create($validatedData);
        return $rating;
    }

    public function updateMatchRating($request,$rating){

        $validatedData = $request->validate([

            '*.player_id' => 'numeric', 
            '*.club_id' => 'numeric', 
            '*.rating' => 'numeric|max:10|min:0', 

        ]);

        $rating->update($validatedData);

        return $rating;
    }

}
