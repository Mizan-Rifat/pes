<?php

namespace App\Http\Controllers;

use App\Http\Resources\MatchEventsResource;
use App\Http\Resources\MatchRatingsResource;
use App\Http\Resources\MatchResultDetailsResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\ResultResource;
use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Repositories\ClubRepository;
use App\Repositories\FixtureRepository;
use App\Repositories\ResultRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        $fixture = $this->fixtureRepo->with(['result',"events",'ratings','team1','team2'])->where('completed',1)->findOrFail($request->id);

        $team1_events = $fixture->events
            ->where('club_id',$fixture->team1_id);
        
        $team2_events = $fixture->events
            ->where('club_id',$fixture->team2_id);


        if($request['admin']){
            return $this->getResultDetailsForAdmin($fixture);
        }

        $request->merge(['playerDetails'=>1]);


        return response()->json([
            'data'=> [
                'fixture' => new ResultResource($fixture),
                // 'team1_events'=> MatchEventsResource::collection($fixture->events->where('club_id',$fixture->team1_id)),
                'team1_events'=> MatchEventsResource::collection($team1_events),
                'team2_events'=> MatchEventsResource::collection($team2_events),
                'team1_ratings' => MatchRatingsResource::collection($fixture->ratings->where('club_id',$fixture->team1_id)),
                'team2_ratings' => MatchRatingsResource::collection($fixture->ratings->where('club_id',$fixture->team2_id)),

            ]
        ]);
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


    public function addMatchResult(Request $request){

        $this->resultRepo->addMatchResult($request);

        return response()->json([
            'message'=>'Result Added Successfully.'
        ]);

    }
}
