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

  
 

    public function getFixturesByTournament($reference,$with=[]){

        $tournament = $this->tournamentRepo
                        // ->find($tournament_id)
                        ->where('id',$reference)
                        ->orWhere('slug',$reference)
                        ->with('fixtures')
                        ->firstOrFail();
        
        return $tournament->fixtures;
    }
    public function getCompletedFixturesByTournament($tournament_id,$with=[]){

        $fixtures = $this->tournamentRepo
                        ->find($tournament_id)
                        ->fixtures()
                        ->where('completed',1)
                        ->with($with)
                        ->get();

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

    

    public function updateFixture($request){

        $request['team1_id'] = $request['team1'];
        $request['team2_id'] = $request['team2'];
        $request['group_'] = $request['group'];

        unset($request['team1'],$request['team2'],$request['group']);


       $validatedData = $request->validate([
           'id' => ['required','integer'],
           'team1_id' => ['integer'],
           'team2_id' => ['integer','different:team1_id'],
           'date' => ['date','nullable'],
           'group_' => ['integer','nullable'],
           'round' => ['integer'],
           'leg' => ['integer'],
       ]);   
       

       $fixture = $this->model->findorFail($validatedData['id']);

       $fixture->update($validatedData);

       return $fixture;
   }

    public function destroyById($ids){

        $delete = $this->model->whereIn('id',$ids)->delete();

        return $delete;
    }
    
}
