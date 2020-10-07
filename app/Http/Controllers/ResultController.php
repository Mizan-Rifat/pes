<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
use App\Http\Resources\MatchEventsResource;
use App\Http\Resources\MatchImageResource;
use App\Http\Resources\MatchRatingsResource;
use App\Http\Resources\MatchResultDetailsResource;
use App\Http\Resources\PlayerResource;
use App\Http\Resources\ResultResource;
use App\Model\Club;
use App\Model\Fixture;
use App\Model\MatchDetails;
use App\Model\MatchImage;
use App\Model\Tournament;
use App\Notifications\ResultRejected;
use App\Notifications\ResultSubmitted;
use App\Repositories\ClubRepository;
use App\Repositories\FixtureRepository;
use App\Repositories\ResultRepository;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

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

    public function show(Request $request,$fixture_id){
        $fixture = Fixture::with(['team1','team2','events','ratings'])->findOrFail($fixture_id);
        $request->merge(["playerDetails"=>1]);


        return response()->json([
            'data'=> [
                'fixture' => new ResultResource($fixture),
                'events'=> MatchEventsResource::collection($fixture->events),
                'ratings' => MatchRatingsResource::collection($fixture->ratings),
            ]
        ]);
    }

 

    public function submit($fixture_id){

        $current_user_club = Auth::user();

        $fixture = Fixture::with([
            'ratings'=>function($query) use($current_user_club){
                $query->where('club_id',$current_user_club->id);
            },
            'images'=>function($query) use($current_user_club){
                $query->where('submitted_by',$current_user_club->id);
            },
            'team1:id,name','team2:id,name','tournament:id,name'
            ])
        ->findOrFail($fixture_id);

        $eic = count($fixture->images->filter(function($item){
            return $item->field == 1;
        }));

        $r1ic = count($fixture->images->filter(function($item){
            return $item->field == 2;
        }));

        $r2ic = count($fixture->images->filter(function($item){
            return $item->field == 3;
        }));

        if($eic == 0){
            abort(403,'Events images are needed.');
        }
        if($r1ic == 0){
            abort(403,'Team1 ratings images are needed.');
        }
        if($r2ic == 0){
            abort(403,'Team2 ratings images are needed.');
        }
        if(count($fixture->ratings) < 1){
            abort(403,'At least 11 player\'s ratings are needed.');
        }

        $completed = 2;

        if($fixture->completed == 0){
            $completed = $fixture->team1_id == $current_user_club->id ? 3 : 4;
        }

        $fixture->completed = $completed;
        $fixture->save();

        $officials = Tournament::findOrFail($fixture->tournament_id)
                    ->officials()
                    ->with('club')
                    ->get()
                    ->filter(function($item) use($fixture){
                        return $item->club['id'] != $fixture->team1_id && $item->club['id'] != $fixture->team2_id;
                    });

        if($fixture->completed == 2){
            Notification::send($officials,new ResultSubmitted($fixture->id,$fixture->tournament['name'],$fixture->team1['name'],$fixture->team2['name']));
        }

        return response()->json([
            'message'=>'Result Submitted.',
            'data'=>$fixture->completed
        ]);
    }
    

    public function approveResult($fixture_id){

        $fixture = Fixture::with('events','team1:id,name','team2:id,name','tournament:id,name')->findOrFail($fixture_id);
        
        $this->resultRepo->approveResult($fixture);
        
        return response()->json([
            'message'=>'Result Approved.'
        ]);
    }

    public function rejectResult(Request $request){

        $validatedData = $request->validate([
            'fixture_id'=>['required','numeric'],
            'club_id'=>['required','numeric'],
            'message'=>['required'],
        ]);

        $fixture = Fixture::with([
            'team1:id,name','team2:id,name','tournament:id,name'
            ])
        ->findOrFail($validatedData['fixture_id']);

        switch ($fixture->completed) {
            case 2:
                $fixture->completed = $fixture->team1_id == $validatedData['club_id'] ? 4 : 3;
                break;
            case 3:
                $fixture->completed = 0;
            case 4:
                $fixture->completed = 0;
            default:
                break;
        }

        $fixture->save();

        Notification::send(Club::find($validatedData['club_id'])->owner,new ResultRejected($fixture->id,$fixture->tournament['name'],$fixture->team1['name'],$fixture->team2['name']));

        return response()->json([
            'message'=>'Result Rejected.',
            'data'=>$fixture->completed
        ]);
    }

}
