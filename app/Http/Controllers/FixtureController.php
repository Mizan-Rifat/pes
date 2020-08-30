<?php

namespace App\Http\Controllers;

use App\Http\Resources\FixtureResource;
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

    public function getFixtureById(Request $request){

        if($request['players']){
            $fixture = $this->fixtureRepo->with('team1.players','team2.players')->find($request['fixture_id']);    
        }else{
            $fixture = $this->fixtureRepo->with('team1','team2')->find($request['fixture_id']);    
        }

        return  new FixtureResource($fixture);
    }

    
    
    public function getFixturesByClub(){

        $fixtures = $this->fixtureRepo->getClubFixtures(request('club_id'),request('tournament_id'));

        // return $fixtures;

        return  FixtureResource::collection($fixtures,false);
    }
    
    public function getClubHomeFixtures(){

        $fixtures = $this->fixtureRepo->getClubHomeFixtures(request('club_id'),request('tournament_id'));

        return  FixtureResource::collection($fixtures);
    }
    public function getClubAwayFixtures(){

        $fixtures = $this->fixtureRepo->getClubAwayFixtures(request('club_id'),request('tournament_id'));

        return  FixtureResource::collection($fixtures);
    }

    public function createFixtures(){

        $tournament = $this->tournamentRepo->find(request('tournament_id'));
        $tournament_id = request('tournament_id');
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


        return 'success';

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

    

    public function updateFixture(Request $request){  
        
        $fixture = $this->fixtureRepo->updateFixture($request);

        return response()->json([
            'message'=>'Update Successfull',
            'fixture'=>new FixtureResource($fixture)
        ],200);
    }

    


}
