<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
use App\Http\Resources\MatchEventsResource;
use App\Http\Resources\MatchImageResource;
use App\Http\Resources\MatchRatingsResource;
use App\Model\Fixture;
use App\Model\Tournament;
use App\Repositories\FixtureRepository;
use App\Repositories\TournamentRepository;
use Illuminate\Http\Request;

class FixtureController extends Controller
{
    protected $fixtureRepo;
    protected $tournamentRepo;

    public function __construct(FixtureRepository $fixtureRepo,TournamentRepository $tournamentRepo) {
        $this->fixtureRepo = $fixtureRepo;
        $this->tournamentRepo = $tournamentRepo;
    }

    public function index($tournament_id){

        $fixtures = $this->fixtureRepo->getTournamentFixtures($tournament_id);

        return FixtureResource::collection($fixtures);
    }

    public function show(Request $request,$fixture_id){
        $with = ['team1','team2'];

        if($request['players']){
            $with = ['team1.players','team2.players'];    
        }

        $fixture = Fixture::with($with)->findOrFail($fixture_id);

        return new FixtureResource($fixture);
    }

    public function getFixtureDetails($fixture_id){
        
        $fixture = Fixture::with(['result',"events",'ratings','team1.players','team2.players','images'])->findOrFail($fixture_id);
        
        return response()->json([
            'data'=> [
                'fixture' => new FixtureResource($fixture),
                'events'=> MatchEventsResource::collection($fixture->events),
                'ratings' => MatchRatingsResource::collection($fixture->ratings),
                'images'=>MatchImageResource::collection($fixture->images)
            ]
        ]);

    }

    public function createFixtures(Tournament $tournament){

        $tournament_id = $tournament->id;
        $tournament_leg = $tournament->leg;
        $tournament_round = $tournament->round;


        $clubIds = $tournament->clubs->map(function($club){
            return $club['id'];
        });

        switch ($tournament->type) {
            case 1:

                $this->fixtureRepo->createRoundRobinFixtures($tournament_id,$clubIds,$tournament_leg);
                
            break;

            case 2:
                
                $this->fixtureRepo->createKnockoutFixtures($tournament_id,$clubIds,$tournament_round,$tournament_leg,true);

            break;
            case 3:
                
                $this->fixtureRepo->createRRKFixture($tournament_id,$tournament_leg,);

            break;
            
            default:
                
                break;
        }


        return response()->json([
            'data' => $tournament->fixtures,
            'message'=>'Fixtures Created Successfully.'
        ]);

    }


    public function destroy(Request $request){

        $delete = $this->fixtureRepo->destroyById($request->id);

        if($delete){
            return response()->json([
                'message' => count($request->id) > 1 ? 'Fixtures  removed successfully.' : 'Fixture removed successfully.',
            ],200);
        }else{
            return response()->json([
                'message' => count($request->id) > 1 ? 'Fixtures not deleted.' : 'Fixture not deleted.',
            ],500);
        }
    }

    public function createFixture(Request $request){
        
        $fixture = $this->fixtureRepo->create($request);

        return response()->json([
            'message'=>'Fixture Created',
            'fixture'=>new FixtureResource($fixture)
        ],200);
    }

    

    public function update(Request $request){  
        
        $fixture = $this->fixtureRepo->updateFixture($request);

        return response()->json([
            'message'=>'Update Successfull',
            'fixture'=>new FixtureResource($fixture)
        ],200);
    }

    


}
