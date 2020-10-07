<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchRatingsResource;
use App\Model\Fixture;
use App\Model\MatchRating;
use App\Repositories\ResultRepository;
use Illuminate\Http\Request;

class MatchRatingController extends Controller
{
    protected $resultRepo;

    public function __construct(ResultRepository $resultRepo) {
        $this->resultRepo = $resultRepo;
    }

    public function create(Request $request){

       $rating = $this->resultRepo->createRating($request);

        return response()->json([
            'message'=>'Rating added.',
            'data'=>new MatchRatingsResource($rating)
        ],200);
    }

    public function update(Request $request,MatchRating $rating){

        $updatedRating = $this->resultRepo->updateMatchRating($request,$rating);
        
        return response()->json([
            'message'=>'Update Successfull',
            'data'=>new MatchRatingsResource($updatedRating)
        ],200);
    }

    public function delete(MatchRating $rating){

        $delete = $rating->delete();

        if($delete){
            return response()->json([
                'data'=>$rating->id,
                'message' => 'Event(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Event(s) not removed.',
                ],500);
            }
    }
}
