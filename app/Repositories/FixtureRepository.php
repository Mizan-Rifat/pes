<?php

namespace App\Repositories;

use App\Model\Fixture;
use App\Repositories\Traits\BaseRepository;
use App\Repositories\Traits\FixtureRepo;
use Illuminate\Support\Facades\DB;

class FixtureRepository
{

    use BaseRepository;
    use FixtureRepo;

    protected $model;

    private $tournamentRepo;

    public function __construct() {
        $this->model = new Fixture();
        $this->tournamentRepo = new TournamentRepository();

    }

  
 

    public function getFixturesByTournament($tournament_id){

        $fixtures = $this->tournamentRepo->find($tournament_id)->fixtures()->get();
        
        return $fixtures;
    }


    public function getClubFixtures($club_id,$tournament_id,$completed = 0,$withResult=false){

        $fixtures = $this->model
                    ->where(function($query) use($club_id){
                        $query->where('team1_id',$club_id)
                            ->orWhere('team2_id',$club_id);
                    })
                    ->where('tournament_id',$tournament_id)
                    ->where('completed',$completed)
                    ->when($withResult,function($q){
                        return $q->with('result');
                    })
                    ->get();
        
        return $fixtures;
    }

    public function getClubHomeFixtures($club_id,$tournament_id,$completed = 0){

        $fixtures = $this->model
                    ->where('team1_id',$club_id)
                    ->where('tournament_id',$tournament_id)
                    ->where('completed',$completed)
                    ->get();
        
        return $fixtures;
    }
    
    public function getClubAwayFixtures($club_id,$tournament_id,$completed = 0){

        $fixtures = $this->model
                    ->where('team2_id',$club_id)
                    ->where('tournament_id',$tournament_id)
                    ->where('completed',$completed)
                    ->get();
        
        return $fixtures;
    }
    
}
