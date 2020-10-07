<?php

namespace App\Repositories\Traits;

use App\Model\MatchRating;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

trait RatingRepository
{
    public function createRating($request){

        $ratingRules = [
            'player_id' => ['required','integer',
                                Rule::unique('match_ratings')->where(function ($query) use($request){
                                    return $query->where('fixture_id', $request['fixture_id']);
                                })            
                            ], 
            'club_id' => 'required|numeric', 
            'fixture_id' => 'required|numeric', 
            'rating' => 'required|numeric|max:10|min:0', 
        ];
        $msg = [
            'unique'=>'Player rating has already been submitted.'
        ];

        $validatedData = $request->validate($ratingRules,$msg);
        
        return MatchRating::create($validatedData);
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
