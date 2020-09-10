<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
use App\Http\Resources\MatchEventsResource;
use App\Http\Resources\MatchImageResource;
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

    public function getSubmittedResultDetails(Request $request){

        $vd = $request->validate([
            'fixture_id' => ['required','numeric']
        ]);
        
        $fixture = $this->fixtureRepo->with(['result',"events",'ratings','team1','team2','images'])->where('completed',2)->findOrFail($vd['fixture_id']);

        $team1_events = $fixture->events
            ->where('club_id',$fixture->team1_id);
        
        $team2_events = $fixture->events
            ->where('club_id',$fixture->team2_id);
        
        $team1_ratings = $fixture->ratings
            ->where('club_id',$fixture->team1_id);

        $team2_ratings = $fixture->ratings
            ->where('club_id',$fixture->team2_id);


        if($request['admin']){
            return $this->getResultDetailsForAdmin($fixture);
        }

        $request->merge(['playerDetails'=>1]);


        $event_images_sub_by_team1 = $fixture->images
            ->where('submitted_by',$fixture->team1_id)
            ->where('field',1)
            ->map(function($item){
                return asset('images/events/'.$item->image);
            })->values();

        $event_images_sub_by_team2 = $fixture->images
            ->where('submitted_by',$fixture->team2_id)
            ->where('field',1)
            ->map(function($item){
                return asset('images/events/'.$item->image);
            })->values();

        $team1_ratings_images_sub_by_team1 = $fixture->images
            ->where('submitted_by',$fixture->team1_id)
            ->where('field',2)
            ->map(function($item){
                return asset('images/ratings/'.$item->image);
            })->values();

        $team1_ratings_images_sub_by_team2 = $fixture->images
            ->where('submitted_by',$fixture->team2_id)
            ->where('field',2)
            ->map(function($item){
                return asset('images/ratings/'.$item->image);
            })->values();

        $team2_ratings_images_sub_by_team1 = $fixture->images
            ->where('submitted_by',$fixture->team1_id)
            ->where('field',3)
            ->map(function($item){
                return asset('images/ratings/'.$item->image);
            })->values();

        $team2_ratings_images_sub_by_team2 = $fixture->images
            ->where('submitted_by',$fixture->team2_id)
            ->where('field',3)
            ->map(function($item){
                return asset('images/ratings/'.$item->image);
            })->values();


        return response()->json([
            'data'=> [
                'fixture' => new FixtureResource($fixture),
                'team1_events'=> MatchEventsResource::collection($team1_events),
                'team2_events'=> MatchEventsResource::collection($team2_events),
                'team1_ratings' => MatchRatingsResource::collection($team1_ratings),
                'team2_ratings' => MatchRatingsResource::collection($team2_ratings),

                'event_images_sub_by_team1'=>$event_images_sub_by_team1,
                'event_images_sub_by_team2'=>$event_images_sub_by_team2,

                'team1_ratings_images_sub_by_team1'=>$team1_ratings_images_sub_by_team1,

                'team1_ratings_images_sub_by_team2'=>$team1_ratings_images_sub_by_team2,

                'team2_ratings_images_sub_by_team1'=>$team2_ratings_images_sub_by_team1,
                
                'team2_ratings_images_sub_by_team2'=>$team2_ratings_images_sub_by_team2,


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



    public function updateMatchEvent(Request $request){
        $event = $this->resultRepo->updateMatchEvent($request);
        
        return response()->json([
            'message'=>'Update Successfull',
            'data'=>new MatchEventsResource($event)
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
            'data'=>new MatchEventsResource($event)
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

       $this->resultRepo->addResultForApproval($request);

        return response()->json([
            'message'=>'Result Added Successfully.'
        ]);

    }

    public function approveResult(Request $request){
        $this->resultRepo->approveResult($request);
        
        return response()->json([
            'message'=>'Result Approved.'
        ]);
    }
}
