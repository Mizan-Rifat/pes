<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchEventsResource;
use App\Http\Resources\MatchRatingsResource;
use App\Http\Resources\MatchResultDetailsResource;
use App\Http\Resources\PlayerResource;
use App\Model\Fixture;
use App\Repositories\ClubRepository;
use App\Repositories\FixtureRepository;
use App\Repositories\ResultRepository;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    protected $fixtureRepo;
    protected $clubRepo;
    protected $resultRepo;

    public function __construct(ResultRepository $resultRepo, FixtureRepository $fixtureRepo,ClubRepository $clubRepo) {
        $this->fixtureRepo = $fixtureRepo;
        $this->clubRepo = $clubRepo;
        $this->resultRepo = $resultRepo;
    }

    public function getResult(Request $request){
        
    }

    public function getResultDetails(Request $request){

        $fixture = $this->fixtureRepo->with(["events",'ratings'])->where('completed',1)->findOrFail($request->id);

        if($request['admin']){
            return $this->getResultDetailsForAdmin($fixture);
        }

        $request->merge(['playerDetails'=>1]);

           
        return new MatchResultDetailsResource($fixture);
    }

    public function getResultDetailsForAdmin($fixture){

        $team1 = $this->clubRepo->find($fixture->team1_id)->players()->with('details')->get();
        $team2 = $this->clubRepo->find($fixture->team2_id)->players()->with('details')->get();
        
        return response()->json([
            'result' => new MatchResultDetailsResource($fixture),
            'team1'=>PlayerResource::collection($team1),
            'team2'=>PlayerResource::collection($team2),
        ],200);
    }

    public function matchEventUpdate(Request $request){
        $event = $this->resultRepo->matchEventUpdate($request);
        
        return response()->json([
            'message'=>'Update Successfull',
            'event'=>new MatchEventsResource($event)
        ],200);
    }

    public function deleteMatchEvent(Request $request){
        $delete = $this->resultRepo->deleteMatchEvent($request);

        if($delete){
            return response()->json([
                'message' => 'Event(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Event(s) not removed.',
                ],500);
            }
    }

    public function deleteMatchRating(Request $request){
        $delete = $this->resultRepo->deleteMatchRating($request);

        if($delete){
            return response()->json([
                'message' => 'Rating(s) removed successfully.',
            ],200);
            }else{
                return response()->json([
                    'message' => 'Rating(s) not removed.',
                ],500);
            }
    }

    public function addMatchEvent(Request $request){

        $event = $this->resultRepo->addMatchEvent($request);

        return response()->json([
            'message'=>'Event Created',
            'event'=>new MatchEventsResource($event)
        ],200);

    
    }
    public function addMatchRating(Request $request){

        $rating = $this->resultRepo->addMatchRating($request);

        return response()->json([
            'message'=>'Rating Created',
            'rating'=>new MatchRatingsResource($rating)
        ],200);

    
    }
}
