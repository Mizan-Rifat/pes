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

    public function getFixtureById($id){
        $fixture = $this->fixtureRepo->find($id);
        return  new FixtureResource($fixture);
    }

    public function getFixturesByTournament(){

        $fixtures = $this->fixtureRepo->getFixturesByTournament(request('tournament_id'));

        return  FixtureResource::collection($fixtures);
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

    public function createFixture(){

        $tournament = $this->tournamentRepo->find(request('tournament_id'));
        $tournament_id = request('tournament_id');
        $tournament_leg = $tournament->leg;
        $tournament_round = $tournament->round;


        $clubIds = $tournament->clubs->map(function($club){
            return $club['id'];
        });

        switch ($tournament->type) {
            case 1:

                return $this->fixtureRepo->createRoundRobinFixtures($tournament_id,$clubIds,$tournament_leg);
                
            break;

            case 2:
                
                return $this->fixtureRepo->createKnockoutFixtures($tournament_id,$clubIds,$tournament_round,$tournament_leg,true);

            break;
            case 3:
                
                return $this->fixtureRepo->createRRKFixture($tournament_id,$tournament_leg,);

            break;
            
            default:
                
                break;
        }


        return 'success';

    }

    


}
